import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskCalendarProps {
  tasks: Task[];
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

export function TaskCalendar({ tasks, onDateSelect, selectedDate }: TaskCalendarProps) {
  // Build a map of dates with tasks
  const taskDates = new Map<string, { total: number; completed: number }>();
  tasks.forEach((task) => {
    if (task.dueDate) {
      const existing = taskDates.get(task.dueDate) || { total: 0, completed: 0 };
      existing.total++;
      if (task.completed) existing.completed++;
      taskDates.set(task.dueDate, existing);
    }
    if (task.completedAt) {
      const completedDate = task.completedAt.split("T")[0];
      const existing = taskDates.get(completedDate) || { total: 0, completed: 0 };
      existing.completed++;
      taskDates.set(completedDate, existing);
    }
  });

  const selected = selectedDate ? new Date(selectedDate + "T00:00:00") : undefined;

  const modifiers = {
    hasTasks: Array.from(taskDates.keys())
      .filter((d) => {
        const info = taskDates.get(d);
        return info && info.total > 0 && info.completed < info.total;
      })
      .map((d) => new Date(d + "T00:00:00")),
    allCompleted: Array.from(taskDates.keys())
      .filter((d) => {
        const info = taskDates.get(d);
        return info && info.total > 0 && info.completed >= info.total;
      })
      .map((d) => new Date(d + "T00:00:00")),
  };

  const modifiersClassNames = {
    hasTasks: "!bg-primary/15 !text-primary font-semibold",
    allCompleted: "!bg-success/15 !text-success font-semibold",
  };

  return (
    <div className="rounded-lg border bg-card p-2">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (date) {
            const dateStr = date.toISOString().split("T")[0];
            onDateSelect(dateStr);
          }
        }}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className={cn("p-1 pointer-events-auto w-full")}
        classNames={{
          months: "flex flex-col space-y-2",
          month: "space-y-2",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-xs font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input",
          nav_button_previous: "absolute left-0",
          nav_button_next: "absolute right-0",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.65rem]",
          row: "flex w-full mt-1",
          cell: "h-7 w-8 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-7 w-8 p-0 font-normal text-xs aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md inline-flex items-center justify-center",
          day_range_end: "day-range-end",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground font-bold",
          day_outside: "day-outside text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_hidden: "invisible",
        }}
      />
      <div className="flex items-center gap-3 px-2 pt-1 pb-1 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-primary/40" /> Has tasks
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-success/40" /> All done
        </span>
      </div>
    </div>
  );
}
