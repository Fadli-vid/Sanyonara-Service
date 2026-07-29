import { Star, Quote } from "lucide-react";
import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Testimonials() {
  const { data } = useSanyonara();
  const items = data.testimonials.filter((t) => t.active);

  return (
    <Section id="testimoni">
      <Container>
        <SectionHeading
          eyebrow="Testimoni Pelanggan"
          title="Apa Kata Pelanggan Kami"
          description="Kepuasan pelanggan di Jakarta Selatan dan sekitarnya adalah prioritas utama kami."
        />

        {/* Mobile: horizontal scroll carousel dengan tinggi konsisten */}
        <div className="mt-8 sm:hidden">
          <div className="-mx-4 flex items-stretch gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-none">
            {items.map((t) => (
              <div
                key={t.id}
                className="flex min-w-[260px] max-w-[280px] shrink-0 snap-center flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div>
                  <Quote className="size-6 text-accent-foreground/30" />
                  <div className="mt-2 flex items-center gap-0.5 text-brand-orange">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`size-3.5 ${s < t.rating ? "fill-current" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">"{t.comment}"</p>
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-3">
                  <Avatar className="size-8">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback className="text-xs">{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid layout */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <SectionReveal key={t.id} delay={(i % 3) * 0.05} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div>
                  <Quote className="size-8 text-accent-foreground/30" />
                  <div className="mt-3 flex items-center gap-1 text-brand-orange">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`size-4 ${s < t.rating ? "fill-current" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">"{t.comment}"</p>
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.area}</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
