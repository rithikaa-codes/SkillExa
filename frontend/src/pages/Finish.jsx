import React from "react";
import { Link } from "react-router-dom";

const Finish = ({ onRestart }) => {
  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <header className="hero-box" style={{ padding: '160px 0 100px' }}>
         <span className="roadmap-label">Archive Synchronized</span>
         <h1 className="hero-title" style={{ fontSize: '7rem' }}>Elite Journey Complete</h1>
         <p className="hero-lead">Your professional architecture is now fully validated and recorded in the SkillExa Legacy Archive.</p>
      </header>

      <div className="glass-premium stagger-in" style={{ padding: '80px 40px', maxWidth: '600px', margin: '0 auto 80px' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px' }}>
               <span className="roadmap-label">Final Intelligence Status</span>
               <h4 className="g-title" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Senior Architect</h4>
               <p className="g-desc">Validated on 24.03.2026</p>
            </div>
            <div>
               <span className="roadmap-label">Next Phase Protocol</span>
               <p className="hero-lead" style={{ fontSize: '1rem', marginTop: '16px' }}>Maintain your focus sessions and continue exploration via the career terminal dashboards.</p>
            </div>
         </div>
      </div>

      <div style={{ textAlign: 'center', padding: '0 0 160px 0' }}>
         <Link to="/dashboard" className="cta-glow" style={{ padding: '20px 60px', borderRadius: '100px', fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}>
           RESTART DISCOVERY →
         </Link>
      </div>
    </div>
  );
};

export default Finish;
