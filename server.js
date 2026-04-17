// 🔥 Load environment variables FIRST (absolute path)
require('dotenv').config({
  path: require('path').resolve(__dirname, '.env')
});

// Debug logs (remove later)
console.log("ENV CHECK:", process.env.MONGO_URI);
console.log("Current Dir:", __dirname);

const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');

const connectDB = require('./config/db');
const trendingService = require('./redis/trendingService');

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const recentlyViewedRoutes = require('./routes/recentlyViewedRoutes');

const app = express();

// ⚠️ Use dynamic port (important for deployment later)
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (React dist)
// app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/trending', trendingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recently-viewed', recentlyViewedRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// React fallback
// app.get('*', (req, res) => {
//   if (!req.path.startsWith('/api')) {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
//   }
// });
app.get('/', (req, res) => {
  res.send("API is running...");
});


// Cron job
cron.schedule('0 * * * *', async () => {
  try {
    await trendingService.resetTrending();
  } catch (error) {
    console.error('[CRON] Error resetting trending:', error.message);
  }
});

// Start server
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined. Check your .env file.");
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`\nServer running on http://localhost:${PORT}`);
      console.log(`API endpoints at http://localhost:${PORT}/api`);
      console.log(`Frontend at http://localhost:${PORT}\n`);
      console.log("MONGO_URI:", process.env.MONGO_URI);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();