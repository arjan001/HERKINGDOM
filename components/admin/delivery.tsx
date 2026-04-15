"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, MapPin } from "lucide-react"
import { usePagination } from "@/hooks/use-pagination"
import { PaginationControls } from "@/components/pagination-controls"
import { AdminShell } from "./admin-shell"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface AdminDelivery {
  id: string
  name: string
  fee: number
  estimatedDays: string
  isActive: boolean
}

export function AdminDelivery() {
  const { data: locations = [], mutate } = useSWR<AdminDelivery[]>("/api/admin/delivery", fetcher)
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", fee: "", estimatedDays: "" })

  const { paginatedItems, currentPage, totalPages, totalItems, itemsPerPage, goToPage, changePerPage } = usePagination(locations, { defaultPerPage: 10 })

  const openNew = () => { setEditId(null); setForm({ name: "", fee: "", estimatedDays: "" }); setIsOpen(true) }
  const openEdit = (loc: AdminDelivery) => {
    setEditId(loc.id); setForm({ name: loc.name, fee: loc.fee.toString(), estimatedDays: loc.estimatedDays }); setIsOpen(true)
  }

  const handleSave = async () => {
    await fetch("/api/admin/delivery", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, name: form.name, fee: Number.parseFloat(form.fee) || 0, estimatedDays: form.estimatedDays }),
    })
    mutate(); setIsOpen(false)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/delivery?id=${id}`, { method: "DELETE" })
    mutate()
  }

  return (
    <AdminShell title="Delivery Locations">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Delivery Locations</h1>
            <p className="text-sm text-muted-foreground mt-1">{locations.length} locations</p>
          </div>
          <Button onClick={openNew} className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4 mr-2" /> Add Location
          </Button>
        </div>

        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left px-4 py-3 font-medium">Location</th>
                <th className="text-left px-4 py-3 font-medium">Delivery Fee</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Est. Days</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedItems.map((loc) => (
                <tr key={loc.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{loc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{formatPrice(loc.fee)}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{loc.estimatedDays}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(loc)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(loc.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
          onItemsPerPageChange={changePerPage}
          perPageOptions={[10, 20, 50]}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-background text-foreground">
          <DialogHeader><DialogTitle className="font-serif">{editId ? "Edit" : "Add"} Location</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-4">
            <div><Label className="text-sm font-medium mb-1.5 block">Location Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Nairobi CBD" /></div>
            <div><Label className="text-sm font-medium mb-1.5 block">Delivery Fee (KSh) *</Label><Input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} placeholder="200" /></div>
            <div><Label className="text-sm font-medium mb-1.5 block">Estimated Days *</Label><Input value={form.estimatedDays} onChange={(e) => setForm({ ...form, estimatedDays: e.target.value })} placeholder="Same day" /></div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={handleSave} disabled={!form.name || !form.fee} className="bg-foreground text-background hover:bg-foreground/90">{editId ? "Update" : "Add"} Location</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
