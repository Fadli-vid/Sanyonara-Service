# Rencana: Prototype UI/UX Website "Sanyonara Service"

## Context
User meminta prototype landing page + admin dashboard profesional untuk perusahaan jasa service AC & elektronik rumahan (**Sanyonara Service**). Tujuannya: media promosi high-conversion yang mengarahkan calon pelanggan menghubungi teknisi via WhatsApp. Tidak ada booking/pembayaran online. Semua konten Bahasa Indonesia natural & profesional. Data admin dikelola dengan **mock/local state (frontend saja)** — CRUD berfungsi & persist via localStorage, tanpa backend.

**Cakupan bisnis:** hanya melayani **DKI Jakarta**, fokus utama **Jakarta Selatan dan sekitarnya**. Positioning & copywriting dibuat lokal ("Service AC Jakarta Selatan") untuk membangun relevansi & kepercayaan.

Proyek sudah berbasis **React 18 + Tailwind v4 + shadcn/ui** (seluruh primitive UI tersedia di `src/app/components/ui/`), `react-router` 7, `lucide-react`, `react-responsive-masonry`, `motion`, `sonner`. Tidak ada design system `@make-kits`, jadi kita bangun style system di atas shadcn/ui + token tema.

## Ringkasan Review (Senior Product Designer + Frontend Architect)
Keputusan desain yang memengaruhi plan di bawah:
1. **Konversi:** tambah **Form "Konsultasi Cepat"** (nama + jenis kerusakan + area) yang berujung membuka WhatsApp dengan pesan ter-prefill; setiap CTA WA memakai **pesan kontekstual** per layanan/harga (bukan generik). Menurunkan friksi tanpa backend.
2. **Trust untuk bisnis service:** tambah trust signal "Respon Cepat < 15 menit", **brand strip** merk AC yang dilayani (Daikin, Panasonic, LG, Sharp, Samsung, Sharp), serta section **Area Layanan** & **Lokasi Kami**.
3. **Urutan funnel diperbaiki** (lihat bagian Struktur Landing): Tentang Kami dipindah setelah Keunggulan karena pengunjung service lebih dulu butuh "bisa apa & terpercaya", bukan sejarah.
4. **Admin ramah non-IT:** label Bahasa Indonesia jelas + helper text, preview langsung, konfirmasi hapus, toast sukses, empty state; editor Maps cukup 1 field link/embed + preview (tanpa koordinat mentah).
5. **Local SEO:** meta title/description + heading berkeyword lokal, dikelola dari admin Pengaturan.

## Design Foundation

### Token warna (edit `src/styles/theme.css`)
Tambahkan/override CSS variable di `:root` agar cocok dengan palette:
- `--primary: #2563EB` (biru), `--primary-foreground: #ffffff`
- Tambah token kustom: `--brand-emerald: #10B981`, `--brand-orange: #F97316` (CTA)
- `--background: #FAFAFA`, `--card: #FFFFFF`, `--foreground: #111827`, `--muted-foreground: #6B7280`, `--border: #E5E7EB`
- `--radius: 1rem` (16px) untuk card rounded
- Registrasi token brand di blok `@theme inline` (mis. `--color-brand-emerald`, `--color-brand-orange`) agar bisa dipakai sebagai `bg-brand-orange` dll.

### Font (edit `src/styles/fonts.css`)
`@import` Google Fonts di paling atas: **Plus Jakarta Sans** (heading) & **Inter** (body). Set `--font-heading` / `--font-sans` di theme dan terapkan family di `body` + heading via `@layer base`.

### Prinsip visual
Modern minimalist / premium corporate: whitespace banyak, soft shadow, rounded-2xl, grid 8pt, hover animation halus, scroll reveal (via `motion`). Mobile-first & responsive.

## Arsitektur & Routing

Gunakan `react-router` (`createBrowserRouter` / `<Routes>`) di `src/app/App.tsx`:
- `/` → Landing Page
- `/admin/login` → Login admin
- `/admin/*` → Admin layout (sidebar) dengan sub-route: dashboard, hero, tentang, layanan, harga, galeri, testimoni, faq, kontak, pengaturan

