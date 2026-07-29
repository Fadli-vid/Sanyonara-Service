import { Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { useSanyonara } from "../../store/SanyonaraContext";

export function BrandStrip() {
  const { data } = useSanyonara();
  return (
    <Container className="py-6 sm:py-10">
      <SectionReveal className="text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
          Melayani service semua merk elektronik
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-5 sm:gap-x-8 sm:gap-y-3">
          {data.brands.map((b) => (
            <span key={b} className="text-base font-bold text-muted-foreground/70 transition-colors hover:text-foreground sm:text-lg">
              {b}
            </span>
          ))}
        </div>
      </SectionReveal>
    </Container>
  );
}
