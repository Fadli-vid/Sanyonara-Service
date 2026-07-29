import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Section, Container } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSanyonara } from "../../store/SanyonaraContext";
import { openWhatsApp } from "../../lib/whatsapp";

export function QuickConsult() {
  const { data } = useSanyonara();
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");
  const [area, setArea] = useState("");
  const [detail, setDetail] = useState("");

  const deviceOptions = data.services.filter((s) => s.active).map((s) => s.name);

  const submit = () => {
    const message =
      `Halo Sanyonara Service, saya ingin konsultasi.%0A` +
      `Nama: ${name || "-"}%0A` +
      `Layanan/Perangkat: ${device || "-"}%0A` +
      `Area: ${area || "-"}%0A` +
      `Keluhan: ${detail || "-"}`;
    openWhatsApp(data.contact.whatsapp, decodeURIComponent(message));
  };

  return (
    <Section id="konsultasi">
      <Container>
        <SectionReveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-brand-blue-dark shadow-lg sm:rounded-3xl">
            <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:p-12">
              <div className="text-white">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium sm:text-sm">
                  Konsultasi Cepat
                </span>
                <h2 className="mt-3 text-2xl font-bold sm:mt-4 sm:text-4xl">Ceritakan Masalah Perangkat Anda</h2>
                <p className="mt-3 text-sm text-white/85 sm:mt-4 sm:text-base">
                  Isi form singkat ini, lalu kami arahkan langsung ke WhatsApp dengan pesan yang sudah terisi otomatis.
                  Tanpa ribet, teknisi siap membantu.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-white/90 sm:mt-6 sm:space-y-2 sm:text-sm">
                  <li>✓ Respon cepat kurang dari 15 menit</li>
                  <li>✓ Konsultasi awal gratis</li>
                  <li>✓ Estimasi biaya transparan</li>
                </ul>
              </div>

              <div className="rounded-xl bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
                <div className="grid gap-3 sm:gap-4">
                  <div className="grid gap-1.5 sm:gap-2">
                    <Label htmlFor="qc-name" className="text-xs sm:text-sm">Nama</Label>
                    <Input id="qc-name" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} className="h-9 text-sm sm:h-10" />
                  </div>
                  <div className="grid gap-1.5 sm:gap-2">
                    <Label htmlFor="qc-device" className="text-xs sm:text-sm">Jenis Layanan / Perangkat</Label>
                    <Select value={device} onValueChange={setDevice}>
                      <SelectTrigger id="qc-device" className="h-9 text-sm sm:h-10">
                        <SelectValue placeholder="Pilih layanan" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceOptions.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5 sm:gap-2">
                    <Label htmlFor="qc-area" className="text-xs sm:text-sm">Area / Kecamatan</Label>
                    <Input id="qc-area" placeholder="Contoh: Tebet" value={area} onChange={(e) => setArea(e.target.value)} className="h-9 text-sm sm:h-10" />
                  </div>
                  <div className="grid gap-1.5 sm:gap-2">
                    <Label htmlFor="qc-detail" className="text-xs sm:text-sm">Keluhan (opsional)</Label>
                    <Textarea
                      id="qc-detail"
                      placeholder="Ceritakan kerusakan perangkat Anda"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  <Button onClick={submit} className="h-10 bg-brand-orange text-sm text-white hover:bg-brand-orange-dark sm:h-11">
                    <Send className="size-4" /> Kirim via WhatsApp
                  </Button>
                  <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <MessageCircle className="size-3.5" /> Anda akan diarahkan ke WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