State admin (login + data konten) dikelola via **React Context + localStorage** agar CRUD persist antar-refresh. Buat `src/app/store/SanyonaraContext.tsx` berisi seluruh data mock + fungsi CRUD. Domain data: `hero`, `stats`, `services`, `pricing`, `advantages`, `about`, `serviceArea` (teks + array wilayah), `gallery`, `testimonials`, `faq`, `contact`, `location` (alamat, jam, mapsEmbed, mapsLink), `settings` (logo, nama, favicon, **meta title/description/keywords**, ogImage, copyright). Landing membaca context yang sama sehingga edit admin langsung tercermin.

Nomor WhatsApp disimpan di context; helper `waLink(pesan)` di `src/app/lib/whatsapp.ts` membangun `https://wa.me/<no>?text=<encoded>`. Untuk skala & maintainability, admin di-**lazy load** (`React.lazy`) agar bundle landing tetap ringan.

**Local SEO (lengkap):** komponen `SeoHead` menyetel `document.title`, `<meta name="description">`, **Open Graph** (og:title/description/image), **canonical**, dan menyuntik **JSON-LD Schema.org `LocalBusiness`/`HVACBusiness`** (nama, alamat Jakarta Selatan, `areaServed` DKI Jakarta, telepon/WA, jam operasional `openingHours`, `aggregateRating` 4.9, `geo`) dari `settings`+`location`. Semua nilai dapat diedit dari admin Pengaturan. Heading memakai satu `<h1>` berkeyword lokal + hierarki `<h2>` per section. Tambahkan **link Google Business Profile** & catatan sitemap/robots pada footer/settings (nilai statis untuk prototype). Struktur heading: 1× `<h1>` (hero), tiap section `<h2>`, sub-item `<h3>`.

## Struktur File Baru

### Data & shared
- `src/app/store/SanyonaraContext.tsx` — provider, tipe data, seed mock data, CRUD, persist localStorage
- `src/app/lib/whatsapp.ts` — helper link WhatsApp
- `src/app/components/shared/FloatingWhatsApp.tsx` — tombol WA melayang (semua halaman landing)
- `src/app/components/shared/SectionReveal.tsx` — wrapper animasi scroll (motion)

