
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck2 } from 'lucide-react';

// This component now only returns the content for the booking modal's body.
// The section wrapper, title, and main icon are handled by the Dialog in page.tsx.
export default function BookMeetingContent() {
  return (
    <Card className="glassmorphic shadow-xl border-primary/40 w-full">
      {/* 
        The CardHeader with title "Schedule with Calendly" and description 
        can be part of the dialog's main description or omitted if redundant.
        For now, keeping it for consistency with the previous card structure.
      */}
      <CardHeader className="pt-6"> 
        <CardTitle className="text-2xl text-center">Schedule with Calendly</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Please replace the placeholder below with your Calendly embed code.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        <div 
          className="calendly-inline-widget bg-muted rounded-lg border border-border" 
          style={{ minWidth: '320px', height: '600px' }} // Adjusted height for modal context
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
  );
}
