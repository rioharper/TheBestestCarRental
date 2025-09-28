import React, { useState } from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onSignInClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignInClick }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('Noon');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('Noon');
  const [sameDropoff, setSameDropoff] = useState(true);
  const [selectedCarType, setSelectedCarType] = useState('all');

  const carTypes = [
    { id: 'all', name: 'All Cars', icon: '🚗' },
    { id: 'sedan', name: 'Sedan', icon: '🚙' },
    { id: 'suv', name: 'SUV', icon: '🚐' },
    { id: 'truck', name: 'Truck', icon: '🛻' },
    { id: 'minibus', name: 'Minibus', icon: '🚌' },
    { id: 'luxury', name: 'Luxury', icon: '🏎️' },
  ];

  const handleSearch = () => {
    console.log('Search for cars:', {
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      selectedCarType
    });
    // TODO: Implement search functionality
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">THE BESTEST</span>
          </div>
          <nav className="nav-menu">
            <button className="nav-item active">Cars</button>
            <button className="nav-item">My Bookings</button>          </nav>
          <div className="header-actions">
            <button className="favorites-btn">♡</button>
            <button className="signin-btn" onClick={onSignInClick}>
              👤 Sign in
            </button>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <div className="hero-section">
          <h1 className="hero-title">
            Find the bestest car for you<span className="accent">.</span>
          </h1>

          <div className="car-type-tabs">
            {carTypes.map((type) => (
              <button
                key={type.id}
                className={`car-type-tab ${selectedCarType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedCarType(type.id)}
              >
                <span className="car-icon">{type.icon}</span>
                <span className="car-name">{type.name}</span>
              </button>
            ))}
          </div>

          <div className="search-form">
            <div className="dropoff-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={sameDropoff}
                  onChange={(e) => setSameDropoff(e.target.checked)}
                />
                Same drop-off
              </label>
            </div>

            <div className="search-inputs">
              <div className="location-input">
                <input
                  type="text"
                  placeholder="Pick-up location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="location-field"
                />
              </div>

              <div className="date-time-group">
                <div className="date-input">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="date-field"
                  />
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="time-field"
                  >
                    <option value="Noon">Noon</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div className="separator">–</div>

                <div className="date-input">
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="date-field"
                  />
                  <select
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="time-field"
                  >
                    <option value="Noon">Noon</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <button className="search-btn" onClick={handleSearch}>
                  🔍
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;