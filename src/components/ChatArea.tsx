import { useRef, useEffect } from "react";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { Brain, Menu, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSend: (message: string) => void;
  onOpenSidebar: () => void;
}

const ChatArea = ({ messages, isLoading, onSend, onOpenSidebar }: ChatAreaProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button onClick={onOpenSidebar} className="md:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Brain className="w-5 h-5 text-primary" />
          <div>
            <h1 className="text-sm font-semibold">FocusAI Coach</h1>
            <p className="text-[11px] text-muted-foreground">Your digital wellness assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Dashboard
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-focus-positive animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 glow-primary">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Hi! I'm your FocusAI Coach</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Ask me about your screen time, focus score, app usage, or tips to improve your digital wellness.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSend} disabled={isLoading} />
    </div>
  );
};

export default ChatArea;
