"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { usePagination } from "@/hooks/use-pagination"
import { PaginationControls } from "@/components/pagination-controls"
import { AdminShell } from "./admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface AdminCategory {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
  isActive: boolean
}

interface CategoryForm {
  name: string
  slug: string
  image: string
}

const emptyForm: CategoryForm = { name: "", slug: "", image: "" }

export function AdminCategories() {
  const { data: cats = [], mutate } = useSWR<AdminCategory[]>("/api/admin/categories", fetcher)
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<CategoryForm>(emptyForm)
  const [search, setSearch] = useState("")

  const filtered = cats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const { paginatedItems, currentPage, totalPages, totalItems, itemsPerPage, goToPage, changePerPage, resetPage } = usePagination(filtered, { defaultPerPage: 12 })

  useEffect(() => { resetPage() }, [search])

  const openNew = () => { setEditId(null); setForm(emptyForm); setIsOpen(true) }
  const openEdit = (cat: AdminCategory) => {
    setEditId(cat.id)
    setForm({ name: cat.name, slug: cat.slug, image: cat.image })
    setIsOpen(true)
  }

  const handleSave = async () => {
    const body = { id: editId, name: form.name, slug: form.slug, image: form.image }
    const res = await fetch("/api/admin/categories", {
      method: editId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    mutate()
    setIsOpen(false)
    if (res.ok) toast.success(editId ? "Category updated" : "Category created")
    else toast.error("Failed to save category")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return
    const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" })
    mutate()
    if (res.ok) toast.success("Category deleted")
    else toast.error("Failed to delete category")
  }

  return (
    <AdminShell title="Categories">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold">Categories</h1>
            <p className="text-sm text-muted-foreground mt-1">{cats.length} categories</p>
          </div>
          <Button onClick={openNew} className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedItems.map((cat) => (
            <div key={cat.id} className="border border-border rounded-sm overflow-hidden group">
              <div className="relative aspect-[4/3] bg-secondary">
                <Image src={cat.image || "/placeholder.svg"} alt={cat.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.productCount} products</p>
                  <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(cat)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(cat.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
          onItemsPerPageChange={changePerPage}
          perPageOptions={[6, 12, 24]}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif">{editId ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Category Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Skinny Jeans" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated from name" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="bg-transparent">Cancel</Button>
              <Button onClick={handleSave} disabled={!form.name} className="bg-foreground text-background hover:bg-foreground/90">
                {editId ? "Update" : "Add"} Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  )
}
