
"use client";

import { useState, useRef, type MouseEvent as ReactMouseEvent, useEffect, type FormEvent } from 'react';
import { Maximize, Minus, MessageSquare, X as CloseIcon, GripVertical, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { xoireChat, type XoireChatInput, type XoireChatOutput } from '@/ai/flows/xoire-chat-flow'; // Assuming external for now
import type { MessageData } from 'genkit';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

// Simulate the types if xoireChat is external for now
interface XoireChatInput {
  message: string;
  history?: MessageData[];
}
interface XoireChatOutput {
  response: string;
}


const DraggableChatbot = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dragOccurredRef = useRef(false);


  useEffect(() => {
    setIsMounted(true);
    // Initial positioning logic
    const placeChatbot = () => {
      if (!draggableRef.current) return;
      const currentWidth = isMinimized ? 60 : 380;
      const currentHeight = isMinimized ? 60 : 550;
      const initialX = window.innerWidth - currentWidth - 20;
      const initialY = window.innerHeight - currentHeight - 20;
      setPosition({ x: initialX > 0 ? initialX : 0, y: initialY > 0 ? initialY : 0 });
    };
    placeChatbot(); // Call on mount and when isMinimized changes

    if (!isMinimized && messages.length === 0) {
      setMessages([{id: 'initial-greeting', role: 'bot', text: "Hello! I'm the Xoire AI Assistant. How can I help you learn about Xoire AI today?"}]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMinimized, isMounted]); // Removed messages.length from deps to avoid re-greeting on send


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!draggableRef.current) return;

    // Prevent drag initiation if clicking on interactive elements within the header (buttons for min/close)
    // This check is primarily for the expanded state.
    if (!isMinimized) {
      const targetIsInteractiveInHeader =
        e.target instanceof HTMLButtonElement ||
        (e.target as HTMLElement).closest('button');
      if (targetIsInteractiveInHeader) {
        return;
      }
    }

    setIsDragging(true);
    const rect = draggableRef.current.getBoundingClientRect();
    setInitialPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    dragOccurredRef.current = false; // Reset for this interaction
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggableRef.current) return;
    e.preventDefault();
    dragOccurredRef.current = true; // A drag movement happened

    let newX = e.clientX - initialPos.x;
    let newY = e.clientY - initialPos.y;

    // Boundary checks (ensure chat window stays somewhat visible)
    const currentWidth = draggableRef.current.offsetWidth;
    const currentHeight = draggableRef.current.offsetHeight;
    const safetyMargin = 50; // How much of the chatbot must remain visible

    newX = Math.max(-currentWidth + safetyMargin, Math.min(newX, window.innerWidth - safetyMargin));
    newY = Math.max(0, Math.min(newY, window.innerHeight - safetyMargin));


    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    // dragOccurredRef.current is now set if a drag happened.
    // It will be reset on the next mousedown.
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

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessageText = inputValue.trim();
    if (!userMessageText || isLoading) return;

    const newUserMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: userMessageText };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    
    const historyForAPI: MessageData[] = messages
      .filter(msg => msg.id !== 'initial-greeting')
      .map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user', 
        parts: [{ text: msg.text }],
    }));

    const input: XoireChatInput = {
      message: userMessageText,
      history: historyForAPI,
    };

    try {
      const externalApiUrl = "https://jsonplaceholder.typicode.com/posts"; // Placeholder
      
      const response = await fetch(externalApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to parse error response" }));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      
      const apiResult = await response.json();
      const result: XoireChatOutput = { response: apiResult.title || "Placeholder response from external API" };


      const botResponse: ChatMessage = { id: (Date.now() + 1).toString(), role: 'bot', text: result.response };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Error calling external chatbot API:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred with the AI chat.";
      const errorResponse: ChatMessage = { id: (Date.now() + 1).toString(), role: 'bot', text: `Error: ${errorMessage}` };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(prevMinimized => {
        const nextMinimized = !prevMinimized;
        if (!nextMinimized && messages.length === 0) { 
            setMessages([{id: 'initial-greeting', role: 'bot', text: "Hello! I'm the Xoire AI Assistant. How can I help you learn about Xoire AI today?"}]);
        }
        return nextMinimized;
    });
  };

  const handleMinimizedClickOrKey = () => {
    if (!dragOccurredRef.current) {
        toggleMinimize();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={draggableRef}
      className={`fixed z-[9999] bg-card shadow-2xl rounded-lg border border-primary/50 flex flex-col transition-all duration-300 ease-out ${
        isDragging ? 'cursor-grabbing' : '' 
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? '60px' : '380px',
        height: isMinimized ? '60px' : '550px',
      }}
    >
      <div
        className={`flex items-center justify-between p-2 bg-primary/10 border-b border-primary/30 ${
          !isMinimized && !isDragging ? 'cursor-grab' : '' 
        }`}
        onMouseDown={!isMinimized ? handleMouseDown : undefined} 
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
          <ScrollArea className="flex-grow p-4 space-y-3" ref={chatContainerRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-md ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.text.split('\\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < msg.text.split('\\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-md bg-muted text-muted-foreground flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse text-primary" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-3 border-t border-primary/30 bg-background">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask Xoire AI..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-input border-border focus:ring-primary"
                disabled={isLoading}
                aria-label="Chat message input"
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      )}
       {isMinimized && (
        <div
            className={`flex-grow flex items-center justify-center ${
              !isDragging ? 'cursor-grab' : '' 
            }`}
            onClick={handleMinimizedClickOrKey}
            onMouseDown={handleMouseDown} 
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

      