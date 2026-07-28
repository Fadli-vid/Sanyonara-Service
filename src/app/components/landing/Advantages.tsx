import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { DynamicIcon } from "../shared/DynamicIcon";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Advantages() {
  const { data } = useSanyonara();
  return (
    <Section id="keunggulan">
      <Container>
        <SectionHeading
          eyebrow="Mengapa Memilih Kami"
          title="Keunggulan Sanyonara Service"
          description="Kami berkomitmen memberikan pelayanan terbaik yang membuat pelanggan tenang dan puas."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.advantages.map((a, i) => (
            <SectionReveal key={a.id} delay={(i % 3) * 0.05}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald">
                  <DynamicIcon name={a.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
