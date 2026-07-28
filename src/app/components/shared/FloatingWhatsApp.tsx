import { MessageCircle } from "lucide-react";
import { useSanyonara } from "../../store/SanyonaraContext";

/** Tombol WhatsApp melayang di kanan bawah. */
export function FloatingWhatsApp() {
  const { waHref } = useSanyonara();
  return (
    <a
      href={waHref("Halo Sanyonara Service, saya ingin bertanya tentang layanan service elektronik.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle className="size-6" />
      <span className="hidden font-medium sm:inline">Chat WhatsApp</span>
      <span className="absolute -right-1 -top-1 flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-[#25D366]" />
      </span>
    </a>
  );
}
