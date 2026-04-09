import { useState, useCallback } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatArea from "@/components/ChatArea";
import { Message, CardType } from "@/components/ChatMessage";
import { sampleConversations, todayData, getFocusScoreLabel } from "@/lib/mockData";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function detectCards(userMsg: string): CardType[] {
  const lower = userMsg.toLowerCase();
  const cards: CardType[] = [];

  if (lower.includes("score") || lower.includes("productive") || lower.includes("how was") || lower.includes("how did")) {
    cards.push({ kind: "focus-score" });
  }
  if (lower.includes("app") || lower.includes("usage") || lower.includes("wasting") || lower.includes("time spent") || lower.includes("where")) {
    cards.push({ kind: "app-usage" });
  }
  if (lower.includes("week") || lower.includes("trend") || lower.includes("progress")) {
    cards.push({ kind: "weekly-trend" });
  }
  if (lower.includes("tip") || lower.includes("suggest") || lower.includes("improve") || lower.includes("help")) {
    cards.push({ kind: "insight", type: "tip", title: "Try the 20-20-20 Rule", description: "Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain and reset focus." });
    cards.push({ kind: "insight", type: "warning", title: "Late Night Pattern Detected", description: `Your peak distraction is ${todayData.peakDistraction}. Consider setting a wind-down timer.` });
  }

  return cards;
}

function generateLocalResponse(userMsg: string): { text: string; cards: CardType[] } {
  const lower = userMsg.toLowerCase();
  const cards = detectCards(userMsg);

  if (lower.includes("productive") || lower.includes("how was") || lower.includes("score")) {
    return {
      text: `Your focus score today is **${todayData.focusScore}/100** — that's "${getFocusScoreLabel(todayData.focusScore)}"! 🎯\n\nYou've spent ${(todayData.totalMinutes / 60).toFixed(1)} hours on your devices. VS Code dominated with 145 minutes of productive work, which is great. However, Instagram took 68 minutes — mainly during your peak distraction window (${todayData.peakDistraction}).\n\nOverall, a solid day with room to trim social media after 9 PM.`,
      cards: cards.length ? cards : [{ kind: "focus-score" }],
    };
  }

  if (lower.includes("wasting") || lower.includes("where") || lower.includes("app")) {
    return {
      text: `Looking at your app breakdown, here's where your time went today:\n\n📸 **Instagram** — 68 min (biggest time sink)\n▶️ **YouTube** — 42 min\n🐦 **Twitter/X** — 23 min\n\nThat's over 2 hours on social/entertainment apps. Your productive time on VS Code (145 min) is solid, but those social media minutes add up. Try setting app timers for Instagram after 8 PM!`,
      cards: cards.length ? cards : [{ kind: "app-usage" }],
    };
  }

  if (lower.includes("tip") || lower.includes("suggest") || lower.includes("improve") || lower.includes("focus")) {
    return {
      text: `Here are some personalized suggestions based on your patterns:\n\n1. **Set a 9 PM digital curfew** — Your peak distraction is ${todayData.peakDistraction}. Winding down earlier could boost tomorrow's score.\n\n2. **Use Pomodoro blocks** — Your VS Code sessions are long. Try 25-min focused sprints with 5-min breaks.\n\n3. **Instagram limit** — You're at 68 min today. Aiming for under 30 min would free up almost 40 minutes for other things.\n\nYou're on a ${todayData.streak}-day streak — keep it going! 🔥`,
      cards,
    };
  }

  if (lower.includes("week") || lower.includes("trend") || lower.includes("progress")) {
    return {
      text: `Here's your weekly focus trend! Your best day was Wednesday with a score of 85, and the dip on Friday (58) seems to be a common end-of-week pattern.\n\nOverall, you're averaging about 72 — which puts you in the "Good" range. Consistency is key — try to keep the weekend scores above 70! 📈`,
      cards: [{ kind: "weekly-trend" }, { kind: "focus-score" }],
    };
  }

  if (lower.includes("streak")) {
    return {
      text: `You're on a **${todayData.streak}-day streak**! 🔥 That means you've maintained healthy screen habits for ${todayData.streak} consecutive days. Keep it up — reaching 7 days unlocks the "Focus Week" badge!`,
      cards: [{ kind: "focus-score" }],
    };
  }

  return {
    text: `Great question! Based on your data, you've been using your devices for ${(todayData.totalMinutes / 60).toFixed(1)} hours today with a focus score of ${todayData.focusScore}. Your most-used app is VS Code (productive! ✅) but Instagram is a close second at 68 minutes.\n\nWant me to dive deeper into any specific area? Try asking about your focus score, app usage, or tips to improve! 💡`,
    cards: [],
  };
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations] = useState(sampleConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = useCallback((text: string) => {
    const userMsg: Message = { id: generateId(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const { text: responseText, cards } = generateLocalResponse(text);
      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: responseText,
        cards,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1200 + Math.random() * 800);
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setActiveConvId(null);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConvId}
        onSelect={(id) => { setActiveConvId(id); setSidebarOpen(false); }}
        onNewChat={handleNewChat}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ChatArea
        messages={messages}
        isLoading={isLoading}
        onSend={handleSend}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
    </div>
  );
};

export default Index;
