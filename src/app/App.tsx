import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { SanyonaraProvider } from "./store/SanyonaraContext";
import { Toaster } from "./components/ui/sonner";
import { Skeleton } from "./components/ui/skeleton";
import LandingPage from "./pages/LandingPage";

// Admin di-lazy load agar bundle landing tetap ringan.
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const DashboardHome = lazy(() => import("./pages/admin/DashboardHome"));
const HeroEditor = lazy(() => import("./pages/admin/HeroEditor"));
const StatsEditor = lazy(() => import("./pages/admin/StatsEditor"));
const AboutEditor = lazy(() => import("./pages/admin/AboutEditor"));
const ServicesManager = lazy(() => import("./pages/admin/ServicesManager"));
const PricingManager = lazy(() => import("./pages/admin/PricingManager"));
const ServiceAreaEditor = lazy(() => import("./pages/admin/ServiceAreaEditor"));
const GalleryManager = lazy(() => import("./pages/admin/GalleryManager"));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager"));
const FaqManager = lazy(() => import("./pages/admin/FaqManager"));
const ContactEditor = lazy(() => import("./pages/admin/ContactEditor"));
const LocationEditor = lazy(() => import("./pages/admin/LocationEditor"));
const SettingsEditor = lazy(() => import("./pages/admin/SettingsEditor"));

function AdminFallback() {
  return (
    <div className="min-h-screen space-y-4 p-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function App() {
  return (
    <SanyonaraProvider>
      <BrowserRouter>
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="statistik" element={<StatsEditor />} />
              <Route path="tentang" element={<AboutEditor />} />
              <Route path="layanan" element={<ServicesManager />} />
              <Route path="harga" element={<PricingManager />} />
              <Route path="area" element={<ServiceAreaEditor />} />
              <Route path="galeri" element={<GalleryManager />} />
              <Route path="testimoni" element={<TestimonialsManager />} />
              <Route path="faq" element={<FaqManager />} />
              <Route path="kontak" element={<ContactEditor />} />
              <Route path="lokasi" element={<LocationEditor />} />
              <Route path="pengaturan" element={<SettingsEditor />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </SanyonaraProvider>
  );
}
