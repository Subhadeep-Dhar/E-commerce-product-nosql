# Muse Mart — Musical Instruments Store

A music gear marketplace built with Node.js, Express, MongoDB, Redis, and React. This version is focused exclusively on musical instruments and audio equipment.

## What changed
- All products are now musical instruments or studio audio gear.
- The product model uses `type: instrument` and `subCategory` values like `guitar`, `piano`, `drums`, `audio`, and `studio`.
- Legacy mixed-category product types have been replaced with an instrument-only catalog, UI, and API logic.
- Product cards now show only instrument brand, type, price, stock, and reviews.
- Images are loaded from online sources using dynamic Unsplash queries.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Databases: MongoDB + Redis

## How to run

### 1. Prerequisites
- Node.js installed.
- MongoDB running locally on port `27017`.
- Redis running locally on port `6379`.

### 2. Environment Setup
Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce_catalog
REDIS_URL=redis://localhost:6379
PORT=3000
```

### 3. Install dependencies

```bash
npm install
```

### 4. Seed the database

```bash
npm run seed
```

### 5. Start the backend

```bash
npm run start
```

### 6. Open the app

Visit `http://localhost:3000`

## Seeded product categories
- Guitars
- Pianos
- Drum kits
- Microphones
- Audio interfaces
- Mixers
- Studio headphones
- Loop stations

## API Endpoints
- `GET /api/products` — list all instrument products
- `GET /api/products/:id` — get product details
- `GET /api/trending` — trending instrument products
- `GET /api/recently-viewed/:userId` — recently viewed items
- `POST /api/cart/add` — add instrument to cart
- `GET /api/cart/:userId` — get cart contents
- `POST /api/checkout` — place an order
- `GET /api/reviews/:productId` — get reviews
- `POST /api/reviews` — a
- `GET /api/products` — list all instrument products
- `GET /api/products/:id` — get product details
- `GET /api/trending` — trending instrument products
- `GET /api/recently-viewed/:userId` — recently viewed items
- `POST /api/cart/add` — add instrument to cart
- `GET /api/cart/:userId` — get cart contents
- `POST /api/checkout` — place an order
- `GET /api/reviews/:productId` — get reviews
- `POST /api/reviews` — add a review
