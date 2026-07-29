import { MessageCircle, Check, Info } from "lucide-react";
import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Button } from "../ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Pricing() {
  const { data, waHref } = useSanyonara();
  const items = data.pricing.filter((p) => p.active);

  return (
    <Section id="harga" className="bg-card">
      <Container>
        <SectionHeading
          eyebrow="Daftar Harga"
          title="Harga Transparan, Tanpa Biaya Tersembunyi"
          description="Estimasi harga di bawah dapat menyesuaikan kondisi kerusakan dan lokasi. Hubungi kami untuk penawaran pasti."
        />

        {/* Mobile: horizontal scroll carousel */}
        <div className="mt-8 sm:hidden">
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-none">
            {items.map((p) => (
              <div
                key={p.id}
                className={`relative flex min-w-[240px] shrink-0 snap-center flex-col rounded-xl border p-5 ${
                  p.popular ? "border-primary bg-background shadow-md" : "border-border bg-background"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                    Paling Populer
                  </span>
                )}
                <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">Mulai dari</p>
                <p className="text-2xl font-extrabold text-primary">{p.price}</p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-brand-emerald" /> {p.description}
                </p>
                <Button
                  asChild
                  size="sm"
                  className={`mt-4 ${p.popular ? "bg-brand-orange text-white hover:bg-brand-orange-dark" : ""}`}
                  variant={p.popular ? "default" : "outline"}
                >
                  <a
                    href={waHref(`Halo Sanyonara Service, saya tertarik dengan layanan ${p.name} (${p.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-3.5" /> Pesan Sekarang
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid layout */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <SectionReveal key={p.id} delay={(i % 4) * 0.05}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                  p.popular ? "border-primary bg-background shadow-md" : "border-border bg-background"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                    Paling Populer
                  </span>
                )}
                <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">Mulai dari</p>
                <p className="text-3xl font-extrabold text-primary">{p.price}</p>
                <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-emerald" /> {p.description}
                </p>
                <Button
                  asChild
                  className={`mt-6 ${p.popular ? "bg-brand-orange text-white hover:bg-brand-orange-dark" : ""}`}
                  variant={p.popular ? "default" : "outline"}
                >
                  <a
                    href={waHref(`Halo Sanyonara Service, saya tertarik dengan layanan ${p.name} (${p.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" /> Pesan Sekarang
                  </a>
                </Button>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-6 sm:mt-8">
          <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 rounded-xl bg-accent px-3 py-2.5 text-center text-xs text-accent-foreground sm:px-4 sm:py-3 sm:text-sm">
            <Info className="size-3.5 shrink-0 sm:size-4" />
            Harga dapat berubah sesuai kondisi kerusakan dan lokasi pelanggan.
          </p>
        </SectionReveal>
      </Container>
    </Section>
  );
}
