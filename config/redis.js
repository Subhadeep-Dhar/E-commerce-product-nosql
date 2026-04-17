const { Redis } = require("@upstash/redis");

// Initialize Upstash Redis (HTTP-based, no persistent connection)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Since Upstash is stateless, we assume it's available if credentials exist
redis.isAvailable = () => {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
};

console.log("Upstash Redis Connected");

module.exports = redis;