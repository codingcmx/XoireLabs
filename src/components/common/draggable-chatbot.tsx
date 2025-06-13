
"use client";

import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent, type KeyboardEvent } from 'react';
import { BotMessageSquare, X, Maximize2, Minimize2, MessageSquare, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the external chatbot URL here
const EXTERNAL_CHATBOT_URL = "https://xoire-co-assistant-git-main-codingcmxs-projects.vercel.app";
// const EXTERNAL_CHATBOT_URL = "https://xoire-co-assistant.vercel.app";
// const EXTERNAL_CHATBOT_URL = ""; // Example: Set to an empty string to show placeholder
// const EXTERNAL_CHATBOT_URL = "https://your-external-chatbot-url.com"; // Placeholder for user

const MINIMIZED_WIDTH = 60;
const MINIMIZED_HEIGHT = 60;
const EXPANDED_WIDTH = 380;
const EXPANDED_HEIGHT = 550;
const HEADER_HEIGHT = 48; // Approx height of the header bar

interface Position {
  x: number;
  y: number;
}

const DraggableChatbot = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(true);
  const [isReady, setIsReady] = useState(false); // To control initial visibility
  const [iframeKey, setIframeKey] = useState(Date.now()); // For reloading iframe
  const draggableRef = useRef<HTMLDivElement>(null);

  const placeChatbot = () => {
    const currentWidth = isMinimized ? MINIMIZED_WIDTH : EXPANDED_WIDTH;
    const currentHeight = isMinimized ? MINIMIZED_HEIGHT : EXPANDED_HEIGHT;
    
    const targetX = window.innerWidth - currentWidth - 20; // 20px padding from right
    const targetY = window.innerHeight - currentHeight - 20; // 20px padding from bottom
    
    setPosition({ x: targetX, y: targetY });
    if (!isReady) {
      setIsReady(true); // Make it visible after initial placement
    }
  };

  useEffect(() => {
    placeChatbot(); // Initial placement
    window.addEventListener('resize', placeChatbot);
    return () => window.removeEventListener('resize', placeChatbot);
  }, [isMinimized]); // Re-run on minimize/expand

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current) return;
    const target = e.target as HTMLElement;
    if (!target.closest('.chatbot-drag-handle')) return;

    setIsDragging(true);
    const rect = draggableRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !draggableRef.current) return;
      
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      const currentWidth = draggableRef.current.offsetWidth;
      const currentHeight = draggableRef.current.offsetHeight;
      
      newX = Math.max(0, Math.min(newX, window.innerWidth - currentWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - currentHeight));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = '';
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleReloadIframe = () => {
    setIframeKey(Date.now());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && !isMinimized) {
      setIsMinimized(true);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch (_) {
      return false;
    }
  };

  const showPlaceholder = !EXTERNAL_CHATBOT_URL || !isValidUrl(EXTERNAL_CHATBOT_URL);

  return (
    <div
      ref={draggableRef}
      className={cn(
        "fixed z-[9999] bg-card text-card-foreground rounded-lg shadow-2xl border border-primary/30 overflow-hidden transition-all duration-300 ease-in-out",
        isDragging && "cursor-grabbing shadow-primary/50 scale-105",
        !isDragging && "cursor-grab",
        isMinimized ? "p-0" : "p-0", 
        isReady ? "opacity-100" : "opacity-0 pointer-events-none" 
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? `${MINIMIZED_WIDTH}px` : `${EXPANDED_WIDTH}px`,
        height: isMinimized ? `${MINIMIZED_HEIGHT}px` : `${EXPANDED_HEIGHT}px`,
      }}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0} 
      aria-label={isMinimized ? "Open AI Assistant" : "AI Assistant Window"}
      role="dialog" 
      aria-modal={!isMinimized}
    >
      {/* Header Bar */}
      <div 
        className={cn(
          "chatbot-drag-handle h-12 bg-primary text-primary-foreground flex items-center justify-between px-3 select-none cursor-inherit",
          isMinimized && "rounded-lg" 
        )}
      >
        {isMinimized ? (
          <button
            onClick={toggleMinimize}
            className="w-full h-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 rounded-lg transition-colors"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
          <>
            <div className="flex items-center">
              <BotMessageSquare className="w-6 h-6 mr-2" />
              <h3 className="font-semibold text-lg">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={handleReloadIframe} 
                className="p-1.5 hover:bg-primary/80 rounded-md transition-colors" 
                aria-label="Reload Chatbot"
                title="Reload Chatbot"
              >
                <RotateCcw className="w-4 h-4"/>
              </button>
              <button 
                onClick={toggleMinimize} 
                className="p-1.5 hover:bg-primary/80 rounded-md transition-colors" 
                aria-label={isMinimized ? "Maximize" : "Minimize"}
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
               <button 
                onClick={toggleMinimize} 
                className="p-1.5 hover:bg-red-500/80 rounded-md transition-colors" 
                aria-label="Close Chatbot"
                title="Close Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Content Area (Iframe or Placeholder) */}
      {!isMinimized && (
        <div className="w-full bg-background" style={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}>
          {showPlaceholder ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
              <BotMessageSquare className="w-12 h-12 text-primary/50 mb-4" />
              <h4 className="font-semibold text-lg mb-2">Chatbot Not Configured</h4>
              <p className="text-sm">
                Please set a valid <code className="bg-muted px-1 py-0.5 rounded text-xs">EXTERNAL_CHATBOT_URL</code> in <br/>
                <code className="bg-muted px-1 py-0.5 rounded text-xs">src/components/common/draggable-chatbot.tsx</code>.
              </p>
            </div>
          ) : (
            <iframe
              key={iframeKey} // Use key to force re-render on reload
              src={EXTERNAL_CHATBOT_URL}
              title="AI Assistant Chatbot"
              className="w-full h-full border-0"
              allow="microphone; camera" // Optional, for potential chatbot features
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableChatbot;

