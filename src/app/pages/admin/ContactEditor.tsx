import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSanyonara, type ContactData } from "../../store/SanyonaraContext";
import { toast } from "sonner";

export default function ContactEditor() {
  const { data, update } = useSanyonara();
  const [form, setForm] = useState<ContactData>(data.contact);
  const set = (k: keyof ContactData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    update("contact", form);
    toast.success("Kontak berhasil diperbarui.");
  };

  const fields: { key: keyof ContactData; label: string; hint?: string }[] = [
    { key: "whatsapp", label: "Nomor WhatsApp", hint: "Format internasional tanpa +, contoh: 6281234567890" },
    { key: "phone", label: "Nomor Telepon" },
    { key: "email", label: "Email" },
    { key: "instagram", label: "Link Instagram" },
    { key: "facebook", label: "Link Facebook" },
    { key: "tiktok", label: "Link TikTok" },
    { key: "googleBusiness", label: "Link Google Business Profile" },
  ];

  return (
    <div>
      <PageHeader
        title="Kontak"
        description="Kelola informasi kontak dan media sosial."
        action={<Button onClick={save}><Save className="size-4" /> Simpan</Button>}
      />

      <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="grid gap-2">
            <Label>{f.label}</Label>
            <Input value={form[f.key]} onChange={(e) => set(f.key, e.target.value)} />
            {f.hint && <FieldHint>{f.hint}</FieldHint>}
          </div>
        ))}
      </div>
    </div>
  );
}
