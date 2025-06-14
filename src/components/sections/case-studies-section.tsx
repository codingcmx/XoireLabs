
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div'; // Already using MotionDiv for section title and stats
import { Star, StarHalf, TrendingUp, Users } from 'lucide-react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  aiHint: string;
  rating: number;
}

const initialTestimonials: Testimonial[] = [
  {
    quote: "Xoire's AI transformed our operations, boosting efficiency by 40% and unlocking new revenue streams. Truly game-changing!",
    name: "Eva Rostova",
    company: "CEO, QuantumLeap Tech",
    avatar: "https://placehold.co/100x100/BF40BF/0A0A23.png?text=ER",
    aiHint: "woman portrait",
    rating: 5,
  },
  {
    quote: "The AI trading bot developed by Xoire has consistently outperformed market benchmarks. Their expertise is unparalleled.",
    name: "Marcus Chen",
    company: "Founder, Apex Capital",
    avatar: "https://placehold.co/100x100/A0A0D0/0A0A23.png?text=MC",
    aiHint: "man portrait",
    rating: 4.5,
  },
  {
    quote: "Our customer engagement skyrocketed after implementing Xoire's AI chatbot solution. Support costs are down, satisfaction is up.",
    name: "Lena Hernandez",
    company: "CMO, NovaRetail Group",
    avatar: "https://placehold.co/100x100/FFFFFF/0A0A23.png?text=LH",
    aiHint: "woman face",
    rating: 5,
  },
   {
    quote: "The predictive analytics from Xoire gave us a clear edge. We've seen a 25% increase in conversion rates.",
    name: "Kenji Tanaka",
    company: "Head of Growth, FutureScope Inc.",
    avatar: "https://placehold.co/100x100/FFD700/0A0A23.png?text=KT",
    aiHint: "asian man",
    rating: 4,
  },
  {
    quote: "Xoire's team is brilliant. They delivered a complex AI system ahead of schedule and exceeding all expectations.",
    name: "Sofia Al-Jamil",
    company: "CTO, Innovate Solutions",
    avatar: "https://placehold.co/100x100/00CED1/0A0A23.png?text=SA",
    aiHint: "middle eastern woman",
    rating: 4.5,
  },
  {
    quote: "Integrating Xoire's automation tools reduced our manual workload by an incredible 60%. Highly recommend!",
    name: "David Miller",
    company: "COO, EfficientLogistics Co.",
    avatar: "https://placehold.co/100x100/32CD32/0A0A23.png?text=DM",
    aiHint: "man face",
    rating: 5,
  },
  {
    quote: "Their lead generation AI found prospects we never would have. Our sales pipeline has never been healthier.",
    name: "Aisha Khan",
    company: "Sales Director, Growth Dynamics",
    avatar: "https://placehold.co/100x100/FF69B4/0A0A23.png?text=AK",
    aiHint: "indian woman",
    rating: 4,
  },
  {
    quote: "The insights from Xoire's AI marketing platform led to a 30% increase in campaign ROI. Essential for modern marketing.",
    name: "Robert Smith",
    company: "Marketing VP, MarketBoosters",
    avatar: "https://placehold.co/100x100/87CEEB/0A0A23.png?text=RS",
    aiHint: "caucasian man",
    rating: 3.5,
  }
];

const stats = [
    { value: "$197k+", label: "Automated Annually", icon: TrendingUp, color: "text-primary" },
    { value: "98%", label: "Client Satisfaction", icon: Star, color: "text-accent" },
    { value: "87+", label: "AI Systems Deployed", icon: Users, color: "text-primary" },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
};

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-5 w-5 text-primary fill-primary" />);
  }
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="h-5 w-5 text-primary fill-primary" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-primary fill-none" />);
  }
  return stars;
};

const CARD_WIDTH_DEFAULT = 360; // Default card width in pixels (approx w-90 on Tailwind scale)
const RADIUS_DEFAULT = 400; // Default radius of the wheel in pixels
const CARD_ASPECT_RATIO = 4 / 5; // Approximate aspect ratio for card height

export default function CaseStudiesSection() {
  const [radius, setRadius] = useState(RADIUS_DEFAULT);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DEFAULT);
  const [cardHeight, setCardHeight] = useState(CARD_WIDTH_DEFAULT / CARD_ASPECT_RATIO);

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        const newCardWidth = window.innerWidth < 768 ? 280 : (window.innerWidth < 1024 ? 320 : CARD_WIDTH_DEFAULT);
        const newRadius = window.innerWidth < 768 ? 300 : (window.innerWidth < 1024 ? 350 : RADIUS_DEFAULT);
        setCardWidth(newCardWidth);
        setRadius(newRadius);
        setCardHeight(newCardWidth / CARD_ASPECT_RATIO);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const rotation = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useAnimationFrame((time, delta) => {
    const baseSpeed = 8; // degrees per second
    const speed = isHovering ? baseSpeed / 4 : baseSpeed;
    rotation.set(rotation.get() + (delta / 1000) * speed);
  });

  return (
    <section id="case-studies" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Proven Results, Real Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See how we've empowered businesses like yours to achieve extraordinary outcomes.
          </p>
        </MotionDiv>

        <MotionDiv 
          className="grid md:grid-cols-3 gap-8 mb-20" // Increased mb
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <MotionDiv key={index} variants={itemVariants}>
              <Card className="glassmorphic text-center p-6 hover:shadow-lg hover:shadow-accent/30 transition-shadow duration-300">
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} strokeWidth={1.5}/>
                <p className={`font-headline text-4xl ${stat.color} mb-2`}>{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* 3D Testimonial Wheel */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            height: `${cardHeight + 50}px`, // Ensure enough vertical space for cards
            perspective: '1500px',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              rotateY: rotation,
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }}
          >
            {initialTestimonials.map((testimonial, index) => {
              const angleDeg = (index / initialTestimonials.length) * 360;
              return (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  className="absolute top-0 left-0 flex items-center justify-center"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transformOrigin: 'center center',
                    transform: `rotateY(${angleDeg}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden', // Hide back of cards
                  }}
                >
                  <Card 
                    className="glassmorphic w-full h-full flex flex-col p-6 border-primary/30 shadow-lg"
                    // Add a subtle counter-rotation to keep card faces towards the viewer
                    // or adjust lighting/shading if cards are allowed to show their "sides"
                  >
                    <CardContent className="pt-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-4">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4 border-2 border-primary"
                          data-ai-hint={testimonial.aiHint}
                        />
                        <div>
                          <CardTitle className="text-lg font-semibold text-foreground">{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground italic text-sm mb-4 flex-grow">&quot;{testimonial.quote}&quot;</p>
                       <div className="flex mt-auto"> 
                        {renderStars(testimonial.rating)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
