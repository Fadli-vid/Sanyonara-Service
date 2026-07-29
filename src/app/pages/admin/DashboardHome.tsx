import { useNavigate } from "react-router";
import { Wrench, Images, MessageSquareQuote, HelpCircle, ImageIcon, BarChart3, Footprints, Tag, Plus } from "lucide-react";
import { PageHeader } from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export default function DashboardHome() {
  const { data } = useSanyonara();
  const navigate = useNavigate();

  const stats = [
    { label: "Jumlah Layanan", value: data.services.length, icon: Wrench, color: "bg-primary/10 text-primary" },
    { label: "Jumlah Foto", value: data.gallery.length, icon: Images, color: "bg-brand-emerald/10 text-brand-emerald" },
    { label: "Jumlah Testimoni", value: data.testimonials.length, icon: MessageSquareQuote, color: "bg-brand-orange/10 text-brand-orange" },
    { label: "Jumlah FAQ", value: data.faq.length, icon: HelpCircle, color: "bg-chart-4/10 text-chart-4" },
  ];

  const actions = [
    { label: "Edit Hero", icon: ImageIcon, to: "/admin/hero" },
    { label: "Edit Statistik", icon: BarChart3, to: "/admin/statistik" },
    { label: "Edit Alur", icon: Footprints, to: "/admin/alur" },
    { label: "Tambah Galeri", icon: Images, to: "/admin/galeri" },
    { label: "Tambah Harga", icon: Tag, to: "/admin/harga" },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="Ringkasan konten website Sanyonara Service." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <span className={`flex size-11 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="size-5" />
            </span>
            <p className="mt-4 text-3xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Aksi Cepat</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {actions.map((a) => (
            <button
              key={a.to}
              onClick={() => navigate(a.to)}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                <a.icon className="size-5" />
              </span>
              <span className="font-medium text-foreground">{a.label}</span>
              <Plus className="ml-auto size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
