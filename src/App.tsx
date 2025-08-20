import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { RouteTransition } from './components/layout/RouteTransition';
import { ToastProvider } from './components/ui/toast';

// Pages
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Events } from './pages/Events';
import { Search } from './pages/Search';
import { Offers } from './pages/Offers';
import { Venues } from './pages/Venues';
import { Showtimes } from './pages/Showtimes';
import { SeatSelection } from './pages/SeatSelection';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={
              <RouteTransition>
                <Home />
              </RouteTransition>
            } />
            <Route path="/movies" element={
              <RouteTransition>
                <Movies />
              </RouteTransition>
            } />
            <Route path="/events" element={
              <RouteTransition>
                <Events />
              </RouteTransition>
            } />
            <Route path="/search" element={
              <RouteTransition>
                <Search />
              </RouteTransition>
            } />
            <Route path="/offers" element={
              <RouteTransition>
                <Offers />
              </RouteTransition>
            } />
            <Route path="/venues" element={
              <RouteTransition>
                <Venues />
              </RouteTransition>
            } />
            <Route path="/showtimes" element={
              <RouteTransition>
                <Showtimes />
              </RouteTransition>
            } />
            <Route path="/seat-selection" element={
              <RouteTransition>
                <SeatSelection />
              </RouteTransition>
            } />
            <Route path="/checkout" element={
              <RouteTransition>
                <Checkout />
              </RouteTransition>
            } />
            <Route path="/profile" element={
              <RouteTransition>
                <Profile />
              </RouteTransition>
            } />
            <Route path="*" element={
              <RouteTransition>
                <NotFound />
              </RouteTransition>
            } />
          </Routes>
        </Layout>
      </div>
    </ToastProvider>
  );
}

export default App;
