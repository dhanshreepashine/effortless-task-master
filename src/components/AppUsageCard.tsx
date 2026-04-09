import { todayData } from "@/lib/mockData";
import { Smartphone } from "lucide-react";

const categoryColor: Record<string, string> = {
  social: "bg-focus-danger/20 text-focus-danger",
  productivity: "bg-focus-positive/20 text-focus-positive",
  entertainment: "bg-focus-warning/20 text-focus-warning",
  communication: "bg-primary/20 text-primary",
  other: "bg-muted text-muted-foreground",
};

const AppUsageCard = () => {
  const sorted = [...todayData.apps].sort((a, b) => b.minutes - a.minutes);
  const maxMin = sorted[0]?.minutes || 1;

  return (
    <div className="glass-card p-4 animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <Smartphone className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground font-medium">App Usage Today</span>
      </div>
      <div className="space-y-2.5">
        {sorted.map((app) => (
          <div key={app.name} className="flex items-center gap-3">
            <span className="text-lg w-6 text-center">{app.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium truncate">{app.name}</span>
                <span className="text-[10px] text-muted-foreground">{app.minutes}m</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${(app.minutes / maxMin) * 100}%` }}
                />
              </div>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${categoryColor[app.category] || categoryColor.other}`}>
              {app.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppUsageCard;
