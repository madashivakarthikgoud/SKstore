import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  const fallbackImage = 'https://res.cloudinary.com/do8ex0pdw/image/upload/v1744726117/images_wtgsi9.png';

  // Ensure images is an array and contains valid URLs
  const productImage = Array.isArray(images) && images.length > 0 && images[0]?.url
    ? images[0].url
    : fallbackImage;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
        <div className="relative w-full h-64">
          <img
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200 ease-in-out"
            src={productImage}
            alt={name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>
        <div className="p-4 flex-grow">
          <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
          <p className="text-lg font-semibold mt-1">{currency} {price}</p>
        </div>
      </div>
    </Link>
  );
};
