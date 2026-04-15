"use client"

import { useState } from "react"
import { AdminShell } from "./admin-shell"
import useSWR, { mutate } from "swr"
import { toast } from "sonner"
import {
  CreditCard,
  Send,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Copy,
  Link2,
  AlertCircle,
  Wallet,
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface Transaction {
  id: string
  amount: number
  currency: string
  status: string
  phone: string
  timestamp: string
  paymentLink?: {
    id: string
    title: string
  }
}

interface PaymentLink {
  id: string
  slug: string
  title: string
  description?: string
  amount: number
  currency: string
  status: string
  url: string
  createdAt: string
}

interface CardPaymentOrder {
  id: string
  order_no: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  subtotal: number
  delivery_fee: number
  total: number
  status: string
  payment_method: string
  order_notes?: string
  created_at: string
}

function formatPrice(amount: number): string {
  return `KSh ${amount.toLocaleString()}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof CheckCircle2; className: string; label: string }> = {
    success: { icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700", label: "Success" },
    completed: { icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700", label: "Completed" },
    failed: { icon: XCircle, className: "bg-red-100 text-red-700", label: "Failed" },
    pending: { icon: Clock, className: "bg-yellow-100 text-yellow-700", label: "Pending" },
    active: { icon: CheckCircle2, className: "bg-blue-100 text-blue-700", label: "Active" },
    inactive: { icon: XCircle, className: "bg-gray-100 text-gray-500", label: "Inactive" },
  }

  const c = config[status] || { icon: Clock, className: "bg-gray-100 text-gray-600", label: status }
  const Icon = c.icon

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${c.className}`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  )
}

function StkPushForm() {
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !amount) {
      toast.error("Phone number and amount are required")
      return
    }

    const numAmount = Number(amount)
    if (numAmount < 10) {
      toast.error("Minimum amount is KSh 10")
      return
    }

    // Format phone number
    let formattedPhone = phone.replace(/\s/g, "")
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "+254" + formattedPhone.slice(1)
    } else if (formattedPhone.startsWith("254")) {
      formattedPhone = "+" + formattedPhone
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+254" + formattedPhone
    }

    setLoading(true)
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "stk-push",
          phone: formattedPhone,
          amount: numAmount,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Failed to initiate STK push")
        return
      }
      toast.success("STK push sent! Customer will receive an M-Pesa prompt on their phone.")
      setPhone("")
      setAmount("")
      // Refresh transactions list
      mutate("/api/admin/payments?action=transactions")
    } catch {
      toast.error("Failed to initiate STK push")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0712345678 or +254712345678"
            className="w-full h-10 pl-10 pr-3 border border-border rounded-md text-sm bg-background"
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">Kenyan phone number (Safaricom M-Pesa)</p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Amount (KES)</label>
        <input
          type="number"
          min="10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 5000"
          className="w-full h-10 px-3 border border-border rounded-md text-sm bg-background"
        />
        <p className="text-[11px] text-muted-foreground mt-1">Minimum KSh 10</p>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Send className="h-4 w-4" />
        {loading ? "Sending STK Push..." : "Send M-Pesa Payment Request"}
      </button>
    </form>
  )
}

function CreatePaymentLinkForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !amount) {
      toast.error("Title and amount are required")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-payment-link",
          title,
          description,
          amount: Number(amount),
          currency: "KES",
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Failed to create payment link")
        return
      }
      toast.success("Payment link created successfully!")
      setTitle("")
      setDescription("")
      setAmount("")
      mutate("/api/admin/payments?action=payment-links")
    } catch {
      toast.error("Failed to create payment link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Premium Subscription"
          className="w-full h-10 px-3 border border-border rounded-md text-sm bg-background"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Description (optional)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Monthly premium subscription"
          className="w-full h-10 px-3 border border-border rounded-md text-sm bg-background"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Amount (KES)</label>
        <input
          type="number"
          min="10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 5000"
          className="w-full h-10 px-3 border border-border rounded-md text-sm bg-background"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Link2 className="h-4 w-4" />
        {loading ? "Creating..." : "Create Payment Link"}
      </button>
    </form>
  )
}

