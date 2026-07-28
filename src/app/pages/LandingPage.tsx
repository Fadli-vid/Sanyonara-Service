import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { Stats } from "../components/landing/Stats";
import { BrandStrip } from "../components/landing/BrandStrip";
import { Services } from "../components/landing/Services";
import { Advantages } from "../components/landing/Advantages";
import { About } from "../components/landing/About";
import { ServiceArea } from "../components/landing/ServiceArea";
import { Pricing } from "../components/landing/Pricing";
import { Gallery } from "../components/landing/Gallery";
import { Process } from "../components/landing/Process";
import { Testimonials } from "../components/landing/Testimonials";
import { QuickConsult } from "../components/landing/QuickConsult";
import { Faq } from "../components/landing/Faq";
import { LocationSection } from "../components/landing/LocationSection";
import { FinalCta } from "../components/landing/FinalCta";
import { Footer } from "../components/landing/Footer";
import { FloatingWhatsApp } from "../components/shared/FloatingWhatsApp";
import { StickyMobileCTA } from "../components/shared/StickyMobileCTA";
import { SeoHead } from "../components/shared/SeoHead";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <BrandStrip />
        <Services />
        <Advantages />
        <About />
        <ServiceArea />
        <Pricing />
        <Gallery />
        <Process />
        <Testimonials />
        <QuickConsult />
        <Faq />
        <LocationSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
    </div>
  );
}
