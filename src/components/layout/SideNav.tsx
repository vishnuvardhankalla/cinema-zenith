import { NavLink } from "react-router-dom";
import { 
  Home, 
  Film, 
  Calendar, 
  Search, 
  Tag, 
  MapPin, 
  Clock, 
  CreditCard, 
  User,
  Ticket
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/movies", icon: Film, label: "Movies" },
  { to: "/events", icon: Calendar, label: "Events" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/offers", icon: Tag, label: "Offers" },
  { to: "/venues", icon: MapPin, label: "Venues" },
  { to: "/showtimes", icon: Clock, label: "Showtimes" },
  { to: "/seat-selection", icon: Ticket, label: "Seat Selection" },
  { to: "/checkout", icon: CreditCard, label: "Checkout" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const SideNav = ({ isOpen, onClose }: SideNavProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          data-testid="mobile-overlay"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 bg-cinema-surface border-r border-border z-50 transform transition-transform duration-300 ease-in-out",
          "md:static md:top-0 md:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        data-testid="side-nav"
      >
        <nav className="p-4 space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-secondary/50",
                isActive 
                  ? "bg-gradient-glow text-white shadow-cinema" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={onClose}
              data-testid={`nav-link-${to.replace('/', '') || 'home'}`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};