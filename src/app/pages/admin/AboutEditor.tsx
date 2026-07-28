import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { useSanyonara, type AboutData } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function AboutEditor() {
  const { data, update } = useSanyonara();
  const [form, setForm] = useState<AboutData>(data.about);
  const set = (k: keyof AboutData, v: string | string[]) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    update("about", form);
    toast.success("Tentang Kami berhasil diperbarui.");
  };

  return (
    <div>
      <PageHeader
        title="Tentang Kami"
        description="Kelola profil perusahaan, visi, misi, dan poin unggulan."
        action={<Button onClick={save}><Save className="size-4" /> Simpan</Button>}
      />

      <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-2">
          <Label>Judul</Label>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Deskripsi</Label>
          <Textarea rows={4} value={form.body} onChange={(e) => set("body", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Visi</Label>
            <Textarea rows={2} value={form.visi} onChange={(e) => set("visi", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Misi</Label>
            <Textarea rows={2} value={form.misi} onChange={(e) => set("misi", e.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Poin Unggulan</Label>
          <Input
            value={form.points.join(", ")}
            onChange={(e) => set("points", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          />
          <FieldHint>Pisahkan dengan koma.</FieldHint>
        </div>
        <ImageUploader
          value={form.image}
          onChange={(url) => set("image", url)}
          label="Gambar Tentang Kami"
          hint="Upload foto workshop/teknisi atau tempel URL gambar."
        />
      </div>
    </div>
  );
}
