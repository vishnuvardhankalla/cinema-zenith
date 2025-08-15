import { useState } from "react";
import { Star, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const NOW_PLAYING_MOVIES = [
  {
    id: 1,
    title: "Coolie",
    poster: "https://images.unsplash.com/photo-1489599894-2b9de88b93d8?w=300&h=450&fit=crop",
    rating: 7.7,
    votes: "66.6K",
    certification: "U/A",
    runtime: "148 min",
    genre: "Action/Thriller",
    languages: ["Hindi", "English"]
  },
  {
    id: 2,
    title: "War 2",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
    rating: 8.5,
    votes: "46.7K",
    certification: "U/A",
    runtime: "165 min",
    genre: "Action/Thriller",
    languages: ["Hindi", "English", "Tamil"]
  },
  {
    id: 3,
    title: "Mahavatar Narsimha",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
    rating: 9.6,
    votes: "233.1K",
    certification: "U",
    runtime: "142 min",
    genre: "Action/Animation/Drama",
    languages: ["Hindi", "Telugu", "Tamil"]
  },
  {
    id: 4,
    title: "Weapons",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    rating: 8.1,
    votes: "6.5K",
    certification: "A",
    runtime: "130 min",
    genre: "Horror/Mystery/Thriller",
    languages: ["Malayalam", "Hindi"]
  },
  {
    id: 5,
    title: "Saiyaara",
    poster: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=450&fit=crop",
    rating: 8.1,
    votes: "230.7K",
    certification: "U/A",
    runtime: "155 min",
    genre: "Drama/Musical/Romantic",
    languages: ["Hindi", "Punjabi"]
  },
  {
    id: 6,
    title: "The Lion King",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    rating: 9.2,
    votes: "89.3K",
    certification: "U",
    runtime: "118 min",
    genre: "Animation/Adventure/Family",
    languages: ["English", "Hindi"]
  },
  {
    id: 7,
    title: "Pushpa 2",
    poster: "https://images.unsplash.com/photo-1611419010196-e72bcdecdc7c?w=300&h=450&fit=crop",
    rating: 8.7,
    votes: "156.2K",
    certification: "U/A",
    runtime: "170 min",
    genre: "Action/Drama/Thriller",
    languages: ["Telugu", "Hindi", "Tamil"]
  },
  {
    id: 8,
    title: "Sonic 3",
    poster: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=450&fit=crop",
    rating: 8.3,
    votes: "45.1K",
    certification: "U",
    runtime: "109 min",
    genre: "Adventure/Comedy/Family",
    languages: ["English", "Hindi"]
  }
];

export const NowPlayingGrid = () => {
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/showtimes?movieId=${movieId}`);
  };

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
          {NOW_PLAYING_MOVIES.map((movie) => (
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
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 rounded px-2 py-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">
                      {movie.rating}/10
                    </span>
                  </div>
                  
                  {/* Certification Badge */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 bg-cinema-surface text-white text-xs"
                  >
                    {movie.certification}
                  </Badge>

                  {/* Votes */}
                  <div className="absolute bottom-2 left-2 bg-black/80 rounded px-2 py-1">
                    <span className="text-white text-xs">{movie.votes} Votes</span>
                  </div>

                  {/* Hover Overlay */}
                  {hoveredMovie === movie.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center animate-fade-in">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                        Book Tickets
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="pt-3 space-y-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {movie.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {movie.genre}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{movie.runtime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {movie.languages.slice(0, 2).map((lang) => (
                      <Badge 
                        key={lang}
                        variant="outline" 
                        className="text-xs border-border"
                      >
                        {lang}
                      </Badge>
                    ))}
                    {movie.languages.length > 2 && (
                      <Badge variant="outline" className="text-xs border-border">
                        +{movie.languages.length - 2}
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