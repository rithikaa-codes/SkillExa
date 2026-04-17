import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../api";
import "./AICoach.css";

const AICoach = () => {
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I am your SkillExa AI Career Coach. How can I help you architect your future today?" 
    }
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

    try {
      // 1. Point to the NEW backend endpoint: POST /api/ai/chat
      const resp = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: { 
           "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await resp.json();

      // 2. Map AI reply to message history
      if (resp.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setError(data.error || "AI temporarily unavailable");
      }
    } catch (err) {
      setError("AI temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-premium" style={{ 
      maxWidth: '1000px',
      margin: '60px auto 100px',
      padding: '40px', 
      minHeight: '700px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px' }}>
         <span className="roadmap-label">COGNITIVE INTELLIGENCE SUITE</span>
         <h2 className="hero-title" style={{ fontSize: '3rem', background: 'none', webkitTextFillColor: '#fff', margin: '8px 0' }}>Cognitive Coach</h2>
         <p className="hero-lead" style={{ fontSize: '1rem', opacity: 0.6, margin: 0 }}>Advanced vocational mentoring powered by frontier AI architectures.</p>
      </header>

      {/* Chat History Area */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        maxHeight: '500px', 
        paddingRight: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }} className="custom-scroll">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                padding: '16px 24px',
                borderRadius: msg.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                border: '1px solid rgba(255,255,255,0.05)',
                whiteSpace: 'pre-wrap'
              }}
            >

              <p style={{ margin: 0, lineHeight: '1.7', fontSize: '1rem', color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.9)' }}>
                {msg.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="lux-spinner" style={{ width: '24px', height: '24px', margin: '10px 0' }}></div>
        )}

        {error && (
          <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center', marginTop: '10px' }}>⚠ {error}</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field Area */}
      <form onSubmit={handleSendMessage} style={{ 
        display: 'flex', 
        gap: '12px', 
        background: 'rgba(255,255,255,0.03)', 
        padding: '10px', 
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your career goals or ask for a roadmap..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            padding: '12px 28px',
            color: '#fff',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="cta-glow"
          style={{ 
            padding: '12px 32px', 
            borderRadius: '100px', 
            fontSize: '0.8rem',
            opacity: loading || !input.trim() ? 0.5 : 1
          }}
        >
          {loading ? 'ARCHITECTING...' : 'TRANSMIT'}
        </button>
      </form>
    </div>
  );
};

export default AICoach;
