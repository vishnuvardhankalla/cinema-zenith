import { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useQueryState } from '../hooks/useQueryState';
import { track } from '../utils/analytics';

export const Search = () => {
  const [query, setQuery] = useQueryState('q', '');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    track('search_performed', { query: searchQuery });

    // Mock search delay
    setTimeout(() => {
      setResults([
        { id: 1, type: 'Movie', title: 'Galactic Heist', image: '/mock/poster1.jpg' },
        { id: 2, type: 'Event', title: 'Comedy Night', image: '/mock/event1.jpg' },
        { id: 3, type: 'Venue', title: 'PVR Phoenix', image: '/mock/venue1.jpg' },
      ]);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4" data-testid="search-page">
      {/* Search Input */}
      <div className="relative mb-6" data-testid="search-input">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search movies, events, venues..."
          className="input w-full pl-10 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 btn p-1"
            onClick={() => setQuery('')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {!query && (
        <div data-testid="search-suggestions">
          <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['Avengers', 'Comedy Shows', 'PVR Cinemas'].map((item) => (
              <button
                key={item}
                className="chip"
                onClick={() => setQuery(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query && (
        <div data-testid="search-results">
          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-20" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((result) => (
                <div key={result.id} className="card p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-700 rounded"></div>
                  <div>
                    <div className="text-sm text-blue-400">{result.type}</div>
                    <div className="font-semibold">{result.title}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="search-empty">
              <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-gray-400">Try searching for movies, events, or venues</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};