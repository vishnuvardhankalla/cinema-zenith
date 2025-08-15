import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_MOVIES = [
  {
    id: 1,
    title: "Mission: Impossible - The Final Reckoning",
    description: "Experience the ultimate thrill as Ethan Hunt faces his most dangerous mission yet.",
    image: "https://images.unsplash.com/photo-1489599894-2b9de88b93d8?w=1200&h=600&fit=crop",
    rating: "8.5",
    genre: "Action/Thriller",
    releaseDate: "May 2024",
    trailer: true
  },
  {
    id: 2,
    title: "Avatar: The Way of Water",
    description: "Return to Pandora and dive deeper into the world of the Na'vi.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
    rating: "9.2",
    genre: "Sci-Fi/Adventure",
    releaseDate: "Now Playing",
    trailer: true
  },
  {
    id: 3,
    title: "The Dark Knight Returns",
    description: "Batman emerges from retirement to face a new threat to Gotham City.",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop",
    rating: "9.0",
    genre: "Action/Drama",
    releaseDate: "Coming Soon",
    trailer: true
  }
];

export const MoviesHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_MOVIES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_MOVIES.length);
  };

  const currentMovie = HERO_MOVIES[currentSlide];

  return (
    <section 
      className="relative h-[400px] md:h-[500px] overflow-hidden"
      data-testid="movies-hero-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.image}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-primary text-white">
              ★ {currentMovie.rating}
            </Badge>
            <span className="text-sm text-gray-300">{currentMovie.genre}</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">{currentMovie.releaseDate}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {currentMovie.title}
          </h2>
          
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            {currentMovie.description}
          </p>
          
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8"
              data-testid="book-tickets-hero"
            >
              Book Tickets
            </Button>
            
            {currentMovie.trailer && (
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8"
                data-testid="watch-trailer-hero"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Trailer
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={goToPrevious}
        data-testid="hero-prev-btn"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={goToNext}
        data-testid="hero-next-btn"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_MOVIES.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
};