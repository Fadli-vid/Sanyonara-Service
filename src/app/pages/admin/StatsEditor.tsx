import { useState } from "react";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { PageHeader, FieldHint } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSanyonara, type StatItem } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const uid = () => Math.random().toString(36).slice(2, 10);

export default function StatsEditor() {
  const { data, update } = useSanyonara();
  const [list, setList] = useState<StatItem[]>(data.stats || []);

  const updateItem = (id: string, field: keyof StatItem, value: string) => {
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => {
    setList((prev) => [...prev, { id: uid(), value: "100+", label: "Item Baru" }]);
  };

  const removeItem = (id: string) => {
    if (list.length <= 1) {
      toast.error("Minimal harus ada 1 item statistik.");
      return;
    }
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const save = () => {
    update("stats", list);
    toast.success("Statistik berhasil disimpan.");
  };

  return (
    <div>
      <PageHeader
        title="Statistik Utama"
        description="Kelola angka pencapaian dan nilai statistik yang tampil di bawah Hero."
        action={
          <div className="flex gap-2">
            <Button onClick={addItem} variant="outline">
              <Plus className="size-4" /> Tambah Stat
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
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Statistik #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:bg-destructive/10"
                  onClick={() => removeItem(item.id)}
                  title="Hapus Statistik"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Nilai / Angka</Label>
                  <Input
                    value={item.value}
                    onChange={(e) => updateItem(item.id, "value", e.target.value)}
                    placeholder="Contoh: 1000+"
                  />
                  <FieldHint>Angka atau teks singkat pencapaian.</FieldHint>
                </div>
                <div className="grid gap-2">
                  <Label>Label / Keterangan</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => updateItem(item.id, "label", e.target.value)}
                    placeholder="Contoh: Pelanggan Puas"
                  />
                  <FieldHint>Keterangan singkat di bawah angka.</FieldHint>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Preview */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Pratinjau Tampilan Live</p>
          <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
            <div className={`grid gap-3 sm:gap-4 ${list.length <= 2 ? 'grid-cols-2' : list.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
              {list.map((s) => (
                <div key={s.id} className="flex flex-col items-center justify-center text-center">
                  <p className="text-2xl font-extrabold text-primary sm:text-3xl">{s.value || "-"}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.label || "-"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
