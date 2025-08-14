import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_DATA = [
  {
    id: 1,
    image: "/api/placeholder/1200/400",
    title: "Avatar: The Way of Water",
    subtitle: "Experience the magic in IMAX",
    buttonText: "Book Now",
    buttonUrl: "/movies/avatar"
  },
  {
    id: 2,
    image: "/api/placeholder/1200/400",
    title: "Top Gun: Maverick",
    subtitle: "Feel the need for speed",
    buttonText: "Book Now",
    buttonUrl: "/movies/topgun"
  },
  {
    id: 3,
    image: "/api/placeholder/1200/400",
    title: "The Batman",
    subtitle: "From the shadows emerges a hero",
    buttonText: "Book Now",
    buttonUrl: "/movies/batman"
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_DATA.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_DATA.length) % HERO_DATA.length);
  };

  return (
    <section 
      className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-lg"
      data-testid="home-hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_DATA.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <div 
              className="w-full h-full bg-gradient-to-r from-cinema-surface via-cinema-surface/50 to-transparent bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-md md:max-w-lg text-white">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-sm md:text-lg mb-4 md:mb-6 text-white/90">
                      {slide.subtitle}
                    </p>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 md:px-8 md:py-3"
                      data-testid={`hero-book-now-${slide.id}`}
                    >
                      {slide.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
        data-testid="hero-prev-button"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
        data-testid="hero-next-button"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_DATA.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
};