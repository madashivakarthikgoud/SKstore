import React, { useState } from 'react';
import { Title } from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';  // Use useNavigate from react-router-dom

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();  // Directly use useNavigate in the component

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ---Left side---- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>
      </div>

      {/* ----Right Side----- */}
      <div className="mt-8 w-full sm:max-w-[480px]">
        <CartTotal />
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>

        {/* --------Payment Section------- */}
        <div className="flex flex-col gap-4 mt-4">
          {/* Stripe Payment */}
          <div
            onClick={() => setMethod('stripe')}
            className={`flex items-center gap-4 border p-4 cursor-pointer rounded-md ${
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

          {/* Razorpay Payment */}
          <div
            onClick={() => setMethod('razorpay')}
            className={`flex items-center gap-4 border p-4 cursor-pointer rounded-md ${
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
            className={`flex items-center gap-4 border p-4 cursor-pointer rounded-md ${
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

        <div className="w-full text-end mt-8">
          <button
            onClick={() => navigate('/orders')}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
