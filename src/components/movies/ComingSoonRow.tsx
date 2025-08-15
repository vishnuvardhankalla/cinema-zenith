import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const COMING_SOON_MOVIES = [
  {
    id: 1,
    title: "Avengers: Secret Wars",
    poster: "https://images.unsplash.com/photo-1635863138275-d9864d29c3a5?w=300&h=450&fit=crop",
    releaseDate: "May 1, 2025",
    genre: "Action/Adventure/Sci-Fi",
    isHighlyAnticipated: true
  },
  {
    id: 2,
    title: "The Batman 2",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
    releaseDate: "October 3, 2025",
    genre: "Action/Crime/Drama",
    isHighlyAnticipated: true
  },
  {
    id: 3,
    title: "Dune: Part Three",
    poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
    releaseDate: "December 18, 2025",
    genre: "Sci-Fi/Adventure/Drama",
    isHighlyAnticipated: false
  },
  {
    id: 4,
    title: "Spider-Man 4",
    poster: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=300&h=450&fit=crop",
    releaseDate: "July 12, 2025",
    genre: "Action/Adventure/Sci-Fi",
    isHighlyAnticipated: true
  },
  {
    id: 5,
    title: "Fantastic Four",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
    releaseDate: "February 14, 2025",
    genre: "Action/Adventure/Sci-Fi",
    isHighlyAnticipated: false
  },
  {
    id: 6,
    title: "John Wick 5",
    poster: "https://images.unsplash.com/photo-1489599894-2b9de88b93d8?w=300&h=450&fit=crop",
    releaseDate: "August 20, 2025",
    genre: "Action/Crime/Thriller",
    isHighlyAnticipated: true
  },
  {
    id: 7,
    title: "Mad Max: The Wasteland",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    releaseDate: "September 15, 2025",
    genre: "Action/Adventure/Sci-Fi",
    isHighlyAnticipated: false
  }
];

export const ComingSoonRow = () => {
  const [notifiedMovies, setNotifiedMovies] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleNotifyMe = (movieId: number) => {
    if (notifiedMovies.includes(movieId)) {
      setNotifiedMovies(notifiedMovies.filter(id => id !== movieId));
    } else {
      setNotifiedMovies([...notifiedMovies, movieId]);
    }
  };

  return (
    <section className="py-8 bg-cinema-surface/50" data-testid="movies-coming-soon">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Coming Soon</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            See All →
          </Button>
        </div>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-cinema-surface-elevated hover:bg-cinema-surface border border-border h-10 w-10"
            onClick={() => scroll('left')}
            data-testid="coming-soon-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-cinema-surface-elevated hover:bg-cinema-surface border border-border h-10 w-10"
            onClick={() => scroll('right')}
            data-testid="coming-soon-next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {COMING_SOON_MOVIES.map((movie) => (
              <Card
                key={movie.id}
                className="flex-none w-72 group cursor-pointer overflow-hidden border border-border bg-cinema-surface-elevated hover:scale-105 transition-all duration-300"
                data-testid={`coming-soon-card-${movie.id}`}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Highly Anticipated Badge */}
                    {movie.isHighlyAnticipated && (
                      <Badge 
                        className="absolute top-2 left-2 bg-gradient-glow text-white border-0"
                      >
                        🔥 Highly Anticipated
                      </Badge>
                    )}

                    {/* Overlay with Notify Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <Button
                          variant={notifiedMovies.includes(movie.id) ? "secondary" : "default"}
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotifyMe(movie.id);
                          }}
                          data-testid={`notify-btn-${movie.id}`}
                        >
                          <Bell className={`h-4 w-4 mr-2 ${notifiedMovies.includes(movie.id) ? 'fill-current' : ''}`} />
                          {notifiedMovies.includes(movie.id) ? 'Notification Set' : 'Notify Me'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-1">
                      {movie.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {movie.genre}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {movie.releaseDate}
                      </span>
                      
                      {notifiedMovies.includes(movie.id) && (
                        <Badge variant="secondary" className="text-xs">
                          <Bell className="h-3 w-3 mr-1 fill-current" />
                          Notified
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};