export type Priority = "low" | "medium" | "high" | "urgent";
export type TaskView = "inbox" | "today" | "upcoming" | "completed" | string;

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  project?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}
