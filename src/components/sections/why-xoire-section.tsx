"use client";
import MotionDiv from '@/components/motion/motion-div';
import { CheckCircle, Zap, Target, Brain, Users } from 'lucide-react';
import Image from 'next/image';

const reasons = [
  {
    icon: Target,
    title: "Visionary Solutions",
    text: "We don't just build AI; we engineer the future of your business with cutting-edge, strategic implementations.",
  },
  {
    icon: Brain,
    title: "Deep Expertise",
    text: "Our team comprises leading AI researchers, data scientists, and engineers dedicated to solving complex challenges.",
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    text: "Leverage our agile methodologies and pre-built components for faster time-to-market and quicker ROI.",
  },
  {
    icon: Users,
    title: "Partnership Approach",
    text: "We work collaboratively with you, ensuring our AI solutions align perfectly with your unique goals.",
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyXoireSection() {
  return (
    <section id="why-xoire" className="py-20 md:py-32 bg-background">
      <div className="container">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Why Partner with Xoire?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose Xoire to unlock unparalleled AI capabilities, drive innovation, and secure a competitive edge in your industry.
          </p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            {/* Placeholder for a 3D/abstract image */}
            <Image 
              src="https://placehold.co/600x500/00FF80/222222.png?text=Abstract+AI" 
              alt="Why Xoire illustration"
              width={600}
              height={500}
              className="rounded-lg shadow-xl object-cover w-full h-auto neon-border-primary"
              data-ai-hint="abstract network"
            />
          </MotionDiv>
          
          <MotionDiv 
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            {reasons.map((reason, index) => (
              <MotionDiv key={index} variants={itemVariants} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <reason.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.text}</p>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
