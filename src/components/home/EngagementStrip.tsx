import { useState } from "react";
import { Mail, Smartphone, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const EngagementStrip = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      toast({
        title: "Subscription Successful!",
        description: "You'll receive updates about the latest movies and events.",
      });
    }, 1000);
  };

  return (
    <section className="py-8 md:py-12" data-testid="home-engagement-strip">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Email Subscription */}
          <Card className="lg:col-span-2 bg-gradient-glow text-white border-none">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    Never Miss a Show
                  </h3>
                  <p className="text-white/90 mb-4">
                    Get notified about the latest movies, events, and exclusive offers in your city.
                  </p>
                  
                  <form onSubmit={handleEmailSubscription} className="flex gap-2 max-w-md">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      required
                      data-testid="email-subscription-input"
                    />
                    <Button 
                      type="submit"
                      disabled={isSubscribing}
                      variant="secondary"
                      className="bg-white text-primary hover:bg-white/90"
                      data-testid="email-subscription-submit"
                    >
                      {isSubscribing ? "..." : <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Download */}
          <Card className="bg-cinema-surface-elevated border-border">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="p-4 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">
                  Download Our App
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Book tickets faster with our mobile app
                </p>
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    data-testid="download-ios"
                  >
                    📱 Download for iOS
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    data-testid="download-android"
                  >
                    🤖 Download for Android
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Program */}
        <Card className="mt-6 bg-accent/10 border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Gift className="h-6 w-6 text-accent" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Refer & Earn
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Invite friends and get ₹100 vouchers for each successful referral
                  </p>
                </div>
              </div>
              
              <Button 
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white"
                data-testid="refer-friends"
              >
                Refer Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};