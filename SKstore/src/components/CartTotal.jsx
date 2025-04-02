import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Calculate the total amount including the shipping fee
  const totalAmount = getCartAmount() + (getCartAmount() > 0 ? delivery_fee : 0);

  return (
    <div className="w-full max-w-xs sm:max-w-md mx-auto">
      <div className="text-2xl font-semibold">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className="flex flex-col gap-3 mt-4 text-sm sm:text-base">
        {/* Total Amount */}
        <div className="flex justify-between items-center">
          <p className="font-medium">Subtotal:</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>

        <hr className="border-t my-2" />

        {/* Shipping Fee */}
        <div className="flex justify-between items-center">
          <p className="font-medium">Shipping Fee:</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>

        <hr className="border-t my-2" />

        {/* Total */}
        <div className="flex justify-between items-center font-semibold">
          <p>Total:</p>
          <p>
            {currency}
            {totalAmount === 0 ? 0 : totalAmount}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
