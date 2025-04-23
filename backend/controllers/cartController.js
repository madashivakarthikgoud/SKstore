import mongoose from 'mongoose';
import userModel from '../models/userModel.js';

/**
 * POST /api/cart/add
 * Atomically increments the quantity of a size under an item in the user's cart.
 */
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    if (!userId || !itemId || !size) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    // Mongoose will auto-cast string to ObjectId, no need for new mongoose.Types.ObjectId()
    const result = await userModel.updateOne(
      { _id: userId },
      { $inc: { [`cartData.${itemId}.${size}`]: 1 } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = await userModel.findById(userId).select('cartData');
    return res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error('addToCart error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/cart/update
 * Updates the quantity of a size under an item in the user's cart.
 * Removes the item-size entry when quantity is 0, and also removes the parent item if it becomes empty.
 */
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    if (!userId || !itemId || !size || quantity == null) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    if (quantity > 0) {
      // Set the new quantity
      await userModel.updateOne(
        { _id: userId },
        { $set: { [`cartData.${itemId}.${size}`]: quantity } }
      );
    } else {
      // Remove the size entry
      await userModel.updateOne(
        { _id: userId },
        { $unset: { [`cartData.${itemId}.${size}`]: "" } }
      );

      // Check if any sizes remain under the item
      const user = await userModel.findById(userId).select(`cartData.${itemId}`);
      if (
        user &&
        user.cartData[itemId] &&
        Object.keys(user.cartData[itemId]).length === 0
      ) {
        // Remove the entire item
        await userModel.updateOne(
          { _id: userId },
          { $unset: { [`cartData.${itemId}`]: "" } }
        );
      }
    }

    // Return updated cartData
    const updatedUser = await userModel.findById(userId).select('cartData');
    return res.json({ success: true, cartData: updatedUser.cartData });
  } catch (error) {
    console.error('updateCart error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/cart
 * Retrieves the current cartData for the user.
 */
export const getUserCart = async (req, res) => {
  try {
    const userId = req.headers.userid;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId' });
    }

    const user = await userModel.findById(userId).select('cartData');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error('getUserCart error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
