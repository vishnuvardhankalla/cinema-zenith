import { useRef } from "react";
import { ChevronLeft, ChevronRight, Percent, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const MOVIE_OFFERS = [
  {
    id: 1,
    title: "HDFC Bank Offer",
    description: "Get 20% off up to ₹150 on movie tickets",
    discount: "20% OFF",
    icon: CreditCard,
    validTill: "Dec 31, 2024",
    terms: "Min booking ₹500",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    title: "Paytm Cashback",
    description: "Flat ₹100 cashback on movie bookings",
    discount: "₹100 BACK",
    icon: Smartphone,
    validTill: "Jan 15, 2025",
    terms: "Min booking ₹300",
    color: "from-purple-500 to-purple-700"
  },
  {
    id: 3,
    title: "BookMyShow Exclusive",
    description: "Buy 2 Get 1 Free on premium seats",
    discount: "BUY 2 GET 1",
    icon: Percent,
    validTill: "Dec 25, 2024",
    terms: "Premium seats only",
    color: "from-red-500 to-red-700"
  },
  {
    id: 4,
    title: "Weekend Special",
    description: "Extra 15% off on weekend bookings",
    discount: "15% OFF",
    icon: Percent,
    validTill: "Every Weekend",
    terms: "Fri-Sun only",
    color: "from-green-500 to-green-700"
  },
  {
    id: 5,
    title: "SBI Card Offer",
    description: "Get ₹200 off on IMAX & 4DX shows",
    discount: "₹200 OFF",
    icon: CreditCard,
    validTill: "Jan 30, 2025",
    terms: "IMAX/4DX only",
    color: "from-orange-500 to-orange-700"
  },
  {
    id: 6,
    title: "Student Discount",
    description: "Special 25% discount for students",
    discount: "25% OFF",
    icon: Percent,
    validTill: "Always Valid",
    terms: "Valid student ID required",
    color: "from-teal-500 to-teal-700"
  }
];

export const MovieOffersStrip = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleOfferClick = (offerId: number) => {
    navigate(`/offers?highlight=${offerId}`);
  };

  return (
    <section className="py-8" data-testid="movies-offers-strip">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Movie Offers</h2>
          <Button 
            variant="ghost" 
            className="text-primary hover:text-primary/80"
            onClick={() => navigate('/offers')}
          >
            View All Offers →
          </Button>
        </div>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-cinema-surface-elevated hover:bg-cinema-surface border border-border h-10 w-10"
            onClick={() => scroll('left')}
            data-testid="offers-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-cinema-surface-elevated hover:bg-cinema-surface border border-border h-10 w-10"
            onClick={() => scroll('right')}
            data-testid="offers-next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {MOVIE_OFFERS.map((offer) => {
              const IconComponent = offer.icon;
              
              return (
                <Card
                  key={offer.id}
                  className="flex-none w-64 group cursor-pointer overflow-hidden border border-border bg-cinema-surface-elevated hover:scale-105 transition-all duration-300"
                  onClick={() => handleOfferClick(offer.id)}
                  data-testid={`offer-card-${offer.id}`}
                >
                  <CardContent className="p-0">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${offer.color} p-4 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 opacity-20">
                        <IconComponent className="h-16 w-16" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-5 w-5" />
                          <span className="font-semibold text-sm">{offer.title}</span>
                        </div>
                        
                        <Badge 
                          variant="secondary" 
                          className="bg-white/20 text-white border-0 font-bold"
                        >
                          {offer.discount}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <p className="text-sm text-foreground font-medium leading-relaxed">
                        {offer.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Valid till:</span>
                          <span className="text-primary font-medium">{offer.validTill}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          T&C: {offer.terms}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                      >
                        Apply Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};