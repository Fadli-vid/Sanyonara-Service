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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {data.advantages.map((a, i) => (
            <SectionReveal key={a.id} delay={(i % 3) * 0.05} className="h-full">
              <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-start sm:gap-4 sm:rounded-2xl sm:p-6 sm:text-left">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald sm:size-12 sm:rounded-xl">
                  <DynamicIcon name={a.icon} className="size-5 sm:size-6" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground sm:text-lg">{a.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{a.description}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
