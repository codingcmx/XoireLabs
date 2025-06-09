
"use client";
import MotionDiv from '@/components/motion/motion-div';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck2 } from 'lucide-react';

export default function BookMeetingSection() {
  return (
    <section id="book-meeting" className="py-20 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <CalendarCheck2 className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Book Your AI Strategy Session</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a complimentary consultation with our AI experts to discuss your business needs and explore how Xoire can architect your success.
          </p>
        </MotionDiv>

        <MotionDiv 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glassmorphic shadow-xl border-primary/40">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Schedule with Calendly</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Please replace the placeholder below with your Calendly embed code.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <div 
                className="calendly-inline-widget bg-muted rounded-lg border border-border" 
                style={{ minWidth: '320px', height: '700px' }}
                data-ai-hint="calendar booking interface" 
              >
                {/* 
                  Replace this with your actual Calendly embed code.
                  Example:
                  <iframe
                    src="https://calendly.com/your-username/your-event"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  ></iframe>
                */}
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                    <CalendarCheck2 className="w-24 h-24 text-primary/50 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Calendly Embed Placeholder</h3>
                    <p className="text-sm">
                        To enable direct booking, please embed your Calendly scheduling page here. 
                        You can get the embed code from your Calendly event settings.
                    </p>
                    <a 
                        href="https://calendly.com/integration_guides/embed-options" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline mt-4 text-sm"
                    >
                        Learn how to embed Calendly
                    </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>
    </section>
  );
}
