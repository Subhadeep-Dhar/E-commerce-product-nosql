const redis = require('../config/redis');

const TRENDING_KEY = 'trending';

const trendingService = {
  /**
   * Track a product view
   */
  async trackView(productId) {
    const score = await redis.zincrby(TRENDING_KEY, 1, productId.toString());
    return parseFloat(score);
  },

  /**
   * Get top trending products
   */
  async getTopTrending(count = 10) {
    const results = await redis.zrange(TRENDING_KEY, 0, count - 1, {
      rev: true,
      withScores: true,
    });

    // Upstash returns array of objects
    return results.map(item => ({
      productId: item.member,
      views: item.score
    }));
  },

  /**
   * Reset trending
   */
  async resetTrending() {
    await redis.del(TRENDING_KEY);
    console.log('[CRON] Trending sorted set reset');
    return true;
  }
};

module.exports = trendingService;