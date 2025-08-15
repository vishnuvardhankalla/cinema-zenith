// Core domain types for the TicketHub application

export interface City {
  id: string;
  name: string;
  state?: string;
}

export interface Movie {
  id: string;
  title: string;
  langs: string[];
  genres: string[];
  formats: ('2D' | '3D' | 'IMAX')[];
  cert: 'U' | 'U/A' | 'A';
  runtimeMins?: number;
  rating?: number;
  poster: string;
  backdrop?: string;
  releaseDate?: string;
  tagline?: string;
}

export interface Event {
  id: string;
  name: string;
  category: 'Concert' | 'Comedy' | 'Theatre' | 'Festival';
  date: string;
  venueId: string;
  image: string;
  priceFrom: number;
  description?: string;
  featured?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  cityId: string;
  area?: string;
  amenities?: string[];
  image?: string;
  address?: string;
}

export interface Offer {
  id: string;
  title: string;
  provider: 'Bank' | 'Wallet' | 'UPI';
  logo: string;
  details: string;
  terms?: string;
  cta?: string;
  discount?: string;
  validTill?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  venueId: string;
  date: string;
  times: string[];
  format: '2D' | '3D' | 'IMAX';
  lang: string;
  priceFrom: number;
}

export interface Seat {
  id: string;
  row: string;
  col: number;
  type: 'REG' | 'PREM' | 'RECL';
  price: number;
  taken: boolean;
}

export interface Booking {
  id: string;
  items: {
    movieId?: string;
    eventId?: string;
    venueId: string;
    showtimeId: string;
    seats: Seat[];
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface FilterOptions {
  languages: string[];
  genres: string[];
  formats: ('2D' | '3D' | 'IMAX')[];
  dates: Array<{ label: string; value: string }>;
}