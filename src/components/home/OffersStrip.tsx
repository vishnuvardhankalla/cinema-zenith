import { useRef } from "react";
import { ChevronLeft, ChevronRight, Percent, Gift, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OFFERS = [
  {
    id: 1,
    title: "50% Off on Movie Tickets",
    description: "Use code MOVIE50",
    logo: <Percent className="h-6 w-6 text-primary" />,
    cta: "Book Now",
    color: "bg-gradient-to-r from-primary/20 to-cinema-purple/20",
    borderColor: "border-primary/30"
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    description: "On Event Tickets",
    logo: <Gift className="h-6 w-6 text-accent" />,
    cta: "Explore",
    color: "bg-gradient-to-r from-accent/20 to-cinema-blue/20",
    borderColor: "border-accent/30"
  },
  {
    id: 3,
    title: "Cashback on UPI",
    description: "Up to ₹200 back",
    logo: <CreditCard className="h-6 w-6 text-cinema-blue" />,
    cta: "Pay Now",
    color: "bg-gradient-to-r from-cinema-blue/20 to-primary/20",
    borderColor: "border-cinema-blue/30"
  },
  {
    id: 4,
    title: "Weekend Special",
    description: "30% off on all shows",
    logo: <Percent className="h-6 w-6 text-primary" />,
    cta: "Book Now",
    color: "bg-gradient-to-r from-primary/20 to-cinema-purple/20",
    borderColor: "border-primary/30"
  },
  {
    id: 5,
    title: "Student Discount",
    description: "20% off with ID",
    logo: <Gift className="h-6 w-6 text-accent" />,
    cta: "Verify",
    color: "bg-gradient-to-r from-accent/20 to-cinema-blue/20",
    borderColor: "border-accent/30"
  }
];

export const OffersStrip = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
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
    <section className="py-6 md:py-8" data-testid="home-offers-strip">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Offers & Promotions</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="hidden md:flex"
              data-testid="offers-scroll-left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="hidden md:flex"
              data-testid="offers-scroll-right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/offers'}
              data-testid="view-all-offers"
            >
              View All
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {OFFERS.map((offer) => (
            <Card 
              key={offer.id}
              className={`min-w-[280px] md:min-w-[320px] ${offer.color} ${offer.borderColor} border cursor-pointer group hover:scale-105 transition-transform duration-200`}
              data-testid={`offer-card-${offer.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cinema-surface-elevated rounded-full">
                    {offer.logo}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {offer.description}
                    </p>
                    
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-cinema-surface-elevated hover:bg-cinema-surface"
                    >
                      {offer.cta}
                    </Button>
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