
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div';
import { Briefcase, Landmark, HeartPulse, Factory, ShoppingBag, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Industry {
  icon: LucideIcon;
  name: string;
}

const industries: Industry[] = [
  { icon: Landmark, name: "Finance & Banking" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: ShoppingBag, name: "E-commerce & Retail" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Briefcase, name: "Professional Services" },
  { icon: Rocket, name: "Tech Startups" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};


export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 md:py-32 bg-gradient-to-b from-indigo-900/20 to-background">
      <div className="container relative">
        <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
        </div>

        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Powering Diverse Industries</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI solutions are versatile, adaptable, and proven across a wide spectrum of sectors.
          </p>
        </MotionDiv>

        <MotionDiv 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {industries.map((industry) => (
            <MotionDiv
              key={industry.name}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0px 10px 30px -5px hsl(var(--accent) / 0.2)",
                transition: { type: 'spring', stiffness: 300, damping: 15 } 
              }}
            >
              <Card className="text-center glassmorphic group h-full border-accent/30 hover:border-accent transition-all duration-300">
                <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center h-full">
                  <div className="p-3 bg-accent/10 rounded-full mb-4 border border-accent/30 group-hover:border-accent transition-colors">
                     <industry.icon className="w-8 h-8 md:w-10 md:h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold group-hover:text-accent transition-colors">{industry.name}</h3>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
       <style jsx global>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 120s linear infinite;
        }
      `}</style>
    </section>
  );
}
