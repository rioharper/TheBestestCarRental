
import React from 'react';
import { Car, Users, Heart } from 'lucide-react';

interface CarCardProps {
  id: string;
  year: number;
  size: string;
  make: string;
  model: string;
  seats: number;
  price: number;
  color: string;
  imageUrl: string;
  onBookNow?: (car: CarCardProps) => void;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  make,
  model,
  price,
  color,
  seats,
  imageUrl,
  year,
  size,
  onBookNow
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow({ id, year, size, make, model, seats, price, color, imageUrl });
    }
  };

  return (
    <div className="car-card">
      {/* Image Section */}
      <div className="car-card-image-section">
        <img 
          src={`/car_images/${imageUrl}.jpg`} 
          alt={`${make} ${model}`}
          className="car-card-image"
        />
      </div>

      {/* Content Section */}
      <div className="car-card-content">
        {/* Brand and Model */}
        <div className="car-card-header">
          <p className="car-card-brand">{make} | {size}</p>
          <h3 className="car-card-model">{model} ({year})</h3>
        </div>

        {/* Features */}
        <div className="car-card-features">
          <div className="car-card-feature">
            <Users size={18} className="car-card-feature-icon" />
            <span>{seats} seats</span> 
          </div>
          <div className="car-card-feature">
            <div 
              className="car-card-color-dot"
              style={{ backgroundColor: color }}
            />
            <span style={{ textTransform: 'capitalize' }}>{color}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="car-card-footer">
          <div className="car-card-price-section">
            <span className="car-card-price">${price}</span>
            <span className="car-card-price-period">/day</span>
          </div>
          <button className="car-card-book-btn" onClick={handleBookNow}>
            <Car size={18} className="car-card-book-icon" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;