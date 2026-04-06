import React, { useState, useEffect, useCallback } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [violations, setViolations] = useState(parseInt(localStorage.getItem("focus_violations") || "0", 10));
  const [showToast, setShowToast] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);




  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedDaily = localStorage.getItem(`daily_${today}`);
    if (savedDaily) setSeconds(parseInt(savedDaily, 10));
  }, []);

    }
    console.log(`[SYNC] Saved ${seconds}s to storage.`);
  }, [seconds]);

  // Main Timer Logic
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      console.log("[PROTOCOL] Timer started.");
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setSessionDuration((prev) => {
          const next = prev + 1;
          // Break reminder threshold: 50 minutes (3000 seconds)
          if (next === 3000) {
            setShowToast("ELITE PERFORMANCE: TIME FOR A RESTORATIVE BREAK");
            setTimeout(() => setShowToast(null), 5000);
          }
          return next;
        });
      }, 1000);
    } else {
      console.log("[PROTOCOL] Timer paused.");
      setSessionDuration(0); // Reset session-specific clock
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Persistent Auto-Save
  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (isRunning) saveToStorage();
    }, 5000);
    return () => clearInterval(syncInterval);
  }, [isRunning, saveToStorage]);

  // Focus Lock Interference Guard
  useEffect(() => {
    const handleFocusLoss = () => {
      if (isRunning && document.hidden) {
        setIsRunning(false);
        const v = parseInt(localStorage.getItem("focus_violations") || "0", 10) + 1;
        setViolations(v);
        localStorage.setItem("focus_violations", v.toString());
        setShowToast("FOCUS BREACH DETECTED — SESSION PAUSED");
        setTimeout(() => setShowToast(null), 3000);
        console.warn("[FOCUS] Breach detected. Session locked.");
      }
    };
    document.addEventListener("visibilitychange", handleFocusLoss);
    return () => document.removeEventListener("visibilitychange", handleFocusLoss);
  }, [isRunning]);



  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    console.log("[PROTOCOL] Manual reset initiated.");
    if (window.confirm("RESET PROGRESS?")) {
      setSeconds(0);
      localStorage.setItem(`daily_${new Date().toISOString().split("T")[0]}`, "0");
    }
  };


  return (
    <div className="glass-premium reveal-entry" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
      <span className="roadmap-label">Deep Focus Protocol</span>
      
      <h2 className="hero-title" style={{ fontSize: '7rem', margin: '0 0 10px 0', letterSpacing: '-0.08em', background: 'none', webkitTextFillColor: '#fff' }}>
        {formatTime(seconds)}
      </h2>
      <div style={{ opacity: 0.3, fontSize: '0.75rem', letterSpacing: '4px', fontWeight: 800, marginBottom: '40px' }}>
        FOCUS BREAKS DETECTED: {violations}
      </div>

      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button 
          className="cta-glow" 
          onClick={() => setIsRunning(!isRunning)}
          style={{ padding: '16px 60px', borderRadius: '100px', background: isRunning ? '#fff' : '#4F46E5', color: isRunning ? '#000' : '#fff' }}
        >
          {isRunning ? "PAUSE SESSION" : "INITIATE FOCUS"}
        </button>

        <button 
          className="palette-btn" 
          onClick={handleReset}
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#444', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 800, padding: '0 24px', borderRadius: '100px' }}
        >
          RESET
        </button>
      </div>

      <div style={{ marginTop: '48px', opacity: 0.3, letterSpacing: '2px', fontSize: '0.7rem', fontWeight: 700 }}>
        [ AUTO-SYNC ACTIVE ]
      </div>

      {showToast && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#000', padding: '12px 24px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, z-index: 99999 }}>
          {showToast}
        </div>
      )}
    </div>

  );
};

export default Timer;