### Landing (`src/app/components/landing/`)
Satu file per section, dirangkai di `src/app/pages/LandingPage.tsx`. **Urutan berbasis marketing funnel** (Attention → Trust → Interest → Consideration → Evaluation → Proof → Reassurance → Objection → Local → Action):
- `Navbar.tsx` (sticky, menu: Beranda, Tentang, Layanan, Harga, Area, Galeri, FAQ, Lokasi; CTA "HUBUNGI TEKNISI"; mobile drawer via `sheet`). Menu "Area" & "Lokasi" ditambahkan.
- `Hero.tsx` (2 kolom, judul besar berkeyword "Jasa Service AC & Elektronik Rumahan Profesional di Jakarta Selatan", subjudul, 2 button [Chat WhatsApp + Lihat Daftar Harga], badge termasuk "Respon Cepat < 15 menit", foto teknisi via `ImageWithFallback`)
- `Stats.tsx` (4 stat card: 1000+ pelanggan, 10+ tahun, 30 hari garansi, 4.9/5 rating)
- `BrandStrip.tsx` (**baru**) — strip "Melayani semua merk" (Daikin, Panasonic, LG, Sharp, Samsung, Gree) sebagai teks/badge sederhana untuk kredibilitas
- `Services.tsx` (grid 10 layanan card + tombol "Hubungi Teknisi" dengan pesan WA kontekstual per layanan)
- `Advantages.tsx` (Keunggulan, 6 poin ikon)
- `About.tsx` (**dipindah ke sini** — Tentang Kami + poin + ilustrasi; alasan: pengunjung service dahulukan kapabilitas & trust sebelum profil perusahaan)
- `ServiceArea.tsx` (**baru — "Area Layanan"**) — menjelaskan cakupan **DKI Jakarta, fokus Jakarta Selatan dan sekitarnya**; daftar kecamatan/wilayah (mis. Kebayoran, Cilandak, Tebet, Pancoran, Pasar Minggu, Setiabudi, dst.) sebagai chip; catatan "Menerima panggilan seluruh Jakarta". Data wilayah dari context (dapat diedit admin).
- `Pricing.tsx` (pricing card + catatan harga; tombol WA kontekstual per item)
- `Gallery.tsx` (masonry via `react-responsive-masonry`, foto rounded)
- `Process.tsx` (timeline horizontal 5 langkah, responsif vertikal di mobile)
- `Testimonials.tsx` (6 card, avatar, rating bintang)
- `QuickConsult.tsx` (**baru — "Konsultasi Cepat"**) — form ringan (nama, jenis perangkat/kerusakan via `select`, area) yang men-generate pesan WhatsApp ter-prefill lalu membuka `wa.me`. Tanpa backend, murni membangun link.
- `Faq.tsx` (accordion shadcn)
- `LocationSection.tsx` (**baru — "Lokasi Kami"**) — Google Maps Embed (`<iframe>` dari link/embed di context), alamat lengkap, jam operasional, tombol "Buka di Google Maps", dan catatan bahwa pelanggan dapat datang langsung bila diperlukan
- `FinalCta.tsx` (background biru, tombol WA besar)
- `Footer.tsx` (logo, alamat, kontak, jam, mini-map/link maps, sosmed, copyright)

### Admin (`src/app/pages/admin/` + `src/app/components/admin/`)
- `AdminLogin.tsx` (form email/password — mock, kredensial demo mis. admin@sanyonara.id / admin123, set flag login di context)
- `AdminLayout.tsx` (sidebar kiri gaya Vercel via komponen `ui/sidebar`, header, `<Outlet/>`, guard redirect ke login)
- `DashboardHome.tsx` (stat card jumlah layanan/foto/testimoni/faq + quick action: Edit Hero, Tambah Galeri, Tambah Harga)
- Halaman CRUD: `HeroEditor.tsx`, `AboutEditor.tsx`, `ServicesManager.tsx`, `PricingManager.tsx`, `ServiceAreaEditor.tsx` (**baru** — edit teks cakupan & daftar wilayah), `GalleryManager.tsx`, `TestimonialsManager.tsx`, `FaqManager.tsx`, `ContactEditor.tsx`, `LocationEditor.tsx` (**baru** — alamat lengkap, jam operasional, link/embed Google Maps, link "Buka di Maps"; dengan **preview iframe langsung**), `SettingsEditor.tsx` (termasuk field **Local SEO**: Meta Title, Meta Description, keyword — mis. "Service AC Jakarta Selatan").
- **UX admin non-IT:** setiap field diberi **label Bahasa Indonesia + helper text** ringkas; Manager list pakai `ui/table` + `ui/dialog` (form tambah/edit) + `ui/alert-dialog` (konfirmasi hapus) + `sonner` toast sukses + `ui/badge` status aktif/nonaktif + **EmptyState** dengan ajakan; editor konten menampilkan **preview** perubahan (mis. preview kartu/iframe) supaya terasa aman diubah.

### Design system showcase
Karena shadcn/ui sudah menyediakan seluruh komponen yang diminta (Button, Input, Textarea, Select, Checkbox, Modal/Dialog, Alert Dialog, Card, Badge, Avatar, Accordion, Navbar, Sidebar, Footer, Table, Pagination, Breadcrumb, Toast/Sonner, Skeleton), kita **pakai langsung** komponen tersebut alih-alih menulis ulang. Variasi Button (primary biru, secondary, outline, CTA orange) dibuat via className/token. Tambah komponen kustom hanya: FloatingWhatsApp, EmptyState (`src/app/components/shared/EmptyState.tsx`), dan wrapper reveal.

