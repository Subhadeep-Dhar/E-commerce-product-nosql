import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import API_BASE from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    subCategory: searchParams.get('subCategory') || '',
    minPrice: '',
    maxPrice: '',
    minRating: searchParams.get('minRating') || '',
    search: ''
  });

  const [pagination, setPagination] = useState({ page: 1, limit: 8, totalPages: 1, totalResults: 0 });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    let url = `${API_BASE}/products?page=${page}&limit=${pagination.limit}`;
    if (filters.subCategory) url += `&subCategory=${filters.subCategory}`;
    if (filters.minPrice) url += `&minPrice=${filters.minPrice}`;
    if (filters.maxPrice) url += `&maxPrice=${filters.maxPrice}`;
    if (filters.minRating) url += `&minRating=${filters.minRating}`;
    if (filters.search) url += `&search=${filters.search}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.data);
        setPagination({
          page: data.pagination.page,
          limit: data.pagination.limit,
          totalPages: data.pagination.pages,
          totalResults: data.pagination.total
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const loadTrending = async () => {
    try {
      const res = await fetch(`${API_BASE}/trending`);
      const data = await res.json();
      if (res.ok && data.data) {
        setTrending(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadRecentlyViewed = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) return;
      const res = await fetch(`${API_BASE}/recently-viewed/${sessionId}`);
      const data = await res.json();
      if (res.ok && data.data) {
        setRecentlyViewed(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }

    const subCategoryFromUrl = searchParams.get('subCategory') || '';
    if (filters.subCategory !== subCategoryFromUrl) {
      setFilters(prev => ({ ...prev, subCategory: subCategoryFromUrl }));
    }

    fetchProducts();
    loadTrending();
    loadRecentlyViewed();

    if (searchParams.get('subCategory')) {
      setTimeout(() => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));

    if (name === 'subCategory') {
      if (value) {
        window.history.pushState({}, '', `/?subCategory=${value}`);
      } else {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filters.subCategory) params.set('subCategory', filters.subCategory);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minRating) params.set('minRating', filters.minRating);
    if (filters.search) params.set('search', filters.search);
    
    window.history.pushState({}, '', `/?${params.toString()}`);
    fetchProducts(1);
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ subCategory: '', minPrice: '', maxPrice: '', minRating: '', search: '' });
    if (searchParams.get('subCategory') || searchParams.get('minRating')) {
      window.history.pushState({}, '', '/');
    }
    setTimeout(() => {
      fetchProducts(1);
    }, 0);
  };

  return (
    <main className="main-content">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge">Stage Ready Music Gear</span>
            <h1 className="hero-title">
              Craft your sound with premium <span>music gear</span>
            </h1>
            <p className="hero-subtitle">
              Discover curated guitars, keyboards, drums, studio audio, and pro production equipment designed for performers and creators.
            </p>

            <div className="hero-buttons">
              <button className="hero-button primary" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
                Shop Instruments
              </button>
              <button className="hero-button secondary" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
                Browse Gear
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <span className="hero-visual-tag">Featured pick</span>
              <h3 className="hero-visual-heading">Fender Stratocaster</h3>
              <p className="hero-visual-copy">
                A modern classic for stage and studio, engineered with iconic tone, premium playability, and a sleek finish.
              </p>
              <div className="hero-visual-meta">
                <span>Electric Guitar</span>
                <span>₹79,999</span>
                <span>Pro tone</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="features">
        <div className="feature-item">Fast shipping for music gear</div>
        <div className="feature-item">Trusted brands, pro quality</div>
        <div className="feature-item">Safe checkout and support</div>
      </section> */}


      <section className="filters-bar">
        <div className="filter-group">
          <span className="filter-label">Instrument Type</span>
          <select className="filter-select" name="subCategory" value={filters.subCategory} onChange={handleFilterChange}>
            <option value="">All Instruments</option>
            <option value="guitar">Guitars</option>
            <option value="piano">Pianos</option>
            <option value="drums">Drums</option>
            <option value="audio">Audio Gear</option>
            <option value="studio">Studio Equipment</option>
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-label">Price Range</span>
          <div className="filter-row">
            <input type="number" className="filter-input" name="minPrice" placeholder="Min" value={filters.minPrice} onChange={handleFilterChange} min="0" />
            <span className="filter-divider">—</span>
            <input type="number" className="filter-input" name="maxPrice" placeholder="Max" value={filters.maxPrice} onChange={handleFilterChange} min="0" />
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">Rating</span>
          <select className="filter-select" name="minRating" value={filters.minRating} onChange={handleFilterChange} style={{ minWidth: '100px' }}>
            <option value="">Any</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="filter-group" style={{ flexGrow: 1, maxWidth: '400px' }}>
          <span className="filter-label">Search Gear</span>
          <input
            type="text"
            className="filter-input"
            name="search"
            placeholder="Search for guitars, mics, mixers..."
            value={filters.search}
            onChange={handleFilterChange}
            style={{ width: '100%' }}
            />
        </div>
        <div className="filter-group">
          <button className="filter-btn filter-btn-primary" onClick={applyFilters}>Apply</button>
          <button className="filter-btn filter-btn-secondary" onClick={clearFilters}>Clear</button>
        </div>
      </section>

      <section id="products-section">
        <div className="section-header">
          <h2 className="section-title">All Instruments</h2>
          <span className="section-subtitle">{pagination.totalResults} products found</span>
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="pagination">
            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
              key={i}
              className={`pagination-btn ${pagination.page === i + 1 ? 'active' : ''}`}
              onClick={() => fetchProducts(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        {trending.length > 0 && (
          <section className="horizontal-scroll-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Trending Now</h2>
                <p className="section-subtitle">Top instrument picks this hour</p>
              </div>
            </div>
            <div className="horizontal-scroll">
              {trending.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </section>
        )}

        {recentlyViewed.length > 0 && (
          <section className="horizontal-scroll-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Recently Viewed</h2>
                <p className="section-subtitle">Back to your latest gear</p>
              </div>
            </div>
            <div className="horizontal-scroll">
              {recentlyViewed.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default Home;