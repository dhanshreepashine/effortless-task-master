import { Trash2, Flag } from "lucide-react";
import { Task, Priority } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  urgent: { label: "Urgent", className: "bg-destructive/10 text-destructive border-destructive/20" },
  high: { label: "High", className: "bg-warning/10 text-warning border-warning/20" },
  medium: { label: "Medium", className: "bg-primary/10 text-primary border-primary/20" },
  low: { label: "Low", className: "bg-muted text-muted-foreground border-border" },
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const priority = priorityConfig[task.priority];

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-200 hover:shadow-sm",
        task.completed && "opacity-60"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5 rounded-full border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium text-foreground truncate",
          task.completed && "line-through text-muted-foreground"
        )}>
          {task.title}
        </p>
        {task.dueDate && (
          <p className="text-xs text-muted-foreground mt-0.5">
            Due {new Date(task.dueDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
        )}
      </div>

      <Badge variant="outline" className={cn("text-[10px] shrink-0 h-5", priority.className)}>
        {priority.label}
      </Badge>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        onClick={() => onDelete(task.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
