import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Merender ikon lucide berdasarkan nama string. Fallback ke Wrench. */
export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ?? Icons.Wrench;
  return <Cmp {...props} />;
}

/** Daftar nama ikon yang umum dipakai untuk dropdown admin. */
export const ICON_OPTIONS = [
  "Wind", "Gauge", "Wrench", "PlugZap", "Snowflake", "Refrigerator",
  "WashingMachine", "Tv", "CupSoda", "Fan", "ShieldCheck", "BadgeCheck",
  "Clock", "PackageCheck", "ReceiptText", "Home", "Zap", "Settings",
  "ThermometerSnowflake", "Droplets",
];
