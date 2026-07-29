import { MessageCircle } from "lucide-react";
import { Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Button } from "../ui/button";
import { useSanyonara } from "../../store/SanyonaraContext";

export function FinalCta() {
  const { waHref } = useSanyonara();
  return (
    <section className="py-10 sm:py-20">
      <Container>
        <SectionReveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-brand-blue-dark px-5 py-10 text-center shadow-xl sm:rounded-3xl sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-brand-emerald/20 blur-2xl" />
            <h2 className="relative text-2xl font-bold text-white sm:text-4xl">Elektronik Anda Bermasalah?</h2>
            <p className="relative mx-auto mt-3 max-w-2xl text-sm text-white/85 sm:mt-4 sm:text-base">
              Hubungi teknisi kami sekarang dan dapatkan pelayanan cepat, profesional, dan bergaransi di Jakarta Selatan
              dan sekitarnya.
            </p>
            <div className="relative mt-6 sm:mt-8">
              <Button asChild size="lg" className="h-11 bg-white px-6 text-sm text-primary hover:bg-white/90 sm:h-13 sm:px-8 sm:text-base">
                <a
                  href={waHref("Halo Sanyonara Service, saya ingin memesan layanan service sekarang.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4 sm:size-5" /> Hubungi via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
