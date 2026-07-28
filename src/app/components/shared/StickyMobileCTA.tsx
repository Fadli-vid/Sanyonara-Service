import { MessageCircle, Phone } from "lucide-react";
import { useSanyonara } from "../../store/SanyonaraContext";

/** Bar CTA menempel di bawah, hanya tampil di mobile. */
export function StickyMobileCTA() {
  const { waHref, data } = useSanyonara();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-card/95 p-3 backdrop-blur md:hidden">
      <a
        href={waHref("Halo Sanyonara Service, saya ingin konsultasi perbaikan elektronik.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-medium text-white"
      >
        <MessageCircle className="size-5" /> Chat WhatsApp
      </a>
      <a
        href={`tel:${data.contact.phone}`}
        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 font-medium text-foreground"
        aria-label="Telepon"
      >
        <Phone className="size-5" />
      </a>
    </div>
  );
}
