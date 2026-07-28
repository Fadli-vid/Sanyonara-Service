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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <SectionReveal key={t.id} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Quote className="size-8 text-accent-foreground/30" />
                <div className="mt-3 flex items-center gap-1 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`size-4 ${s < t.rating ? "fill-current" : "text-border"}`} />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">"{t.comment}"</p>
                <div className="mt-5 flex items-center gap-3">
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
