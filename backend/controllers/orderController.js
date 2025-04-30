// controllers/orderController.js

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order - COD
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: new Date(),
    });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully using COD." });
  } catch (error) {
    console.error("COD Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Order - Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address, token } = req.body;

    // TODO: Integrate Stripe payment logic here

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: true,
      status: "Order Placed",
      date: new Date(),
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully using Stripe." });
  } catch (error) {
    console.error("Stripe Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Order - Razorpay
export const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address, paymentId } = req.body;

    // TODO: Verify Razorpay payment via API

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: true,
      status: "Order Placed",
      date: new Date(),
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully using Razorpay." });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders (Admin)
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("All Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Orders (User Panel)
export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Order Status (Admin)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ success: true, data: updatedOrder, message: "Order status updated successfully." });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
