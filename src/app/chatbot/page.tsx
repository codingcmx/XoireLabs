
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { MessageSquare } from 'lucide-react';

const CHATBOT_EMBED_URL = "https://xoire-co-assistant-fwh38p0w4-codingcmxs-projects.vercel.app";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20 flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <MessageSquare className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-headline text-4xl md:text-5xl mb-4 text-primary">Xoire AI Assistant</h1>
          <p className="text-lg text-muted-foreground">
            Interact with our intelligent assistant to get answers to your questions about Xoire AI, our services, and how we can help you build smart, scale faster, and rule with AI.
          </p>
        </div>
        <div className="w-full max-w-3xl lg:max-w-4xl h-[600px] md:h-[700px] rounded-lg overflow-hidden shadow-2xl border border-primary/30 glassmorphic">
          {CHATBOT_EMBED_URL ? (
            <iframe
              src={CHATBOT_EMBED_URL}
              title="Xoire AI Assistant Embed"
              className="w-full h-full border-0 rounded-lg" // Added rounded-lg to iframe itself for better fit
              allow="microphone; camera; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center bg-card">
                <MessageSquare className="w-24 h-24 text-primary/50 mb-6" />
                <h3 className="text-xl font-semibold mb-3">Chatbot Not Configured</h3>
                <p className="text-base">
                    The chatbot embedding URL is not currently set up. Please contact support.
                </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
