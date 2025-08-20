import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User } from 'lucide-react';
import { track } from '../../utils/analytics';

export const TopBar = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  const handleLocationSelect = (city: string) => {
    setSelectedCity(city);
    track('city_set', { cityId: city, cityName: city });
  };

  return (
    <header className="topbar" data-testid="topbar">
      {/* Brand */}
      <Link to="/" className="row" data-testid="home-brand">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, hsl(var(--accent)), hsl(var(--accent) / 0.8))' }}
        >
          <span className="text-white font-bold text-sm">TH</span>
        </div>
        <span className="font-bold text-lg hide-mobile">TicketHub</span>
      </Link>

      {/* Location Selector */}
      <button 
        className="btn row"
        data-testid="home-location-selector"
      >
        <MapPin className="w-4 h-4" />
        <span className="hide-mobile">{selectedCity}</span>
      </button>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <Link to="/search" className="btn" data-testid="home-search">
        <Search className="w-4 h-4" />
        <span className="hide-mobile">Search movies, events...</span>
      </Link>

      {/* User Menu */}
      <Link to="/profile" className="btn" data-testid="home-user-menu">
        <User className="w-4 h-4" />
      </Link>
    </header>
  );
};