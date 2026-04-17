import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h2 className="footer-logo">MUSE MART</h2>
            <p className="footer-description">
              Your online destination for guitars, keyboards, drums, studio audio, and pro music gear.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-header">SHOP</h3>
            <ul className="footer-links">
              <li><Link to="/">Instruments</Link></li>
              <li><Link to="/?subCategory=guitar">Guitars</Link></li>
              <li><Link to="/?subCategory=piano">Pianos</Link></li>
              <li><Link to="/?subCategory=audio">Audio Gear</Link></li>
              <li><Link to="/?subCategory=studio">Studio Equipment</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-header">SUPPORT</h3>
            <ul className="footer-links">
              <li><Link to="/shipping">Shipping & Delivery</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-header">CONNECT</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>© 2026 Muse Mart. Built for musicians and creators</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
