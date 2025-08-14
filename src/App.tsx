import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Layout components
import { TopBar } from "@/components/layout/TopBar";
import { SideNav } from "@/components/layout/SideNav";
import { BottomTabs } from "@/components/layout/BottomTabs";
import { RouteTransition } from "@/components/layout/RouteTransition";

// Pages
import { Home } from "@/pages/Home";
import { Movies } from "@/pages/Movies";
import { Events } from "@/pages/Events";
import { SearchPage } from "@/pages/SearchPage";
import { Offers } from "@/pages/Offers";
import { Venues } from "@/pages/Venues";
import { Showtimes } from "@/pages/Showtimes";
import { SeatSelection } from "@/pages/SeatSelection";
import { Checkout } from "@/pages/Checkout";
import { Profile } from "@/pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground" data-testid="app-container">
            <TopBar onMenuClick={() => setSideNavOpen(true)} />
            
            <div className="flex min-h-[calc(100vh-4rem)]">
              <SideNav 
                isOpen={sideNavOpen} 
                onClose={() => setSideNavOpen(false)} 
              />
              
              <main className="flex-1 md:ml-0 pb-16 md:pb-0" data-testid="main-content">
                <RouteTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/venues" element={<Venues />} />
                    <Route path="/showtimes" element={<Showtimes />} />
                    <Route path="/seat-selection" element={<SeatSelection />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </RouteTransition>
              </main>
            </div>
            
            <BottomTabs />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
