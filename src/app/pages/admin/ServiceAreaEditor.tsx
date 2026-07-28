import { useState } from "react";
import { Save, MapPin } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useSanyonara, type ServiceAreaData } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function ServiceAreaEditor() {
  const { data, update } = useSanyonara();
  const [form, setForm] = useState<ServiceAreaData>(data.serviceArea);
  const set = (k: keyof ServiceAreaData, v: string | string[]) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    update("serviceArea", form);
    toast.success("Area Layanan berhasil diperbarui.");
  };

  return (
    <div>
      <PageHeader
        title="Area Layanan"
        description="Kelola cakupan wilayah layanan yang tampil di website."
        action={<Button onClick={save}><Save className="size-4" /> Simpan</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-2">
            <Label>Judul</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Deskripsi</Label>
            <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Daftar Wilayah</Label>
            <Textarea
              rows={4}
              value={form.areas.join(", ")}
              onChange={(e) => set("areas", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
            <FieldHint>Pisahkan tiap wilayah dengan koma.</FieldHint>
          </div>
          <div className="grid gap-2">
            <Label>Catatan Tambahan</Label>
            <Textarea rows={2} value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Pratinjau</p>
          <div className="rounded-2xl border border-border bg-background p-5">
            <h3 className="text-lg font-bold text-foreground">{form.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{form.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {form.areas.map((a) => (
                <span key={a} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
                  <MapPin className="size-3 text-primary" /> {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
