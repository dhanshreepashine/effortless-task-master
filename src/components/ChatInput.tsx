import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "How productive was I today?",
  "Where am I wasting time?",
  "Show my focus score",
  "Give me a focus tip",
];

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-xl p-4">
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSend(s)}
            disabled={disabled}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/50 text-secondary-foreground hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-40"
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            {s}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your focus, habits, or screen time..."
          disabled={disabled}
          className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
