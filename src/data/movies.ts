import { Movie, Showtime, Offer, FilterOptions } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock movie data
const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Galactic Heist',
    langs: ['Hindi', 'English'],
    genres: ['Action', 'Sci-Fi'],
    formats: ['2D', 'IMAX'],
    cert: 'U/A',
    runtimeMins: 142,
    rating: 8.3,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=675&fit=crop',
    releaseDate: '2025-08-01',
    tagline: 'The heist that spans galaxies'
  },
  {
    id: 'm2',
    title: 'Monsoon Melodies',
    langs: ['Hindi', 'Tamil'],
    genres: ['Romance', 'Drama'],
    formats: ['2D'],
    cert: 'U',
    runtimeMins: 123,
    rating: 7.6,
    poster: 'https://images.unsplash.com/photo-1489599894-2b9de88b93d8?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1489599894-2b9de88b93d8?w=1200&h=675&fit=crop',
    releaseDate: '2025-08-22',
    tagline: 'Love in the rains'
  },
  {
    id: 'm3',
    title: 'The Last Raga',
    langs: ['Hindi'],
    genres: ['Musical', 'Drama'],
    formats: ['2D'],
    cert: 'U',
    runtimeMins: 134,
    rating: 8.1,
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    releaseDate: '2025-08-15',
    tagline: 'Music that transcends time'
  },
  {
    id: 'm4',
    title: 'Urban Legends',
    langs: ['English', 'Hindi'],
    genres: ['Horror', 'Thriller'],
    formats: ['2D', '3D'],
    cert: 'A',
    runtimeMins: 118,
    rating: 7.2,
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
    releaseDate: '2025-08-10',
    tagline: 'Fear has a new address'
  },
  {
    id: 'm5',
    title: 'Laughter Express',
    langs: ['Hindi', 'English'],
    genres: ['Comedy'],
    formats: ['2D'],
    cert: 'U',
    runtimeMins: 108,
    rating: 6.8,
    poster: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=300&h=450&fit=crop',
    releaseDate: '2025-08-05',
    tagline: 'All aboard the comedy train'
  }
];

const COMING_SOON: Movie[] = [
  {
    id: 'm6',
    title: 'The Last Raga',
    langs: ['Hindi'],
    genres: ['Musical'],
    formats: ['2D'],
    cert: 'U',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    releaseDate: '2025-09-05'
  },
  {
    id: 'm7',
    title: 'Cyber Storm',
    langs: ['English', 'Hindi'],
    genres: ['Action', 'Thriller'],
    formats: ['2D', 'IMAX'],
    cert: 'U/A',
    poster: 'https://images.unsplash.com/photo-1635863138275-d9864d29c3a5?w=300&h=450&fit=crop',
    releaseDate: '2025-09-12'
  },
  {
    id: 'm8',
    title: 'Heritage',
    langs: ['Tamil', 'Hindi'],
    genres: ['Drama', 'History'],
    formats: ['2D'],
    cert: 'U',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
    releaseDate: '2025-09-18'
  }
];

const MOVIE_OFFERS: Offer[] = [
  {
    id: 'o1',
    title: '10% off with HDFC',
    provider: 'Bank',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=60&fit=crop',
    details: 'Up to ₹200 off on movie tickets',
    terms: 'Minimum transaction ₹500',
    cta: 'View Terms',
    discount: '10% OFF',
    validTill: '31 Dec 2024'
  },
  {
    id: 'o2',
    title: 'Paytm Cashback',
    provider: 'Wallet',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop',
    details: 'Flat ₹100 cashback on movie bookings',
    terms: 'Minimum booking ₹300',
    cta: 'Apply Now',
    discount: '₹100 BACK',
    validTill: '15 Jan 2025'
  }
];

// Mock API functions
export async function fetchMovies(cityId: string): Promise<Movie[]> {
  await delay(300);
  return MOVIES;
}

export async function fetchFeaturedMovies(cityId: string): Promise<Movie[]> {
  await delay(300);
  return MOVIES.slice(0, 3).map(movie => ({
    ...movie,
    backdrop: movie.backdrop || movie.poster
  }));
}

export async function fetchComingSoon(cityId: string): Promise<Movie[]> {
  await delay(300);
  return COMING_SOON;
}

export async function fetchMovieOffers(cityId: string): Promise<Offer[]> {
  await delay(200);
  return MOVIE_OFFERS;
}

export async function fetchMovieFilters(cityId: string): Promise<FilterOptions> {
  await delay(200);
  
  // Generate next 7 days
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      label: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      value: date.toISOString().split('T')[0]
    });
  }
  
  return {
    languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada'],
    genres: ['Action', 'Comedy', 'Drama', 'Romance', 'Horror', 'Sci-Fi', 'Musical', 'Thriller'],
    formats: ['2D', '3D', 'IMAX'],
    dates
  };
}

export async function fetchShowtimes(movieId: string, cityId: string, date: string): Promise<Showtime[]> {
  await delay(300);
  
  const data: Showtime[] = [
    {
      id: 's1',
      movieId,
      venueId: 'v1',
      date,
      times: ['10:00', '13:30', '18:15', '21:45'],
      format: '2D',
      lang: 'Hindi',
      priceFrom: 180
    },
    {
      id: 's2',
      movieId,
      venueId: 'v2',
      date,
      times: ['11:20', '15:00', '20:00'],
      format: 'IMAX',
      lang: 'English',
      priceFrom: 350
    }
  ];
  
  return data;
}