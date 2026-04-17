import { Link } from 'react-router-dom';

const getProductImage = (product) => {
  if (product.image_url) {
    return product.image_url;
  }

  const query = encodeURIComponent(product.subCategory || product.name || 'musical instrument');
  return `https://source.unsplash.com/400x400/?${query}`;
};

const capitalize = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);

const ProductCard = ({ product }) => {
  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  let stockClass = 'in';
  let stockText = `${product.stock_quantity} in stock`;

  if (isOutOfStock) {
    stockClass = 'out';
    stockText = 'Out of Stock';
  } else if (isLowStock) {
    stockClass = 'low';
    stockText = `Only ${product.stock_quantity} left`;
  }

  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return [...Array(5)].map((_, i) => {
      if (i < full) {
        return <span key={i} className="star active">★</span>;
      }
      return <span key={i} className="star">★</span>;
    });
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-card-image">
        <span className="type-badge">Musical Instrument</span>

        <img
          src={getProductImage(product)}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://source.unsplash.com/400x400/?musical-instrument';
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-category">
          {capitalize(product.subCategory)}
        </div>

        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-meta">
          <span className="product-card-price">₹{product.price?.toFixed(2)}</span>

          {product.brand && (
            <span className="product-card-brand">{product.brand}</span>
          )}
        </div>

        <div className="product-card-footer">
          <div className="rating-row">
            <span className="stars">{renderStars(product.avg_rating)}</span>
            <span className="rating-count">({product.review_count || 0})</span>
          </div>

          <div className={`stock-row ${stockClass}`}>{stockText}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;