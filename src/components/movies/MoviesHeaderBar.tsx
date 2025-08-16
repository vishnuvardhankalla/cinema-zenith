import { useState, useEffect } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryArrayState, useQueryState } from "@/hooks/useQueryState";
import { fetchMovieFilters } from "@/data/movies";
import { track } from "@/utils/analytics";
import { FilterOptions } from "@/types";

export const MoviesHeaderBar = () => {
  const [languages, setLanguages] = useQueryArrayState('lang');
  const [genres, setGenres] = useQueryArrayState('genre');
  const [format, setFormat] = useQueryState('format', '');
  const [date, setDate] = useQueryState('date', '');
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock city - in real app, get from context/URL
  const cityId = 'mumbai';

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const options = await fetchMovieFilters(cityId);
        setFilterOptions(options);
      } catch (error) {
        console.error('Failed to load filters:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFilters();
  }, [cityId]);

  const toggleArrayFilter = (value: string, current: string[], setter: (values: string[]) => void) => {
    const newValues = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    setter(newValues);
    track('filter_changed', { scope: 'movies', filter: 'array', value });
  };

  const setSingleFilter = (value: string, current: string, setter: (value: string) => void) => {
    const newValue = current === value ? '' : value;
    setter(newValue);
    track('filter_changed', { scope: 'movies', filter: 'single', value });
  };

  const clearAllFilters = () => {
    setLanguages([]);
    setGenres([]);
    setFormat('');
    setDate('');
    track('filter_changed', { scope: 'movies', filter: 'cleared', value: 'all' });
  };

  const hasActiveFilters = languages.length > 0 || genres.length > 0 || format || date;

  if (loading) {
    return (
      <section className="bg-background border-b border-border p-4" data-testid="movies-header-bar">
        <div className="container mx-auto">
          <div className="h-8 bg-muted animate-pulse rounded mb-4 w-48" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-9 w-24 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="bg-background border-b border-border p-4"
      data-testid="movies-header-bar"
      aria-label="Movie filters"
    >
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Movies in Mumbai
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Language Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all transform hover:scale-[0.98] active:scale-[0.96]"
                data-testid="language-filter"
                aria-pressed={languages.length > 0}
              >
                <span>Language</span>
                {languages.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] text-xs">
                    {languages.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {filterOptions?.languages.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => toggleArrayFilter(language, languages, setLanguages)}
                  className={`cursor-pointer ${
                    languages.includes(language) ? 'bg-primary/10 text-primary' : ''
                  }`}
                  data-testid={`chip-language-${language.toLowerCase()}`}
                >
                  {language}
                  {languages.includes(language) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Genre Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all transform hover:scale-[0.98] active:scale-[0.96]"
                data-testid="genre-filter"
                aria-pressed={genres.length > 0}
              >
                <span>Genre</span>
                {genres.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] text-xs">
                    {genres.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {filterOptions?.genres.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  onClick={() => toggleArrayFilter(genre, genres, setGenres)}
                  className={`cursor-pointer ${
                    genres.includes(genre) ? 'bg-primary/10 text-primary' : ''
                  }`}
                  data-testid={`chip-genre-${genre.toLowerCase()}`}
                >
                  {genre}
                  {genres.includes(genre) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Format Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all transform hover:scale-[0.98] active:scale-[0.96]"
                data-testid="format-filter"
                aria-pressed={!!format}
              >
                <span>{format || 'Format'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {filterOptions?.formats.map((fmt) => (
                <DropdownMenuItem
                  key={fmt}
                  onClick={() => setSingleFilter(fmt, format, setFormat)}
                  className={`cursor-pointer ${
                    format === fmt ? 'bg-primary/10 text-primary' : ''
                  }`}
                  data-testid={`chip-format-${fmt.toLowerCase()}`}
                >
                  {fmt}
                  {format === fmt && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all transform hover:scale-[0.98] active:scale-[0.96]"
                data-testid="date-filter"
                aria-pressed={!!date}
              >
                <Calendar className="h-4 w-4" />
                <span>{date ? filterOptions?.dates.find(d => d.value === date)?.label : 'Date'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {filterOptions?.dates.map((dateOption) => (
                <DropdownMenuItem
                  key={dateOption.value}
                  onClick={() => setSingleFilter(dateOption.value, date, setDate)}
                  className={`cursor-pointer ${
                    date === dateOption.value ? 'bg-primary/10 text-primary' : ''
                  }`}
                  data-testid={`chip-date-${dateOption.value}`}
                >
                  {dateOption.label}
                  {date === dateOption.value && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear All */}
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
              className="h-9 px-3 text-muted-foreground hover:text-foreground opacity-100 animate-fade-in"
              data-testid="clear-filters"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label="Active filters">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleArrayFilter(lang, languages, setLanguages)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-destructive/20 transition-colors"
                aria-label={`Remove ${lang} filter`}
              >
                {lang}
                <X className="h-3 w-3" />
              </button>
            ))}
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleArrayFilter(genre, genres, setGenres)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-destructive/20 transition-colors"
                aria-label={`Remove ${genre} filter`}
              >
                {genre}
                <X className="h-3 w-3" />
              </button>
            ))}
            {format && (
              <button
                onClick={() => setFormat('')}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-destructive/20 transition-colors"
                aria-label={`Remove ${format} filter`}
              >
                {format}
                <X className="h-3 w-3" />
              </button>
            )}
            {date && (
              <button
                onClick={() => setDate('')}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-destructive/20 transition-colors"
                aria-label="Remove date filter"
              >
                {filterOptions?.dates.find(d => d.value === date)?.label}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};