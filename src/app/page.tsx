
"use client";
import { useState } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import BookMeetingContent from '@/components/sections/book-meeting-section'; // Renamed import for clarity
import { CalendarCheck2 } from 'lucide-react';

export default function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleTriggerBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onTriggerBookingModal={handleTriggerBookingModal} />
      <main className="flex-grow">
        <HeroSection onTriggerBookingModal={handleTriggerBookingModal} />
        <ServicesSection />
        <SignatureSystemsSection />
        <ProductDemosSection />
        <CaseStudiesSection />
        <IndustriesSection />
        <WhyXoireSection />
        <FaqSection />
        {/* BookMeetingSection is now rendered as a modal */}
        <FinalCtaSection onTriggerBookingModal={handleTriggerBookingModal} />
      </main>
      <Footer />
      <MobileCtaBar onTriggerBookingModal={handleTriggerBookingModal} />

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl glassmorphic p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex flex-col items-center text-center mb-4">
              <CalendarCheck2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <DialogTitle className="font-headline text-3xl md:text-4xl mb-2 text-primary">Book Your AI Strategy Session</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground max-w-xl mx-auto">
                Schedule a complimentary consultation with our AI experts to discuss your business needs and explore how Xoire can architect your success.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="p-2 md:p-6 max-h-[70vh] overflow-y-auto">
            <BookMeetingContent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
