
"use client";

import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent, type KeyboardEvent } from 'react';
import { BotMessageSquare, X, Maximize2, Minimize2, MessageSquare, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the external chatbot URL here
const EXTERNAL_CHATBOT_URL = "https://xoire-co-assistant.vercel.app";

const MINIMIZED_WIDTH = 60;
const MINIMIZED_HEIGHT = 60;
const EXPANDED_WIDTH = 410; // Increased from 400
const EXPANDED_HEIGHT = 680; // Increased from 620
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
    // Initial placement logic removed from here, handled by the effect below with isReady
    window.addEventListener('resize', placeChatbot);
    return () => window.removeEventListener('resize', placeChatbot);
  }, [isMinimized]); // Re-run on minimize/expand

  useEffect(() => {
    // This effect runs once on mount and when isMinimized changes,
    // ensuring placeChatbot is called after the DOM is ready and dimensions are known.
    placeChatbot();
  }, [isMinimized, isReady]); // Depend on isReady to ensure it runs after initial setup if needed

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current) return;
    const target = e.target as HTMLElement;
    // Allow dragging only via the header or if minimized (the whole thing is a drag handle)
    if (!isMinimized && !target.closest('.chatbot-drag-handle')) return;

    setIsDragging(true);
    const rect = draggableRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.userSelect = 'none';
    e.preventDefault(); // Prevent text selection while dragging
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !draggableRef.current) return;
      
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      // Use the component's current dimensions for boundary checks
      const componentWidth = draggableRef.current.offsetWidth;
      const componentHeight = draggableRef.current.offsetHeight;
      
      newX = Math.max(0, Math.min(newX, window.innerWidth - componentWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - componentHeight));
      
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
      document.body.style.userSelect = ''; // Clean up on unmount or if dragging stops
    };
  }, [isDragging, dragOffset]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    // No need to call placeChatbot here, useEffect for isMinimized will handle it
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

  const showPlaceholder = !EXTERNAL_CHATBOT_URL || !isValidUrl(EXTERNAL_CHATBOT_URL) || EXTERNAL_CHATBOT_URL === "https://your-external-chatbot-url.com";

  return (
    <div
      ref={draggableRef}
      className={cn(
        "fixed z-[9999] bg-card text-card-foreground rounded-lg shadow-2xl border border-primary/30 overflow-hidden transition-all duration-300 ease-in-out",
        isDragging && "cursor-grabbing shadow-primary/50 scale-105",
        !isDragging && (isMinimized ? "cursor-pointer" : "cursor-grab"), // Grab cursor for header
        isMinimized ? "p-0" : "p-0", // Padding handled by inner elements
        isReady ? "opacity-100" : "opacity-0 pointer-events-none" // Control visibility
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? `${MINIMIZED_WIDTH}px` : `${EXPANDED_WIDTH}px`,
        height: isMinimized ? `${MINIMIZED_HEIGHT}px` : `${EXPANDED_HEIGHT}px`,
      }}
      onMouseDown={handleMouseDown} // Mouse down on the whole div
      onKeyDown={handleKeyDown} // For Esc key
      tabIndex={0} // Make it focusable
      aria-label={isMinimized ? "Open AI Assistant" : "AI Assistant Window"}
      role="dialog" // Appropriate role
      aria-modal={!isMinimized}
    >
      {/* Header Bar - acts as drag handle when expanded */}
      <div 
        className={cn(
          "chatbot-drag-handle h-12 bg-primary text-primary-foreground flex items-center justify-between px-3 select-none",
          isMinimized && "rounded-lg cursor-pointer w-full h-full", // Full area clickable when minimized
          !isMinimized && "cursor-inherit" // Inherit grab cursor when expanded
        )}
        onClick={isMinimized ? toggleMinimize : undefined} // Toggle on click only when minimized
      >
        {isMinimized ? (
          <div className="w-full h-full flex items-center justify-center"> {/* Ensure icon is centered */}
            <MessageSquare className="w-6 h-6" />
          </div>
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
                onClick={toggleMinimize} // This button now effectively acts as a close by minimizing
                className="p-1.5 hover:bg-red-500/80 rounded-md transition-colors" 
                aria-label="Close Chatbot" // "Close" is more intuitive than minimize for the X icon
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
               <p className="text-xs mt-2">
                (e.g., <code className="bg-muted px-1 py-0.5 rounded text-xs">https://your-chatbot.vercel.app</code>)
              </p>
            </div>
          ) : (
            <iframe
              key={iframeKey} // Use key to force re-render on reload
              src={EXTERNAL_CHAbot_URL}
              title="AI Assistant Chatbot"
              className="w-full h-full border-0"
              allow="microphone; camera" // Optional, for potential chatbot features
              loading="lazy"
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableChatbot;
