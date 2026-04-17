const cartService = require('../redis/cartService');
const { Product } = require('../models/Product');

const cartController = {
  async addToCart(req, res) {
    try {
      const { userId, productId, quantity = 1 } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: 'userId and productId are required'
        });
      }

      const product = await Product.findById(productId).lean();
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      if (product.stock_quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock. Only ${product.stock_quantity} available.`
        });
      }

      const result = await cartService.addToCart(userId, productId, parseInt(quantity, 10));

      res.json({
        success: true,
        message: 'Item added to cart',
        data: result
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getCart(req, res) {
    try {
      const { userId } = req.params;

      const cart = await cartService.getCart(userId);

      if (!cart || Object.keys(cart).length === 0) {
        return res.json({
          success: true,
          data: { items: [], total: 0, itemCount: 0 }
        });
      }

      const productIds = Object.keys(cart);
      const products = await Product.find({
        _id: { $in: productIds }
      }).lean();

      const items = products
        .map(product => ({
          product_id: product._id,
          name: product.name,
          price: product.price,
          type: product.type,
          brand: product.brand,
          subCategory: product.subCategory,
          stock_quantity: product.stock_quantity,
          image_url: product.image_url,
          quantity: parseInt(cart[product._id.toString()], 10),
          subtotal: product.price * parseInt(cart[product._id.toString()], 10)
        }))
        .filter(item => item.quantity > 0);

      const total = items.reduce((sum, item) => sum + item.subtotal, 0);
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

      res.json({
        success: true,
        data: {
          items,
          total: Math.round(total * 100) / 100,
          itemCount
        }
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async removeFromCart(req, res) {
    try {
      const { userId, productId, decrementBy } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: 'userId and productId are required'
        });
      }

      if (decrementBy) {
        const result = await cartService.addToCart(userId, productId, -parseInt(decrementBy, 10));
        return res.json({
          success: true,
          message: result.removed ? 'Item removed from cart' : 'Quantity updated',
          data: result
        });
      }

      await cartService.removeFromCart(userId, productId);
      res.json({
        success: true,
        message: 'Item removed from cart'
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateQuantity(req, res) {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: 'userId, productId, and quantity are required'
        });
      }

      const result = await cartService.updateQuantity(userId, productId, parseInt(quantity, 10));

      res.json({
        success: true,
        message: result.removed ? 'Item removed from cart' : 'Quantity updated',
        data: result
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = cartController;
