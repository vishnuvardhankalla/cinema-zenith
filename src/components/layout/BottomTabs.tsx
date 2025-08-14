import { NavLink } from "react-router-dom";
import { Home, Film, Search, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/movies", icon: Film, label: "Movies" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/offers", icon: Tag, label: "Offers" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const BottomTabs = () => {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-cinema-surface-elevated border-t border-border md:hidden z-40"
      data-testid="bottom-tabs"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {tabItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            data-testid={`bottom-tab-${to.replace('/', '') || 'home'}`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};