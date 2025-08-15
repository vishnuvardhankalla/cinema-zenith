import { City } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const CITIES: City[] = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'delhi', name: 'Delhi', state: 'Delhi' },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh' }
];

export async function fetchCities(): Promise<City[]> {
  await delay(200);
  return CITIES;
}

export async function detectUserLocation(): Promise<City | null> {
  await delay(500);
  // Mock location detection - in real app, use geolocation API
  return CITIES[0]; // Default to Mumbai
}