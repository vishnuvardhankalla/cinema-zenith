import { Event, Venue, Offer } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'Sunburn Arena',
    category: 'Concert',
    date: '2025-08-25',
    venueId: 'v3',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    priceFrom: 1500,
    description: 'Electronic dance music festival featuring top DJs',
    featured: true
  },
  {
    id: 'e2',
    name: 'Comedy Central Live',
    category: 'Comedy',
    date: '2025-08-20',
    venueId: 'v4',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    priceFrom: 800,
    description: 'Stand-up comedy show with top comedians'
  },
  {
    id: 'e3',
    name: 'Classical Symphony',
    category: 'Concert',
    date: '2025-08-30',
    venueId: 'v5',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=300&fit=crop',
    priceFrom: 1200,
    description: 'Orchestra performance of classical masterpieces'
  },
  {
    id: 'e4',
    name: 'Rock Revolution',
    category: 'Concert',
    date: '2025-09-02',
    venueId: 'v3',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    priceFrom: 2000,
    description: 'Rock bands showcase their latest hits',
    featured: true
  },
  {
    id: 'e5',
    name: 'Theatre Classics',
    category: 'Theatre',
    date: '2025-08-28',
    venueId: 'v6',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop',
    priceFrom: 600,
    description: 'Timeless plays performed by renowned theatre groups'
  }
];

const EVENT_OFFERS: Offer[] = [
  {
    id: 'eo1',
    title: 'Early Bird Special',
    provider: 'UPI',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop',
    details: '20% off on event bookings',
    terms: 'Valid for bookings made 7 days in advance',
    cta: 'Book Now',
    discount: '20% OFF',
    validTill: '31 Aug 2025'
  }
];

export async function fetchEvents(cityId: string, category?: string): Promise<Event[]> {
  await delay(300);
  let events = EVENTS;
  
  if (category && category !== 'All') {
    events = events.filter(event => event.category === category);
  }
  
  return events;
}

export async function fetchFeaturedEvents(cityId: string): Promise<Event[]> {
  await delay(300);
  return EVENTS.filter(event => event.featured);
}

export async function fetchEventOffers(cityId: string): Promise<Offer[]> {
  await delay(200);
  return EVENT_OFFERS;
}

export async function fetchEventCategories(): Promise<string[]> {
  await delay(100);
  return ['All', 'Concert', 'Comedy', 'Theatre', 'Festival'];
}