import { NavLink } from 'react-router-dom';
import { Home, Film, Calendar, User } from 'lucide-react';

const tabItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/events', label: 'Events', icon: Calendar },
  { to: '/profile', label: 'Profile', icon: User },
];

export const BottomTabs = () => {
  return (
    <nav className="bottom-tabs" data-testid="bottom-tabs">
      {tabItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}
          data-testid={`tab-${label.toLowerCase()}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Icon className="w-4 h-4" />
            <span style={{ fontSize: '12px' }}>{label}</span>
          </div>
        </NavLink>
      ))}
    </nav>
  );
};