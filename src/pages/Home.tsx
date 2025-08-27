export const Home = () => {
  return (
    <div data-testid="home-page">
      <div className="section">
        <h1>Welcome to TicketHub</h1>
        <p className="muted">Your one-stop destination for movies, events, and entertainment.</p>
      </div>
      
      <div className="section">
        <h2>Featured Movies</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card" style={{ padding: '16px', textAlign: 'center' }}>
              <div className="skeleton" style={{ height: '280px', marginBottom: '12px' }}></div>
              <h3>Movie {i}</h3>
              <p className="muted">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2>Popular Events</h2>
        <div className="scroll-x">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="card" style={{ minWidth: '250px', padding: '16px' }}>
              <div className="skeleton" style={{ height: '150px', marginBottom: '12px' }}></div>
              <h4>Event {i}</h4>
              <p className="muted">This Weekend</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};