# Muse Mart — Musical Instruments Store

Muse Mart is a full-stack e-commerce application focused on musical instruments and studio equipment. It provides a modern product catalog with filtering, search, and real-time insights powered by a scalable cloud-based architecture.

---

## Overview

This application allows users to browse and explore a curated collection of musical instruments including guitars, pianos, drums, and studio audio gear. It includes features such as product filtering, pagination, trending products, and recently viewed items.

The system is designed using a distributed architecture with separate frontend and backend deployments, along with managed database and caching services.

---

## Features

- Instrument-focused product catalog  
- Advanced filtering (category, price, rating, search)  
- Pagination for scalable product browsing  
- Trending products based on real-time activity  
- Recently viewed items tracking  
- Product reviews and ratings  
- Smart cart and checkout functionality  
- RESTful API architecture  

---

## Tech Stack

### Frontend
- React (Vite)

### Backend
- Node.js  
- Express  

### Databases & Services
- MongoDB Atlas (Primary database)  
- Upstash Redis (Caching and real-time insights)  

### Deployment
- Frontend: Vercel  
- Backend: Render  

---

## Project Structure

```
client/        → React frontend
controllers/   → API logic
models/        → MongoDB schemas
routes/        → API routes
redis/         → Redis services (views, trending, recently viewed)
config/        → DB and Redis configuration
seed/          → Database seeding scripts
server.js      → Backend entry point
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URI=your_mongodb_atlas_uri
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
PORT=5000
```

For frontend (`client/.env`):

```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Running Locally

### 1. Install dependencies
```
npm install
cd client
npm install
```

### 2. Seed the database
```
npm run seed
```

### 3. Start backend
```
npm run dev
```

### 4. Start frontend
```
cd client
npm run dev
```

### 5. Open application

Frontend: http://localhost:5173  
Backend API: http://localhost:5000/api  

---

## API Endpoints

### Products
- `GET /api/products` — List all products  
- `GET /api/products/:id` — Get product details  

### Trending & Activity
- `GET /api/trending` — Trending products  
- `GET /api/recently-viewed/:userId` — Recently viewed items  

### Cart & Orders
- `POST /api/cart/add` — Add item to cart  
- `GET /api/cart/:userId` — Get cart  
- `POST /api/checkout` — Place order  

### Reviews
- `GET /api/reviews/:productId` — Get reviews  
- `POST /api/reviews` — Add review  

---

## Seeded Categories

- Guitars  
- Pianos  
- Drums  
- Audio Equipment  
- Studio Gear  

---

## Deployment

- Backend deployed on Render  
- Frontend deployed on Vercel  
- MongoDB hosted on Atlas  
- Redis powered by Upstash  

---

## Notes

- Redis is used for tracking product views and trending data  
- All product data is stored in MongoDB Atlas  
- Frontend communicates with backend via REST APIs  
- Designed for scalability and cloud-native deployment  

---

## Author

Subhadeep Dhar

---

## What I Improved

- Removed duplicate endpoints  
- Updated to cloud architecture  
- Clean structure and formatting  
- Professional wording  
- Ready for GitHub display  
