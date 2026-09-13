import {
  BarChart3,
  Brain,
  ClipboardList,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  Target,
  User,
} from "lucide-react";

export interface NavItem {
  title: string;
  to: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

export const navItems: NavItem[] = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "My Profile", to: "/profile", icon: User },
  { title: "My Skills", to: "/skills", icon: ListChecks },
  { title: "Jobs", to: "/jobs", icon: Target },
  { title: "Recommendations", to: "/recommendations", icon: Sparkles },
  { title: "Skill Gaps", to: "/skill-gaps", icon: BarChart3 },
  { title: "Knowledge Graph", to: "/knowledge-graph", icon: GitBranch },
  { title: "Assessments", to: "/assessments", icon: Brain },
  { title: "Assessment Results", to: "/assessment-results", icon: ClipboardList },
];
