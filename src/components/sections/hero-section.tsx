"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MotionDiv from '@/components/motion/motion-div';
import { ArrowRight, Zap } from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Simple parallax for background elements
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Parallax for foreground elements (orb)
  const yOrb = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleOrb = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
  const opacityOrb = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);


  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const orbVariants = {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, delay: 0.5, type: "spring", stiffness: 100 } },
  };

  return (
    <section ref={targetRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32">
      {/* Particle background - simple CSS animated gradient for now */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-slate-900/50 opacity-70"></div>
        {/* Placeholder for more complex particle effects */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </motion.div>
      
      {/* Floating AI Orb - Placeholder with animation */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ y: yOrb, scale: scaleOrb, opacity: opacityOrb }}
        variants={orbVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          src="https://placehold.co/400x400/00FF80/222222.png?text=AI+Orb"
          alt="AI Orb"
          width={400}
          height={400}
          className="rounded-full opacity-30 animate-pulse"
          data-ai-hint="glowing sphere"
        />
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_20px_hsl(var(--primary)/0.4)]"></div>
      </motion.div>

      <div className="container relative z-20 text-center">
        <MotionDiv
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl mb-6">
            <span className="block">Build Smart.</span>
            <span className="block">Scale Faster.</span>
            <span className="block text-primary neon-text-primary">Rule with AI.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Xoire delivers full-stack AI systems for trading, automation, marketing, security, coding, and chatbots. Transform your business into an intelligent powerhouse.
          </p>
        </MotionDiv>
        
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, ease: "easeOut" } }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="animate-pulse-glow text-lg px-8 py-6 group">
            Launch Your AI Project
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 group neon-border-accent hover:shadow-neon-accent">
            Explore Systems
            <Zap className="ml-2 h-5 w-5 group-hover:fill-accent transition-colors" />
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
}
