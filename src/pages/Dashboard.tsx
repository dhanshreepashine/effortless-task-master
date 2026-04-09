import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  Bell, Unlock, Clock, Brain, MessageSquare,
  Flame, Target, ChevronDown,
} from "lucide-react";
import {
  appScreenTimeData, pieChartData, weeklyBarData, todayStats,
} from "@/lib/dashboardData";
import { getFocusScoreColor, getFocusScoreLabel } from "@/lib/mockData";

const PIE_COLORS = ["hsl(340,80%,55%)", "hsl(142,60%,45%)", "hsl(0,72%,55%)", "hsl(210,80%,55%)", "hsl(45,90%,55%)"];

const StatCard = ({ icon: Icon, label, value, sub, className = "" }: {
  icon: React.ElementType; label: string; value: string; sub?: string; className?: string;
}) => (
  <div className={`glass-card p-4 ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [barMetric, setBarMetric] = useState<"screenTime" | "unlocks" | "notifications">("screenTime");

  const score = todayStats.focusScore;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  const barLabel: Record<string, string> = {
    screenTime: "Screen Time (min)",
    unlocks: "Unlocks",
    notifications: "Notifications",
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 md:px-6 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">FocusAI Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Chat
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"} 👋
          </h2>
          <p className="text-sm text-muted-foreground">Here's your digital wellness summary for today.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={Clock} label="Screen Time" value={`${Math.floor(todayStats.totalScreenTime / 60)}h ${todayStats.totalScreenTime % 60}m`} sub="↑ 12% from yesterday" />
          <StatCard icon={Unlock} label="Unlocks" value={String(todayStats.unlocks)} sub={`${todayStats.pickups} pickups`} />
          <StatCard icon={Bell} label="Notifications" value={String(todayStats.notifications)} sub="23 app sources" />
          <div className="glass-card p-4 glow-primary">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Focus Score</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-lg font-bold ${getFocusScoreColor(score)}`}>{score}</span>
              </div>
              <div>
                <p className={`text-sm font-semibold ${getFocusScoreColor(score)}`}>{getFocusScoreLabel(score)}</p>
                <div className="flex items-center gap-1 text-focus-warning text-[10px] mt-0.5">
                  <Flame className="w-3 h-3" />5-day streak
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">App Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`} labelLine={false}>
                  {pieChartData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Day-wise Distribution</h3>
              <div className="relative">
                <select
                  value={barMetric}
                  onChange={(e) => setBarMetric(e.target.value as "screenTime" | "unlocks" | "notifications")}
                  className="appearance-none bg-secondary text-xs rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
                >
                  <option value="screenTime">Screen Time</option>
                  <option value="unlocks">Unlocks</option>
                  <option value="notifications">Notifications</option>
                </select>
                <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215 12% 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 12% 55%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey={barMetric} name={barLabel[barMetric]} fill="hsl(174 72% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Screen Time by App</h3>
          <div className="space-y-3">
            {appScreenTimeData
              .sort((a, b) => b.minutes - a.minutes)
              .map((app) => {
                const maxMin = appScreenTimeData[0].minutes;
                return (
                  <div key={app.name} className="flex items-center gap-3">
                    <span className="text-lg w-7 text-center">{app.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{app.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{app.category}</span>
                          <span className="text-sm font-semibold">{Math.floor(app.minutes / 60)}h {app.minutes % 60}m</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${(app.minutes / maxMin) * 100}%`, background: app.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
