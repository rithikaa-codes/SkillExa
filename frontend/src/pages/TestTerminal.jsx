import React, { useState } from "react";

const TestTerminal = ({ onNext }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const questions = [
    { title: "Architectural Synthesis", text: "Explain the optimal deployment strategy for a high-intensity microservice ecosystem.", options: ["Blue-Green", "Rolling", "Canary", "Monolithic Build"] },
    { title: "Cognitive Load Management", text: "How does a world-class UI designer reduce cognitive friction in complex dashboards?", opacity: '0.4' }
  ];

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">KNOWLEDGE VALIDATION</span>
         <h2 className="hero-title" style={{ fontSize: '4.5rem' }}>Terminal Diagnostics</h2>
         <p className="hero-lead">The Technical Terminal is currently analyzing your proficiency across all professional vectors.</p>
      </header>

      <div className="glass-premium" style={{ padding: '80px 40px', textAlign: 'left', minHeight: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
           <span className="roadmap-label">TERMINAL ACTIVE: Q{activeQuestion + 1} OF 2</span>
           <div style={{ display: 'flex', gap: '8px' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }}></div>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
           </div>
        </div>

        <h3 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '16px', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
           {questions[activeQuestion].title}
        </h3>
        <p className="hero-lead" style={{ margin: '0 0 40px 0', fontSize: '1.1rem', textAlign: 'left', color: '#888' }}>
           {questions[activeQuestion].text}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
           {(questions[activeQuestion].options || ["Direct Assessment Choice", "Alternative Strategic Choice", "Optimized Integration", "Legacy Override"]).map((opt, i) => (
             <div 
               key={i} 
               className="glass-premium" 
               style={{ padding: '32px 40px', cursor: 'pointer', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.01)' }}
               onClick={() => { if(activeQuestion < 1) setActiveQuestion(activeQuestion + 1); else onNext(); }}
             >
                <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{opt}</span>
                <p style={{ fontSize: '0.75rem', color: '#444', marginTop: '8px' }}>Module {i + 1} validation.</p>
             </div>
           ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '100px 0' }}>
         <button className="cta-glow" onClick={onNext} style={{ padding: '16px 60px', borderRadius: '100px' }}>FINALIZE REPOSITORY ↗</button>
      </div>
    </div>
  );
};

export default TestTerminal;
