import { MapPin, MessageCircle } from "lucide-react";
import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Button } from "../ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export function ServiceArea() {
  const { data, waHref } = useSanyonara();
  const { serviceArea } = data;

  return (
    <Section id="area">
      <Container>
        <SectionHeading eyebrow="Area Layanan" title={serviceArea.title} description={serviceArea.description} />

        <SectionReveal className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:rounded-3xl sm:p-8">
            <div className="flex flex-wrap justify-center gap-2">
              {serviceArea.areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <MapPin className="size-3 text-primary sm:size-4" /> {area}
                </span>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground sm:mt-6 sm:text-sm">{serviceArea.note}</p>
            <div className="mt-4 flex justify-center sm:mt-6">
              <Button asChild className="h-9 text-xs bg-brand-orange text-white hover:bg-brand-orange-dark sm:h-10 sm:text-sm">
                <a
                  href={waHref("Halo Sanyonara Service, apakah melayani area saya di Jakarta?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-3.5 sm:size-4" /> Cek Ketersediaan Teknisi
                </a>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
