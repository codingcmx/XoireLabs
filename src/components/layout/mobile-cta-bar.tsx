
"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";
// import Link from "next/link"; // No longer a link

interface MobileCtaBarProps {
  onTriggerBookingModal?: () => void;
}

export default function MobileCtaBar({ onTriggerBookingModal }: MobileCtaBarProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 p-4 backdrop-blur-md md:hidden border-t border-border/60">
      <Button className="w-full animate-pulse-glow" size="lg" onClick={onTriggerBookingModal}>
          Launch Your AI Project
          <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
