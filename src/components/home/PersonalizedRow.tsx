import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TOP_PICKS = [
  {
    id: 1,
    title: "Inception",
    type: "Movie",
    rating: 8.8,
    poster: "/api/placeholder/180/240",
    venue: "PVR Cinemas",
    price: "₹250"
  },
  {
    id: 2,
    title: "Comedy Night Live",
    type: "Event",
    rating: 4.5,
    poster: "/api/placeholder/180/240",
    venue: "Canvas Laugh Club",
    price: "₹800"
  },
  {
    id: 3,
    title: "The Dark Knight",
    type: "Movie",
    rating: 9.0,
    poster: "/api/placeholder/180/240",
    venue: "INOX Megaplex",
    price: "₹300"
  },
  {
    id: 4,
    title: "Rock Concert",
    type: "Event",
    rating: 4.7,
    poster: "/api/placeholder/180/240",
    venue: "Phoenix Mills",
    price: "₹1,500"
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    type: "Movie",
    rating: 8.4,
    poster: "/api/placeholder/180/240",
    venue: "Cinépolis",
    price: "₹350"
  },
  {
    id: 6,
    title: "Stand-up Show",
    type: "Event",
    rating: 4.3,
    poster: "/api/placeholder/180/240",
    venue: "The Comedy Store",
    price: "₹600"
  }
];

export const PersonalizedRow = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6 md:py-8" data-testid="home-top-picks">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Top Picks for You</h2>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              data-testid="picks-scroll-left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              data-testid="picks-scroll-right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TOP_PICKS.map((item) => (
            <Card 
              key={item.id}
              className="min-w-[160px] md:min-w-[200px] bg-cinema-surface-elevated border-border hover:bg-cinema-surface-elevated/80 transition-colors cursor-pointer group"
              data-testid={`top-pick-${item.id}`}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-48 md:h-60 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 rounded-md px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{item.rating}</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-primary/90 rounded-md px-2 py-1">
                    <span className="text-white text-xs font-medium">{item.type}</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{item.venue}</span>
                    </div>
                    <div className="font-medium text-primary">
                      {item.price}
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