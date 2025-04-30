// controllers/cartController.js

import userModel from '../models/userModel.js';

/**
 * POST /api/cart/add
 * Atomically increments the quantity of a size under an item in the user's cart.
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;               // <-- get from auth middleware
    const { itemId, size } = req.body;
    if (!itemId || !size) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing itemId or size' });
    }

    // Increment the item's size count
    const result = await userModel.updateOne(
      { _id: userId },
      { $inc: { [`cartData.${itemId}.${size}`]: 1 } }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const user = await userModel
      .findById(userId)
      .select('cartData');
    return res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error('addToCart error:', error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

/**
 * POST /api/cart/update
 * Sets or removes the quantity of a size under an item in the user's cart.
 */
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;               // <-- get from auth middleware
    const { itemId, size, quantity } = req.body;
    if (!itemId || !size || quantity == null) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing parameters' });
    }

    if (quantity > 0) {
      await userModel.updateOne(
        { _id: userId },
        { $set: { [`cartData.${itemId}.${size}`]: quantity } }
      );
    } else {
      // remove size
      await userModel.updateOne(
        { _id: userId },
        { $unset: { [`cartData.${itemId}.${size}`]: "" } }
      );

      // if no sizes left, remove whole item
      const user = await userModel
        .findById(userId)
        .select(`cartData.${itemId}`);
      if (
        user?.cartData?.[itemId] &&
        Object.keys(user.cartData[itemId]).length === 0
      ) {
        await userModel.updateOne(
          { _id: userId },
          { $unset: { [`cartData.${itemId}`]: "" } }
        );
      }
    }

    // return updated cart
    const updatedUser = await userModel
      .findById(userId)
      .select('cartData');
    return res.json({ success: true, cartData: updatedUser.cartData });
  } catch (error) {
    console.error('updateCart error:', error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

/**
 * GET /api/cart
 * Retrieves the current cartData for the user.
 */
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;               // <-- get from auth middleware
    const user = await userModel
      .findById(userId)
      .select('cartData');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error('getUserCart error:', error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};
