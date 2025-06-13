
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div';
import { Star, TrendingUp, Users, StarHalf } from 'lucide-react'; // Added StarHalf

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar: string;
  aiHint: string;
  rating: number; // Added rating
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
];

// Duplicate testimonials for seamless scrolling
const duplicatedTestimonials = [...initialTestimonials, ...initialTestimonials];

const stats = [
    { value: "$147K+", label: "Automated Annually", icon: TrendingUp, color: "text-primary" },
    { value: "98%", label: "Client Satisfaction", icon: Star, color: "text-accent" },
    { value: "97+", label: "AI Systems Deployed", icon: Users, color: "text-primary" },
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

        {/* Testimonial Carousel */}
        <div className="relative w-full overflow-hidden group">
          <div 
            className="flex animate-scroll-testimonials group-hover:[animation-play-state:paused]"
            style={{ willChange: 'transform' }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.name}-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                <Card className="glassmorphic h-full flex flex-col p-6 border-primary/30 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="pt-6 flex-grow">
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
                    <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                  <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        if (testimonial.rating >= starValue) {
                          return <Star key={i} className="h-5 w-5 text-primary fill-primary" />;
                        } else if (testimonial.rating >= starValue - 0.5) {
                          return <StarHalf key={i} className="h-5 w-5 text-primary fill-primary" />;
                        } else {
                          return <Star key={i} className="h-5 w-5 text-primary" />; // Empty star (outline)
                        }
                      })}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
