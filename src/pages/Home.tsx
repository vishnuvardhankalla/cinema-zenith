import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TrendingMoviesRow } from "@/components/home/TrendingMoviesRow";
import { FeaturedEventsGrid } from "@/components/home/FeaturedEventsGrid";
import { LocationPrompt } from "@/components/home/LocationPrompt";
import { PersonalizedRow } from "@/components/home/PersonalizedRow";
import { OffersStrip } from "@/components/home/OffersStrip";
import { PopularVenuesGrid } from "@/components/home/PopularVenuesGrid";
import { EngagementStrip } from "@/components/home/EngagementStrip";
import { FooterLinks } from "@/components/home/FooterLinks";

export const Home = () => {
  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Location Prompt - Shows if no city selected */}
      <LocationPrompt />
      
      {/* Hero Carousel */}
      <section className="container mx-auto px-4 py-6">
        <HeroCarousel />
      </section>
      
      {/* Trending Movies */}
      <TrendingMoviesRow />
      
      {/* Featured Events */}
      <FeaturedEventsGrid />
      
      {/* Top Picks for You */}
      <PersonalizedRow />
      
      {/* Offers & Promotions */}
      <OffersStrip />
      
      {/* Popular Venues */}
      <PopularVenuesGrid />
      
      {/* Engagement Section */}
      <EngagementStrip />
      
      {/* Footer */}
      <FooterLinks />
    </div>
  );
};