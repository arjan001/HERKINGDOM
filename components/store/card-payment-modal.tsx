"use client"

import { useState, useEffect, useRef } from "react"
import { X, CreditCard, Lock, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/format"

type PaymentStep = "form" | "processing" | "authenticating" | "result"

interface CardPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  onPaymentComplete: (
    status: "success" | "failed",
    details: {
      last4: string
      cardName: string
      cardBrand: string
      maskedNumber: string
      expiry: string
      maskedCvv: string
    }
  ) => void
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

export function CardPaymentModal({ isOpen, onClose, total, onPaymentComplete }: CardPaymentModalProps) {
  const [step, setStep] = useState<PaymentStep>("form")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [processingText, setProcessingText] = useState("")
  const cardRef = useRef<HTMLInputElement>(null)

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep("form")
      setCardNumber("")
      setCardName("")
      setExpiry("")
      setCvv("")
      setErrors({})
      setProcessingText("")
      setTimeout(() => cardRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Detect card brand
  const digits = cardNumber.replace(/\D/g, "")
  const cardBrand = digits.startsWith("4")
    ? "visa"
    : digits.startsWith("5") || digits.startsWith("2")
      ? "mastercard"
      : digits.startsWith("3")
        ? "amex"
        : null

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    const rawDigits = cardNumber.replace(/\D/g, "")
    if (rawDigits.length < 13 || rawDigits.length > 16) newErrors.cardNumber = "Enter a valid card number"
    if (!cardName.trim()) newErrors.cardName = "Name is required"
    const expiryDigits = expiry.replace(/\D/g, "")
    if (expiryDigits.length !== 4) {
      newErrors.expiry = "Enter MM/YY"
    } else {
      const month = parseInt(expiryDigits.slice(0, 2))
      if (month < 1 || month > 12) newErrors.expiry = "Invalid month"
    }
    if (cvv.length < 3 || cvv.length > 4) newErrors.cvv = "Enter CVV"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    const last4 = digits.slice(-4)
    const normalizedName = cardName.trim().toUpperCase()
    const normalizedBrand = (cardBrand || "unknown").toUpperCase()
    const maskedNumber = `**** **** **** ${last4}`
    const expiryDisplay = formatExpiry(expiry)
    const maskedCvv = "*".repeat(Math.max(3, cvv.length))

    // Step 1: Processing
    setStep("processing")
    setProcessingText("Connecting to payment network...")
    await delay(1200)
    setProcessingText("Verifying card details...")
    await delay(1500)
    setProcessingText("Processing payment...")
    await delay(1800)

    // Step 2: Authenticating
    setStep("authenticating")
    setProcessingText("Authenticating with your bank...")
    await delay(2000)
    setProcessingText("Waiting for bank authorization...")
    await delay(2500)
    setProcessingText("Finalizing transaction...")
    await delay(1500)

    // Step 3: Result - always show declined (test mode)
    setStep("result")
    onPaymentComplete("failed", {
      last4,
      cardName: normalizedName,
      cardBrand: normalizedBrand,
      maskedNumber,
      expiry: expiryDisplay,
      maskedCvv,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={step === "form" ? onClose : undefined} />
      <div className="relative bg-background rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a1f36] to-[#2d3250] text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span className="font-semibold">Card Payment</span>
            </div>
            {step === "form" && (
              <button type="button" onClick={onClose} className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="text-white/70 text-sm mt-1">Pay {formatPrice(total)}</p>
        </div>

        {/* Form Step */}
        {step === "form" && (
          <div className="p-6 space-y-5">
            {/* Card Number */}
            <div>
              <Label htmlFor="card-number" className="text-sm font-medium mb-1.5 block">Card Number</Label>
              <div className="relative">
                <Input
                  ref={cardRef}
                  id="card-number"
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  placeholder="1234 5678 9012 3456"
                  className={`h-12 pl-4 pr-14 font-mono text-base tracking-wider ${errors.cardNumber ? "border-red-500" : ""}`}
                  maxLength={19}
                  inputMode="numeric"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {cardBrand === "visa" && <VisaIcon />}
                  {cardBrand === "mastercard" && <MastercardIcon />}
                  {cardBrand === "amex" && <AmexIcon />}
                  {!cardBrand && <CreditCard className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
              {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
            </div>

            {/* Cardholder Name */}
            <div>
              <Label htmlFor="card-name" className="text-sm font-medium mb-1.5 block">Cardholder Name</Label>
              <Input
                id="card-name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="JANE DOE"
                className={`h-12 uppercase ${errors.cardName ? "border-red-500" : ""}`}
              />
              {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="text-sm font-medium mb-1.5 block">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={formatExpiry(expiry)}
                  onChange={(e) => setExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="MM/YY"
                  className={`h-12 font-mono text-center ${errors.expiry ? "border-red-500" : ""}`}
                  maxLength={5}
                  inputMode="numeric"
                />
                {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm font-medium mb-1.5 block">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="***"
                  className={`h-12 font-mono text-center ${errors.cvv ? "border-red-500" : ""}`}
                  maxLength={4}
                  inputMode="numeric"
                />
                {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              className="w-full h-12 bg-[#1a1f36] text-white hover:bg-[#2d3250] font-semibold text-base"
            >
              <Lock className="h-4 w-4 mr-2" />
              Pay {formatPrice(total)}
            </Button>

            {/* Security footer */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Secured with 256-bit SSL encryption</span>
            </div>

            {/* Test mode notice */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-sm p-3 text-center">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Test Mode — Use test card: 4242 4242 4242 4242
              </p>
            </div>
          </div>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-secondary" />
              <div className="absolute inset-0 rounded-full border-4 border-t-[#1a1f36] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-[#1a1f36]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-sm text-muted-foreground animate-pulse">{processingText}</p>
            <div className="mt-6 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Do not close this window</span>
            </div>
          </div>
        )}

        {/* Authenticating Step */}
        {step === "authenticating" && (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-blue-50 dark:bg-blue-950/30 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Bank Authentication</h3>
            <p className="text-sm text-muted-foreground animate-pulse">{processingText}</p>
            <div className="mt-4 w-full bg-secondary rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ animation: "progress-bar 6s ease-in-out forwards" }} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure 3D authentication in progress</span>
            </div>
          </div>
        )}

        {/* Result Step - Declined */}
        {step === "result" && (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Payment Declined</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Your bank declined this transaction. This may be due to:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 mb-6">
              <li>Insufficient funds</li>
              <li>Card restrictions on online payments</li>
              <li>Incorrect card details</li>
            </ul>
            <div className="flex gap-3 w-full">
              <Button
                onClick={() => setStep("form")}
                variant="outline"
                className="flex-1 h-11"
              >
                Try Again
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 h-11 bg-[#1a1f36] text-white hover:bg-[#2d3250]"
              >
                Use Other Method
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-9" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M20.4 21.6h-3.2l2-12.2h3.2l-2 12.2zm13-12.2l-3 8.3-.4-1.8-1-5.3s-.1-1.2-1.6-1.2h-4.8l-.1.3s1.7.4 3.6 1.6l3 11.3h3.3l5-13.2h-4zm-5.7 12.2l1.5-4h-.1l-1.1-5.6-2.5 9.6h2.2z" fill="white" />
    </svg>
  )
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-9" fill="none">
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
      <path d="M24 10.3a8 8 0 010 11.4 8 8 0 000-11.4z" fill="#FF5F00" />
    </svg>
  )
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-9" fill="none">
      <rect width="48" height="32" rx="4" fill="#2E77BC" />
      <text x="24" y="19" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AMEX</text>
    </svg>
  )
}
