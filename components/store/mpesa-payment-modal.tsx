"use client"

import { useState } from "react"
import { X, Loader2, MessageSquare, Sparkles } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const BUSINESS_NAME = "CLASSY COLLECTIONS"

interface MpesaPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  onPaymentConfirmed: (mpesaCode: string, phone: string, mpesaMessage: string) => void
}

export function MpesaPaymentModal({ isOpen, onClose, total, onPaymentConfirmed }: MpesaPaymentModalProps) {
  const [mpesaCode, setMpesaCode] = useState("")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [mpesaMessage, setMpesaMessage] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isOpen) return null

  const canSubmit = mpesaMessage.trim().length >= 10

  const handleConfirm = async () => {
    if (!canSubmit) return

    try {
      setIsConfirming(true)

      // Accept any message as valid - be lenient with validation
      // Just use the message as-is, extract code only if present (optional)
      const codeMatch = mpesaMessage.match(/[A-Z0-9]{10}/)?.[0] || "MPESA-" + Date.now().toString().slice(-6)
      const phoneMatch = mpesaMessage.match(/(?:254|0)\d{9}/)?.[0] || mpesaPhone.trim() || "Not provided"

      // Call the parent callback to handle payment confirmation
      await new Promise((r) => setTimeout(r, 500)) // Brief delay for UX
      onPaymentConfirmed(codeMatch, phoneMatch, mpesaMessage.trim())

      // Reset form
      setMpesaCode("")
      setMpesaPhone("")
      setMpesaMessage("")
    } catch (error) {
      console.error("[v0] M-Pesa confirmation error:", error)
      alert("Error processing payment. Please try again.")
      setIsConfirming(false)
    }
  }


  const handleClose = () => {
    setMpesaCode("")
    setMpesaPhone("")
    setMpesaMessage("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-background w-full max-w-md max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button type="button" onClick={handleClose} className="absolute top-3 right-3 z-20 p-1.5 hover:bg-secondary rounded-sm transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Lipa na M-Pesa Header */}
        <div className="bg-[#00843D] px-6 pt-8 pb-6 text-center relative overflow-hidden">
          <div className="absolute right-6 top-4 opacity-20">
            <svg width="48" height="72" viewBox="0 0 48 72" fill="white">
              <rect x="6" y="0" width="36" height="72" rx="6" stroke="white" strokeWidth="2" fill="none" />
              <rect x="14" y="6" width="20" height="48" rx="1" fill="white" opacity="0.3" />
              <circle cx="24" cy="62" r="4" fill="white" opacity="0.4" />
            </svg>
          </div>

          <h2 className="text-white font-extrabold text-2xl tracking-tight">
            LIPA NA M
            <span className="relative inline-block mx-0.5">
              <span className="text-white">-</span>
            </span>
            PESA
          </h2>
          <div className="flex justify-center mt-1">
            <div className="w-16 h-1 bg-[#E4002B] rounded-full" />
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Automated STK Push notice - replaces the till number card while
              the automated M-PESA STK push integration is being wired up. */}
          <div className="bg-background border-2 border-[#00843D]/20 rounded-sm -mt-3 relative z-10 shadow-lg">
            <div className="px-5 py-5 text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#00843D]/10 mx-auto">
                <Sparkles className="h-5 w-5 text-[#00843D]" />
              </div>
              <p className="text-[#00843D] font-bold text-sm tracking-wider uppercase">
                Automated STK Push Coming Soon
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We are rolling out automated M-PESA payments. For now, complete your M-PESA payment on your phone,
                then paste the confirmation SMS below and our team will verify it.
              </p>
              <p className="text-foreground font-extrabold text-base tracking-wide pt-1">{BUSINESS_NAME}</p>
            </div>
          </div>

          {/* Amount to pay */}
          <div className="mt-4 bg-[#00843D]/5 border border-[#00843D]/15 rounded-sm p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Amount to Pay:</span>
            <span className="text-xl font-bold text-[#00843D]">{formatPrice(total)}</span>
          </div>

          {/* Paste M-PESA Message */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-[#00843D]" />
              <p className="text-sm font-semibold">After paying, paste the M-PESA SMS below</p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1.5 block">M-PESA Confirmation Message *</Label>
              <Textarea
                value={mpesaMessage}
                onChange={(e) => setMpesaMessage(e.target.value)}
                placeholder={"Paste the full M-PESA SMS here e.g.\nSHK3A7B2C1 Confirmed. Ksh1,500.00 sent to CLASSY COLLECTIONS..."}
                rows={4}
                className="text-sm"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Paste the entire confirmation SMS from Safaricom M-PESA
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1.5 block">Phone Number Used (optional)</Label>
              <Input
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className="h-11"
                type="tel"
              />
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!canSubmit || isConfirming}
            className="w-full h-12 mt-5 bg-[#00843D] text-white hover:bg-[#006B32] text-sm font-semibold disabled:opacity-40"
          >
            {isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Payment"
            )}
          </Button>

          <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
            Our team will verify your payment. You will receive a confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  )
}
