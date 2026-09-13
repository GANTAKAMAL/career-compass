import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { navItems } from "./nav-items";
import { Button } from "@/components/ui/button";

interface SidebarNavProps {
  onNavigate?: () => void;
  onLogout: () => void;
}

export function SidebarNav({ onNavigate, onLogout }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <BrandMark />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeProps={{
              className:
                "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/70"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
