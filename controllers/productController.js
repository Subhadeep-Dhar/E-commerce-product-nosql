const { Product } = require('../models/Product');
const Order = require('../models/Order');
const viewService = require('../redis/viewService');
const trendingService = require('../redis/trendingService');
const recentlyViewedService = require('../redis/recentlyViewedService');

const productController = {
  async listProducts(req, res) {
    try {
      const {
        subCategory, minPrice, maxPrice, minRating,
        brand, search,
        page = 1, limit = 12,
        sort = '-createdAt',
        userId
      } = req.query;

      const filter = { type: 'instrument' };

      if (subCategory) {
        filter.subCategory = { $regex: subCategory, $options: 'i' };
      }
      if (brand) {
        filter.brand = { $regex: brand, $options: 'i' };
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } }
        ];
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      if (minRating) {
        const r = parseFloat(minRating);
        filter.avg_rating = { $gte: r };
      }

      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

      const [products, total] = await Promise.all([
        Product.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit, 10))
          .lean(),
        Product.countDocuments(filter)
      ]);

      const productIds = products.map(p => p._id.toString());
      const viewCounts = await viewService.getMultipleViews(productIds);

      const enrichedProducts = products.map(p => ({
        ...p,
        daily_views: viewCounts[p._id.toString()] || 0
      }));

      res.json({
        success: true,
        data: enrichedProducts,
        pagination: {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          total,
          pages: Math.ceil(total / parseInt(limit, 10))
        }
      });
    } catch (error) {
      console.error('Error listing products:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getProduct(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      const product = await Product.findById(id).lean();
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      const [views] = await Promise.all([
        viewService.incrementView(id),
        trendingService.trackView(id)
      ]);

      if (userId) {
        await recentlyViewedService.addRecentlyViewed(userId, id);
      }

      res.json({
        success: true,
        data: {
          ...product,
          daily_views: views
        }
      });
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async bestSelling(req, res) {
    try {
      const results = await Product.aggregate([
        { $match: { type: 'instrument' } },
        { $sort: { total_sold: -1 } },
        {
          $group: {
            _id: '$subCategory',
            top_products: {
              $push: {
                id: '$_id',
                name: '$name',
                subCategory: '$subCategory',
                price: '$price',
                brand: '$brand',
                total_sold: '$total_sold',
                total_revenue: '$total_revenue',
                avg_rating: '$avg_rating'
              }
            }
          }
        },
        {
          $project: {
            subCategory: '$_id',
            top_products: { $slice: ['$top_products', 5] },
            _id: 0
          }
        },
        { $sort: { subCategory: 1 } }
      ]);

      res.json({ success: true, data: results });
    } catch (error) {
      console.error('Error fetching best-selling:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async monthlyRevenue(req, res) {
    try {
      const results = await Order.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            total_revenue: { $sum: '$total_amount' },
            total_orders: { $sum: 1 },
            avg_order_value: { $avg: '$total_amount' }
          }
        },
        {
          $sort: { '_id.year': -1, '_id.month': -1 }
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            total_revenue: { $round: ['$total_revenue', 2] },
            total_orders: 1,
            avg_order_value: { $round: ['$avg_order_value', 2] }
          }
        }
      ]);

      res.json({ success: true, data: results });
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async lowRated(req, res) {
    try {
      const results = await Product.aggregate([
        {
          $match: {
            type: 'instrument',
            avg_rating: { $lt: 3 },
            review_count: { $gt: 0 }
          }
        },
        {
          $project: {
            name: 1,
            type: 1,
            subCategory: 1,
            brand: 1,
            price: 1,
            avg_rating: 1,
            review_count: 1,
            stock_quantity: 1
          }
        },
        { $sort: { avg_rating: 1 } }
      ]);

      res.json({ success: true, data: results });
    } catch (error) {
      console.error('Error fetching low-rated:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async stockSummary(req, res) {
    try {
      const results = await Product.aggregate([
        { $match: { type: 'instrument' } },
        {
          $group: {
            _id: { subCategory: '$subCategory' },
            total_products: { $sum: 1 },
            total_stock: { $sum: '$stock_quantity' },
            avg_price: { $avg: '$price' },
            out_of_stock: {
              $sum: { $cond: [{ $eq: ['$stock_quantity', 0] }, 1, 0] }
            },
            low_stock: {
              $sum: { $cond: [{ $lte: ['$stock_quantity', 5] }, 1, 0] }
            }
          }
        },
        {
          $project: {
            _id: 0,
            subCategory: '$_id.subCategory',
            total_products: 1,
            total_stock: 1,
            avg_price: { $round: ['$avg_price', 2] },
            out_of_stock: 1,
            low_stock: 1
          }
        },
        { $sort: { subCategory: 1 } }
      ]);

      res.json({ success: true, data: results });
    } catch (error) {
      console.error('Error fetching stock summary:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = productController;

module.exports = productController;
