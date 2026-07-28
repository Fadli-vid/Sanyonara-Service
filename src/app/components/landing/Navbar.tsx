import { useEffect, useState } from "react";
import { Menu, MessageCircle, Snowflake } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useSanyonara } from "../../store/SanyonaraContext";
import { PromoBanner } from "./PromoBanner";

const NAV_ITEMS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Tentang", href: "#tentang" },
  { label: "Harga", href: "#harga" },
  { label: "Area", href: "#area" },
  { label: "Galeri", href: "#galeri" },
  { label: "FAQ", href: "#faq" },
  { label: "Lokasi", href: "#lokasi" },
];

export function Navbar() {
  const { data, waHref } = useSanyonara();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <PromoBanner />
      <div
        className={`w-full transition-all ${
          scrolled ? "border-b border-border bg-card/90 backdrop-blur" : "bg-card/60 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#beranda" className="flex items-center gap-2">
            <img src="/library/logo.png" alt="Sanyonara Service" className="size-9 object-contain" />
            <span className="text-lg font-bold text-foreground">
              {data.settings.logoText}
              <span className="text-primary"> Service</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden bg-brand-orange text-white hover:bg-brand-orange-dark sm:inline-flex">
              <a href={waHref("Halo Sanyonara Service, saya ingin menghubungi teknisi.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> HUBUNGI TEKNISI
              </a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72" aria-describedby={undefined}>
                <SheetTitle className="mb-4 flex items-center gap-2">
                  <img src="/library/logo.png" alt="Sanyonara Service" className="size-6 object-contain" /> {data.settings.logoText} Service
                </SheetTitle>
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button asChild className="mt-4 bg-brand-orange text-white hover:bg-brand-orange-dark">
                    <a href={waHref("Halo Sanyonara Service, saya ingin menghubungi teknisi.")} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" /> HUBUNGI TEKNISI
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
