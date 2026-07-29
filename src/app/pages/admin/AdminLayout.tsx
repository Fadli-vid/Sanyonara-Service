import { useState } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router";
import {
  LayoutDashboard, Image as ImageIcon, BarChart3, Info, ShieldCheck, Wrench, Tag, MapPin,
  Images, Footprints, MessageSquareQuote, HelpCircle, Phone, Navigation, Settings,
  LogOut, Snowflake, Menu, ExternalLink,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";
import { toast } from "sonner";

const MENU = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero", icon: ImageIcon },
  { to: "/admin/statistik", label: "Statistik Utama", icon: BarChart3 },
  { to: "/admin/keunggulan", label: "Keunggulan Kami", icon: ShieldCheck },
  { to: "/admin/tentang", label: "Tentang Kami", icon: Info },
  { to: "/admin/layanan", label: "Layanan", icon: Wrench },
  { to: "/admin/harga", label: "Harga", icon: Tag },
  { to: "/admin/area", label: "Area Layanan", icon: MapPin },
  { to: "/admin/galeri", label: "Galeri", icon: Images },
  { to: "/admin/alur", label: "Alur Pelayanan", icon: Footprints },
  { to: "/admin/testimoni", label: "Testimoni", icon: MessageSquareQuote },
  { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { to: "/admin/kontak", label: "Kontak", icon: Phone },
  { to: "/admin/lokasi", label: "Lokasi", icon: Navigation },
  { to: "/admin/pengaturan", label: "Pengaturan Website", icon: Settings },
];

export default function AdminLayout() {
  const { isLoggedIn, logout } = useSanyonara();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    logout();
    toast.success("Berhasil keluar.");
    navigate("/admin/login", { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <img src="/library/logo.png" alt="Sanyonara Admin" className="size-8 object-contain" />
        <span className="font-bold text-foreground">Sanyonara Admin</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {MENU.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            end={m.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`
            }
          >
            <m.icon className="size-5" /> {m.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-border p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ExternalLink className="size-5" /> Lihat Website
        </a>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="size-5" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Sidebar mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-card shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/90 px-4 backdrop-blur lg:hidden">
          <Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Buka menu">
            <Menu className="size-5" />
          </Button>
          <span className="font-bold text-foreground">Sanyonara Admin</span>
          <div className="size-9" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
