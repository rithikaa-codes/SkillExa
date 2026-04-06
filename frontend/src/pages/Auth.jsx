import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";
import "../App.css";


const Auth = ({ defaultMode = "login" }) => {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setMsg("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    try {
      const resp = await fetch(`${API_BASE}${endpoint}`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();
      
      if (resp.ok) {
        setMsg(data.message || "Authorization Successful.");
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("user_profile", JSON.stringify(data.user));
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMsg(data.error || "Authorization protocol mismatch.");
      }
    } catch (err) {
      setMsg("SkillExa Protocol Offline - Check backend connection.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="auth-view glass-premium reveal-entry">
      <div className="auth-card">
        <motion.h2 
          key={isLogin ? "login-h" : "signup-h"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="auth-title"
        >
          {isLogin ? "Welcome Back" : "Begin Your Legacy"}
        </motion.h2>
        <p className="auth-lead">
          {isLogin ? "Enter your credentials to access your portal." : "Join the world's most elite career planning ecosystem."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="input-group"
              >
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="palette-input premium-field" 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={handleChange}
              className="palette-input premium-field" 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleChange}
              className="palette-input premium-field" 
            />
          </div>

          <button type="submit" className="cta-glow auth-btn" disabled={loading}>
            {loading ? "Authenticating..." : (isLogin ? "Authorized Access" : "Initialize Account")}
          </button>
        </form>

        {msg && <p className={`auth-msg ${msg.toLowerCase().includes("success") ? "success" : "error"}`}>{msg}</p>}

        <p className="auth-footer">
          {isLogin ? "New to SkillExa?" : "Already engineered an account?"} 
          <span onClick={handleToggle} className="auth-toggle"> {isLogin ? "Create Profile" : "Sign In"}</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
