import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const TheatreAccessPlaceholder = () => {
  return (
    <section className="py-8 bg-cinema-surface/30" data-testid="movies-theatre-placeholder">
      <div className="container mx-auto px-4">
        <Card className="border border-border/50 bg-cinema-surface-elevated/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <MapPin className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold">
                Find Theatres & Showtimes
              </h2>
              
              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                Select a movie above to view nearby theatres, available showtimes, 
                and book your perfect seats. Experience movies like never before 
                in premium formats including IMAX, 4DX, and Dolby Atmos.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-1">Nearby Theatres</h3>
                    <p className="text-sm text-muted-foreground">
                      Find cinemas close to you with live availability
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <Calendar className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-1">Flexible Dates</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from multiple dates and showtimes
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <Clock className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-1">Real-time Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Live seat availability and instant booking
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Browse Movies
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Pro Tip:</strong> Book tickets in advance for popular movies and get the best seats!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};