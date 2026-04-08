import { useState, useCallback, useMemo } from "react";
import { Task, Project, TaskView, Priority } from "@/types/task";

const DEFAULT_PROJECTS: Project[] = [
  { id: "p1", name: "Personal", color: "hsl(217, 91%, 60%)" },
  { id: "p2", name: "Work", color: "hsl(142, 71%, 45%)" },
  { id: "p3", name: "Side Project", color: "hsl(38, 92%, 50%)" },
];

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Review project requirements", completed: false, priority: "high", project: "p2", createdAt: new Date().toISOString(), dueDate: new Date().toISOString().split("T")[0] },
  { id: "2", title: "Design system setup", completed: true, priority: "medium", project: "p3", createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
  { id: "3", title: "Weekly grocery shopping", completed: false, priority: "low", project: "p1", createdAt: new Date().toISOString(), dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0] },
  { id: "4", title: "Fix authentication bug", completed: false, priority: "urgent", project: "p2", createdAt: new Date().toISOString(), dueDate: new Date().toISOString().split("T")[0] },
  { id: "5", title: "Update documentation", completed: false, priority: "medium", project: "p3", createdAt: new Date().toISOString(), dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0] },
];

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [projects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [currentView, setCurrentView] = useState<TaskView>("inbox");
  const [searchQuery, setSearchQuery] = useState("");

  const addTask = useCallback((title: string, priority: Priority = "medium", project?: string, dueDate?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      project,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined } : t
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    switch (currentView) {
      case "inbox":
        return filtered.filter((t) => !t.completed);
      case "today":
        return filtered.filter((t) => !t.completed && t.dueDate === today);
      case "upcoming":
        return filtered.filter((t) => !t.completed && t.dueDate && t.dueDate > today);
      case "completed":
        return filtered.filter((t) => t.completed);
      default:
        return filtered.filter((t) => !t.completed && t.project === currentView);
    }
  }, [tasks, currentView, searchQuery, today]);

  const stats = useMemo(() => ({
    total: tasks.filter((t) => !t.completed).length,
    today: tasks.filter((t) => !t.completed && t.dueDate === today).length,
    completed: tasks.filter((t) => t.completed).length,
  }), [tasks, today]);

  // Streak calculation
  const streakData = useMemo(() => {
    const completedByDate = new Map<string, number>();
    tasks.forEach((t) => {
      if (t.completedAt) {
        const d = t.completedAt.split("T")[0];
        completedByDate.set(d, (completedByDate.get(d) || 0) + 1);
      }
    });

    // Current streak
    let currentStreak = 0;
    const d = new Date();
    // Check today first
    const todayStr = d.toISOString().split("T")[0];
    if (completedByDate.has(todayStr)) {
      currentStreak = 1;
      d.setDate(d.getDate() - 1);
    }
    while (true) {
      const dateStr = d.toISOString().split("T")[0];
      if (completedByDate.has(dateStr)) {
        currentStreak++;
        d.setDate(d.getDate() - 1);
      } else break;
    }

    // Longest streak
    const sortedDates = Array.from(completedByDate.keys()).sort();
    let longestStreak = 0;
    let tempStreak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) { tempStreak = 1; }
      else {
        const prev = new Date(sortedDates[i - 1] + "T00:00:00");
        const curr = new Date(sortedDates[i] + "T00:00:00");
        const diffDays = (curr.getTime() - prev.getTime()) / 86400000;
        tempStreak = diffDays === 1 ? tempStreak + 1 : 1;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Contribution data (last 49 days)
    const contributionData: { date: string; count: number }[] = [];
    for (let i = 48; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      contributionData.push({ date: dateStr, count: completedByDate.get(dateStr) || 0 });
    }

    const todayCompleted = completedByDate.get(todayStr) || 0;

    return { currentStreak, longestStreak, todayCompleted, contributionData };
  }, [tasks]);

  // All tasks (unfiltered) for calendar
  const allTasks = tasks;

  return {
    tasks: filteredTasks,
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
  };
}
