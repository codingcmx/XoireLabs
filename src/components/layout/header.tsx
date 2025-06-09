
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, BotMessageSquareIcon } from 'lucide-react';

const navItemsBase = [
  { label: 'Services', href: '/#services' }, // Ensure homepage links work from other pages
  { label: 'Systems', href: '/#systems' },
  { label: 'Demos', href: '/#demos' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Why Xoire', href: '/#why-xoire' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Book Meeting', href: '/book-meeting' }, // Changed to direct link
];

// Removed HeaderProps interface as onTriggerBookingModal is no longer needed

export default function Header() { // Removed onTriggerBookingModal prop
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BotMessageSquareIcon className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">XOIRE</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItemsBase.map((item) => (
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
            <Button variant="outline" className="border-accent hover:bg-accent/10 hover:text-accent-foreground">Login</Button>
            <Button asChild>
              <Link href="/book-meeting">Get Started</Link>
            </Button>
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
                {navItemsBase.map((item) => (
                   <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline" className="border-accent hover:bg-accent/10 hover:text-accent-foreground w-full">Login</Button>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/book-meeting">Get Started</Link>
                      </Button>
                    </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
