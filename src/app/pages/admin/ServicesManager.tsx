import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { EmptyState } from "../../components/shared/EmptyState";
import { DynamicIcon, ICON_OPTIONS } from "../../components/shared/DynamicIcon";
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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useSanyonara, uid, type ServiceItem } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const empty: ServiceItem = { id: "", name: "", description: "", icon: "Wrench", active: true };

export default function ServicesManager() {
  const { data, update } = useSanyonara();
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState<ServiceItem>(empty);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openNew = () => { setForm({ ...empty, id: uid() }); setDialog(true); };
  const openEdit = (s: ServiceItem) => { setForm(s); setDialog(true); };

  const save = () => {
    if (!form.name.trim()) { toast.error("Nama layanan wajib diisi."); return; }
    const exists = data.services.some((s) => s.id === form.id);
    const next = exists
      ? data.services.map((s) => (s.id === form.id ? form : s))
      : [...data.services, form];
    update("services", next);
    setDialog(false);
    toast.success(exists ? "Layanan diperbarui." : "Layanan ditambahkan.");
  };

  const remove = () => {
    if (!deleteId) return;
    update("services", data.services.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    toast.success("Layanan dihapus.");
  };

  return (
    <div>
      <PageHeader
        title="Layanan"
        description="Kelola daftar layanan yang ditampilkan di website."
        action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Layanan</Button>}
      />

      {data.services.length === 0 ? (
        <EmptyState title="Belum ada layanan" description="Tambahkan layanan pertama Anda." action={<Button onClick={openNew}><Plus className="size-4" /> Tambah Layanan</Button>} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Ikon</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell><DynamicIcon name={s.icon} className="size-5 text-primary" /></TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">{s.description}</TableCell>
                  <TableCell>
                    <Badge variant={s.active ? "default" : "secondary"}>{s.active ? "Aktif" : "Nonaktif"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)} aria-label="Edit"><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(s.id)} aria-label="Hapus"><Trash2 className="size-4 text-destructive" /></Button>
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
            <DialogTitle>{data.services.some((s) => s.id === form.id) ? "Edit Layanan" : "Tambah Layanan"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Nama Layanan</Label>
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Deskripsi</Label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <Label>Ikon</Label>
              <Select value={form.icon} onValueChange={(v) => setForm((p) => ({ ...p, icon: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((ic) => (
                    <SelectItem key={ic} value={ic}>
                      <span className="flex items-center gap-2"><DynamicIcon name={ic} className="size-4" /> {ic}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <AlertDialogTitle>Hapus layanan ini?</AlertDialogTitle>
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
