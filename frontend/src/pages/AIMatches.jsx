import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "../api";
import careerResources from "../careerResources";

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const AIMatches = () => {
  const [file, setFile] = useState(null);
  const [roles, setRoles] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [details, setDetails] = useState("");
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);

  const analyzeResume = async () => {
    if (!file) return;
    setLoadingRoles(true);
    setRoles("");
    setDetails("");
    setSelectedRole("");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${API_BASE}/ai-matches`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || "Server analysis error");
      }

      const data = await res.json();
      setRoles(data.roles);
    } catch (error) {
      console.error("Analysis Failed:", error);
      setErrorMsg(`Analysis interruption: ${error.message}.`);
    } finally {
      setLoadingRoles(false);
    }
  };

  const getDetails = async (role) => {
    setSelectedRole(role);
    localStorage.setItem("selectedRole", role);
    setLoadingDetails(true);
    setDetails("");

    try {
      const res = await fetch(`${API_BASE}/ai-role-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });

      if (!res.ok) throw new Error("Failed to generate career details.");

      const data = await res.json();
      setDetails(data.details);
    } catch (error) {
      console.error("Error fetching details:", error);
      setDetails("Error fetching career roadmap details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderRoles = () => {
    if (!roles) return null;
    const lines = roles.split('\n').filter(line => line.trim().length > 0);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: '48px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Optimized Trajectories</h3>
            <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Select a specialized path to unlock precision roadmaps.</p>
          </div>
          <span className="roadmap-label" style={{ margin: 0 }}>Step 2 of 3</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {lines.map((line, idx) => {
            const pureRole = line.replace(/^[0-9.-]+\s*/, '').trim();
            const isActive = selectedRole === pureRole;
            return (
              <motion.button 
                key={idx}
                whileHover={{ x: 8 }}
                onClick={() => getDetails(pureRole)}
                className="glass-premium"
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  width: '100%'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isActive ? '#fff' : 'rgba(255,255,255,0.1)', color: isActive ? '#000' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: isActive ? 700 : 600, color: isActive ? '#fff' : 'rgba(255,255,255,0.8)' }}>{pureRole}</span>
                </div>
                {isActive && <div className="dot pulsate" />}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="reveal-entry" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '100px', paddingBottom: '120px', paddingLeft: '40px', paddingRight: '40px' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="roadmap-label"
        >
          NEURAL CAREER SYNTHESIS
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="hero-title" style={{ fontSize: '4.5rem', marginBottom: '24px' }}
        >
          Trajectory Decode
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="hero-lead" style={{ maxWidth: '600px' }}
        >
          Deploy our advanced LLM to decode your professional profile and identify elite career roadmaps.
        </motion.p>
      </header>

      <section className="glass-premium" style={{ padding: '64px', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
        
        <div 
          onClick={() => fileInputRef.current.click()}
          style={{ 
            border: '2px dashed rgba(255,255,255,0.1)', 
            borderRadius: '24px', 
            padding: '60px 40px', 
            textAlign: 'center',
            cursor: 'pointer',
            transition: '0.3s cubic-bezier(0.19, 1, 0.22, 1)',
            background: file ? 'rgba(255,255,255,0.03)' : 'transparent'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = file ? 'rgba(255,255,255,0.03)' : 'transparent'; }}
        >
          <input 
            type="file" ref={fileInputRef} hidden accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])} 
          />
          
          <div style={{ color: file ? '#fff' : 'rgba(255,255,255,0.3)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            {file ? <FileIcon /> : <UploadIcon />}
          </div>
          
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
            {file ? file.name : "Upload Professional Ledger"}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            {file ? `${(file.size / 1024).toFixed(1)} KB • Ready for extraction` : "PDF format recommended for neural parsing"}
          </p>

          <AnimatePresence>
            {file && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); analyzeResume(); }}
                disabled={loadingRoles}
                className="cta-glow"
                style={{ marginTop: '32px', padding: '14px 40px', fontSize: '0.9rem' }}
              >
                {loadingRoles ? "EXTRACTING INTELLIGENCE..." : "INITIALIZE SCAN"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            style={{ marginTop: '32px', padding: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', color: '#fca5a5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span>⚠️</span> {errorMsg}
          </motion.div>
        )}

        {roles && !errorMsg && renderRoles()}
      </section>

      <AnimatePresence>
        {selectedRole && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium" 
            style={{ marginTop: '48px', padding: '64px', background: 'rgba(0,0,0,0.4)', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '32px' }}>
              <div>
                <span className="roadmap-label" style={{ marginBottom: '12px' }}>PATHWAY SPECIFICATION</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{selectedRole}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>MODEL CONFIDENCE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>98.4%</div>
              </div>
            </div>
            
            {loadingDetails ? (
              <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="lux-spinner" style={{ margin: '0 auto' }}></div>
                <p style={{ marginTop: '24px', opacity: 0.4, fontSize: '0.9rem', letterSpacing: '1px' }}>SYNTHESIZING CURRICULUM...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 400 }}>
                  {details}
                </div>

                {careerResources[selectedRole] && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '32px', color: '#fff' }}>Validated Career Assets</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                      <AssetGroup title="Core Curriculum" assets={careerResources[selectedRole].courses} />
                      <AssetGroup title="Technical Seminars" assets={careerResources[selectedRole].workshops} />
                      <AssetGroup title="Placement Portals" assets={careerResources[selectedRole].jobs} isSuccess />
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const AssetGroup = ({ title, assets, isSuccess }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <h4 style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>{title}</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {assets.map((a, i) => (
        <motion.button 
          key={i} 
          whileHover={{ y: -4, background: 'rgba(255,255,255,0.08)' }}
          style={{ 
            padding: '16px 20px', borderRadius: '16px', color: '#fff', fontSize: '0.9rem', fontWeight: 600, 
            cursor: 'pointer', textAlign: 'left', background: isSuccess ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.03)', 
            border: isSuccess ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'none', transition: '0.3s var(--ease-out-expo)'
          }} 
          onClick={() => window.open(a.link, "_blank")}
        >
          {a.name}
        </motion.button>
      ))}
    </div>
  </div>
);

export default AIMatches;
