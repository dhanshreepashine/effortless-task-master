import { Inbox, CalendarDays, CalendarClock, CheckCircle2, FolderKanban, Plus } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Project, TaskView } from "@/types/task";
import { Badge } from "@/components/ui/badge";

interface TaskSidebarProps {
  currentView: TaskView;
  onViewChange: (view: TaskView) => void;
  projects: Project[];
  stats: { total: number; today: number; completed: number };
}

const mainNav = [
  { id: "inbox" as const, title: "Inbox", icon: Inbox, statKey: "total" as const },
  { id: "today" as const, title: "Today", icon: CalendarDays, statKey: "today" as const },
  { id: "upcoming" as const, title: "Upcoming", icon: CalendarClock, statKey: null },
  { id: "completed" as const, title: "Completed", icon: CheckCircle2, statKey: "completed" as const },
];

export function TaskSidebar({ currentView, onViewChange, projects, stats }: TaskSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <h1 className="font-heading text-xl font-bold text-foreground tracking-tight">
            TaskFlow
          </h1>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <FolderKanban className="h-6 w-6 text-primary" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentView === item.id}
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {item.statKey && stats[item.statKey] > 0 && (
                          <Badge variant="secondary" className="ml-auto h-5 min-w-5 justify-center text-xs font-medium">
                            {stats[item.statKey]}
                          </Badge>
                        )}
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton
                    isActive={currentView === project.id}
                    onClick={() => onViewChange(project.id)}
                    tooltip={project.name}
                  >
                    <div
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    {!collapsed && <span>{project.name}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <p className="text-xs text-muted-foreground text-center">
            TaskFlow v1.0
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
