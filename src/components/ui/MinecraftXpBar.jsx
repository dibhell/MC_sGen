import React from 'react';
import { motion } from 'framer-motion';

export const MinecraftXpBar = ({ progress = 100, level = 30, label = "Poziom Generatora" }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-1 select-none">
      {/* Level Number */}
      <div className="flex items-center space-x-1.5 font-bold font-mono text-xs">
        <span className="text-[#55FF55] drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] text-sm tracking-wider">
          {level}
        </span>
        <span className="text-neutral-400 text-[10px] uppercase tracking-wider font-sans">
          {label}
        </span>
      </div>

      {/* Segmented XP Bar Container */}
      <div className="w-full max-w-md h-3.5 bg-[#090b10] border-2 border-[#1e2330] rounded-sm p-[2px] relative overflow-hidden shadow-inner">
        {/* Fill Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#00AA00] via-[#55FF55] to-[#80FF80] rounded-[1px] relative shadow-[0_0_12px_rgba(85,255,85,0.6)]"
        >
          {/* Subtle segmented lines across bar */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,0,0,0.8) 18px, rgba(0,0,0,0.8) 20px)'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
