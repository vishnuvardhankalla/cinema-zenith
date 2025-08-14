import { useState } from "react";
import { User, LogIn, UserPlus, Settings, Heart, Ticket, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In real app, this would come from auth context
  const navigate = useNavigate();

  const handleLogin = () => {
    // In real app, this would open login modal or navigate to login page
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (!isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            data-testid="home-user-menu"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-cinema-surface-elevated border-border"
        >
          <DropdownMenuItem
            onClick={handleLogin}
            className="cursor-pointer"
            data-testid="login-option"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Log In
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={handleLogin}
            className="cursor-pointer"
            data-testid="register-option"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Sign Up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="home-user-menu"
        >
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">JD</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-52 bg-cinema-surface-elevated border-border"
      >
        <div className="px-3 py-2">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john.doe@example.com</p>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer"
          data-testid="profile-option"
        >
          <User className="h-4 w-4 mr-2" />
          My Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer"
          data-testid="bookings-option"
        >
          <Ticket className="h-4 w-4 mr-2" />
          My Bookings
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer"
          data-testid="wishlist-option"
        >
          <Heart className="h-4 w-4 mr-2" />
          Wishlist
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer"
          data-testid="settings-option"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive"
          data-testid="logout-option"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};