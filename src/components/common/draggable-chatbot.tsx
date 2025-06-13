
"use client";

import { useState, useRef, type MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { Maximize, Minus, MessageSquare, X as CloseIcon, GripVertical } from 'lucide-react';
// Removed Input, ScrollArea, Button (for send), Loader2, Send, Sparkles as internal chat UI is removed
// Removed FormEvent, xoireChat types, MessageData

// Placeholder for the external chatbot URL - REPLACE THIS WITH YOUR ACTUAL URL
const EXTERNAL_CHATBOT_URL = "https://xoire-co-assistant.vercel.app";

const DraggableChatbot = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const dragOccurredRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const placeChatbot = () => {
      if (!draggableRef.current) return;
      const currentWidth = isMinimized ? 60 : 380;
      const currentHeight = isMinimized ? 60 : 550; // Height for the expanded iframe
      const initialX = window.innerWidth - currentWidth - 20;
      const initialY = window.innerHeight - currentHeight - 20;
      setPosition({ x: initialX > 0 ? initialX : 0, y: initialY > 0 ? initialY : 0 });
    };

    placeChatbot();
    window.addEventListener('resize', placeChatbot); // Reposition on resize

    return () => {
      window.removeEventListener('resize', placeChatbot);
    };
  }, [isMinimized, isMounted]);


  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current || !position) return;

    const targetIsButton = (e.target as HTMLElement).closest('button');
    if (targetIsButton) {
      return; 
    }
    
    setIsDragging(true);
    setInitialPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    dragOccurredRef.current = false;
    if (draggableRef.current) {
      draggableRef.current.style.willChange = 'transform';
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggableRef.current) return;
    e.preventDefault();
    dragOccurredRef.current = true;

    let newX = e.clientX - initialPos.x;
    let newY = e.clientY - initialPos.y;

    const currentWidth = draggableRef.current.offsetWidth;
    const currentHeight = draggableRef.current.offsetHeight;
    const safetyMargin = 50;

    newX = Math.max(-currentWidth + safetyMargin, Math.min(newX, window.innerWidth - safetyMargin));
    newY = Math.max(0, Math.min(newY, window.innerHeight - safetyMargin));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (draggableRef.current) {
        draggableRef.current.style.willChange = 'auto';
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, initialPos]); 

  const toggleMinimize = () => {
    setIsMinimized(prevMinimized => !prevMinimized);
  };

  const handleMinimizedClickOrKey = () => {
    if (!dragOccurredRef.current) {
        toggleMinimize();
    }
  };
  
  if (!isMounted || position === null) {
    return null; // Don't render until mounted and position is calculated
  }

  return (
    <div
      ref={draggableRef}
      className={`fixed z-[9999] bg-card shadow-2xl rounded-lg border border-primary/50 flex flex-col transition-all duration-300 ease-out ${
        isDragging ? 'cursor-grabbing' : '' 
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: isMinimized ? '60px' : '380px',
        height: isMinimized ? '60px' : '550px',
        opacity: position === null ? 0 : 1, // Hidden until position is set
        willChange: isDragging ? 'transform' : 'auto',
      }}
    >
      <div
        className={`flex items-center justify-between p-2 bg-primary/10 border-b border-primary/30 ${
          !isMinimized && !isDragging ? 'cursor-grab' : '' 
        } ${isMinimized && !isDragging ? 'cursor-grab' : ''}`} // Make minimized state also draggable
        onMouseDown={handleMouseDown} 
      >
        <div className="flex items-center text-primary select-none">
          {!isMinimized && <GripVertical size={18} className="mr-1 text-primary/50" />}
          <MessageSquare size={18} className="mr-2" />
          {!isMinimized && <span className="font-semibold text-sm">Xoire AI Assistant</span>}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={toggleMinimize} 
            className="p-1 rounded hover:bg-primary/20 text-primary"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize size={14} /> : <Minus size={14} />}
          </button>
          {!isMinimized && (
            <button
                onClick={() => setIsMinimized(true)} 
                className="p-1 rounded hover:bg-destructive/20 text-destructive"
                aria-label="Close chat (minimize)" 
            >
                <CloseIcon size={16} />
            </button>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col flex-grow overflow-hidden bg-background">
          {EXTERNAL_CHATBOT_URL === "https://your-external-chatbot-url.com" || EXTERNAL_CHATBOT_URL === "" ? ( // Added check for empty string too
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                <MessageSquare className="w-16 h-16 text-primary/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">External Chatbot Placeholder</h3>
                <p className="text-sm">
                    Please replace <code className="bg-muted p-1 rounded text-xs">EXTERNAL_CHATBOT_URL</code> in <code className="bg-muted p-1 rounded text-xs">DraggableChatbot.tsx</code> with the actual URL of your hosted chatbot.
                </p>
            </div>
          ) : (
            <iframe
              src={EXTERNAL_CHATBOT_URL}
              title="Xoire External AI Assistant"
              className="w-full h-full border-0"
              allow="microphone; camera; autoplay; encrypted-media; gyroscope; picture-in-picture" // Add permissions as needed by your external bot
            />
          )}
        </div>
      )}
       {isMinimized && (
        <div
            className={`flex-grow flex items-center justify-center ${
              !isDragging ? 'cursor-pointer' : '' // Changed cursor to pointer when not dragging minimized state
            }`}
            onClick={handleMinimizedClickOrKey}
            // onMouseDown is handled by the parent header for dragging now
            role="button"
            tabIndex={0}
            aria-label="Expand chat"
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleMinimizedClickOrKey()}
        >
            <MessageSquare size={24} className="text-primary animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default DraggableChatbot;
