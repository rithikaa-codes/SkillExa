import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../api";

const MockTest = () => {
  const [testActive, setTestActive] = useState(false);
  const [score, setScore] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem("selectedRole") || "");

  const startAssessment = async () => {
    const role = localStorage.getItem("selectedRole");
    if (!role) {
      alert("⚠️ NO ROLE DETECTED: Please choose a specialized pathway in 'Trajectory Decode' first to initialize the diagnostic environment.");
      return;
    }
    
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/api/ai/diagnostics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });
      
      if (!resp.ok) throw new Error("Failed to initialize diagnostics.");
      
      const data = await resp.json();
      setQuestions(data.questions);
      setTestActive(true);
    } catch (err) {
      console.error(err);
      alert("Neural Link Synchronization Delayed: Please try initiating the diagnostic again.");
    } finally {
      setLoading(false);
    }
  };

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
      // AI returns actual string, so we need to match it or ensure indices match.
      // Better to have indices from AI.
      if (answers[idx] === q.correct) correctCount++;
    });
    setScore(Math.round((correctCount / questions.length) * 100));
    
    const history = JSON.parse(localStorage.getItem("mock_test_history") || "[]");
    history.push({ 
      score: Math.round((correctCount / questions.length) * 100), 
      role: selectedRole,
      date: new Date().toISOString() 
    });
    localStorage.setItem("mock_test_history", JSON.stringify(history));
  };

  const getFeedback = (s) => {
    if(s >= 80) return "ELITE DEPTH VALIDATED. ARCHITECT STATUS ACHIEVED.";
    if(s >= 50) return "CORE PROFICIENCY ESTABLISHED. TARGETED REFINEMENT REQUIRED.";
    return "DIAGNOSTIC CRITICAL. RETURN TO FOUNDATIONAL MODULES.";
  };

  if(!testActive && score === null) {
    return (
      <div className="reveal-entry" style={{ padding: '0 40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <header className="hero-box" style={{ padding: '160px 0 100px' }}>
           <span className="roadmap-label">AI DIAGNOSTIC ENGINES</span>
           <h1 className="hero-title">Mock Certification</h1>
           <p className="hero-lead">Analyze your professional depth for <span style={{ color: '#fff' }}>{selectedRole || "Global Roles"}</span> through a precision-engineered diagnostic.</p>
           
           <AnimatePresence>
             {loading ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px' }}>
                 <div className="lux-spinner" style={{ margin: '0 auto' }}></div>
                 <p style={{ marginTop: '24px', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '2px' }}>SYNTHESIZING QUESTIONS...</p>
               </motion.div>
             ) : (
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="cta-glow" 
                 onClick={startAssessment} 
                 style={{ padding: '20px 60px', borderRadius: '100px', fontSize: '1rem' }}
               >
                 INITIATE ASSESSMENT
               </motion.button>
             )}
           </AnimatePresence>

           {!selectedRole && (
             <p style={{ marginTop: '24px', color: '#ff8a8a', fontSize: '0.8rem', fontWeight: 600 }}>⚠️ Assessment locked. Select a trajectory first.</p>
           )}
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
            RE-INITIALIZE
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

      {questions[currentQ] && (
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
                    <span style={{ fontSize: '1.1rem', color: answers[currentQ] === i ? '#fff' : '#888' }}>{opt}</span>
                 </div>
              ))}
           </div>
        </div>
      )}

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
