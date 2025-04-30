// src/pages/PlaceOrder.jsx

import React, { useContext, useState } from 'react';
import { Title } from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  // Delivery form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Payment method: 'cod', 'stripe', or 'razorpay'
  const [method, setMethod] = useState('cod');

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the order
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You must be logged in to place an order');
      return;
    }

    // Build the items array
    const orderItems = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          const prod = products.find((p) => p._id === productId);
          if (prod) {
            const item = structuredClone(prod);
            item.size = size;
            item.quantity = quantity;
            orderItems.push(item);
          }
        }
      }
    }

    // Prepare payload
    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    try {
      if (method === 'cod') {
        // Send the order to the backend with proper Auth header
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Clear cart and navigate
          setCartItems({});
          toast.success('Order placed successfully!');
          navigate('/orders');
        } else {
          toast.error(response.data.message || 'Failed to place order');
        }
      }

      // TODO: implement Stripe and Razorpay payment flows here
    } catch (err) {
      console.error('PlaceOrder error:', err);
      toast.error(
        err.response?.data?.message || err.message || 'Server error'
      );
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={onChangeHandler}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          name="street"
          type="text"
          placeholder="Street"
          value={formData.street}
          onChange={onChangeHandler}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            type="number"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
      </div>

      {/* Order Summary & Payment */}
      <div className="mt-8 w-full sm:max-w-[480px]">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-4 mt-4">
          {/* Stripe */}
          <div
            onClick={() => setMethod('stripe')}
            className={`flex items-center gap-4 border p-4 rounded-md cursor-pointer ${
              method === 'stripe' ? 'ring-2 ring-green-400' : ''
            }`}
          >
            <div
              className={`w-4 h-4 border rounded-full ${
                method === 'stripe' ? 'bg-green-400' : ''
              }`}
            />
            <img
              src={assets.stripe_logo}
              alt="Stripe"
              className="w-20 h-8 object-contain"
            />
          </div>

          {/* Razorpay */}
          <div
            onClick={() => setMethod('razorpay')}
            className={`flex items-center gap-4 border p-4 rounded-md cursor-pointer ${
              method === 'razorpay' ? 'ring-2 ring-green-400' : ''
            }`}
          >
            <div
              className={`w-4 h-4 border rounded-full ${
                method === 'razorpay' ? 'bg-green-400' : ''
              }`}
            />
            <img
              src={assets.razorpay_logo}
              alt="Razorpay"
              className="w-20 h-8 object-contain"
            />
          </div>

          {/* Cash on Delivery */}
          <div
            onClick={() => setMethod('cod')}
            className={`flex items-center gap-4 border p-4 rounded-md cursor-pointer ${
              method === 'cod' ? 'ring-2 ring-green-400' : ''
            }`}
          >
            <div
              className={`w-4 h-4 border rounded-full ${
                method === 'cod' ? 'bg-green-400' : ''
              }`}
            />
            <p className="text-gray-500 text-sm font-medium">
              CASH ON DELIVERY
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
