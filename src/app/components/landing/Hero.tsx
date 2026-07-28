import { motion } from "motion/react";
import { MapPin, MessageCircle, Star, CheckCircle2, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Container } from "./Section";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Hero() {
  const { data, waHref } = useSanyonara();
  const { hero } = data;

  return (
    <section id="beranda" className="relative overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/60 via-background to-background" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 size-80 rounded-full bg-brand-emerald/10 blur-3xl" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm">
              <MapPin className="size-4 text-primary" /> {hero.badgeText}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              {hero.title}
            </h1>

            <p className="mt-5 text-base text-muted-foreground sm:text-lg">{hero.subtitle}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-brand-orange px-6 text-base text-white hover:bg-brand-orange-dark">
                <a href={waHref("Halo Sanyonara Service, saya ingin konsultasi perbaikan elektronik.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5" /> {hero.primaryCta}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                <a href="#harga">
                  <Tag className="size-5" /> {hero.secondaryCta}
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1 text-brand-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">4.9/5</strong> dari 1000+ pelanggan Jakarta Selatan
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {hero.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-brand-emerald" /> {b}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5">
              <ImageWithFallback
                src={hero.image}
                alt="Teknisi Sanyonara Service melakukan perbaikan AC di Jakarta Selatan"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald">
                  <CheckCircle2 className="size-6" />
                </span>
                <div>
                  <p className="font-bold text-foreground">Garansi 30 Hari</p>
                  <p className="text-sm text-muted-foreground">Untuk setiap perbaikan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
