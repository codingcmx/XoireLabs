"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Zap } from 'lucide-react';

interface System {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  aiHint: string;
  details: {
    feature: string;
    benefit: string;
  }[];
}

const systems: System[] = [
  {
    id: "tradetitan",
    name: "TradeTitan AI",
    description: "Automated high-frequency trading bot with adaptive learning algorithms.",
    imageSrc: "https://placehold.co/600x400/222222/00FF80.png?text=TradeTitan",
    aiHint: "trading graph",
    details: [
      { feature: "Real-time market analysis", benefit: "Maximizes profit opportunities 24/7." },
      { feature: "Risk management protocols", benefit: "Minimizes potential losses intelligently." },
      { feature: "Multi-asset support", benefit: "Diversifies trading across various markets." },
    ]
  },
  {
    id: "autonexus",
    name: "AutoNexus Flow",
    description: "Intelligent process automation for complex enterprise workflows.",
    imageSrc: "https://placehold.co/600x400/222222/7DF9FF.png?text=AutoNexus",
    aiHint: "flow chart",
    details: [
      { feature: "AI-driven decision making", benefit: "Optimizes operational efficiency." },
      { feature: "Seamless system integration", benefit: "Connects disparate software and platforms." },
      { feature: "Scalable automation", benefit: "Adapts to growing business needs." },
    ]
  },
  {
    id: "securemind",
    name: "SecureMind Sentinel",
    description: "AI-powered cybersecurity shield with predictive threat intelligence.",
    imageSrc: "https://placehold.co/600x400/222222/00FF80.png?text=SecureMind",
    aiHint: "security shield",
    details: [
      { feature: "Behavioral anomaly detection", benefit: "Identifies and neutralizes novel threats." },
      { feature: "Automated incident response", benefit: "Contains breaches in real-time." },
      { feature: "Continuous security posture assessment", benefit: "Ensures ongoing protection." },
    ]
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SignatureSystemsSection() {
  return (
    <section id="systems" className="py-20 md:py-32 bg-gradient-to-b from-background to-slate-900/30">
      <div className="container">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Signature AI Systems</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our flagship AI platforms, meticulously engineered for peak performance and transformative impact.
          </p>
        </MotionDiv>

        <MotionDiv 
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {systems.map((system) => (
            <MotionDiv key={system.id} variants={itemVariants}>
              <Card className="glassmorphic group h-full flex flex-col overflow-hidden neon-border-accent hover:shadow-neon-accent transition-all duration-300 ease-out">
                <CardHeader className="p-0">
                  <Image
                    src={system.imageSrc}
                    alt={system.name}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={system.aiHint}
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-2xl font-headline mb-2 group-hover:text-accent transition-colors">{system.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{system.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full group/button neon-border-primary hover:bg-primary/10 hover:text-primary hover:shadow-neon-primary">
                        <Eye className="mr-2 h-4 w-4 group-hover/button:animate-pulse" /> Launch System Demo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] glassmorphic neon-border-primary">
                      <DialogHeader>
                        <DialogTitle className="font-headline text-3xl text-primary neon-text-primary">{system.name}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          {system.description} Dive deeper into the capabilities.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Image 
                          src={system.imageSrc.replace("400","800x500")} // Larger image for modal
                          alt={`${system.name} Detail`} 
                          width={800} 
                          height={500} 
                          className="rounded-md object-cover"
                          data-ai-hint={system.aiHint}
                        />
                        <ul className="space-y-2 text-sm">
                          {system.details.map(detail => (
                            <li key={detail.feature} className="flex items-start">
                              <Zap className="h-4 w-4 text-primary mr-2 mt-1 shrink-0" />
                              <div>
                                <strong className="text-foreground">{detail.feature}:</strong>
                                <span className="text-muted-foreground ml-1">{detail.benefit}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
