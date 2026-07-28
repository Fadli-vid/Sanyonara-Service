import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { useSanyonara, type SettingsData } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function SettingsEditor() {
  const { data, update } = useSanyonara();
  const [form, setForm] = useState<SettingsData>(data.settings);
  const set = (k: keyof SettingsData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    update("settings", form);
    toast.success("Pengaturan berhasil diperbarui.");
  };

  return (
    <div>
      <PageHeader
        title="Pengaturan Website"
        description="Kelola identitas website, SEO, dan promo."
        action={<Button onClick={save}><Save className="size-4" /> Simpan</Button>}
      />

      <div className="grid gap-6">
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold text-foreground">Identitas Website</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Nama Website</Label>
              <Input value={form.siteName} onChange={(e) => set("siteName", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Teks Logo</Label>
              <Input value={form.logoText} onChange={(e) => set("logoText", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Tagline</Label>
            <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Teks Copyright</Label>
            <Input value={form.copyright} onChange={(e) => set("copyright", e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold text-foreground">Local SEO</h2>
          <div className="grid gap-2">
            <Label>Meta Title</Label>
            <Input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
            <FieldHint>Judul yang tampil di hasil pencarian Google.</FieldHint>
          </div>
          <div className="grid gap-2">
            <Label>Meta Description</Label>
            <Textarea rows={3} value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
            <FieldHint>Sertakan keyword lokal seperti "Service AC Jakarta Selatan".</FieldHint>
          </div>
          <div className="grid gap-2">
            <Label>Keywords</Label>
            <Textarea rows={2} value={form.keywords} onChange={(e) => set("keywords", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>URL Open Graph Image</Label>
            <Input value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">Promo Banner</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Aktif</span>
              <Switch
                checked={form.promo.active}
                onCheckedChange={(v) => setForm((p) => ({ ...p, promo: { ...p.promo, active: v } }))}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Teks Promo</Label>
            <Input
              value={form.promo.text}
              onChange={(e) => setForm((p) => ({ ...p, promo: { ...p.promo, text: e.target.value } }))}
            />
            <FieldHint>Tampil di bar tipis paling atas website.</FieldHint>
          </div>
        </div>
      </div>
    </div>
  );
}
