
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MotionDiv from '@/components/motion/motion-div';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Zap, Users } from 'lucide-react';

interface System {
  id: string;
  name: string;
  description: string;
  imageSrc: string; // Fallback image if video/iframe fails or for non-video cards
  aiHintCard: string;
  videoSrc: string; // Can be YouTube link or direct video file URL
  videoPosterUrl: string; // Poster for video tag
  aiHintVideo: string;
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
    imageSrc: "https://placehold.co/600x400/0A0A23/BF40BF.png?text=TradeTitan+Card",
    aiHintCard: "trading graph",
    videoSrc: "https://youtu.be/EEX0EHTTePE?si=pmXknRrayW-DgV4e",
    videoPosterUrl: "https://placehold.co/600x300/0A0A23/BF40BF.png?text=TradeTitan+Video+Poster",
    aiHintVideo: "financial graph animation",
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
    imageSrc: "https://placehold.co/600x400/0A0A23/A0A0D0.png?text=AutoNexus+Card",
    aiHintCard: "flow chart",
    videoSrc: "https://your-video-hosting.com/path-to/autonexus-system-demo.mp4", // Placeholder for external video
    videoPosterUrl: "https://placehold.co/600x300/0A0A23/A0A0D0.png?text=AutoNexus+Video+Poster",
    aiHintVideo: "process automation flowchart",
    details: [
      { feature: "AI-driven decision making", benefit: "Optimizes operational efficiency." },
      { feature: "Seamless system integration", benefit: "Connects disparate software and platforms." },
      { feature: "Scalable automation", benefit: "Adapts to growing business needs." },
    ]
  },
  {
    id: "leadspark",
    name: "LeadSpark AI",
    description: "AI-driven lead discovery, qualification, and engagement engine.",
    imageSrc: "https://placehold.co/600x400/0A0A23/FFFFFF.png?text=LeadSpark+Card",
    aiHintCard: "connections network",
    videoSrc: "https://your-video-hosting.com/path-to/leadspark-system-demo.mp4", // Placeholder for external video
    videoPosterUrl: "https://placehold.co/600x300/0A0A23/FFFFFF.png?text=LeadSpark+Video+Poster",
    aiHintVideo: "lead generation interface",
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

function getYoutubeEmbedUrl(url: string): string | null {
  let videoId = null;
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('watch?v=')[1]?.split('&')[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('shorts/')[1]?.split('?')[0];
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}

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
          {systems.map((system) => {
            const cardEmbedUrl = getYoutubeEmbedUrl(system.videoSrc);
            const cardVideoId = cardEmbedUrl ? cardEmbedUrl.split('/').pop() : null; // Used for playlist loop

            return (
              <MotionDiv
                key={system.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 20px hsl(var(--accent)/0.15), 0 3px 6px hsl(var(--accent)/0.1)" }}
                className="h-full"
              >
                <Card className="glassmorphic group h-full flex flex-col overflow-hidden border-accent/30 hover:border-accent/70 transition-all duration-300 ease-out">
                  <CardHeader className="p-0 relative aspect-[16/9] overflow-hidden">
                    {cardEmbedUrl && cardVideoId ? (
                       <iframe
                        src={`${cardEmbedUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cardVideoId}&playsinline=1&modestbranding=1&rel=0`}
                        title={`${system.name} Preview`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={system.aiHintVideo}
                      ></iframe>
                    ) : ( // Fallback for non-YouTube or if ID extraction fails
                      <video
                        src={system.videoSrc} // Direct URL
                        poster={system.videoPosterUrl || system.imageSrc}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={system.aiHintVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-2xl font-headline mb-2 group-hover:text-accent transition-colors">{system.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{system.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full group/button border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-primary/30">
                          <Eye className="mr-2 h-4 w-4 group-hover/button:animate-pulse" /> View System Details & Demo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl md:max-w-3xl glassmorphic border-primary/50">
                        <DialogHeader>
                          <DialogTitle className="font-headline text-3xl text-primary">{system.name}</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            {system.description} Watch the demo and explore key features below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                            {getYoutubeEmbedUrl(system.videoSrc) ? ( 
                              <iframe
                                src={`${getYoutubeEmbedUrl(system.videoSrc)}?rel=0&modestbranding=1`} 
                                title={`${system.name} Demo`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full object-cover"
                                data-ai-hint={system.aiHintVideo}
                              ></iframe>
                            ) : (
                              <video
                                src={system.videoSrc} // Direct URL
                                poster={system.videoPosterUrl}
                                className="w-full h-full object-cover"
                                preload="metadata"
                                data-ai-hint={system.aiHintVideo}
                                controls
                              >
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2 text-foreground">Key Features & Benefits:</h4>
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
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>
    </section>
  );
}
