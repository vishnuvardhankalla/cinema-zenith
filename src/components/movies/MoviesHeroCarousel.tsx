import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchFeaturedMovies } from "@/data/movies";
import { track } from "@/utils/analytics";
import { Movie } from "@/types";

export const MoviesHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock city - in real app, get from context/URL
  const cityId = 'mumbai';

  useEffect(() => {
    const loadFeaturedMovies = async () => {
      try {
        const featuredMovies = await fetchFeaturedMovies(cityId);
        setMovies(featuredMovies);
      } catch (error) {
        console.error('Failed to load featured movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedMovies();
  }, [cityId]);

  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    track('movie_opened', { movieId: movies[index]?.id || '', movieTitle: movies[index]?.title || '', source: 'hero_carousel' });
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const handleBookTickets = () => {
    track('movie_opened', { movieId: movies[currentSlide]?.id || '', movieTitle: movies[currentSlide]?.title || '', source: 'hero_book_tickets' });
    // Navigation logic here
  };

  const handleWatchTrailer = () => {
    track('movie_opened', { movieId: movies[currentSlide]?.id || '', movieTitle: movies[currentSlide]?.title || '', source: 'hero_trailer' });
    // Trailer logic here
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  if (loading || movies.length === 0) {
    return (
      <section className="relative h-[400px] md:h-[500px] bg-muted animate-pulse" data-testid="movies-hero-carousel">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </section>
    );
  }

  const currentMovie = movies[currentSlide];

  return (
    <section 
      className="relative h-[400px] md:h-[500px] overflow-hidden"
      data-testid="movies-hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured movies"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Image */}
      <div className="absolute inset-0" data-testid={`hero-slide-${currentMovie.id}`}>
        <img
          src={currentMovie.backdrop || currentMovie.poster}
          alt={`${currentMovie.title} backdrop`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-3 mb-4">
            {currentMovie.rating && (
              <Badge variant="secondary" className="bg-primary text-white">
                ★ {currentMovie.rating}
              </Badge>
            )}
            <span className="text-sm text-gray-300">{currentMovie.genres?.join(', ')}</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">
              {currentMovie.releaseDate ? new Date(currentMovie.releaseDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Now Playing'}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {currentMovie.title}
          </h2>
          
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            {currentMovie.tagline || `Experience ${currentMovie.title} in theaters now.`}
          </p>
          
          <div className="flex gap-4">
            <Button 
              size="lg" 
              onClick={handleBookTickets}
              className="bg-primary hover:bg-primary/90 text-white px-8 hover:shadow-lg hover:shadow-primary/25 transition-all"
              data-testid="book-tickets-hero"
            >
              Book Tickets
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWatchTrailer}
              className="border-white/30 text-white hover:bg-white/10 px-8"
              data-testid="watch-trailer-hero"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Choose slide">
        {movies.map((movie, index) => (
          <button
            key={movie.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:ring-2 focus:ring-white focus:outline-none ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1} of ${movies.length}`}
            aria-selected={index === currentSlide}
            role="tab"
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
};