export interface AppScreenTime {
  name: string;
  category: string;
  minutes: number;
  icon: string;
  color: string;
}

export interface DayUsage {
  day: string;
  screenTime: number;
  unlocks: number;
  notifications: number;
}

export const appScreenTimeData: AppScreenTime[] = [
  { name: "Instagram", category: "Social", minutes: 95, icon: "📸", color: "hsl(340 80% 55%)" },
  { name: "YouTube", category: "Entertainment", minutes: 72, icon: "▶️", color: "hsl(0 72% 55%)" },
  { name: "WhatsApp", category: "Communication", minutes: 58, icon: "💬", color: "hsl(142 60% 45%)" },
  { name: "VS Code", category: "Productivity", minutes: 145, icon: "💻", color: "hsl(210 80% 55%)" },
  { name: "Twitter/X", category: "Social", minutes: 43, icon: "🐦", color: "hsl(200 90% 55%)" },
  { name: "Chrome", category: "Browsing", minutes: 67, icon: "🌐", color: "hsl(45 90% 55%)" },
  { name: "Slack", category: "Communication", minutes: 38, icon: "💼", color: "hsl(300 60% 50%)" },
  { name: "TikTok", category: "Entertainment", minutes: 34, icon: "🎵", color: "hsl(0 0% 10%)" },
];

export const pieChartData = [
  { name: "Social", value: 138, fill: "hsl(340, 80%, 55%)" },
  { name: "Productivity", value: 145, fill: "hsl(142, 60%, 45%)" },
  { name: "Entertainment", value: 106, fill: "hsl(0, 72%, 55%)" },
  { name: "Communication", value: 96, fill: "hsl(210, 80%, 55%)" },
  { name: "Browsing", value: 67, fill: "hsl(45, 90%, 55%)" },
];

export const weeklyBarData: DayUsage[] = [
  { day: "Mon", screenTime: 342, unlocks: 78, notifications: 156 },
  { day: "Tue", screenTime: 398, unlocks: 92, notifications: 201 },
  { day: "Wed", screenTime: 285, unlocks: 61, notifications: 134 },
  { day: "Thu", screenTime: 367, unlocks: 85, notifications: 178 },
  { day: "Fri", screenTime: 421, unlocks: 98, notifications: 223 },
  { day: "Sat", screenTime: 456, unlocks: 112, notifications: 245 },
  { day: "Sun", screenTime: 312, unlocks: 74, notifications: 167 },
];

export const todayStats = {
  totalScreenTime: 552,
  unlocks: 87,
  notifications: 194,
  focusScore: 72,
  pickups: 45,
  longestSession: 47,
};
