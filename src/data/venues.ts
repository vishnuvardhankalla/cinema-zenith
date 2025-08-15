import { Venue } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'PVR Phoenix Mall',
    cityId: 'mumbai',
    area: 'Lower Parel',
    amenities: ['IMAX', '4DX', 'Dolby Atmos', 'Food Court'],
    image: 'https://images.unsplash.com/photo-1489599794188-077c6ac80b80?w=400&h=300&fit=crop',
    address: 'Phoenix Mills, Lower Parel, Mumbai'
  },
  {
    id: 'v2',
    name: 'INOX R-City Mall',
    cityId: 'mumbai',
    area: 'Ghatkopar',
    amenities: ['IMAX', 'Dolby Atmos', 'Premium Seating'],
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=300&fit=crop',
    address: 'R-City Mall, Ghatkopar West, Mumbai'
  },
  {
    id: 'v3',
    name: 'DY Patil Stadium',
    cityId: 'mumbai',
    area: 'Navi Mumbai',
    amenities: ['Large Capacity', 'Parking', 'Food Stalls'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    address: 'Sector 7, Nerul, Navi Mumbai'
  },
  {
    id: 'v4',
    name: 'The Comedy Store',
    cityId: 'mumbai',
    area: 'Bandra',
    amenities: ['Intimate Setting', 'Bar', 'Air Conditioning'],
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    address: 'Palladium Mall, Bandra West, Mumbai'
  },
  {
    id: 'v5',
    name: 'NCPA Auditorium',
    cityId: 'mumbai',
    area: 'Nariman Point',
    amenities: ['World Class Acoustics', 'Premium Venue', 'Cultural Hub'],
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&h=300&fit=crop',
    address: 'Nariman Point, Mumbai'
  },
  {
    id: 'v6',
    name: 'Prithvi Theatre',
    cityId: 'mumbai',
    area: 'Juhu',
    amenities: ['Historic Venue', 'Cafe', 'Heritage'],
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop',
    address: 'Janki Kutir, Juhu Church Road, Mumbai'
  }
];

export async function fetchVenues(cityId: string): Promise<Venue[]> {
  await delay(300);
  return VENUES.filter(venue => venue.cityId === cityId);
}

export async function fetchPopularVenues(cityId: string): Promise<Venue[]> {
  await delay(300);
  return VENUES.filter(venue => venue.cityId === cityId).slice(0, 4);
}