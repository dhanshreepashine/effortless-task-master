import { Plus, MessageSquare, BarChart3, Brain, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Conversation } from "@/lib/mockData";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  open: boolean;
  onClose: () => void;
}

const ChatSidebar = ({ conversations, activeId, onSelect, onNewChat, open, onClose }: ChatSidebarProps) => {
  const navigate = useNavigate();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed md:relative z-50 top-0 left-0 h-full w-72 bg-sidebar border-r border-sidebar-border
        flex flex-col transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">FocusAI</span>
          </div>
          <button onClick={onClose} className="md:hidden p-1 rounded-lg hover:bg-sidebar-accent transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-sidebar-border hover:border-primary hover:bg-sidebar-accent text-sm text-sidebar-foreground transition-all"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-3 py-2">Recent</p>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeId === conv.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                <span className="truncate font-medium">{conv.title}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 truncate pl-5">{conv.lastMessage}</p>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </button>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
