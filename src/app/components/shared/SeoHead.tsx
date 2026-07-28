import { useEffect } from "react";
import { useSanyonara } from "../../store/SanyonaraContext";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Menyetel title, meta description, Open Graph, dan JSON-LD LocalBusiness. */
export function SeoHead() {
  const { data } = useSanyonara();
  const { settings, location, contact, stats } = data;

  useEffect(() => {
    document.title = settings.metaTitle;
    upsertMeta("name", "description", settings.metaDescription);
    upsertMeta("name", "keywords", settings.keywords);
    upsertMeta("property", "og:title", settings.metaTitle);
    upsertMeta("property", "og:description", settings.metaDescription);
    upsertMeta("property", "og:image", settings.ogImage);
    upsertMeta("property", "og:type", "website");

    const rating = stats.find((s) => s.value.includes("/"))?.value.split("/")[0] ?? "4.9";
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "HVACBusiness",
      name: settings.siteName,
      description: settings.metaDescription,
      image: settings.ogImage,
      telephone: contact.phone,
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: "Jakarta Selatan",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      areaServed: "DKI Jakarta",
      openingHours: location.hours,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        reviewCount: "1000",
      },
      sameAs: [contact.instagram, contact.facebook, contact.tiktok, contact.googleBusiness].filter(Boolean),
    };

    let script = document.getElementById("sanyonara-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "sanyonara-jsonld";
      (script as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [settings, location, contact, stats]);

  return null;
}
