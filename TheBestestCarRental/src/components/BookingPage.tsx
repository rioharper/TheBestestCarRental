import React, { useState } from 'react';
import './BookingPage.css';

interface User {
  email: string;
  name: string;
}

interface BookingPageProps {
  car: {
    id: string;
    year: number;
    size: string;
    make: string;
    model: string;
    seats: number;
    price: number;
    color: string;
    imageUrl: string;
  };
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  user: User | null;
  onBack: () => void;
  onConfirmBooking: (bookingData: any) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({
  car,
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  user,
  onBack,
  onConfirmBooking
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(user?.name || '');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('Visa');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate number of days
  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 1;
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const days = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const days = calculateDays();
  const totalPrice = car.price * days;

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
      setErrors({ ...errors, expiryDate: '' });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCvv(value);
      setErrors({ ...errors, cvv: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!cardHolder.trim()) {
      newErrors.cardHolder = 'Please enter the cardholder name';
    }

    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month] = expiryDate.split('/');
      const monthNum = parseInt(month);
      if (monthNum < 1 || monthNum > 12) {
        newErrors.expiryDate = 'Invalid month';
      }
    }

    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const bookingData = {
      car,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      totalPrice,
      days,
      payment: {
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardHolder,
        expiryDate,
        cardType,
        // Note: In a real app, never store CVV
      },
      user,
      timestamp: new Date().toISOString(),
    };

    onConfirmBooking(bookingData);
  };

  return (
    <div className="booking-container">
      <header className="booking-header">
        <div className="header-content">
          <button className="back-btn" onClick={onBack}>
            ← Back to Cars
          </button>
          <div className="logo">
            <span className="logo-text">THE BESTEST</span>
          </div>
          <div className="header-spacer"></div>
        </div>
      </header>

      <main className="booking-main">
        <div className="booking-content">
          <h1 className="booking-title">Complete Your Booking</h1>

          <div className="booking-grid">
            {/* Left Column - Booking Details */}
            <div className="booking-section">
              <div className="section-card">
                <h2 className="section-title">Booking Details</h2>
                
                {/* Car Info */}
                <div className="car-summary">
                  <img 
                    src={`/car_images/${car.imageUrl}.jpg`} 
                    alt={`${car.make} ${car.model}`}
                    className="car-summary-image"
                  />
                  <div className="car-summary-info">
                    <h3 className="car-summary-name">{car.year} {car.make} {car.model}</h3>
                    <p className="car-summary-details">
                      {car.size} • {car.seats} seats • {car.color}
                    </p>
                  </div>
                </div>

                {/* Rental Period */}
                <div className="rental-period">
                  <div className="period-item">
                    <label className="period-label">Pick-up</label>
                    <div className="period-value">
                      <span className="period-date">{pickupDate || 'Not selected'}</span>
                      <span className="period-time">{pickupTime}</span>
                    </div>
                  </div>
                  
                  <div className="period-divider">→</div>
                  
                  <div className="period-item">
                    <label className="period-label">Drop-off</label>
                    <div className="period-value">
                      <span className="period-date">{dropoffDate || 'Not selected'}</span>
                      <span className="period-time">{dropoffTime}</span>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="price-summary">
                  <div className="price-row">
                    <span className="price-label">Daily Rate</span>
                    <span className="price-value">${car.price}/day</span>
                  </div>
                  <div className="price-row">
                    <span className="price-label">Rental Period</span>
                    <span className="price-value">{days} {days === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="price-divider"></div>
                  <div className="price-row price-total">
                    <span className="price-label">Total</span>
                    <span className="price-value">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Form */}
            <div className="booking-section">
              <div className="section-card">
                <h2 className="section-title">Payment Information</h2>
                
                <form className="payment-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Card Type</label>
                    <select 
                      className="form-select"
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value)}
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                      <option value="Discover">Discover</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <span className="error-message">{errors.cardNumber}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      className={`form-input ${errors.cardHolder ? 'error' : ''}`}
                      value={cardHolder}
                      onChange={(e) => {
                        setCardHolder(e.target.value);
                        setErrors({ ...errors, cardHolder: '' });
                      }}
                      placeholder="John Doe"
                    />
                    {errors.cardHolder && (
                      <span className="error-message">{errors.cardHolder}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <span className="error-message">{errors.expiryDate}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <span className="error-message">{errors.cvv}</span>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="confirm-booking-btn">
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
