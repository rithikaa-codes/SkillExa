import React, { useState, useEffect } from "react";
import ReminderSystem from "../components/ReminderSystem";


const Analytics = () => {
  const [stats, setStats] = useState({
    totalHours: 0,
    avgDaily: 0,
    streak: 0,
    completionRate: 75,
    weeklyTrend: [60, 45, 80, 50, 90, 40, 70] // Dummy trend for visual
  });

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const aggregateData = () => {
      const now = new Date();
      let totalSeconds = 0;
      let daysCount = 0;
      
      // Iterate over last 30 days of localStorage
      for (let i = 0; i < 30; i++) {
        const d = new Date(now.getTime() - i * 86400000).toISOString().split("T")[0];
        const daySeconds = parseInt(localStorage.getItem(`daily_${d}`) || "0", 10);
        if (daySeconds > 0) {
          totalSeconds += daySeconds;
          daysCount++;
        }
      }

      const totalH = (totalSeconds / 3600).toFixed(1);
      const avg = daysCount > 0 ? (totalH / 7).toFixed(1) : 0; // Weekly avg
      const streak = parseInt(localStorage.getItem("current_streak") || "0", 10);
      
      setStats(prev => ({ ...prev, totalHours: totalH, avgDaily: avg, streak }));

      // Generate Insights
      const newInsights = [];
      if (parseFloat(avg) > 2) newInsights.push("You are maintaining elite consistency this week.");
      else newInsights.push("Increase daily focus by +1.5 hrs to reach architectural milestones.");
      
      if (streak > 3) newInsights.push("Mastery streak active. Your persistence is being recorded.");
      else newInsights.push("Initialize a 3-day streak to unlock advanced diagnostic insights.");

      setInsights(newInsights);
    };

    aggregateData();
  }, []);

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">KNOWLEDGE PERSISTENCE RECORD</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Growth Analytics</h2>
         <p className="hero-lead">Quantitative metrics and autonomous insights to architecturalize your professional ascent.</p>
      </header>

      {/* Primary Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
         {[
           { label: "LIFETIME FOCUS", val: `${stats.totalHours}h` },
           { label: "WEEKLY AVG", val: `${stats.avgDaily}h` },
           { label: "CURRENT STREAK", val: stats.streak },
           { label: "VALIDATION RATE", val: `${stats.completionRate}%` }
         ].map((stat, i) => (
           <div key={i} className="glass-premium" style={{ textAlign: 'left', padding: '32px' }}>
              <span className="roadmap-label" style={{ fontSize: '0.6rem' }}>{stat.label}</span>
              <h3 className="hero-title" style={{ fontSize: '2.5rem', margin: '8px 0 0', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.05em' }}>
                {stat.val}
              </h3>
           </div>
         ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', marginBottom: '80px' }}>
         {/* Weekly Trend (Visual Mockup) */}
         <div className="glass-premium" style={{ padding: '48px' }}>
            <span className="roadmap-label">PERSISTENCE TREND Line</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', marginTop: '40px' }}>
               {stats.weeklyTrend.map((v, i) => (
                 <div key={i} style={{ 
                   flex: 1, height: `${v}%`, background: i === 5 ? '#4F46E5' : 'rgba(255,255,255,0.05)', 
                   borderRadius: '4px', transition: '0.6s cubic-bezier(0.19, 1, 0.22, 1)' 
                 }}></div>
               ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.7rem', color: '#444', fontWeight: 700 }}>
               <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
         </div>

         {/* Growth Insights */}
         <div className="glass-premium" style={{ padding: '48px' }}>
            <span className="roadmap-label">AUTONOMOUS INSIGHTS</span>
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
               {insights.map((insight, i) => (
                 <div key={i} style={{ borderLeft: '2px solid #4F46E5', paddingLeft: '20px' }}>
                    <p style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500, lineHeight: '1.6' }}>{insight}</p>
                 </div>
               ))}
               <div style={{ marginTop: 'auto', paddingTop: '40px', opacity: 0.2, fontSize: '0.7rem' }}>
                 INSIGHT ENGINE: SkillExa Analysis v4.2
               </div>
            </div>
         </div>
      </div>

      <section style={{ marginBottom: '100px' }}>
         <ReminderSystem />
      </section>
    </div>

  );
};

export default Analytics;
