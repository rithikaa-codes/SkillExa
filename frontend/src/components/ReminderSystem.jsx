import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ReminderSystem = ({ triggerToast }) => {
  const [reminderTime, setReminderTime] = useState(localStorage.getItem("reminder_time") || "19:00");
  const [isEnabled, setIsEnabled] = useState(localStorage.getItem("reminder_enabled") !== "false");
  const [permission, setPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'denied');

  const requestPermission = async () => {
    if (typeof Notification === 'undefined') {
      alert("Browser notifications are not supported here. We will use fallback alerts instead.");
      return;
    }
    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === "denied") {
         alert("Notifications are permanently blocked by your browser settings. You won't get push popups, but the protocol is now active!");
      } else if (res === "granted") {
         alert("Notifications successfully enabled!");
      }
    } catch (error) {
      console.error("Notification permission error:", error);
      alert("Error requesting notification permission. Running in fallback mode.");
    }
  };

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem("reminder_enabled", newState.toString());
    if (newState && permission !== "granted") {
      requestPermission();
    }
  };

  useEffect(() => {
    if (isEnabled && permission === "default") {
      requestPermission();
    }
  }, [isEnabled, permission]);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setReminderTime(time);
    localStorage.setItem("reminder_time", time);
  };

  useEffect(() => {
    const checkReminder = () => {
      if (!isEnabled) return;
      
      const now = new Date();
      const current = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (current === reminderTime) {
        // Prevent multiple notifications in the same minute
        const lastNotified = localStorage.getItem("last_notified_date");
        const today = now.toISOString().split("T")[0];
        
        if (lastNotified !== today) {
          if (permission === "granted" && typeof Notification !== 'undefined') {
            try {
              new Notification("SkillExa: Focus Time", {
                body: "It's time for your scheduled study session. Maintain your momentum!",
                icon: "/favicon.ico"
              });
            } catch (e) {
              console.error("Failed to show notification:", e);
              alert("SkillExa: Focus Time!\n\nIt's time for your scheduled study session. Maintain your momentum!");
            }
          } else {
             // Fallback for blocked/unsupported environments
             alert("SkillExa: Focus Time!\n\nIt's time for your scheduled study session. Maintain your momentum!");
          }
          if (triggerToast) triggerToast("FOCUS PROTOCOL: IT'S TIME TO STUDY");
          localStorage.setItem("last_notified_date", today);
        }
      }
    };

    const interval = setInterval(checkReminder, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [isEnabled, reminderTime, permission, triggerToast]);

  return (
    <div className="glass-premium" style={{ padding: '32px', textAlign: 'left', marginBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <span className="roadmap-label">Focus Schedule</span>
          <h3 className="hero-title" style={{ fontSize: '1.5rem', marginTop: '8px', background: 'none', webkitTextFillColor: '#fff' }}>Daily Reminders</h3>
        </div>
        <button 
          onClick={handleToggle}
          className="palette-btn" 
          style={{ 
            padding: '8px 24px', 
            borderRadius: '100px', 
            background: isEnabled ? '#4F46E5' : 'rgba(255,255,255,0.05)',
            color: isEnabled ? '#fff' : '#666',
            border: 'none',
            fontSize: '0.7rem'
          }}
        >
          {isEnabled ? "PROTOCOL ACTIVE" : "ACTIVATE"}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <input 
            type="time" 
            value={reminderTime} 
            onChange={handleTimeChange}
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: '#fff', 
              padding: '12px 20px', 
              borderRadius: '12px',
              fontSize: '1.2rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>
        <p style={{ opacity: 0.4, fontSize: '0.85rem', maxWidth: '300px' }}>
          Schedule your peak focus hours. The system will synchronize and notify you when it's time to engage.
        </p>
      </div>

      {permission === "denied" && isEnabled && (
        <p style={{ color: '#ef4444', fontSize: '0.7rem', marginTop: '16px', fontWeight: 600 }}>
          ⚠ BROWSER NOTIFICATIONS ARE BLOCKED. PLEASE ENABLE THEM IN YOUR BROWSER SETTINGS.
        </p>
      )}
    </div>
  );
};

export default ReminderSystem;
