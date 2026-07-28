import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { EmptyState } from "../../components/shared/EmptyState";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "../../components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useSanyonara, uid, type FaqItem } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const empty: FaqItem = { id: "", question: "", answer: "" };

export default function FaqManager() {
  const { data, update } = useSanyonara();
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<FaqItem>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setForm({ ...empty, id: uid() }); setDialog(true); };
  const openEdit = (f: FaqItem) => { setForm(f); setDialog(true); };

  const save = () => {
    if (!form.question.trim()) { toast.error("Pertanyaan wajib diisi."); return; }
    const exists = data.faq.some((f) => f.id === form.id);
    update("faq", exists ? data.faq.map((f) => (f.id === form.id ? form : f)) : [...data.faq, form]);
    setDialog(false);
    toast.success(exists ? "FAQ diperbarui." : "FAQ ditambahkan.");
  };

  const remove = () => {
    if (!deleteId) return;
    update("faq", data.faq.filter((f) => f.id !== deleteId));
    setDeleteId(null);
    toast.success("FAQ dihapus.");
  };

  return (
    <div>
      <PageHeader
        title="FAQ"
        description="Kelola pertanyaan yang sering diajukan."
        action={<Button onClick={openNew}><Plus className="size-4" /> Tambah FAQ</Button>}
      />

      {data.faq.length === 0 ? (
        <EmptyState title="Belum ada FAQ" description="Tambahkan pertanyaan pertama." action={<Button onClick={openNew}><Plus className="size-4" /> Tambah FAQ</Button>} />
      ) : (
        <div className="space-y-3">
          {data.faq.map((f) => (
            <div key={f.id} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5">
              <div>
                <p className="font-semibold text-foreground">{f.question}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.answer}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEdit(f)} aria-label="Edit"><Pencil className="size-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => setDeleteId(f.id)} aria-label="Hapus"><Trash2 className="size-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{data.faq.some((f) => f.id === form.id) ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Pertanyaan</Label>
              <Input value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Jawaban</Label>
              <Textarea rows={4} value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))} />
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
            <AlertDialogTitle>Hapus FAQ ini?</AlertDialogTitle>
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
