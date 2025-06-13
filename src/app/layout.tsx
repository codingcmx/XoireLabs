
import type { Metadata } from 'next';
import type { ReactNode } from 'react'; 
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
// Removed DraggableChatbot import

export const metadata: Metadata = {
  title: 'Xoire AI: The 5th Dimension',
  description: 'Build Smart. Scale Faster. Rule with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode; 
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        {/* Removed DraggableChatbot component here */}
      </body>
    </html>
  );
}

    
