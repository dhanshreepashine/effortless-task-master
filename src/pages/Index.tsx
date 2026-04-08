import { SidebarProvider } from "@/components/ui/sidebar";
import { TaskSidebar } from "@/components/TaskSidebar";
import { TaskList } from "@/components/TaskList";
import { useTaskManager } from "@/hooks/useTaskManager";

const Index = () => {
  const {
    tasks,
    projects,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    addTask,
    toggleTask,
    deleteTask,
    stats,
  } = useTaskManager();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <TaskSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          projects={projects}
          stats={stats}
        />
        <TaskList
          tasks={tasks}
          currentView={currentView}
          projects={projects}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onAdd={addTask}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
