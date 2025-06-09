
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhyXoireContent from '@/components/sections/why-xoire-section'; // Renaming for clarity if section becomes page content
import { Users } from 'lucide-react';

export default function WhyXoirePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-headline text-4xl md:text-5xl mb-4 text-primary">Why Partner with Xoire?</h1>
          <p className="text-lg text-muted-foreground">
            Discover the distinct advantages of collaborating with Xoire to unlock unparalleled AI capabilities, drive innovation, and secure a competitive edge in your industry.
          </p>
        </div>
        {/* The content from WhyXoireSection will be rendered here */}
        <WhyXoireContent isPageContent={true} />
      </main>
      <Footer />
    </div>
  );
}
