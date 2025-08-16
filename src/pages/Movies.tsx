import { MoviesHeaderBar } from "@/components/movies/MoviesHeaderBar";
import { MoviesHeroCarousel } from "@/components/movies/MoviesHeroCarousel";
import { NowPlayingGrid } from "@/components/movies/NowPlayingGrid";
import { ComingSoonRow } from "@/components/movies/ComingSoonRow";
import { MovieOffersStrip } from "@/components/movies/MovieOffersStrip";
import { TheatreAccessPlaceholder } from "@/components/movies/TheatreAccessPlaceholder";
import { MoviesFooter } from "@/components/movies/MoviesFooter";

export const Movies = () => {
  return (
    <div data-testid="movies-page">
      {/* Header with Filters */}
      <MoviesHeaderBar />
      
      {/* Hero Carousel for Featured Movies */}
      <MoviesHeroCarousel />
      
      {/* Now Playing Movies Grid */}
      <NowPlayingGrid />
      
      {/* Coming Soon Movies Row */}
      <ComingSoonRow />
      
      {/* Movie Offers Strip */}
      <MovieOffersStrip />
      
      {/* Theatre Access Placeholder */}
      <TheatreAccessPlaceholder />
      
      {/* Footer */}
      <MoviesFooter />
    </div>
  );
};