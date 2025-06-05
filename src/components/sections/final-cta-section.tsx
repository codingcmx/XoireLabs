
"use client";
import { Button } from '@/components/ui/button';
import MotionDiv from '@/components/motion/motion-div';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" className="animate-pulse">
          <filter id="noiseFilterCta">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="3" 
              stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterCta)"/>
        </svg>
      </div>
       <div className="absolute inset-0 z-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-30 animate-pulse"></div>


      <div className="container relative z-10 text-center">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-3xl mx-auto p-8 md:p-12 rounded-lg glassmorphic shadow-2xl border border-primary/40"
        >
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="font-headline text-4xl md:text-5xl mb-6 text-primary">
            Ready to Revolutionize Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let Xoire AI be your catalyst for transformation. Partner with us to unlock the full potential of artificial intelligence and redefine what's possible for your enterprise.
          </p>
          <Button size="lg" className="text-xl px-10 py-7 group hover:bg-primary/80">
            Start Your AI Journey Now
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
}
