import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <header 
      className="h-16 bg-cinema-surface-elevated border-b border-border flex items-center justify-between px-4 relative z-50"
      data-testid="top-bar"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          data-testid="mobile-menu-trigger"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          data-testid="logo"
        >
          <div className="w-8 h-8 bg-gradient-glow rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BM</span>
          </div>
          <span className="font-bold text-lg bg-gradient-glow bg-clip-text text-transparent">
            BookMyShow
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/search")}
          data-testid="search-button"
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
          data-testid="profile-button"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};