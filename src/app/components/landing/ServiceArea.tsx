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

        <SectionReveal className="mt-10">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap justify-center gap-2.5">
              {serviceArea.areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
                >
                  <MapPin className="size-4 text-primary" /> {area}
                </span>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">{serviceArea.note}</p>
            <div className="mt-6 flex justify-center">
              <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange-dark">
                <a
                  href={waHref("Halo Sanyonara Service, apakah melayani area saya di Jakarta?")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" /> Cek Ketersediaan Teknisi
                </a>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
