import React from 'react';
import { Sparkles, Check, RefreshCcw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const PhotoPreview = ({ photoUrl, profile, onReset }) => {
  if (!photoUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col sm:flex-row items-center gap-4"
    >
      <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/40 shadow-inner">
        <img
          src={photoUrl}
          alt="Podgląd postaci"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
      </div>

      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
            <Check className="w-3.5 h-3.5 mr-1" />
            Wykryte Cechy Postaci
          </span>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start text-[11px]">
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
            Karnacja: <span className="inline-block w-2.5 h-2.5 rounded-full ml-1 align-middle border border-white/20" style={{ backgroundColor: profile.skinTone }} />
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
            {profile.hairType === 'bald' ? 'Łysina' : 'Włosy'}
          </span>
          {profile.hasGlasses && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
              Okulary 3D
            </span>
          )}
          {profile.hasBeard && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
              Broda
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
            Koszulka: <span className="inline-block w-2.5 h-2.5 rounded-full ml-1 align-middle border border-white/20" style={{ backgroundColor: profile.shirtColor }} />
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
            {profile.pantsType === 'shorts' ? 'Krótkie spodenki' : 'Długie spodnie'}
          </span>
          {profile.shoesType === 'slides' && (
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold">
              Klapki Lidl
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center space-x-1"
        title="Wyczyść zdjęcie"
      >
        <RefreshCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Zmień</span>
      </button>
    </motion.div>
  );
};
