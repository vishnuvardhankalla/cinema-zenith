/**
 * Analytics utility for tracking user interactions
 * Call track(eventName, payload) from key interactions
 */

export interface AnalyticsEvent {
  city_set: { cityId: string; cityName: string };
  search_performed: { query: string; type?: string; resultsCount?: number };
  filter_changed: { scope: string; filter: string; value: string | string[] };
  movie_opened: { movieId: string; movieTitle: string; source: string };
  showtime_selected: { movieId: string; venueId: string; time: string; date: string };
  seats_selected: { showtimeId: string; seatCount: number; totalAmount: number };
  checkout_initiated: { bookingId: string; amount: number; paymentMethod?: string };
  payment_attempted: { bookingId: string; amount: number; method: string };
  payment_succeeded: { bookingId: string; amount: number; method: string };
  payment_failed: { bookingId: string; amount: number; method: string; error: string };
  offer_applied: { offerId: string; discount: number };
  notification_requested: { movieId: string; movieTitle: string };
}

export const track = <T extends keyof AnalyticsEvent>(
  event: T,
  payload: AnalyticsEvent[T]
): void => {
  // For development - log to console
  console.log('📊 Analytics:', event, payload);
  
  // In production, send to analytics service
  // Example: amplitude.track(event, payload);
  // Example: gtag('event', event, payload);
  
  // Store locally for debugging
  const analyticsData = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  analyticsData.push({
    event,
    payload,
    timestamp: new Date().toISOString(),
    url: window.location.pathname + window.location.search
  });
  
  // Keep only last 100 events
  if (analyticsData.length > 100) {
    analyticsData.splice(0, analyticsData.length - 100);
  }
  
  localStorage.setItem('analytics_events', JSON.stringify(analyticsData));
};

// Helper to get analytics data for debugging
export const getAnalyticsData = () => {
  return JSON.parse(localStorage.getItem('analytics_events') || '[]');
};

// Clear analytics data
export const clearAnalyticsData = () => {
  localStorage.removeItem('analytics_events');
};
