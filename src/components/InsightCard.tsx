import { AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

interface InsightCardProps {
  type: "warning" | "tip" | "positive";
  title: string;
  description: string;
}

const config = {
  warning: { icon: AlertTriangle, color: "text-focus-warning", bg: "bg-focus-warning/10 border-focus-warning/20" },
  tip: { icon: Lightbulb, color: "text-primary", bg: "bg-primary/10 border-primary/20" },
  positive: { icon: CheckCircle, color: "text-focus-positive", bg: "bg-focus-positive/10 border-focus-positive/20" },
};

const InsightCard = ({ type, title, description }: InsightCardProps) => {
  const { icon: Icon, color, bg } = config[type];

  return (
    <div className={`rounded-xl border p-3 animate-fade-up ${bg}`}>
      <div className="flex items-start gap-2.5">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
        <div>
          <p className="text-xs font-semibold mb-0.5">{title}</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
