import React from "react";
import Timer from "../components/Timer";
import Tracker from "../components/Tracker";

const StreaksTasks = ({ onNext }) => {
  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">Session Protocol</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Streaks & Tasks</h2>
         <p className="hero-lead">Maintain consistency through architectural task management and daily study sessions.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '80px' }}>
         <div className="glass-premium" style={{ textAlign: 'left', padding: '48px 40px' }}>
            <span className="roadmap-label">Consistency Score</span>
            <h3 className="hero-title" style={{ fontSize: '3rem', margin: '0 0 8px 0', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
              04 <span style={{ fontSize: '1rem', color: '#444' }}>days streak</span>
            </h3>
            <p className="g-desc">Your daily focus record is currently being verified.</p>
         </div>
         <div className="glass-premium" style={{ textAlign: 'left', padding: '48px 40px' }}>
            <span className="roadmap-label">Active Agenda</span>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '10px', height: '10px', border: '1px solid #fff', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#888' }}>Complete React Functional Components</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '10px', height: '10px', border: '1px solid #fff', borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '0.9rem', color: '#888' }}>Optimize Database Schema for Scale</span>
               </div>
            </div>
         </div>
      </div>

      <section style={{ marginBottom: '100px' }}>
         <Timer />
      </section>

      <section className="resource-manager" style={{ marginBottom: '100px' }}>
         <Tracker />
      </section>

      <div style={{ textAlign: 'center', padding: '100px 0' }}>
         <button className="cta-glow" onClick={onNext} style={{ padding: '16px 40px', borderRadius: '100px' }}>PREPARE DIAGNOSTIC ↗</button>
      </div>
    </div>
  );
};

export default StreaksTasks;