export function AdminPayments() {
  const [activeTab, setActiveTab] = useState<"transactions" | "stk-push" | "payment-links" | "card-payments">("transactions")
  const { data: transactions, isLoading: txLoading } = useSWR<Transaction[]>(
    "/api/admin/payments?action=transactions",
    fetcher,
    { refreshInterval: 15000 }
  )
  const { data: paymentLinks, isLoading: plLoading } = useSWR<PaymentLink[]>(
    "/api/admin/payments?action=payment-links",
    fetcher
  )
  const { data: cardPayments, isLoading: cpLoading } = useSWR<CardPaymentOrder[]>(
    "/api/admin/payments?action=card-payments",
    fetcher,
    { refreshInterval: 15000 }
  )

  const isConfigured = !(
    (Array.isArray(transactions) === false && (transactions as Record<string, string>)?.error?.includes("not configured")) ||
    (Array.isArray(paymentLinks) === false && (paymentLinks as Record<string, string>)?.error?.includes("not configured"))
  )

  const txList = Array.isArray(transactions) ? transactions : []
  const plList = Array.isArray(paymentLinks) ? paymentLinks : []
  const cpList = Array.isArray(cardPayments) ? cardPayments : []

  const successCount = txList.filter((t) => t.status === "success" || t.status === "completed").length
  const pendingCount = txList.filter((t) => t.status === "pending").length
  const totalRevenue = txList
    .filter((t) => t.status === "success" || t.status === "completed")
    .reduce((sum, t) => sum + (t.amount || 0), 0)
  const cardPaymentCount = cpList.length
  const cardPaymentTotal = cpList.reduce((sum, o) => sum + (o.total || 0), 0)

  return (
    <AdminShell title="Payments">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold">Payments</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage M-Pesa payments via Lipana, view card payment orders, send STK push requests, create payment links, and track transactions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              mutate("/api/admin/payments?action=transactions")
              mutate("/api/admin/payments?action=payment-links")
              mutate("/api/admin/payments?action=card-payments")
              toast.success("Refreshed")
            }}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-sm hover:bg-secondary transition-colors self-start"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* API Key Warning */}
        {!isConfigured && (
          <div className="flex items-start gap-3 p-4 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-800">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Lipana API Key Not Configured</p>
              <p className="text-xs mt-1">
                Add your <code className="bg-yellow-100 px-1 py-0.5 rounded font-mono text-[11px]">LIPANA_SECRET_KEY</code> environment variable in your Netlify dashboard to enable M-Pesa payments.
                Get your API key from{" "}
                <a href="https://lipana.dev" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                  lipana.dev
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-md border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">M-Pesa Revenue</p>
            <p className="text-2xl font-bold mt-1">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="p-4 rounded-md border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Successful M-Pesa</p>
            <p className="text-2xl font-bold mt-1 text-emerald-600">{successCount}</p>
          </div>
          <div className="p-4 rounded-md border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending M-Pesa</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{pendingCount}</p>
          </div>
          <div className="p-4 rounded-md border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Card Payments</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">{cardPaymentCount}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{formatPrice(cardPaymentTotal)} total</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-6">
            {[
              { key: "transactions" as const, label: "M-Pesa Transactions", icon: CreditCard },
              { key: "card-payments" as const, label: "Card Payments", icon: Wallet },
              { key: "stk-push" as const, label: "STK Push", icon: Send },
              { key: "payment-links" as const, label: "Payment Links", icon: Link2 },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div>
            {txLoading ? (
              <div className="text-center py-12 text-muted-foreground text-sm">Loading transactions...</div>
            ) : txList.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No transactions yet</p>
                <p className="text-xs text-muted-foreground mt-1">Send an STK push or share a payment link to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-medium text-muted-foreground">ID</th>
                      <th className="pb-3 font-medium text-muted-foreground">Phone</th>
                      <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                      <th className="pb-3 font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 font-medium text-muted-foreground">Date</th>
                      <th className="pb-3 font-medium text-muted-foreground">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txList.map((tx) => (
                      <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 font-mono text-xs">{tx.id?.slice(0, 12)}...</td>
                        <td className="py-3">{tx.phone || "—"}</td>
                        <td className="py-3 font-medium">{formatPrice(tx.amount)}</td>
                        <td className="py-3"><StatusBadge status={tx.status} /></td>
                        <td className="py-3 text-muted-foreground text-xs">{tx.timestamp ? formatDate(tx.timestamp) : "—"}</td>
                        <td className="py-3 text-xs">{tx.paymentLink?.title || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Card Payments Tab */}
        {activeTab === "card-payments" && (
          <div>
            {cpLoading ? (
              <div className="text-center py-12 text-muted-foreground text-sm">Loading card payments...</div>
            ) : cpList.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No card payment orders yet</p>
                <p className="text-xs text-muted-foreground mt-1">Card payment orders from checkout will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 font-medium text-muted-foreground">Order No</th>
                      <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                      <th className="pb-3 font-medium text-muted-foreground">Phone</th>
                      <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                      <th className="pb-3 font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 font-medium text-muted-foreground">Date</th>
                      <th className="pb-3 font-medium text-muted-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cpList.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 font-mono text-xs font-medium">{order.order_no}</td>
                        <td className="py-3">
                          <div>
                            <p className="text-sm">{order.customer_name}</p>
                            {order.customer_email && (
                              <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 text-sm">{order.customer_phone}</td>
                        <td className="py-3 font-medium">{formatPrice(order.total)}</td>
                        <td className="py-3"><StatusBadge status={order.status} /></td>
                        <td className="py-3 text-muted-foreground text-xs">{formatDate(order.created_at)}</td>
                        <td className="py-3 text-xs text-muted-foreground max-w-[200px] truncate">{order.order_notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* STK Push Tab */}
        {activeTab === "stk-push" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-md">
              <h3 className="font-medium mb-1">Send M-Pesa STK Push</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Send a payment request directly to a customer's phone. They'll receive an M-Pesa prompt to enter their PIN and complete the payment.
              </p>
              <StkPushForm />
            </div>
            <div className="p-6 border border-border rounded-md bg-secondary/30">
              <h3 className="font-medium mb-3">How STK Push Works</h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">1</span>
                  <span>Enter the customer's Safaricom phone number and amount</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">2</span>
                  <span>An M-Pesa payment prompt appears on the customer's phone</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">3</span>
                  <span>Customer enters their M-Pesa PIN to authorize payment</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">4</span>
                  <span>Payment is confirmed and appears in your transactions</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Payment Links Tab */}
        {activeTab === "payment-links" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 border border-border rounded-md">
                <h3 className="font-medium mb-1">Create Payment Link</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Generate a shareable link customers can use to pay via M-Pesa.
                </p>
                <CreatePaymentLinkForm />
              </div>
              <div className="lg:col-span-2">
                <h3 className="font-medium mb-3">Your Payment Links</h3>
                {plLoading ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
                ) : plList.length === 0 ? (
                  <div className="text-center py-8 border border-border rounded-md">
                    <Link2 className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                    <p className="text-sm text-muted-foreground">No payment links yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {plList.map((link) => (
                      <div key={link.id} className="p-4 border border-border rounded-md flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium truncate">{link.title}</p>
                            <StatusBadge status={link.status} />
                          </div>
                          {link.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{link.description}</p>
                          )}
                          <p className="text-sm font-bold mt-1">{formatPrice(link.amount)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {link.url && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(link.url)
                                  toast.success("Link copied!")
                                }}
                                className="p-2 border border-border rounded-md hover:bg-secondary transition-colors"
                                title="Copy link"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 border border-border rounded-md hover:bg-secondary transition-colors"
                                title="Open link"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
