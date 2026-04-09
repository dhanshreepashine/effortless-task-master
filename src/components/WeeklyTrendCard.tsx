import { weeklyData } from "@/lib/mockData";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const WeeklyTrendCard = () => {
  return (
    <div className="glass-card p-4 animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground font-medium">Weekly Focus Trend</span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={weeklyData}>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215 12% 55%)" }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              background: "hsl(220 18% 10%)",
              border: "1px solid hsl(220 14% 22%)",
              borderRadius: "8px",
              fontSize: "11px",
            }}
            formatter={(value: number) => [`${value}/100`, "Focus Score"]}
          />
          <Bar dataKey="focusScore" fill="hsl(174, 72%, 50%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyTrendCard;
