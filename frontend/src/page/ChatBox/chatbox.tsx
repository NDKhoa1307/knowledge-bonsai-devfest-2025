import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Types
interface Message {
  id: string;
  username: string;
  content: {
    text: string;
  };
  timesend: string;
  isAI?: boolean;
}

import { type KnowledgeTreeData } from '../../data/mockData';

interface ChatBoxProps {
  username: string;
  onTreeGenerated?: (treeData: KnowledgeTreeData) => void;
}

export const ChatBox = ({ username, onTreeGenerated }: ChatBoxProps) => {
  // --- Logic State (Kept exactly the same as your original code) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Socket Logic (Unchanged) ---
  useEffect(() => {
    const useMockMode = import.meta.env.VITE_MOCK_MODE === 'true' || !import.meta.env.VITE_API_BASE_URL;

    if (useMockMode) {
      console.log('⚠️ Running in MOCK MODE');
      setIsConnected(true);
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        username: 'Bonsai Guide',
        content: {
          text: "Greetings! I am your Knowledge Bonsai guide. 🌱\n\nTell me, what seed of knowledge would you like to plant today? (e.g., 'I want to learn React')",
        },
        timesend: new Date().toISOString(),
        isAI: true,
      };
      setMessages([welcomeMessage]);
      return;
    }

    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        username: 'Bonsai Guide',
        content: {
          text: "Greetings! I am your Knowledge Bonsai guide. 🌱\n\nTell me, what seed of knowledge would you like to plant today?",
        },
        timesend: new Date().toISOString(),
        isAI: true,
      };
      setMessages([welcomeMessage]);
    });

    socket.on('connect_error', () => {
      setIsConnected(false);
      setMessages((prev) => {
        if (prev.some(m => m.content.text.includes('Cannot connect'))) return prev;
        return [...prev, {
          id: Date.now().toString(),
          username: 'System',
          content: { text: '⚠️ Connection lost. Growing offline...' },
          timesend: new Date().toISOString(),
          isAI: true,
        }];
      });
    });

    socket.on('disconnect', () => setIsConnected(false));

    socket.on('ai-response', (data: Message) => {
      setMessages((prev) => [...prev, { ...data, isAI: true }]);
      setIsTyping(false);
    });

    socket.on('ai-typing', (typing: boolean) => setIsTyping(typing));

    socket.on('tree-generated', (treeData: KnowledgeTreeData) => {
      if (onTreeGenerated) onTreeGenerated(treeData);
    });

    return () => {
      socket.disconnect();
    };
  }, [onTreeGenerated]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Logic to Handle Send
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      username,
      content: { text: inputMessage },
      timesend: new Date().toISOString(),
      isAI: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    const messageText = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const useMockMode = import.meta.env.VITE_MOCK_MODE === 'true' || !import.meta.env.VITE_API_BASE_URL;

    if (useMockMode) {
      setTimeout(() => handleMockAIResponse(messageText), 1500);
    } else if (socketRef.current?.connected) {
      socketRef.current.emit('user-message', {
        username,
        content: { text: messageText },
        timesend: newMessage.timesend,
      });
    } else {
      setIsTyping(false);
    }
  };

  // Mock AI Logic (Simplified for UI demo)
  const handleMockAIResponse = (userMessage: string) => {
    const lower = userMessage.toLowerCase();
    let text = "That is a fascinating topic. I am preparing your seeds...";
    let shouldGenerate = false;

    if (lower.includes('front') || lower.includes('react')) {
      text = "🌱 Excellent choice. Front-end development is a vibrant ecosystem. I have prepared a curriculum covering React, Hooks, and State Management.";
      shouldGenerate = true;
    } else {
      text = "I can help you cultivate knowledge in many fields. Could you be more specific? Try 'Learn Python' or 'Master Photography'.";
    }

    setMessages((prev) => [...prev, {
      id: Date.now().toString(),
      username: 'Bonsai Guide',
      content: { text },
      timesend: new Date().toISOString(),
      isAI: true,
    }]);
    setIsTyping(false);

    if (shouldGenerate && onTreeGenerated) {
      setTimeout(() => {
        import('../../data/mockData').then(({ mockFrontendTree }) => onTreeGenerated(mockFrontendTree));
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // --- UI RENDER ---
  return (
    <div className="flex flex-col h-full bg-[#fafaf9] relative overflow-hidden font-sans">
      
      {/* Background Texture (Subtle Dots) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#44403c 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* 1. Glass Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* AI Avatar Icon */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center shadow-lg shadow-stone-200">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-emerald-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
                 </svg>
              </div>
              {/* Online Status Dot */}
              <span className={`absolute -bottom-1 -right-1 flex h-3 w-3`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
            </div>

            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-stone-800 tracking-tight">Bonsai AI</h2>
              <span className="text-xs text-stone-500 font-medium">
                 {isTyping ? 'Cultivating response...' : 'Ready to help'}
              </span>
            </div>
          </div>
          
          {/* Settings / Menu Icon (Visual only) */}
          <button className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
      </div>

      {/* 2. Messages Area */}
      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 sm:px-6 space-y-6 scroll-smooth">
        {messages.map((message, idx) => {
          const isLast = idx === messages.length - 1;
          return (
            <div
              key={message.id}
              className={`flex w-full ${message.isAI ? 'justify-start' : 'justify-end'} group animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {/* Message Bubble Container */}
              <div className={`flex max-w-[85%] sm:max-w-[75%] ${message.isAI ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
                
                {/* Small Avatar next to message */}
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] 
                  ${message.isAI ? 'bg-stone-200 text-stone-600' : 'bg-stone-800 text-white'}`}>
                  {message.isAI ? 'AI' : 'You'}
                </div>

                {/* The Bubble */}
                <div
                  className={`relative px-5 py-3.5 text-sm leading-relaxed shadow-sm
                    ${message.isAI 
                      ? 'bg-white text-stone-700 rounded-2xl rounded-bl-none border border-stone-100' 
                      : 'bg-stone-800 text-stone-50 rounded-2xl rounded-br-none'
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.content.text}</p>
                  
                  {/* Timestamp (visible on hover) */}
                  <div className={`text-[10px] mt-1 opacity-0 group-hover:opacity-70 transition-opacity duration-200 
                    ${message.isAI ? 'text-stone-400' : 'text-stone-400 text-right'}`}>
                    {formatTime(message.timesend)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator (Bubble style) */}
        {isTyping && (
          <div className="flex justify-start w-full animate-in fade-in duration-200">
             <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] text-stone-600">AI</div>
                <div className="bg-white border border-stone-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                </div>
             </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Floating Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9] to-transparent">
        <div className="max-w-4xl mx-auto relative bg-white rounded-[24px] shadow-xl shadow-stone-200/50 border border-stone-200 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50">
          
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What do you want to learn today?"
            className="w-full pl-6 pr-16 py-4 bg-transparent text-stone-800 placeholder:text-stone-400 rounded-[24px] focus:outline-none resize-none max-h-[150px] min-h-[56px]"
            rows={1}
            disabled={!isConnected}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
            }}
          />
          
          {/* Send Button (Absolute Positioned inside the Pill) */}
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || !isConnected}
            className={`absolute right-2 bottom-2 p-2.5 rounded-full transition-all duration-200 flex items-center justify-center
              ${inputMessage.trim() 
                ? 'bg-stone-800 text-white shadow-md hover:bg-stone-700 hover:scale-105' 
                : 'bg-stone-100 text-stone-300 cursor-not-allowed'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-0 ml-0.5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
        
        <div className="text-center mt-3">
           <p className="text-[10px] text-stone-400 font-medium">
             AI-Generated content can be inaccurate. Verify important information.
           </p>
        </div>
      </div>
    </div>
  );
};