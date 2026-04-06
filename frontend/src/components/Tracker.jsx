import React, { useEffect, useState } from "react";

const Tracker = () => {
  const [todayHours, setTodayHours] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  const handleSync = () => {
    const today = new Date().toISOString().split("T")[0];
    const savedDaily = localStorage.getItem(`daily_${today}`) || "0";
    const savedTotal = localStorage.getItem("total_study_time") || "0";
    setTodayHours((parseInt(savedDaily, 10) / 3600).toFixed(2));
    setTotalHours((parseInt(savedTotal, 10) / 3600).toFixed(2));
  };

  useEffect(() => {
    handleSync();
    window.addEventListener("storage", handleSync);
    const interval = setInterval(handleSync, 5000); 
    return () => {
      window.removeEventListener("storage", handleSync);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ marginTop: '80px', display: 'flex', gap: '32px', width: '100%', maxWidth: '1000px', margin: '40px auto' }}>
      <div className="glass-premium reveal-entry stagger-1" style={{ flex: 1, textAlign: 'left', padding: '48px 40px' }}>
        <span className="roadmap-label">Session Insight</span>
        <h3 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '8px', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
          {todayHours} <span style={{ fontSize: '1rem', color: '#444' }}>hrs today</span>
        </h3>
        <p className="g-desc">Professional Focus Progression</p>
      </div>
      
      <div className="glass-premium reveal-entry stagger-2" style={{ flex: 1, textAlign: 'left', padding: '48px 40px' }}>
        <span className="roadmap-label">Archive Metrics</span>
        <h3 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '8px', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
          {totalHours} <span style={{ fontSize: '1rem', color: '#444' }}>hrs total</span>
        </h3>
        <p className="g-desc">Cumulative Academic Asset</p>
      </div>
    </div>
  );
};

export default Tracker;
