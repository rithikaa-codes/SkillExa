import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import logoIcon from "./assets/skillexa_icon.png";



// Page Imports
import Welcome from "./pages/Welcome";
import CareerExplorer from "./pages/CareerExplorer";
import FocusTimer from "./pages/FocusTimer";
import Streaks from "./pages/Streaks";
import Resources from "./pages/Resources";
import MockTest from "./pages/MockTest";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import AICoach from "./pages/AICoach";


/* Minimal Toast Component */
const Toast = ({ msg, onSelfDestruct }) => {
  useEffect(() => {
    const timer = setTimeout(onSelfDestruct, 4000);
    return () => clearTimeout(timer);
  }, []);
  return <div className="toast-box">{msg}</div>;
};

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Welcome /></motion.div>} />
        <Route path="/dashboard" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><CareerExplorer /></motion.div>} />
        <Route path="/timer" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><FocusTimer /></motion.div>} />
        <Route path="/streaks" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Streaks /></motion.div>} />
        <Route path="/mock" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><MockTest /></motion.div>} />
        <Route path="/resources" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Resources /></motion.div>} />
        <Route path="/analytics" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Analytics /></motion.div>} />
        <Route path="/login" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Auth defaultMode="login" /></motion.div>} />
        <Route path="/signup" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Auth defaultMode="signup" /></motion.div>} />
        <Route path="/ai-coach" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><AICoach /></motion.div>} />
      </Routes>

    </AnimatePresence>
  );
};

function App() {
  const [toasts, setToasts] = useState([]);
  const addToast = (msg) => setToasts([...toasts, { id: Date.now(), msg }]);

  return (
    <Router>
      <div className="app-container">
        <div className="b-blob blob-1"></div>
        <div className="b-blob blob-2"></div>

        <div className="toast-container">
          {toasts.map(t => <Toast key={t.id} msg={t.msg} onSelfDestruct={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />)}
        </div>

        <nav className="nav-bar reveal-entry">
          <Link to="/" className="brand">
            <img src={logoIcon} alt="SkillExa Icon" className="brand-logo" />
            <span className="brand-text">SkillExa</span>
          </Link>



          <div className="nav-group">
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}><span>EXPLORE</span></Link>
            <Link to="/timer" style={{ textDecoration: 'none', color: 'inherit' }}><span>FOCUS</span></Link>
            <Link to="/streaks" style={{ textDecoration: 'none', color: 'inherit' }}><span>STREAKS</span></Link>
            <Link to="/mock" style={{ textDecoration: 'none', color: 'inherit' }}><span>DIAGNOSTICS</span></Link>
            <Link to="/analytics" style={{ textDecoration: 'none', color: 'inherit' }}><span>ANALYTICS</span></Link>
            <Link to="/resources" style={{ textDecoration: 'none', color: 'inherit' }}><span>LIBRARY</span></Link>
          </div>
          <div className="auth-group">
            <Link to="/ai-coach" className="nav-link secondary">🤖 AI Career Coach</Link>
            <Link to="/login" className="nav-link secondary">Sign In</Link>
            <Link to="/signup" className="cta-glow">Sign Up</Link>
          </div>
        </nav>


        <main className="display-area">
          <AnimatedRoutes />
        </main>

        <footer style={{ padding: "80px 0", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", width: "100%" }}>
           <p style={{ opacity: 0.2, fontSize: "0.65rem", letterSpacing: '1px' }}>© 2026 SKILLEXA EXCLUSIVE EDITION. ENGINEERED FOR GLOBAL EXCELLENCE.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
