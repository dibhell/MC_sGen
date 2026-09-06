import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundBeams = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial Gradient Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />

      {/* Modern SVG Isometric / Orthogonal Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mc-grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.75"
            />
          </pattern>
          <radialGradient id="grid-mask" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id="fade-mask">
            <rect width="100%" height="100%" fill="url(#grid-mask)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#mc-grid-pattern)"
          mask="url(#fade-mask)"
        />
      </svg>

      {/* Floating Animated Light Beams */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          opacity: [0.3, 0.6, 0.4, 0.3],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          opacity: [0.2, 0.5, 0.3, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-[28rem] h-[28rem] bg-cyan-400/10 rounded-full blur-[120px]"
      />
    </div>
  );
};
