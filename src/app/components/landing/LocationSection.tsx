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

        <SectionReveal className="mt-8 sm:mt-10">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm sm:rounded-3xl">
              <iframe
                title="Lokasi Sanyonara Service"
                src={location.mapsEmbed}
                className="h-full min-h-[200px] w-full sm:min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="rounded-xl border border-border bg-card p-4 sm:rounded-2xl sm:p-6">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-11 sm:rounded-xl">
                  <MapPin className="size-4 sm:size-5" />
                </span>
                <h3 className="mt-2 text-sm font-bold text-foreground sm:mt-3 sm:text-base">Alamat</h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{location.address}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 sm:rounded-2xl sm:p-6">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald sm:size-11 sm:rounded-xl">
                  <Clock className="size-4 sm:size-5" />
                </span>
                <h3 className="mt-2 text-sm font-bold text-foreground sm:mt-3 sm:text-base">Jam Operasional</h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{location.hours}</p>
              </div>

              <div className="flex items-start gap-2 rounded-xl border border-dashed border-border bg-accent/40 p-4 sm:gap-3 sm:rounded-2xl sm:p-6">
                <Home className="mt-0.5 size-4 shrink-0 text-primary sm:size-5" />
                <p className="text-xs text-accent-foreground sm:text-sm">{location.walkInNote}</p>
              </div>

              <Button asChild size="lg" className="h-10 bg-brand-orange text-sm text-white hover:bg-brand-orange-dark sm:h-11">
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
