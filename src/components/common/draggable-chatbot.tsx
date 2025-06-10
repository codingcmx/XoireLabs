
"use client";

import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { BotMessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

const DraggableChatbot = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [isInitialised, setIsInitialised] = useState(false);
  const chatbotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && chatbotRef.current) {
      // Ensure the element has rendered to get its dimensions for initial positioning
      const elemWidth = chatbotRef.current.offsetWidth || 320; // Default width
      const elemHeight = chatbotRef.current.offsetHeight || 450; // Default height
      
      const initialX = window.innerWidth - elemWidth - 20; // 20px padding from right
      const initialY = window.innerHeight - elemHeight - 20; // 20px padding from bottom
      setPosition({ x: initialX, y: initialY });
      setIsInitialised(true);
    }
  }, []);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!chatbotRef.current) return;
    // Only allow dragging if the mousedown is on the header part
    const target = e.target as HTMLElement;
    if (!target.closest('.chatbot-drag-handle')) {
      return;
    }

    setDragging(true);
    const rect = chatbotRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !chatbotRef.current) return;
      
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      const { offsetWidth, offsetHeight } = chatbotRef.current;
      newX = Math.max(0, Math.min(newX, window.innerWidth - offsetWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - offsetHeight));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection globally
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [dragging, offset]);

  const initialStyle = !isInitialised ? { opacity: 0, pointerEvents: 'none' as 'none' } : {};

  return (
    <div
      ref={chatbotRef}
      className={cn(
        "fixed z-[9999] bg-card text-card-foreground rounded-lg shadow-2xl border border-primary/30 overflow-hidden transition-shadow",
        dragging && "cursor-grabbing shadow-primary/30 shadow-xl",
        !dragging && "cursor-grab",
        isInitialised ? "opacity-100" : "opacity-0"
      )}
      style={{
        ...initialStyle,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '320px', 
        height: '450px', 
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="chatbot-drag-handle h-12 bg-primary text-primary-foreground flex items-center justify-between px-4 select-none cursor-inherit">
        <h3 className="font-semibold text-lg">AI Assistant</h3>
        <BotMessageSquare className="w-6 h-6" />
      </div>
      <iframe
        src="https://xoire-s-vision.vercel.app"
        title="Xoire AI Chatbot"
        className="w-full border-0"
        style={{ height: 'calc(100% - 3rem)' }} // 3rem is the height of the header
        allow="microphone; camera" // Optional, for potential chatbot features
      ></iframe>
    </div>
  );
};

export default DraggableChatbot;
