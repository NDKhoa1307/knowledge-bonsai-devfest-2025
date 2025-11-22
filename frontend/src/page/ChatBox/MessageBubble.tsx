import { type Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div
      className={`flex w-full ${
        message.isAI ? 'justify-start' : 'justify-end'
      } group animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      {/* Message Bubble Container */}
      <div 
        className={`flex max-w-[85%] sm:max-w-[75%] ${
          message.isAI ? 'flex-row' : 'flex-row-reverse'
        } items-end gap-2`}
      >
        
        {/* Small Avatar next to message */}
        <div 
          className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] ${
            message.isAI ? 'bg-stone-200 text-stone-600' : 'bg-stone-800 text-white'
          }`}
        >
          {message.isAI ? 'AI' : 'You'}
        </div>

        {/* The Bubble */}
        <div
          className={`relative px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
            message.isAI 
              ? 'bg-white text-stone-700 rounded-2xl rounded-bl-none border border-stone-100' 
              : 'bg-stone-800 text-stone-50 rounded-2xl rounded-br-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content.text}</p>
          
          {/* Timestamp (visible on hover) */}
          <div 
            className={`text-[10px] mt-1  ${
              message.isAI ? 'text-stone-400' : 'text-stone-400 text-right'
            }`}
          >
            {formatTime(message.timesend)}
          </div>
        </div>
      </div>
    </div>
  );
};

