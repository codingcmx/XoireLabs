
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MotionDiv from '@/components/motion/motion-div';
import { ArrowRight, Zap } from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { generateImage, type GenerateImageInput } from '@/ai/flows/generate-image-flow';

const ORIGINAL_ORB_IMAGE_URL = "https://placehold.co/400x400/6A0DAD/FFFFFF.png?text=AI+Orb"; 
const ORB_IMAGE_AI_HINT = "glowing sphere";

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const [orbImageUrl, setOrbImageUrl] = useState(ORIGINAL_ORB_IMAGE_URL);
  const [isOrbImageLoading, setIsOrbImageLoading] = useState(true);

  useEffect(() => {
    async function fetchAiImage() {
      setIsOrbImageLoading(true);
      try {
        const input: GenerateImageInput = {
          promptText: ORB_IMAGE_AI_HINT,
          originalPlaceholderUrl: ORIGINAL_ORB_IMAGE_URL,
        };
        const result = await generateImage(input);
        setOrbImageUrl(result.imageDataUri);
      } catch (error) {
        console.error("Failed to generate AI image for hero orb:", error);
        setOrbImageUrl(ORIGINAL_ORB_IMAGE_URL); 
      } finally {
        setIsOrbImageLoading(false);
      }
    }
    fetchAiImage();
  }, []);

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-indigo-900/50 opacity-70"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ y: yOrb, scale: scaleOrb, opacity: opacityOrb }}
        variants={orbVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          src={orbImageUrl}
          alt="AI Orb"
          width={400}
          height={400}
          className={`rounded-full opacity-30 transition-opacity duration-500 ease-in-out ${isOrbImageLoading ? 'blur-md' : 'blur-0'} group-hover:animate-pulse`}
          data-ai-hint={ORB_IMAGE_AI_HINT}
          priority
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
            <span className="block text-primary">Rule with AI.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Xoire delivers full-stack AI systems for trading, automation, marketing, lead generation, coding, and chatbots. Transform your business into an intelligent powerhouse.
          </p>
        </MotionDiv>
        
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, ease: "easeOut" } }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="text-lg px-8 py-6 group hover:bg-primary/80">
            Launch Your AI Project
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 group border-accent hover:bg-accent/10 hover:text-accent-foreground">
            Explore Systems
            <Zap className="ml-2 h-5 w-5 group-hover:fill-accent transition-colors" />
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
}
