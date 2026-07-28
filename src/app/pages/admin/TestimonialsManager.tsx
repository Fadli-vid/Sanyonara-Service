import { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { EmptyState } from "../../components/shared/EmptyState";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "../../components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useSanyonara, uid, type Testimonial } from "../../store/SanyonaraContext";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { toast } from "sonner";

const empty: Testimonial = { id: "", name: "", area: "", avatar: "", rating: 5, comment: "", active: true };

export default function TestimonialsManager() {
  const { data, update } = useSanyonara();
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<Testimonial>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setForm({ ...empty, id: uid() }); setDialog(true); };
  const openEdit = (t: Testimonial) => { setForm(t); setDialog(true); };

  const save = () => {
    if (!form.name.trim()) { toast.error("Nama wajib diisi."); return; }
    const exists = data.testimonials.some((t) => t.id === form.id);
    update("testimonials", exists ? data.testimonials.map((t) => (t.id === form.id ? form : t)) : [...data.testimonials, form]);
    setDialog(false);
    toast.success(exists ? "Testimoni diperbarui." : "Testimoni ditambahkan.");
  };

  const remove = () => {
    if (!deleteId) return;
    update("testimonials", data.testimonials.filter((t) => t.id !== deleteId));
    setDeleteId(null);
    toast.success("Testimoni dihapus.");
  };

  return (
    <div>
      <PageHeader
        title="Testimoni"
        description="Kelola ulasan pelanggan."
        action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Testimoni</Button>}
      />

      {data.testimonials.length === 0 ? (
        <EmptyState title="Belum ada testimoni" description="Tambahkan ulasan pelanggan pertama." action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Testimoni</Button>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelanggan</TableHead>
                <TableHead className="hidden sm:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Komentar</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8"><AvatarImage src={t.avatar} alt={t.name} /><AvatarFallback>{t.name.charAt(0)}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.area}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="flex items-center gap-0.5 text-brand-orange">{t.rating} <Star className="size-3.5 fill-current" /></span>
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">{t.comment}</TableCell>
                  <TableCell><Badge variant={t.active ? "default" : "secondary"}>{t.active ? "Tampil" : "Disembunyikan"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(t)} aria-label="Edit"><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(t.id)} aria-label="Hapus"><Trash2 className="size-4 text-destructive" /></Button>
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
            <DialogTitle>{data.testimonials.some((t) => t.id === form.id) ? "Edit Testimoni" : "Tambah Testimoni"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Nama</Label>
                <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label>Area / Kecamatan</Label>
                <Input value={form.area} onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))} />
              </div>
            </div>
            <ImageUploader
              value={form.avatar}
              onChange={(url) => setForm((p) => ({ ...p, avatar: url }))}
              label="Avatar"
              hint="Upload foto pelanggan atau tempel URL."
              aspectRatio="square"
            />
            <div className="grid gap-2">
              <Label>Rating</Label>
              <Select value={String(form.rating)} onValueChange={(v) => setForm((p) => ({ ...p, rating: Number(v) }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => <SelectItem key={r} value={String(r)}>{r} Bintang</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Komentar</Label>
              <Textarea rows={3} value={form.comment} onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))} />
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
            <AlertDialogTitle>Hapus testimoni ini?</AlertDialogTitle>
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
