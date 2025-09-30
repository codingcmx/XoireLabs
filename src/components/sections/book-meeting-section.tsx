
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck2, Mail } from 'lucide-react';
import ContactForm from '@/components/common/contact-form'; // Import the ContactForm

// This component now only returns the content for the booking page.
// The main page title and icon are handled by the new /book-meeting/page.tsx.
export default function BookMeetingContent() {
  return (
    <div className="w-full space-y-12">
      <Card className="glassmorphic shadow-xl border-primary/40 w-full">
        <CardHeader className="pt-6"> 
          <CardTitle className="text-2xl text-center">Schedule with Calendly</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Use our live calendar to find a time that works best for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <div 
            className="calendly-inline-widget bg-muted rounded-lg border border-border" 
            style={{ minWidth: '320px', height: '600px' }}
            data-ai-hint="calendar booking interface" 
          >
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

      <div className="text-center">
        <h2 className="font-headline text-3xl mb-3 text-accent">Not Ready to Book?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Have a quick question or prefer to reach out via email? Use the form below, and we'll get back to you shortly.
        </p>
      </div>

      <Card className="glassmorphic shadow-xl border-accent/40 w-full">
        <CardHeader className="items-center pt-6">
          <Mail className="w-10 h-10 text-accent mb-3" />
          <CardTitle className="text-2xl text-center">Send Us a Message</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
