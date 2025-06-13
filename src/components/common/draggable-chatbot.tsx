
"use client";

import { useState, useRef, type MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { Maximize, Minus, MessageSquare, X as CloseIcon, GripVertical } from 'lucide-react';

// Updated EXTERNAL_CHATBOT_URL
const EXTERNAL_CHATBOT_URL = "https://xoire-co-assistant-fwh38p0w4-codingcmxs-projects.vercel.app";

const DraggableChatbot = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -9999, y: -9999 }); // Initial off-screen
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false); // New state for visibility control
  const dragOccurredRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const placeChatbot = () => {
      if (!draggableRef.current && !isMinimized) return; // Wait for ref if not minimized

      const currentWidth = isMinimized ? 60 : 380;
      const currentHeight = isMinimized ? 60 : 550;
      
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;

      // Ensure viewport dimensions are positive
      viewportWidth = Math.max(viewportWidth, currentWidth);
      viewportHeight = Math.max(viewportHeight, currentHeight);
      
      const targetX = viewportWidth - currentWidth - 20;
      const targetY = viewportHeight - currentHeight - 20;

      setPosition({ x: Math.max(0, targetX), y: Math.max(0, targetY) });
      if (!isReady) {
        setIsReady(true);
      }
    };

    placeChatbot(); // Initial placement
    window.addEventListener('resize', placeChatbot);

    // Recalculate on minimize/maximize
    // This might seem redundant with the dependency array, but ensures correct dimensions are used immediately
    return () => {
      window.removeEventListener('resize', placeChatbot);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMinimized, isMounted]); // isReady is intentionally not in the deps array for the initial setup part

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current) return;

    const targetIsButton = (e.target as HTMLElement).closest('button');
    if (targetIsButton) {
      return; 
    }
    
    setIsDragging(true);
    // Position is read directly when drag starts
    const rect = draggableRef.current.getBoundingClientRect();
    setInitialPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    dragOccurredRef.current = false;
    draggableRef.current.style.willChange = 'transform';
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
    const currentHandleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !draggableRef.current) return;
        e.preventDefault();
        dragOccurredRef.current = true;

        let newX = e.clientX - initialPos.x;
        let newY = e.clientY - initialPos.y;

        const currentWidth = draggableRef.current.offsetWidth;
        const currentHeight = draggableRef.current.offsetHeight;
        const safetyMargin = 20; // How close to edge it can get

        // Ensure it stays within viewport boundaries
        newX = Math.max(safetyMargin, Math.min(newX, window.innerWidth - currentWidth - safetyMargin));
        newY = Math.max(safetyMargin, Math.min(newY, window.innerHeight - currentHeight - safetyMargin));
        
        setPosition({ x: newX, y: newY });
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', currentHandleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', currentHandleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', currentHandleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialPos, setPosition]);


  const toggleMinimize = () => {
    setIsMinimized(prevMinimized => !prevMinimized);
  };

  const handleMinimizedClickOrKey = () => {
    if (!dragOccurredRef.current) { // Only toggle if not a drag
        toggleMinimize();
    }
  };
  
  if (!isMounted) {
    return null; 
  }

  const currentWidth = isMinimized ? 60 : 380;
  const currentHeight = isMinimized ? 60 : 550;

  return (
    <div
      ref={draggableRef}
      className={`fixed z-[9999] bg-card shadow-2xl rounded-lg border border-primary/50 flex flex-col ease-out ${
        isDragging ? 'cursor-grabbing' : (isMinimized ? 'cursor-pointer' : 'cursor-grab')
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${currentWidth}px`,
        height: `${currentHeight}px`,
        opacity: isReady ? 1 : 0, // Fade in when ready
        pointerEvents: isReady ? 'auto' : 'none', // Disable interactions until ready
        willChange: isDragging ? 'transform' : (isReady ? 'opacity, width, height' : 'auto'),
        transitionProperty: 'width, height, opacity',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-out',
      }}
      onMouseDown={isMinimized ? undefined : handleMouseDown} // Enable drag on header only when expanded
    >
      {/* Header: Draggable only when expanded */}
      <div
        className={`flex items-center justify-between p-2 bg-primary/10 border-b border-primary/30 select-none ${
           !isMinimized && !isDragging ? 'cursor-grab' : ''
        } ${
           !isMinimized && isDragging ? 'cursor-grabbing' : ''
        }`}
        onMouseDown={!isMinimized ? handleMouseDown : undefined}
      >
        <div className="flex items-center text-primary">
          {!isMinimized && <GripVertical size={18} className="mr-1 text-primary/50" />}
          <MessageSquare size={18} className="mr-2" />
          {!isMinimized && <span className="font-semibold text-sm">Xoire AI Assistant</span>}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={toggleMinimize} 
            className="p-1 rounded hover:bg-primary/20 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize size={14} /> : <Minus size={14} />}
          </button>
          {!isMinimized && (
            <button
                onClick={() => setIsMinimized(true)} 
                className="p-1 rounded hover:bg-destructive/20 text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/50"
                aria-label="Close chat (minimize)" 
            >
                <CloseIcon size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content Area: iframe or icon */}
      {!isMinimized ? (
        <div className="flex flex-col flex-grow overflow-hidden bg-background">
          {EXTERNAL_CHATBOT_URL === "https://your-external-chatbot-url.com" || EXTERNAL_CHATBOT_URL === "" ? ( 
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                <MessageSquare className="w-16 h-16 text-primary/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">External Chatbot Placeholder</h3>
                <p className="text-sm">
                    Please ensure <code className="bg-muted p-1 rounded text-xs">EXTERNAL_CHATBOT_URL</code> is correctly set.
                </p>
            </div>
          ) : (
            <iframe
              src={EXTERNAL_CHATBOT_URL}
              title="Xoire External AI Assistant"
              className="w-full h-full border-0"
              allow="microphone; camera; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            />
          )}
        </div>
      ) : (
        // Minimized view: Draggable icon area
        <div
            className="flex-grow flex items-center justify-center cursor-grab"
            onMouseDown={handleMouseDown} // Make minimized icon draggable
            onClick={handleMinimizedClickOrKey} // Click to expand
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

    