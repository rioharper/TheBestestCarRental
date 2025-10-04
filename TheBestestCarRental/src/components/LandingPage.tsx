import React, { useState } from 'react';
import './LandingPage.css';
import CarCard from './CarCard';

interface User {
  email: string;
  name: string;
}

interface LandingPageProps {
  onSignInClick: () => void;
  user?: User | null;
  onLogout?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignInClick, user, onLogout }) => {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('Noon');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('Noon');
  const [selectedCarType, setSelectedCarType] = useState('all');
  const [priceRange, setPriceRange] = useState([10, 500]);
  const [seatCount, setSeatCount] = useState(2);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const carTypes = [
    { id: 'all', name: 'All Cars', icon: '🚗' },
    { id: 'sedan', name: 'Sedan', icon: '🚙' },
    { id: 'suv', name: 'SUV', icon: '🚐' },
    { id: 'truck', name: 'Truck', icon: '🛻' },
    { id: 'minibus', name: 'Minibus', icon: '🚌' },
    { id: 'luxury', name: 'Luxury', icon: '🏎️' },
  ];

  const colors = [
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'white', name: 'White', color: '#FFFFFF' },
    { id: 'silver', name: 'Silver', color: '#C0C0C0' },
    { id: 'red', name: 'Red', color: '#DC143C' },
    { id: 'blue', name: 'Blue', color: '#1E90FF' },
  ];

  const brands = [
    { id: 'toyota', name: 'Toyota' },
    { id: 'ford', name: 'Ford' },
    { id: 'chevrolet', name: 'Chevrolet' },
    { id: 'honda', name: 'Honda' },
    { id: 'nissan', name: 'Nissan' },
    { id: 'bmw', name: 'BMW' },
  ];

  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSearch = () => {
    console.log('Search for cars:', {
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      selectedCarType,
      priceRange,
      seatCount,
      selectedColors,
      selectedBrands
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
            {user ? (
              <>
                <span className="user-welcome">Welcome, {user.name}!</span>
                <button className="logout-btn" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="signin-btn" onClick={onSignInClick}>
                👤 Sign in
              </button>
            )}
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

          {/* Additional Filter Sections */}
          <div className="filter-sections">
            {/* Price Section */}
            <div className="filter-section">
              <h3 className="filter-header">Price</h3>
              <div className="price-slider-container">
                <div className="price-range-display">
                  ${priceRange[0]}/day - ${priceRange[1]}/day
                </div>
                
                {/* Minimum Price Controls */}
                <div className="price-control-group">
                  <label className="price-label">Minimum</label>
                  <div className="price-controls">
                    <button 
                      className="price-btn price-btn-minus"
                      onClick={() => setPriceRange([Math.max(10, priceRange[0] - 10), priceRange[1]])}
                      disabled={priceRange[0] <= 10}
                    >
                      −
                    </button>
                    <span className="price-value">${priceRange[0]}</span>
                    <button 
                      className="price-btn price-btn-plus"
                      onClick={() => setPriceRange([Math.min(priceRange[1] - 10, priceRange[0] + 10), priceRange[1]])}
                      disabled={priceRange[0] >= priceRange[1] - 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Maximum Price Controls */}
                <div className="price-control-group">
                  <label className="price-label">Maximum</label>
                  <div className="price-controls">
                    <button 
                      className="price-btn price-btn-minus"
                      onClick={() => setPriceRange([priceRange[0], Math.max(priceRange[0] + 10, priceRange[1] - 10)])}
                      disabled={priceRange[1] <= priceRange[0] + 10}
                    >
                      −
                    </button>
                    <span className="price-value">${priceRange[1]}</span>
                    <button 
                      className="price-btn price-btn-plus"
                      onClick={() => setPriceRange([priceRange[0], Math.min(500, priceRange[1] + 10)])}
                      disabled={priceRange[1] >= 500}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Number of Seats Section */}
            <div className="filter-section">
              <h3 className="filter-header">Number of Seats</h3>
              <div className="seat-container">
                <div className="seat-count-display">
                  {seatCount} seats
                </div>
                <div className="seat-layout-visual">
                  {/* Car outline with seats */}
                  <div className="car-outline">
                    {/* Front row - always has 2 seats (driver + passenger) */}
                    <div className="front-row">
                      <div className={`seat ${seatCount >= 1 ? 'active' : ''}`}>💺</div>
                      <div className={`seat ${seatCount >= 2 ? 'active' : ''}`}>💺</div>
                    </div>
                    
                    {/* Second row */}
                    {seatCount >= 3 && (
                      <div className="second-row">
                        <div className="seat active">💺</div>
                        {seatCount >= 4 && <div className="seat active">💺</div>}
                      </div>
                    )}
                    
                    {/* Third row */}
                    {seatCount >= 5 && (
                      <div className="third-row">
                        <div className="seat active">💺</div>
                        {seatCount >= 6 && <div className="seat active">💺</div>}
                      </div>
                    )}
                  </div>
                </div>
                <div className="seat-controls">
                  <button 
                    className="seat-btn seat-btn-minus"
                    onClick={() => setSeatCount(Math.max(2, seatCount - 1))}
                    disabled={seatCount <= 2}
                  >
                    −
                  </button>
                  <span className="seat-counter">{seatCount}</span>
                  <button 
                    className="seat-btn seat-btn-plus"
                    onClick={() => setSeatCount(Math.min(6, seatCount + 1))}
                    disabled={seatCount >= 6}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Color Section */}
            <div className="filter-section">
              <h3 className="filter-header">
                Color
                {selectedColors.length > 0 && (
                  <span className="selection-count">{selectedColors.length}</span>
                )}
              </h3>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-option ${selectedColors.includes(color.id) ? 'active' : ''}`}
                    onClick={() => handleColorToggle(color.id)}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  >
                    {selectedColors.includes(color.id) && <span className="color-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Section */}
            <div className="filter-section">
              <h3 className="filter-header">
                Brand
                {selectedBrands.length > 0 && (
                  <span className="selection-count">{selectedBrands.length}</span>
                )}
              </h3>
              <div className="brand-options">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    className={`brand-option ${selectedBrands.includes(brand.id) ? 'active' : ''}`}
                    onClick={() => handleBrandToggle(brand.id)}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="search-form">

            <div className="search-inputs">
              

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
        <div className="car-results-section">
          <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CarCard
            id="1"
            brand="Toyota"
            model="Camry"
            price={45}
            color="Blue"
            seats={5}
            imageUrl="https://example.com/toyota-camry.jpg"
          />
        </div>
      </div>
    </div>
         
        </div>
      </main>
    </div>
    
  );
};

export default LandingPage;