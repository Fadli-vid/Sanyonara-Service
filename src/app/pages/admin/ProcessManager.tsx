import { useState } from "react";
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useSanyonara, type ProcessStep } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const uid = () => Math.random().toString(36).slice(2, 10);

export default function ProcessManager() {
  const { data, update } = useSanyonara();
  const [list, setList] = useState<ProcessStep[]>(data.process || []);

  const updateStep = (id: string, field: keyof ProcessStep, value: string) => {
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addStep = () => {
    setList((prev) => [
      ...prev,
      { id: uid(), title: "Langkah Baru", description: "Deskripsi langkah alur pelayanan." },
    ]);
  };

  const removeStep = (id: string) => {
    if (list.length <= 1) {
      toast.error("Minimal harus ada 1 langkah alur pelayanan.");
      return;
    }
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const move = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const next = [...list];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    setList(next);
  };

  const save = () => {
    update("process", list);
    toast.success("Alur pelayanan berhasil disimpan.");
  };

  return (
    <div>
      <PageHeader
        title="Alur Pelayanan"
        description="Kelola langkah-langkah alur kerja pelayanan perbaikan yang ditampilkan kepada pelanggan."
        action={
          <div className="flex gap-2">
            <Button onClick={addStep} variant="outline">
              <Plus className="size-4" /> Tambah Langkah
            </Button>
            <Button onClick={save}>
              <Save className="size-4" /> Simpan
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {list.map((step, index) => (
            <div key={step.id} className="relative rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Langkah #{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:bg-accent"
                    onClick={() => move(index, "up")}
                    disabled={index === 0}
                    title="Pindah ke Atas"
                  >
                    <ArrowUp className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:bg-accent"
                    onClick={() => move(index, "down")}
                    disabled={index === list.length - 1}
                    title="Pindah ke Bawah"
                  >
                    <ArrowDown className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:bg-destructive/10"
                    onClick={() => removeStep(step.id)}
                    title="Hapus Langkah"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Judul Langkah</Label>
                  <Input
                    value={step.title}
                    onChange={(e) => updateStep(step.id, "title", e.target.value)}
                    placeholder="Contoh: Hubungi via WhatsApp"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Deskripsi Singkat</Label>
                  <Textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => updateStep(step.id, "description", e.target.value)}
                    placeholder="Contoh: Ceritakan keluhan perangkat Anda."
                  />
                  <FieldHint>Penjelasan singkat alur yang harus dilakukan pelanggan.</FieldHint>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Preview */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Pratinjau Alur Tampilan Live</p>
          <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              {list.map((step, i) => (
                <div
                  key={step.id}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3 shadow-2xs"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{step.title || "-"}</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">{step.description || "-"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
