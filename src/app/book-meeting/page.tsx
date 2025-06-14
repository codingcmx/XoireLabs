
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BookMeetingContent from '@/components/sections/book-meeting-section';
import ContactForm from '@/components/common/contact-form'; // Import ContactForm
import { CalendarCheck2, Mail } from 'lucide-react'; // Import Mail icon

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
        <div className="w-full max-w-3xl mb-16"> {/* Added margin-bottom */}
          <BookMeetingContent />
        </div>

        {/* New Contact Form Section */}
        <div className="w-full max-w-3xl border-t border-border/40 pt-12 md:pt-16">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <Mail className="w-12 h-12 text-accent mx-auto mb-5" />
            <h2 className="font-headline text-3xl md:text-4xl mb-3 text-accent">Prefer to Send a Message?</h2>
            <p className="text-md text-muted-foreground">
              If you're not ready to book a meeting or have specific questions, feel free to reach out to us using the form below.
            </p>
          </div>
          <div className="p-6 md:p-8 rounded-lg glassmorphic shadow-lg border border-accent/30">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
