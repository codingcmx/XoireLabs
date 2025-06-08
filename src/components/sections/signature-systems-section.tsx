
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Zap, Users } from 'lucide-react'; // Added Users for LeadSpark

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
    imageSrc: "https://placehold.co/600x400/0A0A23/BF40BF.png?text=TradeTitan", 
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
    imageSrc: "https://placehold.co/600x400/0A0A23/A0A0D0.png?text=AutoNexus", 
    aiHint: "flow chart",
    details: [
      { feature: "AI-driven decision making", benefit: "Optimizes operational efficiency." },
      { feature: "Seamless system integration", benefit: "Connects disparate software and platforms." },
      { feature: "Scalable automation", benefit: "Adapts to growing business needs." },
    ]
  },
  {
    id: "leadspark", // Changed from securemind
    name: "LeadSpark AI", // Changed name
    description: "AI-driven lead discovery, qualification, and engagement engine.", // Changed description
    imageSrc: "https://placehold.co/600x400/0A0A23/BF40BF.png?text=LeadSpark", // Changed text for placeholder
    aiHint: "connections network", // Changed AI hint
    details: [
      { feature: "Targeted prospect identification", benefit: "Uncovers high-potential leads based on ideal customer profiles." },
      { feature: "Automated outreach personalization", benefit: "Generates tailored messaging to increase engagement rates." },
      { feature: "Lead scoring & prioritization", benefit: "Focuses sales efforts on the most promising opportunities for conversion." },
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
    <section id="systems" className="py-20 md:py-32 bg-gradient-to-b from-background to-indigo-900/20">
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
              <Card className="glassmorphic group h-full flex flex-col overflow-hidden border-accent/30 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 ease-out">
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
                      <Button variant="outline" className="w-full group/button border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-primary/30">
                        <Eye className="mr-2 h-4 w-4 group-hover/button:animate-pulse" /> Launch System Demo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] glassmorphic border-primary/50">
                      <DialogHeader>
                        <DialogTitle className="font-headline text-3xl text-primary">{system.name}</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          {system.description} Dive deeper into the capabilities.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Image 
                          src={system.imageSrc.replace("400","800x500")} 
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
