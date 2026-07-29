import { MessageCircle } from "lucide-react";
import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { DynamicIcon } from "../shared/DynamicIcon";
import { Button } from "../ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Services() {
  const { data, waHref } = useSanyonara();
  const services = data.services.filter((s) => s.active);

  return (
    <Section id="layanan" className="bg-card">
      <Container>
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Solusi Lengkap Service AC & Elektronik Rumahan"
          description="Dari cuci AC hingga perbaikan kulkas dan mesin cuci, semua ditangani teknisi berpengalaman dengan hasil bergaransi."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <SectionReveal key={s.id} delay={(i % 3) * 0.05}>
              <div className="group flex h-full flex-col rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:rounded-2xl sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:size-12 sm:rounded-xl">
                  <DynamicIcon name={s.icon} className="size-5 sm:size-6" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-foreground sm:mt-4 sm:text-lg">{s.name}</h3>
                <p className="mt-1 flex-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{s.description}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-3 hidden justify-start px-0 text-primary hover:bg-transparent hover:text-brand-blue-dark sm:mt-4 sm:flex"
                >
                  <a
                    href={waHref(`Halo Sanyonara Service, saya ingin menanyakan layanan ${s.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" /> Hubungi Teknisi
                  </a>
                </Button>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
