import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Process() {
  const { data } = useSanyonara();
  return (
    <Section id="alur" className="bg-card">
      <Container>
        <SectionHeading
          eyebrow="Alur Pelayanan"
          title="Mudah, Cepat, dan Transparan"
          description="Hanya beberapa langkah sederhana untuk memperbaiki perangkat elektronik Anda."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {data.process.map((step, i) => (
            <SectionReveal key={step.id} delay={i * 0.06}>
              <div className="relative flex h-full flex-col items-center rounded-2xl border border-border bg-background p-6 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                {i < data.process.length - 1 && (
                  <span className="absolute -right-3 top-10 hidden text-2xl text-border md:block">→</span>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
