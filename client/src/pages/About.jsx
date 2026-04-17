import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content">
      <section className="hero" style={{ padding: '4rem 2rem', marginBottom: '3rem' }}>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge">About Muse Mart</span>
            <h1 className="hero-title">
              Built for musicians, creators, and stage-ready sound.
            </h1>
            <p className="hero-subtitle">
              Muse Mart is a premium music gear destination designed to elevate every performance, production, and practice session with thoughtfully curated instruments and audio equipment.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card" style={{ padding: '2.5rem' }}>
              <span className="hero-visual-tag">Our philosophy</span>
              <h3 className="hero-visual-heading">Tone, design, and performance that inspire</h3>
              <p className="hero-visual-copy">
                We believe great music starts with great tools. Muse Mart brings together iconic instruments and studio essentials in a refined experience for artists who want quality without compromise.
              </p>
              <div className="hero-visual-meta">
                <span>Premium brands</span>
                <span>Curated selection</span>
                <span>Trusted support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-header">
        <div>
          <h2 className="section-title">Who we are</h2>
          <p className="section-subtitle">A boutique music gear store built for sound, style, and simplicity.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Curated for musicians</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
            Every instrument and studio tool in our catalog is selected for its tonal character, build quality, and real-world reliability. From stage-ready guitars to production-focused audio gear, our collection is tailored for creatives who demand the best.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Our promise</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              A premium experience from discovery to checkout, backed by clear support, fast shipping, and product guidance for every level of artist.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Sound with confidence</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              Whether you are tracking in the studio or performing live, Muse Mart is built to help you find music gear that performs consistently and feels inspiring to play.
            </p>
          </div>
        </div>
      </div>

      <section className="section-header">
        <div>
          <h2 className="section-title">Our values</h2>
          <p className="section-subtitle">Designed around clarity, craft, and musical possibility.</p>
        </div>
      </section>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.18)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--accent)' }}>Standout curation</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We focus on instruments and studio gear that delivers distinct tone, premium feel, and long-term value.
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Minimal experience</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            A clean, distraction-free shop built to help you browse, compare and choose with confidence.
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Creative support</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            We aim to support your musical journey with straightforward product details, reliable service, and a refined selection that reflects your craft.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
