import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      // Filter products that are marked as bestsellers
      const bestProduct = products.filter(item => item?.bestseller);
      setBestSeller(bestProduct.slice(0, 5)); // Show top 5 bestseller products
    }
  }, [products]);

  // Debug: Log the bestSeller array to check images
  useEffect(() => {
    console.log("Best Seller Products:", bestSeller);
  }, [bestSeller]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Explore our Best Sellers—customer favorites and top-rated products all in one place!"
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length === 0 ? (
          <div className="text-center col-span-full">No Best Sellers Found</div>
        ) : (
          bestSeller.map((item) => (
            <ProductItem
              key={item._id || item.name} // Fallback to item name if _id is not present
              id={item._id}
              images={item.images} // Pass the images array instead of image
              name={item.name}
              price={item.price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BestSeller;
