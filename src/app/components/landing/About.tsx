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
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionReveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
                <ImageWithFallback
                  src={about.image}
                  alt="Teknisi Sanyonara Service dengan peralatan lengkap"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              Tentang Kami
            </span>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{about.title}</h2>
            <p className="mt-4 text-muted-foreground">{about.body}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Eye className="size-5" />
                </span>
                <h3 className="mt-3 font-bold text-foreground">Visi</h3>
                <p className="mt-1 text-sm text-muted-foreground">{about.visi}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald">
                  <Target className="size-5" />
                </span>
                <h3 className="mt-3 font-bold text-foreground">Misi</h3>
                <p className="mt-1 text-sm text-muted-foreground">{about.misi}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {about.points.map((p) => (
                <span key={p} className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-brand-emerald" /> {p}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </Container>
    </Section>
  );
}
