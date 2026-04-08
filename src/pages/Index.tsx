import { SidebarProvider } from "@/components/ui/sidebar";
import { TaskSidebar } from "@/components/TaskSidebar";
import { TaskList } from "@/components/TaskList";
import { useTaskManager } from "@/hooks/useTaskManager";
import { toast } from "sonner";
import { useCallback } from "react";
import { Priority } from "@/types/task";

const Index = () => {
  const {
    tasks,
    allTasks,
    projects,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    addTask,
    toggleTask,
    deleteTask,
    stats,
    streakData,
  } = useTaskManager();

  const handleToggle = useCallback((id: string) => {
    const task = allTasks.find((t) => t.id === id);
    toggleTask(id);
    if (task && !task.completed) {
      toast.success(`"${task.title}" completed! 🎉`, {
        description: streakData.currentStreak > 0
          ? `🔥 ${streakData.currentStreak + 1} day streak!`
          : "Great job! Keep it up!",
      });
    } else if (task) {
      toast.info(`"${task.title}" marked as incomplete`);
    }
  }, [allTasks, toggleTask, streakData.currentStreak]);

  const handleDelete = useCallback((id: string) => {
    const task = allTasks.find((t) => t.id === id);
    deleteTask(id);
    toast("Task deleted", {
      description: task ? `"${task.title}" was removed` : undefined,
    });
  }, [allTasks, deleteTask]);

  const handleAdd = useCallback((title: string, priority: Priority, project?: string, dueDate?: string) => {
    addTask(title, priority, project, dueDate);
    toast.success(`Task "${title}" added!`);
  }, [addTask]);

  const handleDateSelect = useCallback((date: string) => {
    const today = new Date().toISOString().split("T")[0];
    if (date === today) {
      setCurrentView("today");
    } else if (date > today) {
      setCurrentView("upcoming");
    } else {
      setCurrentView("inbox");
    }
  }, [setCurrentView]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <TaskSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          projects={projects}
          stats={stats}
          allTasks={allTasks}
          streakData={streakData}
          onDateSelect={handleDateSelect}
        />
        <TaskList
          tasks={tasks}
          currentView={currentView}
          projects={projects}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
