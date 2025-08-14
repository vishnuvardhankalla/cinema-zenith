import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LocationSelector } from "@/components/home/LocationSelector";
import { SearchTrigger } from "@/components/home/SearchTrigger";
import { UserMenu } from "@/components/home/UserMenu";

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`h-16 bg-cinema-surface-elevated border-b border-border flex items-center justify-between px-4 sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'backdrop-blur-md bg-cinema-surface-elevated/90' : ''
      }`}
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
          data-testid="home-brand"
        >
          <div className="w-8 h-8 bg-gradient-glow rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BM</span>
          </div>
          <span className="font-bold text-lg bg-gradient-glow bg-clip-text text-transparent">
            BookMyShow
          </span>
        </div>
        
        {/* Location Selector - Hidden on mobile */}
        <div className="hidden md:block">
          <LocationSelector />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SearchTrigger />
        <UserMenu />
      </div>
    </header>
  );
};