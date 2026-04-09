import { todayData, getFocusScoreColor, getFocusScoreLabel } from "@/lib/mockData";
import { Target, Flame } from "lucide-react";

const FocusScoreCard = () => {
  const score = todayData.focusScore;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card p-4 glow-primary animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground font-medium">Focus Score</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getFocusScoreColor(score)}`}>{score}</span>
        </div>
        <div>
          <p className={`text-sm font-semibold ${getFocusScoreColor(score)}`}>{getFocusScoreLabel(score)}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">out of 100</p>
          <div className="flex items-center gap-1 text-focus-warning text-[10px] mt-1">
            <Flame className="w-3 h-3" />{todayData.streak}-day streak
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusScoreCard;
