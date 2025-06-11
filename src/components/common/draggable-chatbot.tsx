
"use client";

import { useState, useRef, type MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { Maximize, Minus, MessageSquare, X as CloseIcon, GripVertical } from 'lucide-react';

const DraggableChatbot = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Changed to true for minimized by default
  const [isShown, setIsShown] = useState(true);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set initial position to bottom-right
    // Uses the current value of isMinimized to determine initial size for positioning
    const currentWidth = isMinimized ? 60 : 350;
    const currentHeight = isMinimized ? 60 : 500;
    const initialX = window.innerWidth - currentWidth - 20; 
    const initialY = window.innerHeight - currentHeight - 20;
    setPosition({ x: initialX > 0 ? initialX : 0, y: initialY > 0 ? initialY : 0 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMinimized]); // Added isMinimized here so it re-calculates if default state changes, though for initial it's fine.


  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current || e.target instanceof HTMLButtonElement || (e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsDragging(true);
    const rect = draggableRef.current.getBoundingClientRect();
    setInitialPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggableRef.current) return;
    e.preventDefault(); 

    let newX = e.clientX - initialPos.x;
    let newY = e.clientY - initialPos.y;

    const boundaryOffset = 10;
    newX = Math.max(-draggableRef.current.offsetWidth + 50, Math.min(newX, window.innerWidth - 50)); 
    newY = Math.max(0, Math.min(newY, window.innerHeight - 50));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
  }, [isDragging, initialPos]);

  if (!isMounted || !isShown) {
    return null; 
  }

  return (
    <div
      ref={draggableRef}
      className={`fixed z-[9999] bg-card shadow-2xl rounded-lg border border-primary/50 flex flex-col transition-all duration-300 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-default'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? '60px' : '350px',
        height: isMinimized ? '60px' : '500px',
        overflow: 'hidden',
      }}
    >
      <div
        className={`flex items-center justify-between p-2 bg-primary/10 border-b border-primary/30 ${!isMinimized && 'cursor-grab'}`}
        onMouseDown={!isMinimized ? handleMouseDown : undefined}
      >
        <div className="flex items-center text-primary">
          {!isMinimized && <GripVertical size={18} className="mr-1 text-primary/50" />}
          <MessageSquare size={18} className="mr-2" />
          {!isMinimized && <span className="font-semibold text-sm select-none">Xoire AI Assistant</span>}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded hover:bg-primary/20 text-primary"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize size={14} /> : <Minus size={14} />}
          </button>
          <button
            onClick={() => setIsShown(false)}
            className="p-1 rounded hover:bg-destructive/20 text-destructive"
            aria-label="Close chat"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex-grow p-0 bg-background">
          <iframe
            src="https://xoire-s-vision.vercel.app"
            title="Xoire AI Chatbot"
            className="w-full h-full border-none"
            allow="microphone" 
          />
        </div>
      )}
       {isMinimized && (
        <div 
            className="flex-grow flex items-center justify-center cursor-pointer"
            onClick={() => setIsMinimized(false)}
            role="button"
            tabIndex={0}
            aria-label="Expand chat"
            onKeyDown={(e) => e.key === 'Enter' && setIsMinimized(false)}
        >
            <MessageSquare size={24} className="text-primary animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default DraggableChatbot;
