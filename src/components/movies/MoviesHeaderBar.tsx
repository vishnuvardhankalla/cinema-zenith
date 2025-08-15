import { useState } from "react";
import { Filter, X, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = ["Hindi", "English", "Telugu", "Tamil", "Malayalam", "Kannada"];
const GENRES = ["Action", "Drama", "Comedy", "Romance", "Thriller", "Horror", "Sci-Fi", "Adventure"];
const FORMATS = ["2D", "3D", "IMAX", "4DX", "MX4D"];

export const MoviesHeaderBar = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const toggleFilter = (value: string, selected: string[], setter: (values: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(item => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedLanguages([]);
    setSelectedGenres([]);
    setSelectedFormats([]);
    setSelectedDate("");
  };

  const hasActiveFilters = selectedLanguages.length > 0 || selectedGenres.length > 0 || 
                          selectedFormats.length > 0 || selectedDate;

  return (
    <section 
      className="bg-cinema-surface border-b border-border p-4"
      data-testid="movies-header-bar"
    >
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-glow bg-clip-text text-transparent">
          Movies in Mumbai
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Language Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-9 px-3 gap-2"
                data-testid="language-filter"
              >
                <span>Language</span>
                {selectedLanguages.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedLanguages.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-cinema-surface-elevated border-border">
              {LANGUAGES.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => toggleFilter(language, selectedLanguages, setSelectedLanguages)}
                  className={`cursor-pointer ${
                    selectedLanguages.includes(language) ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  {language}
                  {selectedLanguages.includes(language) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Genre Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-9 px-3 gap-2"
                data-testid="genre-filter"
              >
                <span>Genre</span>
                {selectedGenres.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedGenres.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-cinema-surface-elevated border-border">
              {GENRES.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  onClick={() => toggleFilter(genre, selectedGenres, setSelectedGenres)}
                  className={`cursor-pointer ${
                    selectedGenres.includes(genre) ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  {genre}
                  {selectedGenres.includes(genre) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Format Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-9 px-3 gap-2"
                data-testid="format-filter"
              >
                <span>Format</span>
                {selectedFormats.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedFormats.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-cinema-surface-elevated border-border">
              {FORMATS.map((format) => (
                <DropdownMenuItem
                  key={format}
                  onClick={() => toggleFilter(format, selectedFormats, setSelectedFormats)}
                  className={`cursor-pointer ${
                    selectedFormats.includes(format) ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  {format}
                  {selectedFormats.includes(format) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Filter */}
          <Button 
            variant="outline" 
            className="h-9 px-3 gap-2"
            data-testid="date-filter"
          >
            <Calendar className="h-4 w-4" />
            <span>Date</span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Clear All */}
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
              className="h-9 px-3 text-muted-foreground hover:text-foreground"
              data-testid="clear-filters"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedLanguages.map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={() => toggleFilter(lang, selectedLanguages, setSelectedLanguages)}
              >
                {lang}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {selectedGenres.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={() => toggleFilter(genre, selectedGenres, setSelectedGenres)}
              >
                {genre}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {selectedFormats.map((format) => (
              <Badge
                key={format}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={() => toggleFilter(format, selectedFormats, setSelectedFormats)}
              >
                {format}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};