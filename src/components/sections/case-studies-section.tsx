
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div';
import { Star, TrendingUp, Users } from 'lucide-react';
import { useState, useEffect } from 'react'; // Added useState and useEffect

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  aiHint: string;
}

// Renamed to initialTestimonials to avoid conflict with state variable
const initialTestimonials: Testimonial[] = [
  {
    quote: "Xoire's AI transformed our operations, boosting efficiency by 40% and unlocking new revenue streams. Truly game-changing!",
    name: "Eva Rostova",
    company: "CEO, QuantumLeap Tech",
    avatar: "https://placehold.co/100x100/BF40BF/0A0A23.png?text=ER", // Purple accent
    aiHint: "woman portrait",
  },
  {
    quote: "The AI trading bot developed by Xoire has consistently outperformed market benchmarks. Their expertise is unparalleled.",
    name: "Marcus Chen",
    company: "Founder, Apex Capital",
    avatar: "https://placehold.co/100x100/A0A0D0/0A0A23.png?text=MC", // Silver accent
    aiHint: "man portrait",
  },
  {
    quote: "Our customer engagement skyrocketed after implementing Xoire's AI chatbot solution. Support costs are down, satisfaction is up.",
    name: "Lena Hernandez",
    company: "CMO, NovaRetail Group",
    avatar: "https://placehold.co/100x100/FFFFFF/0A0A23.png?text=LH", // Foreground accent
    aiHint: "woman face",
  },
];

const stats = [
    { value: "$7.4M+", label: "Automated Annually", icon: TrendingUp, color: "text-primary" },
    { value: "98%", label: "Client Satisfaction", icon: Star, color: "text-accent" },
    { value: "150+", label: "AI Systems Deployed", icon: Users, color: "text-primary" },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
};


export default function CaseStudiesSection() {
  const [currentTestimonials, setCurrentTestimonials] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTestimonials(prevTestimonials => {
        const newTestimonials = [...prevTestimonials];
        const firstItem = newTestimonials.shift(); // Remove the first item
        if (firstItem) {
          newTestimonials.push(firstItem); // Add it to the end
        }
        return newTestimonials;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array so it runs once on mount

  return (
    <section id="case-studies" className="py-20 md:py-32 bg-background">
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
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={sectionVariants} // Keep for stats initial load
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

        <MotionDiv 
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
          variants={sectionVariants} // For initial staggered load of testimonials
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          layout // Added for the grid container to animate its own potential size changes
        >
          {currentTestimonials.map((testimonial) => ( // Map over the state variable
            <MotionDiv 
              key={testimonial.name} // Use a unique and stable key from the data
              variants={itemVariants} // For initial animation of each item
              layout // Enable layout animation for position changes
              transition={{ type: "spring", stiffness: 200, damping: 25 }} // Controls the animation of re-positioning
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
            >
              <Card className="glassmorphic h-full flex flex-col p-6 group border-primary/30 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <CardContent className="pt-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4 border-2 border-primary group-hover:animate-pulse"
                      data-ai-hint={testimonial.aiHint}
                    />
                    <div>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
                <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                    ))}
                </div>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}

