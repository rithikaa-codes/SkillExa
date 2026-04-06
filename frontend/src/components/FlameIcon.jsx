import React from "react";
import { motion } from "framer-motion";

const FlameIcon = ({ size = 120 }) => {
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Premium Energy Glow (Subtle Halo) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      {/* Angular High-Performance Lightning Vector */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.15,
          filter: "drop-shadow(0 0 25px rgba(124, 58, 237, 0.8))",
          transition: { duration: 0.3 }
        }}
        style={{
          position: 'relative',
          zIndex: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          width={size * 0.8}
          height={size * 0.8}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* High-Performance Energy Gradient */}
            <linearGradient id="bolt-energy-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22D3EE" />   {/* Tip: Cyan */}
              <stop offset="40%" stopColor="#4F46E5" />  {/* Mid: Indigo */}
              <stop offset="100%" stopColor="#7C3AED" /> {/* Base: Violet */}
            </linearGradient>

            <filter id="bolt-sharp-glow">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Minimal Angular Bolt (Tesla-Inspired Zig-Zag) */}
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="url(#bolt-energy-grad)"
            filter="url(#bolt-sharp-glow)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          
          {/* Internal Reflection Detail (Speeds up visual momentum) */}
          <path
            d="M13 3L6 13H12L11 20L18 10H12L13 3Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default FlameIcon;
