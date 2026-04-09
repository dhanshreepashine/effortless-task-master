export interface AppUsage {
  name: string;
  category: "social" | "productivity" | "entertainment" | "communication" | "other";
  minutes: number;
  icon: string;
}

export interface DailyData {
  date: string;
  totalMinutes: number;
  focusScore: number;
  apps: AppUsage[];
  peakDistraction: string;
  streak: number;
}

export const todayData: DailyData = {
  date: new Date().toISOString().split("T")[0],
  totalMinutes: 312,
  focusScore: 72,
  apps: [
    { name: "Instagram", category: "social", minutes: 68, icon: "📸" },
    { name: "VS Code", category: "productivity", minutes: 145, icon: "💻" },
    { name: "YouTube", category: "entertainment", minutes: 42, icon: "▶️" },
    { name: "Slack", category: "communication", minutes: 34, icon: "💬" },
    { name: "Twitter/X", category: "social", minutes: 23, icon: "🐦" },
  ],
  peakDistraction: "9:00 PM – 11:00 PM",
  streak: 5,
};

export const weeklyData: DailyData[] = [
  { date: "Mon", totalMinutes: 290, focusScore: 78, apps: [], peakDistraction: "8 PM", streak: 1 },
  { date: "Tue", totalMinutes: 340, focusScore: 62, apps: [], peakDistraction: "10 PM", streak: 2 },
  { date: "Wed", totalMinutes: 260, focusScore: 85, apps: [], peakDistraction: "9 PM", streak: 3 },
  { date: "Thu", totalMinutes: 310, focusScore: 70, apps: [], peakDistraction: "9 PM", streak: 4 },
  { date: "Fri", totalMinutes: 350, focusScore: 58, apps: [], peakDistraction: "11 PM", streak: 5 },
  { date: "Sat", totalMinutes: 280, focusScore: 80, apps: [], peakDistraction: "7 PM", streak: 6 },
  { date: "Sun", totalMinutes: 312, focusScore: 72, apps: [], peakDistraction: "9 PM", streak: 7 },
];

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export const sampleConversations: Conversation[] = [
  { id: "1", title: "Morning productivity check", lastMessage: "Your focus score is 78 today!", timestamp: new Date(Date.now() - 3600000) },
  { id: "2", title: "Social media habits", lastMessage: "I noticed you spent 2h on Instagram...", timestamp: new Date(Date.now() - 86400000) },
  { id: "3", title: "Weekly review", lastMessage: "Great improvement this week!", timestamp: new Date(Date.now() - 172800000) },
];

export function getFocusScoreColor(score: number): string {
  if (score >= 80) return "text-focus-positive";
  if (score >= 60) return "text-focus-warning";
  return "text-focus-danger";
}

export function getFocusScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 50) return "Needs Work";
  return "Poor";
}
