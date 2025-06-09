
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MotionDiv from '@/components/motion/motion-div';
import { ArrowRight, Zap, Star, MoveRight } from 'lucide-react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { generateImage, type GenerateImageInput } from '@/ai/flows/generate-image-flow';
import Link from 'next/link'; 

const ORIGINAL_ORB_IMAGE_URL = "https://placehold.co/800x800.png";
const ORB_IMAGE_AI_HINT = "blue swirling galaxy planet";


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

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0]);
  
  const yOrb = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleOrb = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.3]);
  const opacityOrb = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.7, 0.1]);


  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  const orbContainerVariants = {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 1, delay: 0.8, type: "spring", stiffness: 80 } 
    },
  };

  return (
    <section ref={targetRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-0">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/80 to-purple-950/60 animate-morph-gradient opacity-80"></div>
        <div className="absolute inset-0 z-[-1] star-field">
          {[...Array(100)].map((_, i) => (
            <Star
              key={`star-${i}`}
              className="absolute animate-star-twinkle text-slate-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
              strokeWidth={0.5}
              fill="currentColor"
            />
          ))}
        </div>
        <div className="absolute inset-0 z-[-2] opacity-40 mix-blend-overlay noise-overlay"></div>
        {[...Array(3)].map((_, i) => (
          <div
            key={`trail-${i}`}
            className="absolute h-1 w-1/3 bg-primary/30 rounded-full animate-light-trail shadow-[0_0_15px_5px_hsl(var(--primary)/0.3)]"
            style={{
                top: `${20 + i * 30}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${5 + i * 1.5}s`,
            }}
          ></div>
        ))}
      </motion.div>
      
      <div className="container relative z-20 grid md:grid-cols-5 items-center gap-8 min-h-[calc(100vh-10rem)] md:min-h-0">
        <motion.div 
          className="md:col-span-3 text-center md:text-left"
          style={{ y: yText, opacity: opacityText }}
        >
          <MotionDiv
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 group"
          >
            <motion.h1 variants={lineVariants} className="font-headline text-5xl md:text-7xl lg:text-8xl mb-2 headline-glow-hover">
              Build Smart.
            </motion.h1>
            <motion.h1 variants={lineVariants} className="font-headline text-5xl md:text-7xl lg:text-8xl mb-2 headline-glow-hover">
              Scale Faster.
            </motion.h1>
            <motion.h1 variants={lineVariants} className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary headline-glow-hover">
              Rule with AI.
            </motion.h1>
          </MotionDiv>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 1, ease: "easeOut" } }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-10"
          >
            Xoire delivers full-stack AI systems for trading, automation, marketing, lead generation, coding, and chatbots. Transform your business into an intelligent powerhouse.
          </motion.p>
          
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2, ease: "easeOut" } }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button size="lg" className="text-lg px-8 py-6 group btn-ripple hover:shadow-primary/40 shadow-lg" asChild>
              <Link href="/book-meeting">
                Launch Your Elite AI Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 group border-primary text-primary hover:bg-primary/10 hover:text-primary hover:border-primary btn-portal-spark" asChild>
              <Link href="/demos"> {/* Updated link */}
                Enter the AI Dimension Now
                <MoveRight className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Link>
            </Button>
          </MotionDiv>
        </motion.div>

        <motion.div 
          className="md:col-span-2 relative flex justify-center items-center md:-ml-16 lg:-ml-24 group"
          style={{ y: yOrb, scale: scaleOrb, opacity: opacityOrb }}
          variants={orbContainerVariants}
          initial="initial"
          animate="animate"
          whileHover={{ rotateY: 5, rotateX: -2, transition: { duration: 0.3 } }}
        >
          <motion.div 
            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src={orbImageUrl}
              alt="AI Orb - Swirling Galaxy Planet"
              width={800}
              height={800}
              className={`rounded-full object-cover w-full h-full transition-all duration-1000 ease-in-out ${isOrbImageLoading ? 'blur-md opacity-30' : 'blur-0 opacity-100'} group-hover:opacity-90`}
              data-ai-hint={ORB_IMAGE_AI_HINT}
              priority
            />
            <div className="absolute inset-0 rounded-full shadow-[0_0_80px_30px_hsl(var(--primary)/0.5),_inset_0_0_40px_10px_hsl(var(--accent)/0.4)] opacity-70 group-hover:opacity-100 transition-opacity animate-subtle-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
