import { useRef } from 'react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isConnected: boolean;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  isConnected, 
  onSendMessage,
  onKeyPress 
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9] to-transparent">
      <div className="max-w-4xl mx-auto relative bg-white rounded-[24px] shadow-xl shadow-stone-200/50 border border-stone-200 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50">
        
        <textarea
          ref={textareaRef}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="What do you want to learn today?"
          className="w-full pl-6 pr-16 py-4 bg-transparent text-stone-800 placeholder:text-stone-400 rounded-[24px] focus:outline-none resize-none max-h-[150px] min-h-[56px]"
          rows={1}
          disabled={!isConnected}
          onInput={handleInput}
        />
        
        {/* Send Button (Absolute Positioned inside the Pill) */}
        <button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || !isConnected}
          className={`absolute right-2 bottom-2 p-2.5 rounded-full transition-all duration-200 flex items-center justify-center
            ${inputMessage.trim() 
              ? 'bg-stone-800 text-white shadow-md hover:bg-stone-700 hover:scale-105' 
              : 'bg-stone-100 text-stone-300 cursor-not-allowed'
            }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 transform rotate-0 ml-0.5"
          >
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
  );
};

