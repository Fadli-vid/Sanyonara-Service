import { MessageCircle } from "lucide-react";
import { Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Button } from "../ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export function FinalCta() {
  const { waHref } = useSanyonara();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-brand-blue-dark px-6 py-14 text-center shadow-xl sm:px-12">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-brand-emerald/20 blur-2xl" />
            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">Elektronik Anda Bermasalah?</h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-white/85">
              Hubungi teknisi kami sekarang dan dapatkan pelayanan cepat, profesional, dan bergaransi di Jakarta Selatan
              dan sekitarnya.
            </p>
            <div className="relative mt-8">
              <Button asChild size="lg" className="h-13 bg-white px-8 text-base text-primary hover:bg-white/90">
                <a
                  href={waHref("Halo Sanyonara Service, saya ingin memesan layanan service sekarang.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-5" /> Hubungi via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
