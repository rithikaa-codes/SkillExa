import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../api";

const AICoach = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Architecture Synchronized. I am your SkillExa Intelligence Coach. How can I help you architect your career today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);
    setError("");

    const token = localStorage.getItem("user_token");
    if (!token) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Authorization Protocol Required. Please Sign In to continue our architectural session." }]);
      setLoading(false);
      return;
    }

    try {
      // 1. Point to the new backend endpoint: POST /api/ai/chat
      const resp = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: { 
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await resp.json();

      // 2. Map AI reply to message history
      if (resp.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setError(data.error || "AI Synchronization Failure.");
      }
    } catch (err) {
      setError("SkillExa Intelligence Core Offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-premium" style={{ 
      padding: '40px', 
      marginBottom: '80px', 
      textAlign: 'left', 
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px' }}>
         <span className="roadmap-label">PERSISTENCE ARCHITECT</span>
         <h2 className="hero-title" style={{ fontSize: '2rem', background: 'none', webkitTextFillColor: '#fff', margin: '8px 0' }}>AI Neural Coach</h2>
         <p className="hero-lead" style={{ fontSize: '0.9rem', opacity: 0.6 }}>Interactive vocational intelligence modeling.</p>
      </header>

      {/* Chat Container */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        maxHeight: '400px', 
        paddingRight: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }} className="custom-scroll">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                padding: '16px 24px',
                borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: msg.role === 'user' ? '0 8px 30px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <span className="roadmap-label" style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: '8px', display: 'block' }}>
                {msg.role === 'user' ? 'USER_PROMPT' : 'ARCHITECT_RESPONSE'}
              </span>
              <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem', color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.8)' }}>
                {msg.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ alignSelf: 'flex-start' }}
          >
            <div className="lux-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#fff transparent transparent transparent' }}></div>
          </motion.div>
        )}

        {error && (
          <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center' }}>⚠ {error}</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} style={{ 
        display: 'flex', 
        gap: '12px', 
        background: 'rgba(255,255,255,0.03)', 
        padding: '8px', 
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your vocational architectural query..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            padding: '12px 24px',
            color: '#fff',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="cta-glow"
          style={{ 
            padding: '10px 24px', 
            borderRadius: '100px', 
            fontSize: '0.75rem',
            opacity: loading || !input.trim() ? 0.5 : 1
          }}
        >
          {loading ? 'ARCHITECTING...' : 'TRANSMIT →'}
        </button>
      </form>
    </div>
  );
};

export default AICoach;

