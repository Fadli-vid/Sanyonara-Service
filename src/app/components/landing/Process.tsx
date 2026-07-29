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

        {/* Mobile: horizontal scroll dengan tinggi konsisten */}
        <div className="mt-8 sm:hidden">
          <div className="-mx-4 flex items-stretch gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-none">
            {data.process.map((step, i) => (
              <div
                key={step.id}
                className="relative flex min-w-[200px] shrink-0 snap-center flex-col items-center justify-start rounded-xl border border-border bg-background p-4 text-center"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-bold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid layout */}
        <div className="mt-12 hidden gap-6 sm:grid md:grid-cols-5">
          {data.process.map((step, i) => (
            <SectionReveal key={step.id} delay={i * 0.06} className="h-full">
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
