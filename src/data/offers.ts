import { Offer } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ALL_OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'HDFC Bank Offer',
    provider: 'Bank',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=60&fit=crop',
    details: 'Get 20% off up to ₹150 on movie tickets',
    terms: 'Valid on HDFC Debit & Credit Cards. Minimum booking value ₹500. Offer valid till 31st Dec 2024.',
    cta: 'View Terms',
    discount: '20% OFF',
    validTill: '31 Dec 2024'
  },
  {
    id: 'o2',
    title: 'Paytm Cashback',
    provider: 'Wallet',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop',
    details: 'Flat ₹100 cashback on movie bookings',
    terms: 'Valid on Paytm wallet payments. Minimum booking ₹300. Cashback credited within 24 hours.',
    cta: 'Apply Now',
    discount: '₹100 BACK',
    validTill: '15 Jan 2025'
  },
  {
    id: 'o3',
    title: 'BookMyShow Exclusive',
    provider: 'UPI',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=60&fit=crop',
    details: 'Buy 2 Get 1 Free on premium seats',
    terms: 'Valid on premium and recliner seats only. Third ticket must be of equal or lesser value.',
    cta: 'Book Now',
    discount: 'BUY 2 GET 1',
    validTill: '25 Dec 2024'
  },
  {
    id: 'o4',
    title: 'Weekend Special',
    provider: 'Bank',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=60&fit=crop',
    details: 'Extra 15% off on weekend bookings',
    terms: 'Valid on Friday, Saturday & Sunday bookings only. Cannot be combined with other offers.',
    cta: 'Grab Deal',
    discount: '15% OFF',
    validTill: 'Every Weekend'
  },
  {
    id: 'o5',
    title: 'SBI Card Offer',
    provider: 'Bank',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=60&fit=crop',
    details: 'Get ₹200 off on IMAX & 4DX shows',
    terms: 'Valid on SBI Credit Cards. Applicable on IMAX and 4DX formats only.',
    cta: 'Use Code',
    discount: '₹200 OFF',
    validTill: '30 Jan 2025'
  },
  {
    id: 'o6',
    title: 'Student Discount',
    provider: 'UPI',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=60&fit=crop',
    details: 'Special 25% discount for students',
    terms: 'Valid student ID required. One ticket per student ID. Available for all shows except premieres.',
    cta: 'Verify Student',
    discount: '25% OFF',
    validTill: 'Always Valid'
  },
  {
    id: 'eo1',
    title: 'Early Bird Concert Deals',
    provider: 'Wallet',
    logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop',
    details: '30% off on concert tickets',
    terms: 'Valid for bookings made 14 days in advance. Limited to first 100 bookings per event.',
    cta: 'Book Early',
    discount: '30% OFF',
    validTill: '31 Mar 2025'
  },
  {
    id: 'eo2',
    title: 'Group Booking Discount',
    provider: 'UPI',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=60&fit=crop',
    details: 'Book 5+ tickets and save big',
    terms: 'Valid for groups of 5 or more. 20% discount on total booking value.',
    cta: 'Group Book',
    discount: '20% OFF',
    validTill: 'Ongoing'
  }
];

export async function fetchOffers(type?: 'movies' | 'events' | 'all'): Promise<Offer[]> {
  await delay(300);
  
  if (type === 'movies') {
    return ALL_OFFERS.filter(offer => !offer.id.startsWith('eo'));
  } else if (type === 'events') {
    return ALL_OFFERS.filter(offer => offer.id.startsWith('eo'));
  }
  
  return ALL_OFFERS;
}