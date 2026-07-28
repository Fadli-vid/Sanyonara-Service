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
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-brand-blue-dark shadow-lg">
            <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
              <div className="text-white">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                  Konsultasi Cepat
                </span>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Ceritakan Masalah Perangkat Anda</h2>
                <p className="mt-4 text-white/85">
                  Isi form singkat ini, lalu kami arahkan langsung ke WhatsApp dengan pesan yang sudah terisi otomatis.
                  Tanpa ribet, teknisi siap membantu.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/90">
                  <li>✓ Respon cepat kurang dari 15 menit</li>
                  <li>✓ Konsultasi awal gratis</li>
                  <li>✓ Estimasi biaya transparan</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-card p-6 shadow-sm">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="qc-name">Nama</Label>
                    <Input id="qc-name" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qc-device">Jenis Layanan / Perangkat</Label>
                    <Select value={device} onValueChange={setDevice}>
                      <SelectTrigger id="qc-device">
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
                  <div className="grid gap-2">
                    <Label htmlFor="qc-area">Area / Kecamatan</Label>
                    <Input id="qc-area" placeholder="Contoh: Tebet" value={area} onChange={(e) => setArea(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qc-detail">Keluhan (opsional)</Label>
                    <Textarea
                      id="qc-detail"
                      placeholder="Ceritakan kerusakan perangkat Anda"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button onClick={submit} className="bg-brand-orange text-white hover:bg-brand-orange-dark">
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
