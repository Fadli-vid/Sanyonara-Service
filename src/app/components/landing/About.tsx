import { CheckCircle2, Target, Eye } from "lucide-react";
import { Section, Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useSanyonara } from "../../store/SanyonaraContext";

export function About() {
  const { data } = useSanyonara();
  const { about } = data;

  return (
    <Section id="tentang" className="bg-card">
      <Container>
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <SectionReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg sm:rounded-3xl">
                <ImageWithFallback
                  src={about.image}
                  alt="Teknisi Sanyonara Service dengan peralatan lengkap"
                  className="aspect-[3/2] w-full object-cover sm:aspect-[4/3]"
                />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground sm:text-sm">
              Tentang Kami
            </span>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:mt-4 sm:text-4xl">{about.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{about.body}</p>

            <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-xl border border-border bg-background p-4 sm:rounded-2xl sm:p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-10 sm:rounded-xl">
                  <Eye className="size-4 sm:size-5" />
                </span>
                <h3 className="mt-2 text-sm font-bold text-foreground sm:mt-3 sm:text-base">Visi</h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{about.visi}</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4 sm:rounded-2xl sm:p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald sm:size-10 sm:rounded-xl">
                  <Target className="size-4 sm:size-5" />
                </span>
                <h3 className="mt-2 text-sm font-bold text-foreground sm:mt-3 sm:text-base">Misi</h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{about.misi}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
              {about.points.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 text-xs font-medium text-foreground sm:gap-2 sm:text-sm">
                  <CheckCircle2 className="size-3.5 shrink-0 text-brand-emerald sm:size-4" /> {p}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </Container>
    </Section>
  );
}
