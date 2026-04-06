import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";


const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [initialTime, setInitialTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [violations, setViolations] = useState(parseInt(localStorage.getItem("focus_violations") || "0", 10));
  const [showToast, setShowToast] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);




  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      console.log(`[COUNTDOWN] Active: ${timeLeft}s remaining`);
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setSessionDuration((prev) => {
           const next = prev + 1;
           // 50-minute mark reminder
           if (next === 3000) {
              triggerToast("MAXIMUM COGNITIVE LOAD: BREAK RECOMMENDED.");
           }
           return next;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      console.log("[COUNTDOWN] Session complete.");
      clearInterval(interval);
      setIsRunning(false);
      setSessionDuration(0);
      handleSessionComplete();
    } else {
      console.log("[COUNTDOWN] Paused.");
      setSessionDuration(0);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);


  // Premium Toast Helper
  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };


  const [sessionLost, setSessionLost] = useState(false);

  useEffect(() => {
    const handleFocusLoss = () => {
      if (isRunning && document.hidden) {
        setIsRunning(false);
        const newViolations = violations + 1;
        setViolations(newViolations);
        localStorage.setItem("focus_violations", newViolations.toString());
        triggerToast("FOCUS BREACH: PROTOCOL PAUSED — STAY ON TAB");
        console.warn("[FOCUS] Breach detected. Protocol locked.");
      }
    };
    
    document.addEventListener("visibilitychange", handleFocusLoss);
    window.addEventListener("blur", handleFocusLoss);
    return () => {
      document.removeEventListener("visibilitychange", handleFocusLoss);
      window.removeEventListener("blur", handleFocusLoss);
    };
  }, [isRunning, violations]);



  const startSession = () => {
    console.log("[ACTION] Attempting to initiate focus session...");
    if (window.confirm("Start focus mode? You should stay on this tab.")) {
      setIsRunning(true);
      triggerToast("FOCUS MODE ACTIVE — SYSTEM SECURED");
      console.log("[ACTION] Protocol initiated.");
    }
  };



  const handleSessionComplete = () => {
    const today = new Date().toISOString().split("T")[0];
    const prevDaily = parseInt(localStorage.getItem(`daily_${today}`) || "0", 10);
    localStorage.setItem(`daily_${today}`, (prevDaily + initialTime).toString());
    const prevTotal = parseInt(localStorage.getItem("total_study_time") || "0", 10);
    localStorage.setItem("total_study_time", (prevTotal + initialTime).toString());
    localStorage.setItem("last_studied_date", today);
    alert("FOCUS PROTOCOL COMPLETE. SESSION SYNCHRONIZED.");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setDuration = (mins) => {
    setIsRunning(false);
    setTimeLeft(mins * 60);
    setInitialTime(mins * 60);
    console.log(`[ACTION] Duration adjusted to ${mins}m`);
  };


  const progressPct = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">DEEP FOCUS PROTOCOL</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Countdown Timer</h2>
         <p className="hero-lead">Minimize external distractions. Maximize cognitive throughput.</p>
         
         <AnimatePresence>
           {isRunning && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="focus-indicator"
             >
               <span className="dot pulsate"></span> FOCUS MODE ACTIVE
             </motion.div>
           )}
         </AnimatePresence>

      </header>


      <div className="glass-premium" style={{ padding: '80px 40px', position: 'relative' }}>
         {/* Circular Progress (Simplified) */}
         <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto 40px' }}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
               <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
               <circle cx="50" cy="50" r="48" fill="none" stroke="#4F46E5" strokeWidth="4" 
                  strokeDasharray="301.59" strokeDashoffset={301.59 - (301.59 * progressPct / 100)}
                  style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
               <h3 className="hero-title" style={{ fontSize: '5rem', margin: '0 0 10px 0', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
                  {formatTime(timeLeft)}
               </h3>
               <div style={{ opacity: 0.4, fontSize: '0.75rem', letterSpacing: '3px', fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>
                  FOCUS BREAKS: {violations}
               </div>
            </div>

         </div>


         <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
            {[25, 45, 60, 90].map((mins) => (
               <button key={mins} className="palette-btn" onClick={() => setDuration(mins)} style={{ padding: '12px 20px', fontSize: '0.8rem', opacity: initialTime === mins * 60 ? 1 : 0.4 }}>
                  {mins}M
               </button>
            ))}
         </div>

          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
            <button className="cta-glow" onClick={() => (isRunning ? setIsRunning(false) : startSession())} style={{ padding: '16px 60px', borderRadius: '100px' }}>
               {isRunning ? "PAUSE PROTOCOL" : "INITIATE PROTOCOL"}
            </button>
            <button className="palette-btn" onClick={() => { setIsRunning(false); setTimeLeft(initialTime); setViolations(0); localStorage.removeItem("focus_violations"); console.log("[ACTION] Reset protocol."); }} style={{ padding: '0 32px', borderRadius: '100px', color: '#444' }}>
               RESET
            </button>
          </div>

      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="local-toast"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {isRunning && violations > 3 && (
        <div style={{ marginTop: '40px', color: '#ef4444', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>
          ⚠ YOU ARE LOSING FOCUS. STAY CONSISTENT.
        </div>
      )}

    </div>

  );
};

export default FocusTimer;
