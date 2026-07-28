import { useState } from "react";
import { X } from "lucide-react";
import { useSanyonara } from "../../store/SanyonaraContext";

export function PromoBanner() {
  const { data } = useSanyonara();
  const [dismissed, setDismissed] = useState(false);
  if (!data.settings.promo.active || dismissed) return null;

  return (
    <div className="relative bg-brand-orange text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-center text-sm font-medium">
        <span>{data.settings.promo.text}</span>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Tutup promo"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/20"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
