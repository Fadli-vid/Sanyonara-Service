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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <SectionReveal key={s.id} delay={(i % 3) * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <DynamicIcon name={s.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 justify-start px-0 text-primary hover:bg-transparent hover:text-brand-blue-dark"
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
