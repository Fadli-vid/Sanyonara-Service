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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

        <SectionReveal className="mt-8">
          <p className="mx-auto flex max-w-2xl items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-center text-sm text-accent-foreground">
            <Info className="size-4 shrink-0" />
            Harga dapat berubah sesuai kondisi kerusakan dan lokasi pelanggan.
          </p>
        </SectionReveal>
      </Container>
    </Section>
  );
}
