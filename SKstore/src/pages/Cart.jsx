import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8">
      <Title text1={'YOUR'} text2={'CART'} />

      {/* If cart is empty */}
      {cartData.length === 0 ? (
        <div className="text-center py-10 text-lg text-gray-600">
          <p>Your cart is empty! Start shopping to fill your cart.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          {cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            const imageUrl =
              Array.isArray(productData.images) && productData.images.length > 0
                ? productData.images[0]?.url || productData.images[0]
                : 'https://via.placeholder.com/100x100?text=No+Image';

            return (
              <div
                key={`${item._id}-${item.size}`}
                className="flex justify-between items-center p-4 border-b border-gray-300 rounded-md shadow-sm"
              >
                <div className="flex items-center gap-6">
                  <img
                    className="w-16 sm:w-24 object-cover rounded-md"
                    src={imageUrl}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-semibold">{productData.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">Size: {item.size}</p>
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

      {/* Cart Summary & Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-10">
          <div className="w-full sm:w-[450px] space-y-6">
            <CartTotal />
            <button
              onClick={() => navigate('/place-order')}
              className="w-full bg-black text-white py-3 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-all"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
