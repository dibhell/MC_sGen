import React from 'react';
import { Check, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const PhotoPreview = ({ photoUrl, profile, onReset }) => {
  if (!photoUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl mc-slot flex flex-col sm:flex-row items-center gap-4"
    >
      <div className="relative w-20 h-24 rounded overflow-hidden border-2 border-[#3c445c] shrink-0 bg-black shadow-inner">
        <img
          src={photoUrl}
          alt="Podgląd postaci"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center font-mono">
            <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Wykryte Cechy Postaci
          </span>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-neutral-300 flex items-center space-x-1.5">
            <span>Karnacja</span>
            <span className="inline-block w-2.5 h-2.5 rounded-sm border border-white/30" style={{ backgroundColor: profile.skinTone }} />
          </span>

          <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-neutral-300">
            {profile.hairType === 'bald' ? 'Łysa głowa' : 'Włosy'}
          </span>

          {profile.hasGlasses && (
            <span className="px-2 py-0.5 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-semibold">
              Okulary 3D
            </span>
          )}

          {profile.hasBeard && (
            <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-neutral-300">
              Broda
            </span>
          )}

          <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-neutral-300 flex items-center space-x-1.5">
            <span>Koszulka</span>
            <span className="inline-block w-2.5 h-2.5 rounded-sm border border-white/30" style={{ backgroundColor: profile.shirtColor }} />
          </span>

          <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-neutral-300">
            {profile.pantsType === 'shorts' ? 'Krótkie spodenki' : 'Długie spodnie'}
          </span>

          {profile.shoesType === 'slides' && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
              Klapki Lidl
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="px-3 py-1.5 rounded-lg mc-button-3d mc-button-stone text-xs text-neutral-300 hover:text-white transition-colors flex items-center space-x-1.5"
        title="Wyczyść zdjęcie"
      >
        <RefreshCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Zmień Zdjęcie</span>
      </button>
    </motion.div>
  );
};
