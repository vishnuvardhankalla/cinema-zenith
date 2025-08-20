import { NavLink } from 'react-router-dom';
import { Home, Film, Calendar, Search, Gift, Building, User } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/offers', label: 'Offers', icon: Gift },
  { to: '/venues', label: 'Venues', icon: Building },
  { to: '/profile', label: 'Profile', icon: User },
];

export const SideNav = () => {
  return (
    <nav className="sidenav" data-testid="sidenav">
      <div className="grid gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            data-testid={`nav-${label.toLowerCase()}`}
          >
            <div className="row">
              <Icon className="w-4 h-4" />
              {label}
            </div>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};