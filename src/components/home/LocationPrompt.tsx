import { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const LocationPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already selected a city or dismissed the prompt
    const selectedCity = localStorage.getItem("bookMyShow_selectedCity");
    const dismissed = localStorage.getItem("bookMyShow_locationPromptDismissed");
    
    // Show prompt only if no city selected and not previously dismissed
    if (!selectedCity && !dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("bookMyShow_locationPromptDismissed", "true");
  };

  const handleOpenLocationSelector = () => {
    // This would trigger the location selector
    // For now, we'll just dismiss the prompt
    handleDismiss();
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <section className="py-4" data-testid="home-location-prompt">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-glow text-white border-none relative overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white/20"
              onClick={handleDismiss}
              data-testid="dismiss-location-prompt"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  Choose Your City
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Get personalized movie and event recommendations for your location
                </p>
                
                <Button
                  variant="secondary"
                  onClick={handleOpenLocationSelector}
                  className="bg-white text-primary hover:bg-white/90"
                  data-testid="select-city-button"
                >
                  Select City
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};