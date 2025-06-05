
"use client";

import type { ReactNode } from 'react';
import { useState, useRef } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2, AlertTriangle } from "lucide-react";
import { aiVoiceAssistant } from '@/ai/flows/ai-voice-assistant'; 
import { useToast } from "@/hooks/use-toast";

interface FaqItemClientProps {
  value: string;
  question: string;
  answer: ReactNode; 
  answerTextForAudio: string; 
}

export default function FaqItemClient({ value, question, answer, answerTextForAudio }: FaqItemClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handlePlayAudio = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsLoading(false);
        return;
      }

      const result = await aiVoiceAssistant({ text: answerTextForAudio });
      if (result.audioUrl) {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = result.audioUrl;
        audioRef.current.play();
        audioRef.current.onended = () => setIsLoading(false);
      } else {
        throw new Error("Audio URL not found in response.");
      }
    } catch (err) {
      console.error("Error playing audio:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Audio Error",
        description: `Could not play audio: ${errorMessage}`,
        variant: "destructive",
      });
      setIsLoading(false); 
    }
  };

  return (
    <AccordionItem value={value} className="border-b-primary/20">
      <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors py-6 font-medium">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pb-6 space-y-4">
        <div>{answer}</div>
        <div className="flex items-center space-x-2">
            <Button
            variant="outline"
            size="sm"
            onClick={handlePlayAudio}
            disabled={isLoading}
            className="border-accent hover:bg-accent/10 hover:text-accent-foreground group"
            >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Volume2 className="mr-2 h-4 w-4 group-hover:text-accent transition-colors" />
            )}
            {isLoading && audioRef.current?.paused ? 'Loading...' : 
             isLoading && !audioRef.current?.paused ? 'Stop' : 'Listen'}
            </Button>
            {error && <span className="text-destructive text-xs flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/> {error}</span>}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
