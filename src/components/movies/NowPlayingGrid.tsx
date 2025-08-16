import { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "@/data/movies";
import { track } from "@/utils/analytics";
import { Movie } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = () => (
  <Card className="overflow-hidden border-0 bg-transparent">
    <CardContent className="p-0">
      <Skeleton className="aspect-[2/3] rounded-lg" />
      <div className="pt-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </CardContent>
  </Card>
);

export const NowPlayingGrid = () => {
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Mock city - in real app, get from context/URL
  const cityId = 'mumbai';

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const nowPlayingMovies = await fetchMovies(cityId);
        setMovies(nowPlayingMovies);
      } catch (error) {
        console.error('Failed to load movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovies();
  }, [cityId]);

  const handleMovieClick = (movieId: string) => {
    const today = new Date().toISOString().split('T')[0];
    track('movie_opened', { movieId, movieTitle: movies.find(m => m.id === movieId)?.title || '', source: 'now_playing_grid' });
    navigate(`/showtimes?movieId=${movieId}&date=${today}`);
  };

  const handleBookTickets = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    track('movie_opened', { movieId, movieTitle: movies.find(m => m.id === movieId)?.title || '', source: 'now_playing_book_tickets' });
    handleMovieClick(movieId);
  };

  if (loading) {
    return (
      <section className="py-8" data-testid="movies-now-playing">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8" data-testid="movies-now-playing">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Now Playing</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            See All →
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="group cursor-pointer overflow-hidden border-0 bg-transparent hover:scale-105 transition-all duration-300"
              onClick={() => handleMovieClick(movie.id)}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
              data-testid={`movie-card-${movie.id}`}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Rating Badge */}
                  {movie.rating && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 rounded px-2 py-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-white text-xs font-medium">
                        {movie.rating}/10
                      </span>
                    </div>
                  )}
                  
                  {/* Certification Badge */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 bg-background/90 text-foreground text-xs"
                  >
                    {movie.cert}
                  </Badge>

                  {/* Hover Overlay */}
                  {hoveredMovie === movie.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-fade-in">
                      <Button 
                        size="lg" 
                        onClick={(e) => handleBookTickets(movie.id, e)}
                        className="bg-primary hover:bg-primary/90 text-white"
                        data-testid={`book-movie-${movie.id}`}
                      >
                        Book Tickets
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="pt-3 space-y-2">
                  <h3 className="font-semibold text-foreground line-clamp-1" title={movie.title}>
                    {movie.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {movie.genres?.join(', ')}
                  </p>
                  
                  {movie.runtimeMins && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{movie.runtimeMins} min</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {movie.langs.slice(0, 2).map((lang) => (
                      <Badge 
                        key={lang}
                        variant="outline" 
                        className="text-xs"
                      >
                        {lang}
                      </Badge>
                    ))}
                    {movie.langs.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{movie.langs.length - 2}
                      </Badge>
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