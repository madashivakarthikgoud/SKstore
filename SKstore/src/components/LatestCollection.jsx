import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLatestProducts(products.slice(0, 10)); // Fetch the first 10 products
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 pb-4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "New Arrivals Are Here! Explore our latest collection and find your next favorite piece today!"
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length === 0 ? (
          <div className="text-center col-span-full">Loading...</div> // Loading state if products aren't available
        ) : (
          latestProducts.map((item) => (
            <ProductItem
              key={item._id || item.name} // Prefer _id, fallback to name
              id={item._id}
              images={item.images} // Pass the image array
              name={item.name}
              price={item.price}
            />
          ))
        )}
      </div>
    </div>
  );
};
