import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BotMessageSquareIcon } from 'lucide-react';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Systems', href: '#systems' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Xoire', href: '#why-xoire' },
  { label: 'FAQs', href: '#faq' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BotMessageSquareIcon className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary neon-text-primary">XOIRE</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" className="neon-border-accent hover:shadow-neon-accent">Login</Button>
            <Button className="animate-pulse-glow">Get Started</Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <nav className="flex flex-col space-y-4 pt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline" className="neon-border-accent hover:shadow-neon-accent">Login</Button>
                    <Button className="animate-pulse-glow">Get Started</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
