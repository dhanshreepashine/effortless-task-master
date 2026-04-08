import { Flame, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  todayCompleted: number;
  contributionData: { date: string; count: number }[];
}

export function StreakDisplay({ currentStreak, longestStreak, todayCompleted, contributionData }: StreakDisplayProps) {
  const maxCount = Math.max(...contributionData.map((d) => d.count), 1);

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-muted";
    const ratio = count / maxCount;
    if (ratio <= 0.25) return "bg-success/20";
    if (ratio <= 0.5) return "bg-success/40";
    if (ratio <= 0.75) return "bg-success/60";
    return "bg-success/90";
  };

  // Show last 7 weeks (49 days) in a grid
  const weeks: { date: string; count: number }[][] = [];
  const dataMap = new Map(contributionData.map((d) => [d.date, d.count]));
  const today = new Date();

  for (let w = 6; w >= 0; w--) {
    const week: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const dateStr = date.toISOString().split("T")[0];
      week.push({ date: dateStr, count: dataMap.get(dateStr) || 0 });
    }
    weeks.push(week);
  }

  return (
    <div className="rounded-lg border bg-card p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Flame className={cn("h-3.5 w-3.5", currentStreak > 0 ? "text-warning" : "text-muted-foreground")} />
          Streak
        </h3>
        {currentStreak > 0 && (
          <span className="text-xs font-bold text-warning animate-pulse">🔥 {currentStreak}d</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md bg-muted/50 p-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <Zap className="h-3 w-3 text-warning" />
            <span className="text-lg font-bold text-foreground">{currentStreak}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Current</span>
        </div>
        <div className="rounded-md bg-muted/50 p-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <Trophy className="h-3 w-3 text-primary" />
            <span className="text-lg font-bold text-foreground">{longestStreak}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Longest</span>
        </div>
      </div>

      {/* Contribution grid */}
      <div>
        <p className="text-[10px] text-muted-foreground mb-1.5">Activity (7 weeks)</p>
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={cn("h-[10px] w-[10px] rounded-[2px] transition-colors", getIntensity(day.count))}
                  title={`${day.date}: ${day.count} tasks`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {todayCompleted > 0 && (
        <p className="text-[10px] text-success text-center font-medium">
          ✅ {todayCompleted} task{todayCompleted > 1 ? "s" : ""} completed today!
        </p>
      )}
    </div>
  );
}
