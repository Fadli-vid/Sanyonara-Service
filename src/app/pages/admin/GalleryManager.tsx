import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { EmptyState } from "../../components/shared/EmptyState";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useSanyonara, uid, type GalleryItem } from "../../store/SanyonaraContext";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { toast } from "sonner";

const empty: GalleryItem = { id: "", url: "", caption: "", order: 0 };

export default function GalleryManager() {
  const { data, update } = useSanyonara();
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<GalleryItem>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sorted = [...data.gallery].sort((a, b) => a.order - b.order);

  const openNew = () => { setForm({ ...empty, id: uid(), order: data.gallery.length + 1 }); setDialog(true); };
  const openEdit = (g: GalleryItem) => { setForm(g); setDialog(true); };

  const save = () => {
    if (!form.url.trim()) { toast.error("URL foto wajib diisi."); return; }
    const exists = data.gallery.some((g) => g.id === form.id);
    update("gallery", exists ? data.gallery.map((g) => (g.id === form.id ? form : g)) : [...data.gallery, form]);
    setDialog(false);
    toast.success(exists ? "Foto diperbarui." : "Foto ditambahkan.");
  };

  const remove = () => {
    if (!deleteId) return;
    update("gallery", data.gallery.filter((g) => g.id !== deleteId));
    setDeleteId(null);
    toast.success("Foto dihapus.");
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = sorted.findIndex((g) => g.id === id);
    const target = idx + dir;
    if (target < 0 || target >= sorted.length) return;
    const arr = [...sorted];
    [arr[idx].order, arr[target].order] = [arr[target].order, arr[idx].order];
    update("gallery", arr);
  };

  return (
    <div>
      <PageHeader
        title="Galeri"
        description="Kelola foto pekerjaan dan atur urutan tampil."
        action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Foto</Button>}
      />

      {sorted.length === 0 ? (
        <EmptyState title="Belum ada foto" description="Unggah foto pekerjaan pertama." action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Foto</Button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((g, i) => (
            <div key={g.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <ImageWithFallback src={g.url} alt={g.caption} className="aspect-video w-full object-cover" />
              <div className="p-3">
                <p className="truncate text-sm font-medium text-foreground">{g.caption || "Tanpa keterangan"}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" onClick={() => move(g.id, -1)} disabled={i === 0} aria-label="Naik"><ArrowUp className="size-4" /></Button>
                    <Button variant="outline" size="icon" onClick={() => move(g.id, 1)} disabled={i === sorted.length - 1} aria-label="Turun"><ArrowDown className="size-4" /></Button>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(g)} aria-label="Edit"><Pencil className="size-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(g.id)} aria-label="Hapus"><Trash2 className="size-4 text-destructive" /></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{data.gallery.some((g) => g.id === form.id) ? "Edit Foto" : "Tambah Foto"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <ImageUploader
              value={form.url}
              onChange={(url) => setForm((p) => ({ ...p, url }))}
              label="Foto"
              hint="Upload foto pekerjaan atau tempel URL."
            />
            <div className="grid gap-2">
              <Label>Keterangan</Label>
              <Input value={form.caption} onChange={(e) => setForm((p) => ({ ...p, caption: e.target.value }))} />
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
            <AlertDialogTitle>Hapus foto ini?</AlertDialogTitle>
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
