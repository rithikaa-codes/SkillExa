import React from "react";
import Timer from "../components/Timer";
import Tracker from "../components/Tracker";

const Dashboard = () => {
  return (
    <div className="reveal-entry" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', paddingTop: '40px' }}>
      <header className="roadmap-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span className="roadmap-label">The Archive Control</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem', marginBottom: '16px' }}>Focus Dashboard</h1>
        <p className="hero-lead">Metrics-driven career training and study session management.</p>
      </header>

      <section style={{ marginBottom: '100px' }}>
        <Timer />
      </section>

      <section className="resource-manager">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <span className="roadmap-label">Activity Analytics</span>
        </div>
        <Tracker />
      </section>
      
      {/* Visual Separation */}
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <span style={{ opacity: 0.1, letterSpacing: '4px' }}>⌘ DISCOVER BELOW ⌘</span>
      </div>
    </div>
  );
};

export default Dashboard;
