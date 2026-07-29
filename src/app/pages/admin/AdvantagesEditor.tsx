import { useState } from "react";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { DynamicIcon, ICON_OPTIONS } from "../../components/shared/DynamicIcon";
import { useSanyonara, type AdvantageItem } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const uid = () => Math.random().toString(36).slice(2, 10);

export default function AdvantagesEditor() {
  const { data, update } = useSanyonara();
  const [list, setList] = useState<AdvantageItem[]>(data.advantages || []);
  const [activePickerId, setActivePickerId] = useState<string | null>(null);

  const updateAdvantage = (id: string, field: keyof AdvantageItem, value: string) => {
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addAdvantage = () => {
    setList((prev) => [
      ...prev,
      { id: uid(), title: "Keunggulan Baru", description: "Deskripsi singkat keunggulan.", icon: "ShieldCheck" },
    ]);
  };

  const removeAdvantage = (id: string) => {
    if (list.length <= 1) {
      toast.error("Minimal harus ada 1 keunggulan.");
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
    update("advantages", list);
    toast.success("Keunggulan berhasil disimpan.");
  };

  return (
    <div>
      <PageHeader
        title="Keunggulan Utama"
        description="Kelola poin-poin keunggulan Sanyonara Service yang ditampilkan pada section 'Mengapa Memilih Kami'."
        action={
          <div className="flex gap-2">
            <Button onClick={addAdvantage} variant="outline">
              <Plus className="size-4" /> Tambah Keunggulan
            </Button>
            <Button onClick={save}>
              <Save className="size-4" /> Simpan
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {list.map((item, index) => (
            <div key={item.id} className="relative rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald">
                    <DynamicIcon name={item.icon} className="size-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Keunggulan #{index + 1}
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
                    onClick={() => removeAdvantage(item.id)}
                    title="Hapus Keunggulan"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Judul Keunggulan</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateAdvantage(item.id, "title", e.target.value)}
                    placeholder="Contoh: Bergaransi"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Pilih Ikon</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => setActivePickerId(activePickerId === item.id ? null : item.id)}
                    >
                      <DynamicIcon name={item.icon} className="size-4 text-brand-emerald" />
                      <span className="text-xs font-mono">{item.icon}</span>
                      <Sparkles className="ml-1 size-3 text-muted-foreground" />
                    </Button>
                    <span className="text-xs text-muted-foreground">Klik untuk membuka daftar ikon</span>
                  </div>

                  {/* Grid Icon Picker Modal / Popover Inline */}
                  {activePickerId === item.id && (
                    <div className="mt-2 rounded-xl border border-border bg-background p-3 shadow-md">
                      <p className="mb-2 text-xs font-semibold text-muted-foreground">Pilih Ikon dari Koleksi:</p>
                      <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto p-1">
                        {ICON_OPTIONS.map((iconName) => (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => {
                              updateAdvantage(item.id, "icon", iconName);
                              setActivePickerId(null);
                            }}
                            className={`flex flex-col items-center justify-center rounded-lg p-2 transition-all ${
                              item.icon === iconName
                                ? "bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/50"
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            }`}
                            title={iconName}
                          >
                            <DynamicIcon name={iconName} className="size-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => updateAdvantage(item.id, "description", e.target.value)}
                    placeholder="Contoh: Setiap perbaikan bergaransi hingga 30 hari untuk ketenangan Anda."
                  />
                  <FieldHint>Penjelasan singkat keunggulan tersebut.</FieldHint>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Preview */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Pratinjau Tampilan Live</p>
          <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {list.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center shadow-2xs"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald">
                    <DynamicIcon name={a.icon} className="size-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{a.title || "-"}</h4>
                    <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{a.description || "-"}</p>
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
