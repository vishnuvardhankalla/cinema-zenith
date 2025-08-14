import { useState, useEffect } from "react";
import { MapPin, ChevronDown, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const POPULAR_CITIES = [
  { id: 1, name: "Mumbai", state: "Maharashtra" },
  { id: 2, name: "Delhi", state: "Delhi" },
  { id: 3, name: "Bangalore", state: "Karnataka" },
  { id: 4, name: "Hyderabad", state: "Telangana" },
  { id: 5, name: "Chennai", state: "Tamil Nadu" },
  { id: 6, name: "Pune", state: "Maharashtra" },
  { id: 7, name: "Kolkata", state: "West Bengal" },
  { id: 8, name: "Ahmedabad", state: "Gujarat" }
];

export const LocationSelector = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Select City");
  const [isDetecting, setIsDetecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved city from localStorage
    const savedCity = localStorage.getItem("bookMyShow_selectedCity");
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    localStorage.setItem("bookMyShow_selectedCity", cityName);
    toast({
      title: "Location Updated",
      description: `Now showing content for ${cityName}`,
    });
  };

  const detectLocation = () => {
    setIsDetecting(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location detection",
        variant: "destructive"
      });
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd reverse geocode these coordinates
        // For now, we'll just default to Mumbai
        handleCitySelect("Mumbai");
        setIsDetecting(false);
        toast({
          title: "Location Detected",
          description: "Location set based on your current position",
        });
      },
      (error) => {
        setIsDetecting(false);
        toast({
          title: "Location Detection Failed",
          description: "Please select your city manually",
          variant: "destructive"
        });
      },
      { timeout: 10000 }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-sm max-w-[150px] justify-start px-2"
          data-testid="home-location-selector"
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span className="truncate">{selectedCity}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className="w-56 bg-cinema-surface-elevated border-border"
        data-testid="location-dropdown"
      >
        <DropdownMenuItem
          onClick={detectLocation}
          disabled={isDetecting}
          className="flex items-center gap-2 text-primary cursor-pointer"
          data-testid="detect-location"
        >
          <Navigation className="h-4 w-4" />
          {isDetecting ? "Detecting..." : "Detect my location"}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1">
          <span className="text-xs text-muted-foreground font-medium">Popular Cities</span>
        </div>
        
        {POPULAR_CITIES.map((city) => (
          <DropdownMenuItem
            key={city.id}
            onClick={() => handleCitySelect(city.name)}
            className="cursor-pointer"
            data-testid={`city-option-${city.name.toLowerCase()}`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{city.name}</span>
              <span className="text-xs text-muted-foreground">{city.state}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};