import React, { useState } from "react";

const Interview = ({ onNext }) => {
  const [sessionActive, setSessionActive] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  
  const prompts = [
    "Could you describe the most complex technical challenge you've architecturalized recently?",
    "How do you approach decision-making under high-pressure deployment scenarios?",
    "Explain the convergence of UX empathy and engineering performance in your flow."
  ];

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">AI Interview Portal</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Professional Mock Interview</h2>
         <p className="hero-lead">Our autonomous synthesis engine is conducting a deep-dive behavioral assessment.</p>
      </header>

      <div className="glass-premium" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 60px', gap: '60px' }}>
        <div style={{ position: 'relative', width: '150px', height: '150px' }}>
           <div style={{ 
             position: 'absolute', inset: 0, borderRadius: '50%', 
             border: '2px solid rgba(255,255,255,0.1)',
             animation: sessionActive ? 'pulse-lux 2s infinite' : 'none'
           }}></div>
           <div style={{ 
             position: 'absolute', inset: '20px', borderRadius: '50%', 
             background: 'var(--accent-gradient)', opacity: 0.8,
             boxShadow: '0 0 40px var(--glass-glow)'
           }}></div>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
           <span className="roadmap-label">{sessionActive ? 'INTERVIEWER SPEAKING' : 'READY TO COMMENCE'}</span>
           <h3 className="hero-title" style={{ fontSize: '2rem', height: '80px', marginTop: '24px', background: 'none', webkitTextFillColor: '#fff' }}>
              {sessionActive ? prompts[currentPrompt] : "Click initiate to begin the high-performance diagnostic."}
           </h3>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
           {!sessionActive ? (
             <button className="cta-glow" onClick={() => setSessionActive(true)} style={{ padding: '16px 60px', borderRadius: '100px' }}>INITIATE SESSION</button>
           ) : (
             <button className="cta-glow" onClick={() => { if(currentPrompt < 2) setCurrentPrompt(currentPrompt + 1); else onNext(); }} style={{ padding: '16px 60px', borderRadius: '100px' }}>
               {currentPrompt < 2 ? "SUBMIT RESPONSE" : "COMPLETE ASSESSMENT"}
             </button>
           )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-lux {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Interview;
