import Link from 'next/link';
import { BotMessageSquareIcon, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container max-w-screen-2xl text-center">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <BotMessageSquareIcon className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-primary">XOIRE</span>
          </Link>
          <p className="text-muted-foreground max-w-md">
            Build Smart. Scale Faster. Rule with AI. Xoire delivers full-stack AI systems for visionary businesses.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Xoire AI. All rights reserved.
          </p>
          <div className="text-sm text-muted-foreground space-x-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
