import React, { useState, useEffect } from "react";
import FlameIcon from "../components/FlameIcon";


const Streaks = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const calculateStreak = () => {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      
      // Grace Window Implementation (6 hours)
      // If it's before 6:00 AM, yesterday might still count as the current focus day
      const effectiveDate = new Date(now.getTime() - (6 * 3600 * 1000)).toISOString().split("T")[0];
      
      let streak = 0;
      let d = new Date(effectiveDate);
      
      // Minimum consistency threshold: 10 minutes (600 seconds)
      const MIN_THRESHOLD = 600;

      while (true) {
         const dateStr = d.toISOString().split("T")[0];
         const dailySeconds = parseInt(localStorage.getItem(`daily_${dateStr}`) || "0", 10);
         
         if (dailySeconds >= MIN_THRESHOLD) {
            streak++;
            d.setDate(d.getDate() - 1);
         } else {
            break;
         }
      }

      setCurrentStreak(streak);
      const longest = parseInt(localStorage.getItem("longest_streak") || "0", 10);
      setLongestStreak(longest > streak ? longest : streak);
      
      if (streak > longest) localStorage.setItem("longest_streak", streak.toString());
      localStorage.setItem("current_streak", streak.toString());
    };


    calculateStreak();
  }, []);

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">COGNITIVE PERFORMANCE</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Streak Analytics</h2>
         <p className="hero-lead">Consistency is the architecture of professional mastery. Keep your legacy active.</p>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <FlameIcon size={120} />
      </div>


      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '80px' }}>
         <div className="glass-premium" style={{ textAlign: 'center', padding: '80px 40px' }}>
            <span className="roadmap-label">CURRENT CONTINUITY</span>
            <h3 className="hero-title" style={{ fontSize: '7rem', margin: '24px 0', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
              {currentStreak.toString().padStart(2, '0')}
            </h3>
            <p className="g-desc">Continuous Study Days</p>
         </div>
         
         <div className="glass-premium" style={{ textAlign: 'center', padding: '80px 40px' }}>
            <span className="roadmap-label">HISTORICAL PEAK</span>
            <h3 className="hero-title" style={{ fontSize: '7rem', margin: '24px 0', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em', opacity: 0.3 }}>
              {longestStreak.toString().padStart(2, '0')}
            </h3>
            <p className="g-desc">All-Time High Persistence</p>
         </div>
      </div>



      <div className="glass-premium" style={{ textAlign: 'left', padding: '40px' }}>
          <span className="roadmap-label">CONSISTENCY OVER PERFECTION</span>
          <p className="hero-lead" style={{ fontSize: '1rem', marginTop: '16px' }}>
            Stay consistent daily — even a small session keeps your streak alive. We provide a 6-hour grace window every morning to ensure your momentum is never lost to a late night.
          </p>
      </div>

    </div>
  );
};

export default Streaks;
