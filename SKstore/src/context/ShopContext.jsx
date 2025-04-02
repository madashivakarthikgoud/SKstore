import React, { createContext, useEffect, useState } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify'; // Importing toast from react-toastify
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from localStorage if it exists
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const navigate = useNavigate();

  // Add product to cart
  const addToCart = async (itemId, size) => {
    if (!itemId || !size) {
      toast.error('Select Product Size'); // Correct usage of toast.error
      return;
    }

    let cartData = { ...cartItems }; // Copy cartItems using spread operator

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    localStorage.setItem('cartItems', JSON.stringify(cartData)); // Save cart to localStorage
  };

  // Get total item count in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  // Update the quantity of a specific item in cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = { ...cartItems }; // Copy cartItems using spread operator
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size]; // Remove item if quantity is 0
    }

    setCartItems(cartData);
    localStorage.setItem('cartItems', JSON.stringify(cartData)); // Save cart to localStorage
  };

  // Get the total amount of items in the cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            totalAmount += itemInfo.price * cartItems[items][size];
          }
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};
