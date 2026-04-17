require('dotenv').config();

const mongoose = require('mongoose');
const { Product } = require('../models/Product');
const Review = require('../models/Review');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing products and reviews');

    const products = [
      {
        name: 'Fender Player Stratocaster Electric Guitar',
        price: 84075.00,
        type: 'instrument',
        subCategory: 'guitar',
        brand: 'Fender',
        stock_quantity: 42,
        description: 'A modern Strat with classic tone, comfortable C-shaped neck, and powerful Alnico pickups.',
        image_url: 'https://www.bajaao.com/cdn/shop/files/FEN-0144502506.jpg?v=1772713743&width=1500',
        avg_rating: 4.8,
        review_count: 136,
        total_sold: 185,
        total_revenue: 148000,
        specs: {
          body: 'Alder',
          neck: 'Maple',
          pickups: 'Alnico V Single-Coil',
          scale_length: '25.5"',
          finish: 'Polar White'
        }
      },
      {
        name: 'Yamaha P-125 Digital Piano', // Done
        price: 59840.50,
        type: 'instrument',
        subCategory: 'piano',
        brand: 'Yamaha',
        stock_quantity: 58,
        description: 'Digital piano with graded hammer standard keys, realistic piano feel, and premium Yamaha tone.',
        image_url: 'https://yamahamusicstore.in/products-images/enlarge-image/VFR9120.jpg?v=1776416101',
        avg_rating: 4.7,
        review_count: 152,
        total_sold: 220,
        total_revenue: 143000,
        specs: {
          keys: '88 weighted keys',
          voices: 24,
          polyphony: '192',
          pedals: 'Damper',
          connectivity: 'USB to Host'
        }
      },
      {
        name: 'Roland TD-07KV Electronic Drum Kit', // Done
        price: 110000.00,
        type: 'instrument',
        subCategory: 'drums',
        brand: 'Roland',
        stock_quantity: 21,
        description: 'Electronic drum kit built for practice, performance, and compact studio setups.',
        image_url: 'https://www.bajaao.com/cdn/shop/files/roland-electronic-drum-kits-roland-td-07kv-v-drums-electronic-drum-kit-1176942655.jpg?v=1768125052&width=1000',
        avg_rating: 4.6,
        review_count: 64,
        total_sold: 78,
        total_revenue: 93000,
        specs: {
          pads: 'Mesh snare + rubber toms',
          module: 'TD-07',
          coaching: 'Yes',
          outputs: 'USB, stereo out',
          compatibility: 'Bluetooth, MIDI'
        }
      },
      {
        name: 'Shure SM58 Vocal Microphone', // Done
        price: 10999.00,
        type: 'instrument',
        subCategory: 'audio',
        brand: 'Shure',
        stock_quantity: 144,
        description: 'Industry-standard dynamic microphone for vocals with rugged durability and clear midrange.',
        image_url: 'https://www.bajaao.com/cdn/shop/files/shure-dynamic-microphones-shure-sm58s-mic-with-switch-31252663599283.jpg?v=1743170195&width=600',
        avg_rating: 4.9,
        review_count: 412,
        total_sold: 510,
        total_revenue: 50500,
        specs: {
          type: 'Dynamic',
          polar_pattern: 'Cardioid',
          frequency_response: '50Hz - 15kHz',
          connector: 'XLR',
          included: 'Mic clip'
        }
      },
      {
        name: 'Audio-Technica AT2020 Condenser Microphone',
        price: 8999.00,
        type: 'instrument',
        subCategory: 'audio',
        brand: 'Audio-Technica',
        stock_quantity: 76,
        description: 'Compact condenser microphone for studio tracking and home recording with crisp detail.',
        image_url: 'https://cdn.shopaccino.com/johns-music/products/at2020-719941_l.jpg?v=691',
        avg_rating: 4.7,
        review_count: 98,
        total_sold: 130,
        total_revenue: 19400,
        specs: {
          type: 'Condenser',
          polar_pattern: 'Cardioid',
          frequency_response: '20Hz - 20kHz',
          sensitivity: '-37dB',
          connector: 'XLR'
        }
      },
      {
        name: 'Focusrite Scarlett 2i2 Audio Interface', // Done
        price: 26228.00,
        type: 'instrument',
        subCategory: 'audio',
        brand: 'Focusrite',
        stock_quantity: 64,
        description: 'USB audio interface with two high-headroom mic preamps and studio-grade converters.',
        image_url: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/4aa57f53-1beb-441b-af35-4ca1400f9e3a.__CR0,0,800,600_PT0_SX800_V1___.jpeg',
        avg_rating: 4.8,
        review_count: 210,
        total_sold: 235,
        total_revenue: 42000,
        specs: {
          channels: '2 in / 2 out',
          sample_rate: '24-bit/192kHz',
          connectivity: 'USB-C',
          preamps: '2 Scarlett mic pres',
          phantom_power: 'Yes'
        }
      },
      {
        name: 'Boss RC-5 Loop Station',
        price: 23450.00,
        type: 'instrument',
        subCategory: 'studio',
        brand: 'Boss',
        stock_quantity: 56,
        description: 'Advanced loop pedal with onboard effects, rhythm guide, and USB audio.',
        image_url: 'https://www.stars-music.com/medias/boss/rc5-loop-station-hd-4-172861.jpg',
        avg_rating: 4.7,
        review_count: 108,
        total_sold: 142,
        total_revenue: 28400,
        specs: {
          memory: '99 phrase memories',
          inputs: 'Mono',
          outputs: 'Stereo',
          effects: '64 onboard',
          connectivity: 'USB, aux in'
        }
      },
      {
        name: 'Sony MDR-7506 Studio Headphones',
        price: 9990.00,
        type: 'instrument',
        subCategory: 'studio',
        brand: 'Sony',
        stock_quantity: 112,
        description: 'Professional closed-back headphones engineered for tracking and mixing.',
        image_url: 'https://www.headphonezone.in/cdn/shop/products/Headphone-Zone-Sony-MDR-7506-Gallery-1160-1160-1.jpg?v=1659421495&width=2048',
        avg_rating: 4.8,
        review_count: 318,
        total_sold: 360,
        total_revenue: 36000,
        specs: {
          type: 'Closed-back',
          driver_size: '40mm',
          frequency_response: '10Hz - 20kHz',
          cable: 'Detachable coiled',
          impedance: '63 ohms'
        }
      },
      {
        name: 'Roland RD-88 Stage Piano',
        price: 249800.00,
        type: 'instrument',
        subCategory: 'piano',
        brand: 'Roland',
        stock_quantity: 19,
        description: 'Stage piano with premium piano tones, lightweight design, and intuitive controls.',
        image_url: 'https://rajmusical.com/ekart/images/3473Roland-RD-08-Stage-Piano_3.jpg',
        avg_rating: 4.9,
        review_count: 74,
        total_sold: 82,
        total_revenue: 131000,
        specs: {
          keys: '88 weighted',
          sounds: '71 tones',
          outputs: 'USB, line out',
          construction: 'Slim chassis',
          functions: 'Split/layer, Bluetooth MIDI'
        }
      },
      {
        name: 'Fender Player Precision Bass',
        price: 84900.00,
        type: 'instrument',
        subCategory: 'guitar',
        brand: 'Fender',
        stock_quantity: 33,
        description: 'Classic bass with rich low end, smooth playability, and iconic Fender design.',
        image_url: 'https://www.bajaao.com/cdn/shop/files/fender-bass-guitars-buttercream-maple-fender-player-precision-bass-4-string-bass-guitar-3852127961160.jpg?v=1741598804&width=1500',
        avg_rating: 4.8,
        review_count: 84,
        total_sold: 90,
        total_revenue: 81000,
        specs: {
          body: 'Alder',
          neck: 'Maple',
          pickups: 'Split single-coil',
          scale_length: '34"',
          finish: 'Olympic White'
        }
      },
      {
        name: 'Allen & Heath ZEDi-10 Mixer',
        price: 37500.00,
        type: 'instrument',
        subCategory: 'studio',
        brand: 'Allen & Heath',
        stock_quantity: 27,
        description: 'Compact hybrid mixer/interface for recording and live sound with onboard EQ and USB.',
        image_url: 'https://www.canalsoundlight.com/wp-content/uploads/2016/10/ZEDi-10_3.jpg',
        avg_rating: 4.6,
        review_count: 62,
        total_sold: 72,
        total_revenue: 21599,
        specs: {
          channels: '4 mono + 2 stereo',
          usb: 'USB audio interface',
          eq: '3-band',
          phantom_power: 'Yes',
          effects: 'No'
        }
      }
    ];

    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} musical instrument products`);

    const sampleReviews = [
      { product_id: insertedProducts[0]._id, user_id: 'user_1', username: 'Azad', rating: 5, comment: 'Incredible tone and feel — the Strat setup is perfect.' },
      { product_id: insertedProducts[1]._id, user_id: 'user_2', username: 'Akshat', rating: 4, comment: 'The weighted keys feel great and the sound is very authentic.' },
      { product_id: insertedProducts[2]._id, user_id: 'user_3', username: 'Abhigyan', rating: 5, comment: 'Excellent kit for practice, with responsive pads and quiet cymbals.' },
      { product_id: insertedProducts[3]._id, user_id: 'user_4', username: 'Mia', rating: 5, comment: 'Legendary live mic that can survive anything on stage.' },
      { product_id: insertedProducts[4]._id, user_id: 'user_5', username: 'Noah', rating: 5, comment: 'Great studio mic for vocals and acoustic instruments.' },
      { product_id: insertedProducts[5]._id, user_id: 'user_6', username: 'Lina', rating: 4, comment: 'Solid audio interface with low latency and reliable preamps.' },
      { product_id: insertedProducts[6]._id, user_id: 'user_7', username: 'Ali', rating: 5, comment: 'This looper is a game changer for practice and live performance.' },
      { product_id: insertedProducts[7]._id, user_id: 'user_8', username: 'Tara', rating: 5, comment: 'Comfortable headphones with accurate sound for tracking.' },
      { product_id: insertedProducts[8]._id, user_id: 'user_9', username: 'Sam', rating: 5, comment: 'A premium stage piano with a beautiful sound and solid build.' },
      { product_id: insertedProducts[9]._id, user_id: 'user_10', username: 'Riya', rating: 4, comment: 'Classic Precision tone and smooth playability.' },
      { product_id: insertedProducts[10]._id, user_id: 'user_11', username: 'Imran', rating: 4, comment: 'Great compact mixer for home studio setups.' }
    ];

    for (const review of sampleReviews) {
      await Review.create(review);
    }

    console.log(`✅ Inserted ${sampleReviews.length} sample reviews`);
    console.log('\n✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
