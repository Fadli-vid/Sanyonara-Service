import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Gallery() {
  const { data } = useSanyonara();
  const items = [...data.gallery].sort((a, b) => a.order - b.order);

  return (
    <Section id="galeri">
      <Container>
        <SectionHeading
          eyebrow="Galeri Pekerjaan"
          title="Dokumentasi Hasil Kerja Kami"
          description="Beberapa dokumentasi pekerjaan teknisi Sanyonara Service di rumah pelanggan."
        />

        {/* Mobile: grid 2-col, max 4 images */}
        <SectionReveal className="mt-8 sm:hidden">
          <div className="grid grid-cols-2 gap-2">
            {items.slice(0, 4).map((g) => (
              <div key={g.id} className="group relative overflow-hidden rounded-xl border border-border">
                <ImageWithFallback
                  src={g.url}
                  alt={g.caption}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-xs font-medium text-white">{g.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Desktop: masonry layout, all images */}
        <SectionReveal className="mt-12 hidden sm:block">
          <ResponsiveMasonry columnsCountBreakPoints={{ 640: 2, 1024: 3 }}>
            <Masonry gutter="16px">
              {items.map((g) => (
                <div key={g.id} className="group relative overflow-hidden rounded-2xl border border-border">
                  <ImageWithFallback
                    src={g.url}
                    alt={g.caption}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{g.caption}</p>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </SectionReveal>
      </Container>
    </Section>
  );
}
