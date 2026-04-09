import { Bot, User } from "lucide-react";
import FocusScoreCard from "./FocusScoreCard";
import AppUsageCard from "./AppUsageCard";
import WeeklyTrendCard from "./WeeklyTrendCard";
import InsightCard from "./InsightCard";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: CardType[];
}

export type CardType =
  | { kind: "focus-score" }
  | { kind: "app-usage" }
  | { kind: "weekly-trend" }
  | { kind: "insight"; type: "warning" | "tip" | "positive"; title: string; description: string };

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 animate-fade-up ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        isUser ? "bg-primary/20" : "bg-secondary"
      }`}>
        {isUser ? <User className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-primary" />}
      </div>
      <div className={`flex-1 max-w-[85%] ${isUser ? "flex flex-col items-end" : ""}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-secondary text-secondary-foreground rounded-tl-sm"
        }`}>
          {message.content}
        </div>
        {message.cards && message.cards.length > 0 && (
          <div className="mt-3 space-y-3 w-full max-w-md">
            {message.cards.map((card, i) => {
              switch (card.kind) {
                case "focus-score": return <FocusScoreCard key={i} />;
                case "app-usage": return <AppUsageCard key={i} />;
                case "weekly-trend": return <WeeklyTrendCard key={i} />;
                case "insight": return <InsightCard key={i} type={card.type} title={card.title} description={card.description} />;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
