import React, { useState, useEffect } from "react";

const MockTest = () => {
  const [testActive, setTestActive] = useState(false);
  const [score, setScore] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 min
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { text: "What architectural pattern is most effective for ultra-high-scale real-time telemetry?", options: ["Microservices", "Event-Driven", "Monolith", "Serverless Functions"], correct: 1 },
    { text: "Which principle focuses on minimizing cognitive load for new users in a complex SaaS?", options: ["Visual Hierarchy", "Information Density", "Implicit State", "Structural Depth"], correct: 0 },
    { text: "Explain the primary bottleneck in a distributed database without consistent hashing.", options: ["Latency", "Write-Amplification", "Hotspots", "Garbage Collection"], correct: 2 }
  ];



  // Re-writing testActive / timer effect correctly
  useEffect(() => {
    let timer = null;
    if (testActive && timeRemaining > 0) {
      timer = setInterval(() => setTimeRemaining(t => t - 1), 1000);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [testActive, timeRemaining]);

  const handleSubmit = () => {
    setTestActive(false);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
    });
    setScore(Math.round((correctCount / questions.length) * 100));
    // Save to localStorage for historical records
    const history = JSON.parse(localStorage.getItem("mock_test_history") || "[]");
    history.push({ score: Math.round((correctCount / questions.length) * 100), date: new Date().toISOString() });
    localStorage.setItem("mock_test_history", JSON.stringify(history));
  };

  const getFeedback = (s) => {
    if(s >= 80) return "MASTER ARCHITECT STATUS. PROCEED TO DEPLOYMENT.";
    if(s >= 50) return "CORE KNOWLEDGE VALIDATED. REFINEMENT RECOMMENDED IN WEAK VECTORS.";
    return "DIAGNOSTIC CRITICAL. RETURN TO PATHWAY ARCHIVES BEFORE NEXT SESSION.";
  };

  if(!testActive && score === null) {
    return (
      <div className="reveal-entry" style={{ padding: '0 40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <header className="hero-box" style={{ padding: '160px 0 100px' }}>
           <span className="roadmap-label">AI DIAGNOSTIC ENGINES</span>
           <h1 className="hero-title">Mock Certification</h1>
           <p className="hero-lead">Analyze your professional depth through a precision-engineered knowledge diagnostic.</p>
           <button className="cta-glow" onClick={() => setTestActive(true)} style={{ padding: '20px 60px', borderRadius: '100px', fontSize: '1rem' }}>
             INITIATE ASSESSMENT
           </button>
        </header>
      </div>
    );
  }

  if (score !== null) {
    return (
      <div className="reveal-entry glass-premium" style={{ maxWidth: '800px', margin: '100px auto', padding: '100px 60px', textAlign: 'center' }}>
         <span className="roadmap-label">KNOWLEDGE SCOREBOARD</span>
         <h2 className="hero-title" style={{ fontSize: '7rem', margin: '32px 0 16px', color: '#fff', background: 'none', webkitTextFillColor: '#fff', letterSpacing: '-0.08em' }}>
            {score}%
         </h2>
         <p className="hero-lead" style={{ fontSize: '1.25rem', color: '#fff' }}>{getFeedback(score)}</p>
         <button className="cta-glow" onClick={() => { setScore(null); setCurrentQ(0); setAnswers({}); setTimeRemaining(600); }} style={{ marginTop: '40px', padding: '16px 40px', borderRadius: '100px' }}>
           RETRAIN MODULES
         </button>
      </div>
    );
  }

  return (
    <div className="reveal-entry" style={{ padding: '0 40px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <header className="hero-box" style={{ padding: '100px 0 60px' }}>
         <span className="roadmap-label">TERMINAL ACTIVE: Q{currentQ + 1} OF {questions.length}</span>
         <h3 className="hero-title" style={{ fontSize: '3rem', margin: '24px 0', background: 'none', webkitTextFillColor: '#fff' }}>
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} <span style={{ fontSize: '1rem', color: '#444' }}>REMAINING</span>
         </h3>
      </header>

      <div className="glass-premium" style={{ padding: '60px 40px', textAlign: 'left' }}>
         <p className="hero-lead" style={{ textAlign: 'left', margin: '0 0 40px 0', color: '#fff', fontSize: '1.4rem' }}>
            {questions[currentQ].text}
         </p>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {questions[currentQ].options.map((opt, i) => (
               <div key={i} className="glass-premium" onClick={() => setAnswers({...answers, [currentQ]: i})} style={{ 
                  padding: '24px 32px', cursor: 'pointer', transition: '0.2s',
                  borderColor: answers[currentQ] === i ? '#4F46E5' : 'rgba(255,255,255,0.05)',
                  background: answers[currentQ] === i ? 'rgba(79, 70, 229, 0.1)' : 'rgba(255,255,255,0.01)'
               }}>
                  <span style={{ fontSize: '1rem', color: '#888' }}>{opt}</span>
               </div>
            ))}
         </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 0' }}>
         <button className="palette-btn" onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)} style={{ background: 'transparent' }}>PREVIOUS</button>
         {currentQ < questions.length - 1 ? (
            <button className="cta-glow" onClick={() => setCurrentQ(currentQ + 1)} style={{ padding: '16px 40px', borderRadius: '100px' }}>NEXT QUESTION</button>
         ) : (
            <button className="cta-glow" onClick={handleSubmit} style={{ padding: '16px 60px', borderRadius: '100px', background: '#fff', color: '#000' }}>SUBMIT DIAGNOSTIC</button>
         )}
      </div>
    </div>
  );
};

export default MockTest;
