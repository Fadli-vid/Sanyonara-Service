import { Snowflake, Mail, Phone, MapPin, Clock, Instagram, Facebook, ExternalLink } from "lucide-react";
import { Container } from "./Section";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Footer() {
  const { data } = useSanyonara();
  const { contact, location, settings } = data;

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Snowflake className="size-5" />
              </span>
              <span className="text-lg font-bold text-foreground">
                {settings.logoText}
                <span className="text-primary"> Service</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{settings.tagline}. Melayani DKI Jakarta, fokus Jakarta Selatan dan sekitarnya.</p>
            <div className="mt-4 flex gap-3">
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary">
                  <Instagram className="size-4" />
                </a>
              )}
              {contact.facebook && (
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary">
                  <Facebook className="size-4" />
                </a>
              )}
              {contact.googleBusiness && (
                <a href={contact.googleBusiness} target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary">
                  <ExternalLink className="size-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground">Navigasi</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#layanan" className="hover:text-primary">Layanan</a></li>
              <li><a href="#harga" className="hover:text-primary">Harga</a></li>
              <li><a href="#area" className="hover:text-primary">Area Layanan</a></li>
              <li><a href="#galeri" className="hover:text-primary">Galeri</a></li>
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground">Kontak</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {location.address}</li>
              <li className="flex items-center gap-2"><Phone className="size-4 shrink-0 text-primary" /> {contact.phone}</li>
              <li className="flex items-center gap-2"><Mail className="size-4 shrink-0 text-primary" /> {contact.email}</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 size-4 shrink-0 text-primary" /> {location.hours}</li>
            </ul>
          </div>

          <div>
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">{settings.copyright}</p>
          <a href="/admin/login" className="text-sm text-muted-foreground hover:text-primary">Masuk Admin</a>
        </div>
      </Container>
    </footer>
  );
}
