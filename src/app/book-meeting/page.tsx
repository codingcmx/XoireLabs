
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BookMeetingContent from '@/components/sections/book-meeting-section';
import { CalendarCheck2 } from 'lucide-react';

export default function BookMeetingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20 flex flex-col items-center">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <CalendarCheck2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-headline text-4xl md:text-5xl mb-4 text-primary">Book Your AI Strategy Session</h1>
          <p className="text-lg text-muted-foreground">
            Schedule a complimentary consultation with our AI experts to discuss your business needs and explore how Xoire can architect your success using the form below.
          </p>
        </div>
        <div className="w-full max-w-3xl">
          <BookMeetingContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
