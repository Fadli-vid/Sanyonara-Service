import { MapPin, Clock, ExternalLink, Home } from "lucide-react";
import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Button } from "../ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export function LocationSection() {
  const { data } = useSanyonara();
  const { location } = data;

  return (
    <Section id="lokasi">
      <Container>
        <SectionHeading
          eyebrow="Lokasi Kami"
          title="Kunjungi atau Hubungi Kami"
          description="Kami melayani home service ke seluruh Jakarta. Anda juga dapat datang langsung ke workshop kami."
        />

        <SectionReveal className="mt-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <iframe
                title="Lokasi Sanyonara Service"
                src={location.mapsEmbed}
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <h3 className="mt-3 font-bold text-foreground">Alamat</h3>
                <p className="mt-1 text-sm text-muted-foreground">{location.address}</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald">
                  <Clock className="size-5" />
                </span>
                <h3 className="mt-3 font-bold text-foreground">Jam Operasional</h3>
                <p className="mt-1 text-sm text-muted-foreground">{location.hours}</p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-accent/40 p-6">
                <Home className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-accent-foreground">{location.walkInNote}</p>
              </div>

              <Button asChild size="lg" className="bg-brand-orange text-white hover:bg-brand-orange-dark">
                <a href={location.mapsLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> Buka di Google Maps
                </a>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
