const redis = require('../config/redis');

const VIEW_TTL = 86400; // 24 hours

const viewService = {
  /**
   * Increment view count
   */
  async incrementView(productId) {
    const key = `views:${productId}`;
    const views = await redis.incr(key);

    if (views === 1) {
      await redis.expire(key, VIEW_TTL);
    }

    return views;
  },

  /**
   * Get single product views
   */
  async getViews(productId) {
    const key = `views:${productId}`;
    const views = await redis.get(key);
    return parseInt(views) || 0;
  },

  /**
   * ✅ FIXED: Get multiple views (Upstash compatible)
   */
  async getMultipleViews(productIds) {
    if (!productIds || productIds.length === 0) return {};

    try {
      const values = await Promise.all(
        productIds.map(id => redis.get(`views:${id}`))
      );

      const viewMap = {};
      productIds.forEach((id, index) => {
        viewMap[id] = parseInt(values[index]) || 0;
      });

      return viewMap;

    } catch (error) {
      console.error("Error in getMultipleViews:", error.message);

      // fallback: return 0 for all
      const viewMap = {};
      productIds.forEach(id => {
        viewMap[id] = 0;
      });

      return viewMap;
    }
  }
};

module.exports = viewService;