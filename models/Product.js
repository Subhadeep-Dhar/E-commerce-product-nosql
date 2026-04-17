const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['instrument'],
    default: 'instrument'
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
    enum: ['guitar', 'piano', 'drums', 'audio', 'studio']
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: ''
  },
  specs: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  avg_rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review_count: {
    type: Number,
    default: 0
  },
  total_sold: {
    type: Number,
    default: 0
  },
  total_revenue: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

productSchema.index({ type: 1, subCategory: 1, brand: 1, price: 1, avg_rating: -1 });
productSchema.index({ name: 'text', description: 'text', brand: 'text', subCategory: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
