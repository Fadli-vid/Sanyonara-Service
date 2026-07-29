import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Merender ikon lucide berdasarkan nama string. Fallback ke Wrench. */
export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ?? Icons.Wrench;
  return <Cmp {...props} />;
}

/** Daftar nama ikon lengkap yang populer & siap dipilih di admin panel. */
export const ICON_OPTIONS = [
  // Garansi & Kualitas
  "ShieldCheck", "BadgeCheck", "Award", "CheckCircle2", "Verified", "ShieldAlert",
  // Layanan & Waktu
  "Clock", "Zap", "Timer", "CalendarCheck", "Hourglass", "Flame", "Sparkles",
  // Rumah & Lokasi
  "Home", "MapPin", "Truck", "Building", "Store", "UserCheck",
  // Alat & Teknisi
  "Wrench", "Hammer", "Settings", "Cog", "Tool", "PlugZap", "Gauge",
  // Harga & Transparansi
  "ReceiptText", "Tag", "Coins", "CreditCard", "Wallet", "DollarSign", "Percent",
  // Kepuasan & Rating
  "Star", "Heart", "ThumbsUp", "Smile", "PackageCheck", "Headphones",
  // Perangkat & Elektronik
  "Snowflake", "Wind", "Refrigerator", "WashingMachine", "Tv", "CupSoda", "Fan", "Cpu", "Droplets", "ThermometerSnowflake"
];
