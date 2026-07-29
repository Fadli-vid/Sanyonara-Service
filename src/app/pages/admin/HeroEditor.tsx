import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { useSanyonara, type HeroData } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function HeroEditor() {
  const { data, update } = useSanyonara();
  const [form, setForm] = useState<HeroData>({
    floatingBadgeTitle: "Garansi 30 Hari",
    floatingBadgeSubtitle: "Untuk setiap perbaikan",
    ...data.hero,
  });

  const set = (k: keyof HeroData, v: string | string[]) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    update("hero", form);
    toast.success("Hero berhasil diperbarui.");
  };

  return (
    <div>
      <PageHeader
        title="Hero"
        description="Bagian paling atas website. Ubah judul, subjudul, badge, tombol, gambar, dan kartu garansi melayang."
        action={
          <Button onClick={save}>
            <Save className="size-4" /> Simpan
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-2">
            <Label>Teks Badge Lokasi</Label>
            <Input value={form.badgeText} onChange={(e) => set("badgeText", e.target.value)} />
            <FieldHint>Muncul di atas judul, contoh area layanan.</FieldHint>
          </div>
          <div className="grid gap-2">
            <Label>Judul Utama</Label>
            <Textarea rows={2} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Subjudul</Label>
            <Textarea rows={3} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Teks Tombol Utama</Label>
              <Input value={form.primaryCta} onChange={(e) => set("primaryCta", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Teks Tombol Kedua</Label>
              <Input value={form.secondaryCta} onChange={(e) => set("secondaryCta", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Badge Keunggulan</Label>
            <Input
              value={form.badges.join(", ")}
              onChange={(e) => set("badges", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
            <FieldHint>Pisahkan dengan koma. Contoh: Bergaransi, Home Service.</FieldHint>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl border border-border/80 bg-accent/30 p-4">
            <div className="grid gap-2">
              <Label>Judul Card Melayang Garansi</Label>
              <Input
                value={form.floatingBadgeTitle || ""}
                onChange={(e) => set("floatingBadgeTitle", e.target.value)}
                placeholder="Garansi 30 Hari"
              />
              <FieldHint>Teks tebal di dalam kartu melayang gambar Hero.</FieldHint>
            </div>
            <div className="grid gap-2">
              <Label>Subjudul Card Melayang</Label>
              <Input
                value={form.floatingBadgeSubtitle || ""}
                onChange={(e) => set("floatingBadgeSubtitle", e.target.value)}
                placeholder="Untuk setiap perbaikan"
              />
              <FieldHint>Penjelasan singkat di bawah judul garansi.</FieldHint>
            </div>
          </div>

          <ImageUploader
            value={form.image}
            onChange={(url) => set("image", url)}
            label="Gambar Hero"
            hint="Upload foto teknisi atau tempel URL gambar."
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Pratinjau</p>
          <div className="rounded-2xl border border-border bg-background p-5">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {form.badgeText}
            </span>
            <h3 className="mt-3 text-xl font-bold text-foreground">{form.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{form.subtitle}</p>
            <div className="relative mt-4 overflow-hidden rounded-xl">
              <ImageWithFallback src={form.image} alt="Pratinjau hero" className="aspect-video w-full object-cover" />
            </div>

            {/* Pratinjau Card Melayang Garansi */}
            <div className="mt-3 rounded-xl border border-border bg-card p-3 shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald">
                  <CheckCircle2 className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-foreground">{form.floatingBadgeTitle || "Garansi 30 Hari"}</p>
                  <p className="text-[11px] text-muted-foreground">{form.floatingBadgeSubtitle || "Untuk setiap perbaikan"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
