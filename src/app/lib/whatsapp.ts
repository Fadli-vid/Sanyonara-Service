/**
 * Membangun tautan WhatsApp (wa.me) dengan pesan ter-prefill.
 * @param phone Nomor WhatsApp format internasional tanpa "+" (mis. "6281234567890")
 * @param message Pesan yang akan diisi otomatis pada chat
 */
export function waLink(phone: string, message?: string): string {
  const clean = phone.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${clean}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Membuka WhatsApp pada tab baru. */
export function openWhatsApp(phone: string, message?: string) {
  window.open(waLink(phone, message), "_blank", "noopener,noreferrer");
}
