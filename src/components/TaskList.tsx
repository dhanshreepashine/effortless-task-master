import { Task, Priority, Project, TaskView } from "@/types/task";
import { TaskItem } from "@/components/TaskItem";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Input } from "@/components/ui/input";
import { Search, Inbox, CalendarDays, CalendarClock, CheckCircle2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const viewConfig: Record<string, { title: string; icon: React.ElementType; description: string }> = {
  inbox: { title: "Inbox", icon: Inbox, description: "All your pending tasks" },
  today: { title: "Today", icon: CalendarDays, description: "Tasks due today" },
  upcoming: { title: "Upcoming", icon: CalendarClock, description: "Tasks coming up" },
  completed: { title: "Completed", icon: CheckCircle2, description: "Tasks you've finished" },
};

interface TaskListProps {
  tasks: Task[];
  currentView: TaskView;
  projects: Project[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string, priority: Priority, project?: string, dueDate?: string) => void;
}

export function TaskList({ tasks, currentView, projects, searchQuery, onSearchChange, onToggle, onDelete, onAdd }: TaskListProps) {
  const project = projects.find((p) => p.id === currentView);
  const config = viewConfig[currentView] || {
    title: project?.name || "Tasks",
    icon: Inbox,
    description: `Tasks in ${project?.name || "this project"}`,
  };
  const Icon = config.icon;

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="h-14 flex items-center gap-3 border-b px-4 lg:px-6 shrink-0">
        <SidebarTrigger />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 bg-muted/50 border-0 text-sm"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {project ? (
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: project.color }} />
              ) : (
                <Icon className="h-5 w-5 text-primary" />
              )}
              <h2 className="font-heading text-2xl font-bold text-foreground">{config.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>

          {currentView !== "completed" && (
            <AddTaskForm onAdd={onAdd} projects={projects} />
          )}

          <div className="space-y-2">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <Icon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No tasks here yet</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
