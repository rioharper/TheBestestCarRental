
import React from 'react';
import { Car, Users, Heart } from 'lucide-react';

interface CarCardProps {
  id: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  seats: number;
  imageUrl: string;
}

const CarCard: React.FC<CarCardProps> = ({
  brand,
  model,
  price,
  color,
  seats,
  imageUrl
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-80">
      {/* Image Section */}
      <div className="relative bg-gray-50 h-48 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={`${brand} ${model}`}
          className="w-full h-full object-contain p-4"
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Brand and Model */}
        <div className="mb-3">
          <p className="text-gray-500 text-sm font-medium">{brand}</p>
          <h3 className="text-xl font-bold text-gray-800">{model}</h3>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={18} className="text-gray-400" />
            <span>{seats} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <div 
              className="w-4 h-4 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color }}
            />
            <span className="capitalize">{color}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              ${price}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <Car size={18} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;