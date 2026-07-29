import { Snowflake, Mail, Phone, MapPin, Clock, Instagram, Facebook, ExternalLink } from "lucide-react";
import { Container } from "./Section";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Footer() {
  const { data } = useSanyonara();
  const { contact, location, settings } = data;

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-8 sm:py-14">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src="/library/logo.png" alt="Sanyonara Service" className="size-8 object-contain sm:size-9" />
              <span className="text-base font-bold text-foreground sm:text-lg">
                {settings.logoText}
                <span className="text-primary"> Service</span>
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground sm:mt-4 sm:text-sm">{settings.tagline}. Melayani DKI Jakarta, fokus Jakarta Selatan dan sekitarnya.</p>
            <div className="mt-3 flex gap-2 sm:mt-4 sm:gap-3">
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary sm:size-9">
                  <Instagram className="size-4" />
                </a>
              )}
              {contact.facebook && (
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary sm:size-9">
                  <Facebook className="size-4" />
                </a>
              )}
              {contact.googleBusiness && (
                <a href={contact.googleBusiness} target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary sm:size-9">
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground sm:text-base">Navigasi</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground sm:mt-4 sm:space-y-2 sm:text-sm">
              <li><a href="#layanan" className="hover:text-primary">Layanan</a></li>
              <li><a href="#harga" className="hover:text-primary">Harga</a></li>
              <li><a href="#area" className="hover:text-primary">Area Layanan</a></li>
              <li><a href="#galeri" className="hover:text-primary">Galeri</a></li>
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground sm:text-base">Kontak</h3>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground sm:mt-4 sm:space-y-3 sm:text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-3.5 shrink-0 text-primary sm:size-4" /> {location.address}</li>
              <li className="flex items-center gap-2"><Phone className="size-3.5 shrink-0 text-primary sm:size-4" /> {contact.phone}</li>
              <li className="flex items-center gap-2"><Mail className="size-3.5 shrink-0 text-primary sm:size-4" /> {contact.email}</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 size-3.5 shrink-0 text-primary sm:size-4" /> {location.hours}</li>
            </ul>
          </div>

          {/* Map hidden on mobile, shown on desktop */}
          <div className="hidden sm:block">
            <h3 className="font-bold text-foreground">Lokasi</h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <iframe
                title="Peta Sanyonara Service"
                src={location.mapsEmbed}
                className="h-36 w-full"
                loading="lazy"
              />
            </div>
            <a href={location.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              <ExternalLink className="size-4" /> Buka di Google Maps
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-5 sm:mt-12 sm:flex-row sm:gap-4 sm:pt-6">
          <p className="text-xs text-muted-foreground sm:text-sm">{settings.copyright}</p>
          <a href="/admin/login" className="text-xs text-muted-foreground hover:text-primary sm:text-sm">Masuk Admin</a>
        </div>
      </Container>
    </footer>
  );
}
