export const TypingIndicator = () => {
  return (
    <div className="flex justify-start w-full animate-in fade-in duration-200">
      <div className="flex items-end gap-2">
        <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] text-stone-600">
          AI
        </div>
        <div className="bg-white border border-stone-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

