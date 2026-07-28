import { Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { useSanyonara } from "../../store/SanyonaraContext";

export function BrandStrip() {
  const { data } = useSanyonara();
  return (
    <Container className="py-10">
      <SectionReveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Melayani service semua merk elektronik
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {data.brands.map((b) => (
            <span key={b} className="text-lg font-bold text-muted-foreground/70 transition-colors hover:text-foreground">
              {b}
            </span>
          ))}
        </div>
      </SectionReveal>
    </Container>
  );
}
