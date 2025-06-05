import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MobileCtaBar from '@/components/layout/mobile-cta-bar';
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import SignatureSystemsSection from '@/components/sections/signature-systems-section';
import CaseStudiesSection from '@/components/sections/case-studies-section';
import IndustriesSection from '@/components/sections/industries-section';
import WhyXoireSection from '@/components/sections/why-xoire-section';
import FaqSection from '@/components/sections/faq-section';
import FinalCtaSection from '@/components/sections/final-cta-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <SignatureSystemsSection />
        <CaseStudiesSection />
        <IndustriesSection />
        <WhyXoireSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
