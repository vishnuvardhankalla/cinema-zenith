import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

const SEARCH_SUGGESTIONS = [
  "Spider-Man: Across the Spider-Verse",
  "Guardians of the Galaxy Vol. 3",
  "The Flash",
  "Stand-up Comedy Shows",
  "Concerts near me",
  "IMAX Theaters",
  "PVR Cinemas",
  "Comedy Shows this weekend"
];

export const SearchTrigger = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setIsExpanded(false);
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(true)}
          data-testid="home-search"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="sm:max-w-md p-0 gap-0 bg-cinema-surface-elevated border-border">
            <DialogHeader className="p-4 pb-2">
              <DialogTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Movies, Events & More
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-4 pt-2">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search for Movies, Events, Plays, Sports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-cinema-surface border-border"
                  data-testid="mobile-search-input"
                />
                <Button 
                  onClick={() => handleSearch()}
                  disabled={!searchQuery.trim()}
                  data-testid="mobile-search-button"
                >
                  Search
                </Button>
              </div>

              {/* Search Suggestions */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Popular Searches</h3>
                {SEARCH_SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-2 rounded-md hover:bg-cinema-surface transition-colors text-sm"
                    data-testid={`search-suggestion-${index}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Desktop version
  return (
    <div className="relative">
      {!isExpanded ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(true)}
          data-testid="home-search"
        >
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        <div className="absolute right-0 top-0 w-80 bg-cinema-surface-elevated border border-border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Search movies, events, plays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-cinema-surface border-border"
                autoFocus
                data-testid="desktop-search-input"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setIsExpanded(false);
                  setSearchQuery("");
                }}
                data-testid="close-search"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Typeahead suggestions */}
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Popular Searches</h4>
              {SEARCH_SUGGESTIONS.slice(0, 5).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-2 rounded-md hover:bg-cinema-surface transition-colors text-sm flex items-center gap-2"
                  data-testid={`desktop-search-suggestion-${index}`}
                >
                  <Search className="h-3 w-3 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};