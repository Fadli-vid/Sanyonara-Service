import { Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Stats() {
  const { data } = useSanyonara();
  return (
    <Container className="relative z-10 -mt-8 pt-3 pb-4">
      <SectionReveal>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/5 sm:gap-4 sm:rounded-3xl sm:p-8 lg:grid-cols-4">
          {data.stats.map((s) => (
            <div key={s.id} className="flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-extrabold text-primary sm:text-4xl">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </Container>
  );
}
