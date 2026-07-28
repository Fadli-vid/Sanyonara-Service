import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { EmptyState } from "../../components/shared/EmptyState";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useSanyonara, uid, type PriceItem } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const empty: PriceItem = { id: "", name: "", price: "", description: "", popular: false, active: true };

export default function PricingManager() {
  const { data, update } = useSanyonara();
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<PriceItem>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setForm({ ...empty, id: uid() }); setDialog(true); };
  const openEdit = (p: PriceItem) => { setForm(p); setDialog(true); };

  const save = () => {
    if (!form.name.trim()) { toast.error("Nama layanan wajib diisi."); return; }
    const exists = data.pricing.some((p) => p.id === form.id);
    update("pricing", exists ? data.pricing.map((p) => (p.id === form.id ? form : p)) : [...data.pricing, form]);
    setDialog(false);
    toast.success(exists ? "Harga diperbarui." : "Harga ditambahkan.");
  };

  const remove = () => {
    if (!deleteId) return;
    update("pricing", data.pricing.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    toast.success("Harga dihapus.");
  };

  return (
    <div>
      <PageHeader
        title="Harga"
        description="Kelola daftar harga layanan."
        action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Harga</Button>}
      />

      {data.pricing.length === 0 ? (
        <EmptyState title="Belum ada harga" description="Tambahkan item harga pertama." action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Harga</Button>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pricing.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">
                    {p.name} {p.popular && <Badge className="ml-1 bg-brand-orange text-white">Populer</Badge>}
                  </TableCell>
                  <TableCell className="text-primary">{p.price}</TableCell>
                  <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">{p.description}</TableCell>
                  <TableCell><Badge variant={p.active ? "default" : "secondary"}>{p.active ? "Aktif" : "Nonaktif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Edit"><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)} aria-label="Hapus"><Trash2 className="size-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{data.pricing.some((p) => p.id === form.id) ? "Edit Harga" : "Tambah Harga"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Nama Layanan</Label>
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Harga Mulai</Label>
              <Input placeholder="Rp75.000" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Deskripsi</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <Label>Tandai sebagai populer</Label>
              <Switch checked={form.popular} onCheckedChange={(v) => setForm((p) => ({ ...p, popular: v }))} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <Label>Tampilkan di website</Label>
              <Switch checked={form.active} onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(false)}>Batal</Button>
            <Button onClick={save}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus item harga ini?</AlertDialogTitle>
            <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className="bg-destructive text-white hover:bg-destructive/90">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
