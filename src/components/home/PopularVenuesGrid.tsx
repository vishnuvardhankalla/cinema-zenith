import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const POPULAR_VENUES = [
  {
    id: 1,
    name: "PVR Cinemas - Phoenix Mills",
    image: "/api/placeholder/300/200",
    location: "Lower Parel, Mumbai",
    rating: 4.3,
    totalScreens: 12,
    amenities: ["IMAX", "4DX", "Dolby Atmos"]
  },
  {
    id: 2,
    name: "INOX Megaplex",
    image: "/api/placeholder/300/200",
    location: "R-City Mall, Ghatkopar",
    rating: 4.1,
    totalScreens: 10,
    amenities: ["Laser Projection", "Dolby Atmos"]
  },
  {
    id: 3,
    name: "Cinépolis - Andheri",
    image: "/api/placeholder/300/200",
    location: "Andheri West, Mumbai",
    rating: 4.4,
    totalScreens: 8,
    amenities: ["4DX", "IMAX", "Premium Seats"]
  },
  {
    id: 4,
    name: "Regal Cinema",
    image: "/api/placeholder/300/200",
    location: "Colaba, Mumbai",
    rating: 4.0,
    totalScreens: 6,
    amenities: ["Classic Theater", "Heritage"]
  },
  {
    id: 5,
    name: "NCPA Theatre",
    image: "/api/placeholder/300/200",
    location: "Nariman Point, Mumbai",
    rating: 4.6,
    totalScreens: 4,
    amenities: ["Live Performances", "Orchestra"]
  },
  {
    id: 6,
    name: "Phoenix Marketcity",
    image: "/api/placeholder/300/200",
    location: "Kurla, Mumbai",
    rating: 4.2,
    totalScreens: 14,
    amenities: ["IMAX", "4DX", "Food Court"]
  }
];

export const PopularVenuesGrid = () => {
  return (
    <section className="py-6 md:py-8" data-testid="home-popular-venues">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Popular Venues</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {POPULAR_VENUES.map((venue) => (
            <Card 
              key={venue.id}
              className="bg-cinema-surface-elevated border-border hover:bg-cinema-surface-elevated/80 transition-colors cursor-pointer group overflow-hidden"
              data-testid={`venue-card-${venue.id}`}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 rounded-md px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{venue.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-1">
                    {venue.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{venue.location}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-3">
                    {venue.totalScreens} Screens
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {venue.amenities.slice(0, 2).map((amenity, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-cinema-surface px-2 py-1 rounded-md text-muted-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
                    {venue.amenities.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{venue.amenities.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};