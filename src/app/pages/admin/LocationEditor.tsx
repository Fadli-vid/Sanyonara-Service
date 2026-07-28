import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useSanyonara, type LocationData } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function LocationEditor() {
  const { data, update } = useSanyonara();
  const [form, setForm] = useState<LocationData>(data.location);
  const set = (k: keyof LocationData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    update("location", form);
    toast.success("Lokasi berhasil diperbarui.");
  };

  return (
    <div>
      <PageHeader
        title="Lokasi"
        description="Kelola alamat, jam operasional, dan peta Google Maps."
        action={<Button onClick={save}><Save className="size-4" /> Simpan</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-2">
            <Label>Alamat Lengkap</Label>
            <Textarea rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Jam Operasional</Label>
            <Input value={form.hours} onChange={(e) => set("hours", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Link Embed Google Maps</Label>
            <Textarea rows={2} value={form.mapsEmbed} onChange={(e) => set("mapsEmbed", e.target.value)} />
            <FieldHint>
              Buka Google Maps → cari lokasi → Bagikan → Sematkan peta → salin URL di dalam atribut src iframe.
            </FieldHint>
          </div>
          <div className="grid gap-2">
            <Label>Link "Buka di Google Maps"</Label>
            <Input value={form.mapsLink} onChange={(e) => set("mapsLink", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Catatan Kunjungan Langsung</Label>
            <Textarea rows={2} value={form.walkInNote} onChange={(e) => set("walkInNote", e.target.value)} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Pratinjau Peta</p>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe title="Pratinjau peta" src={form.mapsEmbed} className="h-72 w-full" loading="lazy" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{form.address}</p>
        </div>
      </div>
    </div>
  );
}
