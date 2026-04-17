import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Legals = ({ title, type }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getContent = () => {
    switch (type) {
      case 'shipping':
        return (
          <>
            <h3>Shipping for Music Gear</h3>
            <p>Orders are processed within 24-48 hours. We use trusted carriers to ensure guitars, keyboards, and studio equipment arrive safely.</p>
            <h3>Delivery Timelines</h3>
            <p><strong>Domestic:</strong> 3-5 business days.</p>
            <p><strong>International:</strong> 7-14 business days depending on destination.</p>
            <h3>Handling</h3>
            <p>Fragile items are packed with extra care and insurance for delicate instruments, microphones, and studio audio equipment.</p>
          </>
        );
      case 'returns':
        return (
          <>
            <h3>Easy Returns</h3>
            <p>If your instrument or recording gear is damaged or not what you expected, you may return it within 14 days of delivery.</p>
            <h3>Condition Requirements</h3>
            <p>Returned items must be unplayed, in original packaging, and include all accessories. Studio equipment must be returned in original condition.</p>
            <h3>Refund Process</h3>
            <p>Once inspected, refunds are issued within 5-7 business days to the original payment method.</p>
          </>
        );
      case 'terms':
        return (
          <>
            <h3>Terms of Service</h3>
            <p>By using Muse Mart, you agree to our terms for purchasing, shipping, and handling music equipment. Please review them carefully.</p>
            <h3>Account Responsibility</h3>
            <p>Users are responsible for maintaining secure login credentials. We reserve the right to suspend orders or accounts that violate our policies.</p>
            <h3>Limitations</h3>
            <p>Muse Mart is not liable for indirect or incidental losses that arise from using our products beyond their intended musical use.</p>
          </>
        );
      case 'privacy':
        return (
          <>
            <h3>Privacy Policy</h3>
            <p>We collect only the information needed to fulfill orders and improve your shopping experience. Personal data is protected by industry-standard security practices.</p>
            <h3>Data Use</h3>
            <p>Information is used for order confirmation, shipping notifications, and customer support. We never sell your information to third parties.</p>
            <h3>Cookies</h3>
            <p>Essential cookies support cart persistence and site performance. You may opt out of non-essential tracking through your browser.</p>
          </>
        );
      case 'about':
        return (
          <>
            <h3>Our Story</h3>
            <p>Muse Mart was built for musicians, producers, and performers who want a curated collection of high-quality instruments and audio gear.</p>
            <h3>What We Believe</h3>
            <p>Every product in our store is chosen for tone, build quality, and musical performance. We focus on gear that helps artists create and perform with confidence.</p>
            <h3>How We Work</h3>
            <p>We source instruments from brands like Fender, Yamaha, Shure, and Roland, then ship them with care from our central hub.</p>
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <h3>Contact</h3>
              <p>For support or partnership inquiries:<br />
              <strong>Email:</strong> <a href="mailto:support@musemart.com" style={{ color: 'var(--thalasi-black)', textDecoration: 'underline' }}>support@musemart.com</a></p>
            </div>
          </>
        );
      default:
        return <p>Legal information coming soon.</p>;
    }
  };

  return (
    <main className="main-content">
      <div className="section-header">
        <h1 className="section-title">{title}</h1>
      </div>
    </main>
  );
};

export default Legals;
