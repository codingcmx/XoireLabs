"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import MotionDiv from '@/components/motion/motion-div';
import { BrainCircuit, LineChart, ShieldCheck, Bot, Code2, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: LineChart,
    title: "AI Trading Systems",
    description: "Harness predictive analytics and algorithmic trading for superior market performance.",
  },
  {
    icon: BrainCircuit,
    title: "Business Automation",
    description: "Streamline workflows and optimize operations with intelligent automation solutions.",
  },
  {
    icon: ShoppingCart,
    title: "AI Marketing",
    description: "Personalized campaigns, customer segmentation, and automated content generation.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity AI",
    description: "Proactive threat detection, anomaly identification, and robust security protocols.",
  },
  {
    icon: Code2,
    title: "AI-Powered Coding",
    description: "Accelerate development cycles with AI-assisted code generation and review.",
  },
  {
    icon: Bot,
    title: "Advanced Chatbots",
    description: "Intelligent, context-aware chatbots for customer support and engagement.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Our AI Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We engineer bespoke AI solutions that drive innovation and deliver tangible results across diverse business functions.
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <MotionDiv
              key={service.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5, transition: { duration: 0.3 } }}
              className="h-full"
            >
              <Card className="h-full glassmorphic group hover:shadow-neon-primary transition-all duration-300 ease-out">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/30 group-hover:border-primary transition-colors">
                    <service.icon className="w-10 h-10 text-primary group-hover:animate-pulse" />
                  </div>
                  <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
