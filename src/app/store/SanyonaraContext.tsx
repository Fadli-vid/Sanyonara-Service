import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IMAGES, AVATARS } from "../lib/images";
import { waLink } from "../lib/whatsapp";
import { subscribeToCmsData, saveCmsDataToCloud } from "../lib/firebase";

/* ======================= Tipe Data ======================= */

export interface HeroData {
  badgeText: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  badges: string[];
  image: string;
  floatingBadgeTitle?: string;
  floatingBadgeSubtitle?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string; // nama ikon lucide
  active: boolean;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  title: string;
  body: string;
  visi: string;
  misi: string;
  image: string;
  points: string[];
}

export interface ServiceAreaData {
  title: string;
  description: string;
  areas: string[];
  note: string;
}

export interface PriceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  popular: boolean;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  avatar: string;
  rating: number;
  comment: string;
  active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface ContactData {
  whatsapp: string;
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  googleBusiness: string;
}

export interface LocationData {
  address: string;
  hours: string;
  mapsEmbed: string;
  mapsLink: string;
  walkInNote: string;
}

export interface PromoData {
  active: boolean;
  text: string;
}

export interface SettingsData {
  siteName: string;
  tagline: string;
  logoText: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  copyright: string;
  promo: PromoData;
}

export interface SanyonaraData {
  hero: HeroData;
  stats: StatItem[];
  brands: string[];
  services: ServiceItem[];
  advantages: AdvantageItem[];
  about: AboutData;
  serviceArea: ServiceAreaData;
  pricing: PriceItem[];
  gallery: GalleryItem[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  contact: ContactData;
  location: LocationData;
  settings: SettingsData;
}

/* ======================= Seed Data ======================= */

const uid = () => Math.random().toString(36).slice(2, 10);

const seed: SanyonaraData = {
  hero: {
    badgeText: "Melayani Jakarta Selatan & Sekitarnya",
    title: "Jasa Service AC & Elektronik Rumahan Profesional di Jakarta Selatan",
    subtitle:
      "Sanyonara Service siap membantu perbaikan AC, kulkas, mesin cuci, televisi, dispenser, dan peralatan elektronik rumah tangga lainnya. Teknisi berpengalaman, harga transparan, dan bergaransi.",
    primaryCta: "Chat WhatsApp",
    secondaryCta: "Lihat Daftar Harga",
    badges: [
      "Bergaransi",
      "Teknisi Berpengalaman",
      "Home Service",
      "Respon Cepat < 15 Menit",
    ],
    image: IMAGES.heroTechnician,
    floatingBadgeTitle: "Garansi 30 Hari",
    floatingBadgeSubtitle: "Untuk setiap perbaikan",
  },
  stats: [
    { id: uid(), value: "1000+", label: "Pelanggan Puas" },
    { id: uid(), value: "10+", label: "Tahun Pengalaman" },
    { id: uid(), value: "30 Hari", label: "Garansi Service" },
    { id: uid(), value: "4.9/5", label: "Rating Pelanggan" },
  ],
  brands: ["Daikin", "Panasonic", "LG", "Sharp", "Samsung", "Gree", "Midea", "Polytron"],
  services: [
    { id: uid(), name: "Cuci AC", description: "Pembersihan menyeluruh unit indoor & outdoor agar AC kembali dingin dan hemat listrik.", icon: "Wind", active: true },
    { id: uid(), name: "Isi Freon", description: "Pengisian freon sesuai jenis AC agar pendinginan kembali maksimal.", icon: "Gauge", active: true },
    { id: uid(), name: "Bongkar Pasang AC", description: "Layanan bongkar dan pasang AC saat pindah rumah dengan rapi dan aman.", icon: "Wrench", active: true },
    { id: uid(), name: "Instalasi AC Baru", description: "Pemasangan AC baru lengkap dengan pipa dan kelistrikan sesuai standar.", icon: "PlugZap", active: true },
    { id: uid(), name: "Service AC Mati", description: "Diagnosa dan perbaikan AC mati total, tidak dingin, atau bocor.", icon: "Snowflake", active: true },
    { id: uid(), name: "Service Kulkas", description: "Perbaikan kulkas tidak dingin, bunga es berlebih, dan kebocoran.", icon: "Refrigerator", active: true },
    { id: uid(), name: "Service Mesin Cuci", description: "Perbaikan mesin cuci tidak berputar, bocor, atau error di semua tipe.", icon: "WashingMachine", active: true },
    { id: uid(), name: "Service Televisi", description: "Perbaikan TV LED/LCD mati, gambar rusak, dan tidak ada suara.", icon: "Tv", active: true },
    { id: uid(), name: "Service Dispenser", description: "Perbaikan dispenser tidak panas, tidak dingin, atau bocor.", icon: "CupSoda", active: true },
    { id: uid(), name: "Service Kipas Angin", description: "Perbaikan dan perawatan kipas angin agar kembali normal.", icon: "Fan", active: true },
  ],
  advantages: [
    { id: uid(), title: "Bergaransi", description: "Setiap perbaikan bergaransi hingga 30 hari untuk ketenangan Anda.", icon: "ShieldCheck" },
    { id: uid(), title: "Teknisi Bersertifikat", description: "Ditangani teknisi berpengalaman dan bersertifikat.", icon: "BadgeCheck" },
    { id: uid(), title: "Datang Tepat Waktu", description: "Kami menghargai waktu Anda, teknisi datang sesuai janji.", icon: "Clock" },
    { id: uid(), title: "Sparepart Berkualitas", description: "Menggunakan sparepart original dan berkualitas.", icon: "PackageCheck" },
    { id: uid(), title: "Harga Transparan", description: "Estimasi biaya jelas di awal, tanpa biaya tersembunyi.", icon: "ReceiptText" },
    { id: uid(), title: "Home Service", description: "Teknisi datang langsung ke rumah Anda se-Jakarta.", icon: "Home" },
  ],
  about: {
    title: "Tentang Sanyonara Service",
    body: "Sanyonara Service adalah penyedia jasa service AC dan elektronik rumahan terpercaya di Jakarta Selatan. Dengan pengalaman lebih dari 10 tahun, kami telah membantu ribuan pelanggan menjaga peralatan elektronik rumah tetap awet dan berfungsi optimal. Kami mengutamakan pelayanan cepat, jujur, dan bergaransi.",
    visi: "Menjadi penyedia jasa service elektronik rumahan paling terpercaya di Jakarta.",
    misi: "Memberikan pelayanan cepat, transparan, dan berkualitas dengan harga yang wajar untuk setiap pelanggan.",
    image: IMAGES.technicianTools,
    points: ["Teknisi Profesional", "Sparepart Berkualitas", "Harga Transparan", "Pelayanan Cepat"],
  },
  serviceArea: {
    title: "Area Layanan Kami",
    description:
      "Sanyonara Service melayani seluruh wilayah DKI Jakarta dengan fokus utama Jakarta Selatan dan sekitarnya. Teknisi kami siap datang ke rumah Anda.",
    areas: [
      "Kebayoran Baru", "Kebayoran Lama", "Cilandak", "Pasar Minggu",
      "Tebet", "Pancoran", "Setiabudi", "Mampang Prapatan",
      "Jagakarsa", "Pesanggrahan", "Kebon Jeruk", "Jakarta Pusat",
    ],
    note: "Menerima panggilan ke seluruh wilayah DKI Jakarta. Hubungi kami untuk memastikan ketersediaan teknisi di area Anda.",
  },
  pricing: [
    { id: uid(), name: "Cuci AC", price: "Rp75.000", description: "Per unit, termasuk pembersihan indoor & outdoor.", popular: true, active: true },
    { id: uid(), name: "Isi Freon", price: "Rp250.000", description: "Sesuai jenis AC dan kapasitas freon.", popular: false, active: true },
    { id: uid(), name: "Instalasi AC", price: "Rp400.000", description: "Pemasangan AC baru lengkap.", popular: false, active: true },
    { id: uid(), name: "Service Mesin Cuci", price: "Rp150.000", description: "Diagnosa & perbaikan sesuai kerusakan.", popular: false, active: true },
  ],
  gallery: [
    { id: uid(), url: IMAGES.acUnit, caption: "Perawatan unit AC", order: 1 },
    { id: uid(), url: IMAGES.acInstall, caption: "Instalasi AC baru", order: 2 },
    { id: uid(), url: IMAGES.refrigerator, caption: "Service kulkas", order: 3 },
    { id: uid(), url: IMAGES.washingMachine, caption: "Service mesin cuci", order: 4 },
    { id: uid(), url: IMAGES.acWall, caption: "Pemasangan unit outdoor", order: 5 },
    { id: uid(), url: IMAGES.workshop, caption: "Workshop teknisi", order: 6 },
    { id: uid(), url: IMAGES.refrigerator2, caption: "Pengecekan kulkas", order: 7 },
    { id: uid(), url: IMAGES.washingMachine2, caption: "Perbaikan mesin cuci", order: 8 },
  ],
  process: [
    { id: uid(), title: "Hubungi via WhatsApp", description: "Ceritakan keluhan perangkat Anda melalui WhatsApp." },
    { id: uid(), title: "Konsultasi Kerusakan", description: "Tim kami bantu diagnosa awal & estimasi biaya." },
    { id: uid(), title: "Teknisi Datang", description: "Teknisi datang ke rumah sesuai jadwal yang disepakati." },
    { id: uid(), title: "Perbaikan Selesai", description: "Perangkat diperbaiki dan diuji hingga berfungsi normal." },
    { id: uid(), title: "Garansi Service", description: "Nikmati garansi hingga 30 hari setelah perbaikan." },
  ],
  testimonials: [
    { id: uid(), name: "Andi Pratama", area: "Tebet", avatar: AVATARS.a, rating: 5, comment: "AC di rumah langsung dingin lagi. Teknisi ramah dan datang tepat waktu. Recommended!", active: true },
    { id: uid(), name: "Siti Rahayu", area: "Cilandak", avatar: AVATARS.b, rating: 5, comment: "Cuci AC cepat dan bersih. Harganya juga transparan sesuai yang disebutkan di awal.", active: true },
    { id: uid(), name: "Budi Santoso", area: "Kebayoran Baru", avatar: AVATARS.c, rating: 5, comment: "Kulkas saya sempat tidak dingin, sekarang normal lagi. Terima kasih Sanyonara Service.", active: true },
    { id: uid(), name: "Dewi Lestari", area: "Pancoran", avatar: AVATARS.d, rating: 4, comment: "Mesin cuci sudah bisa dipakai lagi. Pelayanan cepat dan profesional.", active: true },
    { id: uid(), name: "Rizky Hidayat", area: "Pasar Minggu", avatar: AVATARS.e, rating: 5, comment: "Instalasi AC baru rapi banget. Teknisinya jelas dan sabar menjelaskan.", active: true },
    { id: uid(), name: "Maya Anggraini", area: "Setiabudi", avatar: AVATARS.f, rating: 5, comment: "Respon WhatsApp cepat, langsung dijadwalkan hari itu juga. Puas dengan hasilnya.", active: true },
  ],
  faq: [
    { id: uid(), question: "Apakah teknisi bisa datang ke rumah?", answer: "Ya, kami melayani home service ke seluruh Jakarta. Teknisi akan datang langsung ke lokasi Anda sesuai jadwal yang disepakati." },
    { id: uid(), question: "Apakah perbaikan bergaransi?", answer: "Tentu. Setiap perbaikan kami berikan garansi hingga 30 hari, tergantung jenis layanan. Detail garansi akan dijelaskan sebelum pengerjaan." },
    { id: uid(), question: "Berapa biaya pengecekan?", answer: "Biaya pengecekan sangat terjangkau dan akan diinformasikan di awal. Jika Anda melanjutkan perbaikan, biaya pengecekan dapat dibicarakan lebih lanjut." },
    { id: uid(), question: "Apakah melayani luar kota?", answer: "Saat ini kami fokus melayani wilayah DKI Jakarta, terutama Jakarta Selatan dan sekitarnya. Hubungi kami untuk memastikan area layanan." },
    { id: uid(), question: "Berapa lama proses service?", answer: "Sebagian besar perbaikan selesai di hari yang sama. Untuk kerusakan yang membutuhkan sparepart khusus, kami akan informasikan estimasi waktunya." },
  ],
  contact: {
    whatsapp: "6281808686042",
    email: "halo@sanyonaraservice.web.id",
    phone: "081808686042",
    instagram: "https://instagram.com/sanyonaraservice",
    facebook: "https://facebook.com/sanyonaraservice",
    tiktok: "https://tiktok.com/@sanyonaraservice",
    googleBusiness: "https://g.page/sanyonara-service",
  },
  location: {
    address: "Jl. Tebet Barat Raya Gg. Keamanan II No.5, RT.014 rw01/RW.1, Tebet Bar., Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12810",
    hours: "Setiap hari, 08.00 - 21.00 WIB",
    mapsEmbed:
      "https://www.google.com/maps?q=Tebet%20Barat%20Raya%20Jakarta%20Selatan&output=embed",
    mapsLink: "https://maps.google.com/?q=Tebet+Barat+Raya+Jakarta+Selatan",
    walkInNote:
      "Anda juga dapat datang langsung ke workshop kami untuk konsultasi atau membawa perangkat yang perlu diperbaiki.",
  },
  settings: {
    siteName: "Sanyonara Service",
    tagline: "Jasa Service AC & Elektronik Rumahan Profesional",
    logoText: "Sanyonara",
    metaTitle: "Sanyonara Service — Jasa Service AC Jakarta Selatan & Elektronik Rumahan",
    metaDescription:
      "Jasa service AC Jakarta Selatan terpercaya. Melayani cuci AC, isi freon, instalasi AC, service kulkas, mesin cuci, televisi, & dispenser. Teknisi berpengalaman, bergaransi, home service se-Jakarta.",
    keywords:
      "service AC Jakarta Selatan, service AC Jakarta, cuci AC Jakarta, isi freon, service kulkas, service mesin cuci, teknisi AC panggilan",
    ogImage: IMAGES.heroTechnician,
    copyright: "© 2026 Sanyonara Service. Seluruh hak cipta dilindungi.",
    promo: {
      active: true,
      text: "🎉 Promo bulan ini: Cuci AC mulai Rp75.000 — Hubungi teknisi kami sekarang!",
    },
  },
};

/* ======================= Context ======================= */

const STORAGE_KEY = "sanyonara_data_v1";
const AUTH_KEY = "sanyonara_auth_v1";

interface ContextValue {
  data: SanyonaraData;
  hydrated: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  update: <K extends keyof SanyonaraData>(key: K, value: SanyonaraData[K]) => void;
  resetData: () => void;
  waHref: (message?: string) => string;
}

const SanyonaraContext = createContext<ContextValue | null>(null);

export function SanyonaraProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SanyonaraData>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Inisialisasi awal dari localStorage + Berlangganan Real-time Cloud Firebase
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...seed, ...parsed });
      }
      setIsLoggedIn(localStorage.getItem(AUTH_KEY) === "true");
    } catch {
      /* abaikan, pakai seed */
    }
    setHydrated(true);

    // Berlangganan perubahan data dari Cloud Firestore
    const unsubscribe = subscribeToCmsData((cloudData) => {
      if (cloudData) {
        setData((prev) => ({ ...seed, ...prev, ...cloudData }));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        } catch {
          /* abaikan */
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* storage penuh, abaikan */
      }
    }
  }, [data, hydrated]);

  const value = useMemo<ContextValue>(
    () => ({
      data,
      hydrated,
      isLoggedIn,
      login: (email, password) => {
        const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || "").trim().toLowerCase();
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "";
        const ok = Boolean(adminEmail && adminPassword && email.trim().toLowerCase() === adminEmail && password === adminPassword);
        if (ok) {
          setIsLoggedIn(true);
          localStorage.setItem(AUTH_KEY, "true");
        }
        return ok;
      },
      logout: () => {
        setIsLoggedIn(false);
        localStorage.removeItem(AUTH_KEY);
      },
      update: (key, val) =>
        setData((prev) => {
          const next = { ...prev, [key]: val };
          saveCmsDataToCloud(next).catch(() => { });
          return next;
        }),
      resetData: () => {
        setData(seed);
        saveCmsDataToCloud(seed).catch(() => { });
      },
      waHref: (message) => waLink(data.contact.whatsapp, message),
    }),
    [data, hydrated, isLoggedIn]
  );

  return <SanyonaraContext.Provider value={value}>{children}</SanyonaraContext.Provider>;
}

export function useSanyonara() {
  const ctx = useContext(SanyonaraContext);
  if (!ctx) throw new Error("useSanyonara harus dipakai di dalam SanyonaraProvider");
  return ctx;
}

export { uid };
