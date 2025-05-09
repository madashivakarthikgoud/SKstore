import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      // Filter products by category and sub-category
      let filteredProducts = products.filter(item => item.category === category && item.subCategory === subCategory);
      
      // Set related products
      setRelated(filteredProducts.slice(0, 5)); // Show top 5 related products
    }
  }, [category, subCategory, products]);


  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.length === 0 ? (
          <div className="text-center col-span-full">No Related Products Found</div>
        ) : (
          related.map((item) => (
            <ProductItem
              key={item._id || item.name} // Fallback to item name if _id is not present
              id={item._id}
              images={item.images} // Pass images array
              name={item.name}
              price={item.price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
