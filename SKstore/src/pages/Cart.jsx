import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate here

export const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate here

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8">
      {/* Title Section */}
      <Title text1={'YOUR'} text2={'CART'} />

      {/* Empty Cart Check */}
      {cartData.length === 0 ? (
        <div className="text-center py-10 text-lg text-gray-600">
          <p>Your cart is empty! Start shopping to fill your cart.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items Section */}
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-300 rounded-md shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <img className="w-16 sm:w-24 object-cover" src={productData.image[0]} alt={productData.name} />
                  <div>
                    <p className="text-sm sm:text-lg font-semibold">{productData.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.size}</p>
                    <p className="mt-2 text-gray-700">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    defaultValue={item.quantity}
                    onChange={(e) => {
                      const value = e.target.value === '' || e.target.value === '0' ? 1 : Number(e.target.value);
                      updateQuantity(item._id, item.size, value);
                    }}
                    className="border rounded-md px-3 py-2 w-16 sm:w-20 text-center focus:outline-none"
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    alt="Delete"
                    className="w-5 cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Summary and Checkout Section */}
      <div className="flex justify-end mt-10">
        <div className="w-full sm:w-[450px] space-y-6">
          {/* Cart Total */}
          <CartTotal />

          {/* Checkout Button */}
          <button
            onClick={() => navigate('/place-order')} // Navigate to the place-order page on click
            className="w-full bg-black text-white py-3 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-all"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
