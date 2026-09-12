import React from 'react';
import { motion } from 'framer-motion';

export const MinecraftXpBar = ({
  progress = 100,
  level = 30,
  label = "Poziom Generatora",
  status = null,
  isActive = false
}) => {
  const displayText = status || label;

  return (
    <div className="w-full flex flex-col items-center space-y-1.5 select-none">
      {/* Level Number & Status Text */}
      <div className="flex items-center justify-between w-full max-w-md px-1 text-xs">
        <div className="flex items-center space-x-2">
          <span
            className="text-[#55FF55] font-black font-mono text-base tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
            style={{
              textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
            }}
          >
            {level}
          </span>
          <span className="text-[11px] font-mono tracking-wide text-neutral-300 font-semibold truncate max-w-[260px] sm:max-w-xs">
            {displayText}
          </span>
        </div>

        {isActive && (
          <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AI SCAN</span>
          </span>
        )}
      </div>

      {/* Segmented XP Bar Container */}
      <div className="w-full max-w-md h-3 bg-[#080a0e] border-2 border-[#1a1f2c] rounded-sm p-[1px] relative overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
        {/* Fill Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#00aa00] via-[#55ff55] to-[#a3ffa3] rounded-[1px] relative shadow-[0_0_10px_rgba(85,255,85,0.7)]"
        >
          {/* Authentic segmented notch lines across bar */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0,0,0,0.85) 16px, rgba(0,0,0,0.85) 18px)'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