## Gambar
Gunakan tool Unsplash (skill `make:unsplash` / `search_photos`) untuk foto: teknisi service AC (hero), instalasi AC, service kulkas, service mesin cuci, before/after, workshop, dan avatar testimoni. Render via `ImageWithFallback` dengan import binding ES module, `object-cover`, `alt` deskriptif.

## Rekomendasi Fitur Trust Sederhana (low-effort, high-trust)
Ditambahkan agar terasa perusahaan profesional, bukan template — semua tanpa backend:
- **Brand strip** merk AC yang dilayani (sudah di atas) → sinyal kompetensi.
- **Badge garansi & respon cepat** konsisten di hero, layanan, dan CTA.
- **Trust bar tipis** di navbar/hero (jam operasional + "Melayani Jakarta Selatan & sekitarnya").
- **Form Konsultasi Cepat** (prefill WhatsApp) → menurunkan friksi kontak.
- **Testimoni dengan nama + wilayah** (mis. "Andi — Tebet") → bukti sosial lokal.
- **FAQ objection-handling** (biaya pengecekan, garansi, area, durasi) tepat sebelum Lokasi/CTA.
- Opsional ringan: badge "Teknisi Bersertifikat" & logo pembayaran (Cash/QRIS/Transfer) di footer sebagai info, bukan fitur transaksi.
- **Promo bar** (`PromoBanner.tsx`) tipis di atas navbar (dismissible) untuk penawaran, mis. "Diskon Cuci AC bulan ini" — teks & aktif/nonaktif dikelola dari admin (`settings.promo`).
- **Loading Skeleton** (`ui/skeleton`) saat data context di-hydrate dari localStorage & pada galeri/gambar.
- **Preview Landing dari Admin:** menu "Lihat Website" (buka `/` di tab baru) + tiap editor menampilkan preview komponen terkait secara langsung.
- **Social Media Settings** & **Google Business Profile link** dikelola di admin Kontak/Pengaturan dan tampil di footer + JSON-LD `sameAs`.

## Langkah Implementasi (urutan)
1. Update `src/styles/fonts.css` (import font) & `src/styles/theme.css` (token warna, radius, font family).
2. Buat `SanyonaraContext` + seed mock data + helper WhatsApp.
3. Bangun komponen landing section demi section, rangkai di `LandingPage`, tambah FloatingWhatsApp + scroll reveal.
4. Set routing di `App.tsx` (landing + admin) dengan Provider membungkus.
5. Bangun admin: login, layout sidebar, dashboard, lalu tiap halaman CRUD yang membaca/menulis context.
6. Ambil foto Unsplash & integrasikan.
7. Poles responsif (mobile/tablet/desktop) + hover/transition.

## Verifikasi
- Dev server sudah berjalan; buka preview surface (bukan localhost).
- Cek landing: semua section tampil sesuai urutan funnel, navbar sticky (termasuk menu Area & Lokasi), tombol WA melayang & CTA mengarah ke `wa.me` dengan pesan kontekstual, brand strip tampil, masonry/accordion/timeline berfungsi, responsif mobile/tablet/desktop.
- Cek **Area Layanan**: teks cakupan Jakarta Selatan & daftar wilayah tampil.
- Cek **Lokasi Kami**: iframe Google Maps ter-render, tombol "Buka di Google Maps" membuka link, alamat & jam tampil.
- Cek **Konsultasi Cepat**: isi form → tombol membuka `wa.me` dengan pesan ter-prefill (nama + kerusakan + area).
- Cek **Local SEO**: `document.title` & meta description sesuai `settings`; heading memuat keyword lokal.
- Cek admin: `/admin/login` → login mock → dashboard; uji CRUD di Layanan & Lokasi (edit link Maps → preview iframe berubah → tercermin di landing setelah refresh via localStorage).
- Pastikan tidak ada error konsol & tidak menjalankan `vite build`.
