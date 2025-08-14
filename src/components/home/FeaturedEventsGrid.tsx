import { Calendar, MapPin, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURED_EVENTS = [
  {
    id: 1,
    name: "AR Rahman Live in Concert",
    image: "/api/placeholder/300/200",
    date: "Dec 25, 2024",
    venue: "Wankhede Stadium, Mumbai",
    price: "₹2,500 onwards",
    badge: "Hot",
    badgeVariant: "destructive"
  },
  {
    id: 2,
    name: "Stand-Up Comedy Night",
    image: "/api/placeholder/300/200",
    date: "Dec 20, 2024",
    venue: "Phoenix Mills, Lower Parel",
    price: "₹800 onwards",
    badge: null,
    badgeVariant: null
  },
  {
    id: 3,
    name: "Sunidhi Chauhan Live",
    image: "/api/placeholder/300/200",
    date: "Jan 15, 2025",
    venue: "NSCI Dome, Worli",
    price: "₹1,800 onwards",
    badge: "New",
    badgeVariant: "secondary"
  },
  {
    id: 4,
    name: "Rock Music Festival",
    image: "/api/placeholder/300/200",
    date: "Feb 2, 2025",
    venue: "Mahalaxmi Race Course",
    price: "₹3,200 onwards",
    badge: "Hot",
    badgeVariant: "destructive"
  },
  {
    id: 5,
    name: "Classical Dance Recital",
    image: "/api/placeholder/300/200",
    date: "Dec 30, 2024",
    venue: "NCPA, Nariman Point",
    price: "₹1,200 onwards",
    badge: null,
    badgeVariant: null
  },
  {
    id: 6,
    name: "Jazz & Blues Evening",
    image: "/api/placeholder/300/200",
    date: "Jan 8, 2025",
    venue: "Blue Frog, Lower Parel",
    price: "₹1,500 onwards",
    badge: "New",
    badgeVariant: "secondary"
  }
];

export const FeaturedEventsGrid = () => {
  return (
    <section className="py-6 md:py-8" data-testid="home-featured-events">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Featured Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {FEATURED_EVENTS.map((event) => (
            <Card 
              key={event.id}
              className="bg-cinema-surface-elevated border-border hover:bg-cinema-surface-elevated/80 transition-colors cursor-pointer group overflow-hidden"
              data-testid={`event-card-${event.id}`}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {event.badge && (
                    <Badge 
                      variant={event.badgeVariant as any}
                      className="absolute top-2 left-2"
                    >
                      {event.badge}
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-base md:text-lg mb-3 line-clamp-2">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <IndianRupee className="h-4 w-4" />
                      <span>{event.price}</span>
                    </div>
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