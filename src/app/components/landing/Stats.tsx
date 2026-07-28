import { Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Stats() {
  const { data } = useSanyonara();
  return (
    <Container className="-mt-8 pb-4">
      <SectionReveal>
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8 lg:grid-cols-4">
          {data.stats.map((s) => (
            <div key={s.id} className="text-center">
              <p className="text-3xl font-extrabold text-primary sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </Container>
  );
}
