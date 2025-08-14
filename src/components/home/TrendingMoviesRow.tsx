import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const TRENDING_MOVIES = {
  "now-playing": [
    { id: 1, title: "Spider-Man: Across the Spider-Verse", rating: 8.7, poster: "/api/placeholder/200/300", genre: "Animation" },
    { id: 2, title: "Guardians of the Galaxy Vol. 3", rating: 8.2, poster: "/api/placeholder/200/300", genre: "Action" },
    { id: 3, title: "The Flash", rating: 7.8, poster: "/api/placeholder/200/300", genre: "Superhero" },
    { id: 4, title: "Indiana Jones 5", rating: 7.5, poster: "/api/placeholder/200/300", genre: "Adventure" },
    { id: 5, title: "Transformers: Rise of the Beasts", rating: 7.2, poster: "/api/placeholder/200/300", genre: "Action" },
    { id: 6, title: "Fast X", rating: 7.0, poster: "/api/placeholder/200/300", genre: "Action" }
  ],
  "coming-soon": [
    { id: 7, title: "Dune: Part Two", rating: 9.1, poster: "/api/placeholder/200/300", genre: "Sci-Fi" },
    { id: 8, title: "Aquaman 2", rating: 8.0, poster: "/api/placeholder/200/300", genre: "Superhero" },
    { id: 9, title: "Mission: Impossible 8", rating: 8.5, poster: "/api/placeholder/200/300", genre: "Action" },
    { id: 10, title: "Avatar 3", rating: 9.0, poster: "/api/placeholder/200/300", genre: "Sci-Fi" },
    { id: 11, title: "The Marvels", rating: 7.8, poster: "/api/placeholder/200/300", genre: "Superhero" },
    { id: 12, title: "John Wick 5", rating: 8.3, poster: "/api/placeholder/200/300", genre: "Action" }
  ]
};

export const TrendingMoviesRow = () => {
  const [activeTab, setActiveTab] = useState("now-playing");
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

  const movies = TRENDING_MOVIES[activeTab as keyof typeof TRENDING_MOVIES];

  return (
    <section className="py-6 md:py-8" data-testid="home-trending-movies">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Trending Movies</h2>
            <TabsList className="bg-cinema-surface-elevated">
              <TabsTrigger value="now-playing" data-testid="tab-now-playing">
                Now Playing
              </TabsTrigger>
              <TabsTrigger value="coming-soon" data-testid="tab-coming-soon">
                Coming Soon
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative">
            {/* Desktop Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-cinema-surface/80 hover:bg-cinema-surface hidden md:flex"
              onClick={() => scroll('left')}
              data-testid="movies-scroll-left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-cinema-surface/80 hover:bg-cinema-surface hidden md:flex"
              onClick={() => scroll('right')}
              data-testid="movies-scroll-right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <TabsContent value={activeTab} className="mt-0">
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {movies.map((movie) => (
                  <Card 
                    key={movie.id}
                    className="min-w-[140px] md:min-w-[180px] bg-cinema-surface-elevated border-border hover:bg-cinema-surface-elevated/80 transition-colors cursor-pointer group"
                    data-testid={`movie-card-${movie.id}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-48 md:h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 rounded-md px-2 py-1 flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-white text-xs font-medium">{movie.rating}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                          {movie.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {movie.genre}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};