import React from "react";
import { Link } from "react-router-dom";

const Welcome = ({ onNext }) => {
  return (
    <div className="reveal-entry" style={{ padding: '0 40px' }}>
      <header className="hero-box" style={{ padding: '160px 0 100px' }}>
        <span className="roadmap-label">The Archive Collective</span>
        <h1 className="hero-title">Elevate Your Career Legacy</h1>
        <p className="hero-lead">The premiere end-to-end ecosystem for architectural career planning, deep focus tracking, and AI-driven validation.</p>
        <Link to="/dashboard" className="cta-glow" style={{ padding: '20px 60px', borderRadius: '100px', fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}>
          START YOUR ASCENT →
        </Link>
      </header>

      <section className="card-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '100px', margin: '0 auto', maxWidth: '1200px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          <div className="glass-premium" style={{ padding: '40px' }}>
             <h4 className="g-title">Precision Roadmaps</h4>
             <p className="g-desc">Validated milestones curated for global industry standards.</p>
          </div>
          <div className="glass-premium" style={{ padding: '40px' }}>
             <h4 className="g-title">Deep Metrics</h4>
             <p className="g-desc">Architectural time tracking to quantify your professional ascent.</p>
          </div>
          <div className="glass-premium" style={{ padding: '40px' }}>
             <h4 className="g-title">AI Validation</h4>
             <p className="g-desc">Mock diagnostics powered by autonomous intelligence engines.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
