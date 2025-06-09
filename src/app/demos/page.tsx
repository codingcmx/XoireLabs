
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ProductDemosSection from '@/components/sections/product-demos-section';
import { PlaySquare } from 'lucide-react';

export default function DemosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <PlaySquare className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-headline text-4xl md:text-5xl mb-4 text-primary">Xoire AI Product Demonstrations</h1>
          <p className="text-lg text-muted-foreground">
            Witness the power and sophistication of our flagship AI systems in action. Explore how Xoire can revolutionize your operations and drive unprecedented results.
          </p>
        </div>
        <ProductDemosSection />
      </main>
      <Footer />
    </div>
  );
}
