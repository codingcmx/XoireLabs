
"use client";
// Removed useState for modal
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import MobileCtaBar from '@/components/layout/mobile-cta-bar';
import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import SignatureSystemsSection from '@/components/sections/signature-systems-section';
import ProductDemosSection from '@/components/sections/product-demos-section';
import CaseStudiesSection from '@/components/sections/case-studies-section';
import IndustriesSection from '@/components/sections/industries-section';
import WhyXoireSection from '@/components/sections/why-xoire-section';
import FaqSection from '@/components/sections/faq-section';
import FinalCtaSection from '@/components/sections/final-cta-section';
// Removed Dialog imports
// Removed BookMeetingContent import as it's now on a separate page
// Removed CalendarCheck2 import as it's used on the new booking page

export default function HomePage() {
  // Removed isBookingModalOpen state and handleTriggerBookingModal function

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> {/* Removed onTriggerBookingModal prop */}
      <main className="flex-grow">
        <HeroSection /> {/* Removed onTriggerBookingModal prop */}
        <ServicesSection />
        <SignatureSystemsSection />
        <ProductDemosSection />
        <CaseStudiesSection />
        <IndustriesSection />
        <WhyXoireSection />
        <FaqSection />
        <FinalCtaSection /> {/* Removed onTriggerBookingModal prop */}
      </main>
      <Footer />
      <MobileCtaBar /> {/* Removed onTriggerBookingModal prop */}

      {/* Removed Dialog component for booking modal */}
    </div>
  );
}
