
"use client";
import MotionDiv from '@/components/motion/motion-div';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, BarChart3, Bot } from 'lucide-react';

const demos = [
  {
    id: "demo-tradetitan",
    title: "TradeTitan AI In Action",
    description: "See how TradeTitan AI analyzes markets and executes trades in real-time.",
    icon: BarChart3,
    videoPosterUrl: "https://placehold.co/1600x900/0A0A23/BF40BF.png?text=TradeTitan+Demo",
    videoSrc: "/videos/tradetitan-demo.mp4", // Example path, replace with your actual video file
    aiHint: "financial graph animation"
  },
  {
    id: "demo-autonexus",
    title: "AutoNexus Workflow Automation",
    description: "Watch AutoNexus streamline a complex business process from start to finish.",
    icon: PlayCircle,
    videoPosterUrl: "https://placehold.co/1600x900/0A0A23/A0A0D0.png?text=AutoNexus+Demo",
    videoSrc: "/videos/autonexus-demo.mp4", // Example path, replace with your actual video file
    aiHint: "process automation flowchart"
  },
  {
    id: "demo-leadspark",
    title: "LeadSpark AI Lead Gen Demo",
    description: "Discover how LeadSpark AI identifies and qualifies high-potential leads.",
    icon: Bot,
    videoPosterUrl: "https://placehold.co/1600x900/0A0A23/FFFFFF.png?text=LeadGen+Demo", // Updated text
    videoSrc: "/videos/leadspark-demo.mp4", // Example path, replace with your actual video file
    aiHint: "lead generation interface"
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


export default function ProductDemosSection() {
  return (
    <section id="demos" className="py-20 md:py-32 bg-gradient-to-b from-indigo-900/20 to-background">
      <div className="container">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Product Demonstrations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the power of Xoire's AI systems. See how they can revolutionize your operations.
          </p>
        </MotionDiv>

        <MotionDiv
          className="grid md:grid-cols-1 lg:grid-cols-1 gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {demos.map((demo) => (
            <MotionDiv key={demo.id} variants={itemVariants}>
              <Card className="glassmorphic group overflow-hidden border-primary/30 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 ease-out">
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <demo.icon className="w-10 h-10 text-primary" />
                    <CardTitle className="text-3xl font-headline group-hover:text-primary transition-colors">{demo.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    {demo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                    <video
                        controls
                        poster={demo.videoPosterUrl}
                        className="w-full h-full object-cover"
                        preload="metadata" // Good for performance, loads only metadata
                        data-ai-hint={demo.aiHint} // Keep hint for poster if needed
                    >
                        <source src={demo.videoSrc} type="video/mp4" />
                        {/* Add other source types if you have them, e.g., webm, ogg */}
                        {/* <source src={demo.videoSrc.replace('.mp4', '.webm')} type="video/webm" /> */}
                        Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Remember to place your video file at: public{demo.videoSrc}
                  </p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}

