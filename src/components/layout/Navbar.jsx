import React from 'react';
import { Sparkles, BookOpen, Box, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Navbar = ({ onOpenGuide, onResetDemo }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#08090e]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px] shadow-md shadow-emerald-500/20"
          >
            <div className="w-full h-full bg-[#0d0f17] rounded-[7px] flex items-center justify-center">
              <Box className="w-4 h-4 text-emerald-400" />
            </div>
          </motion.div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                MC_sGen
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                v2.0 Pro
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden md:block">
              Generator Skórek Minecraft 64×64 px • WebGL & AI Vision
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onResetDemo}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold mc-button-3d mc-button-stone flex items-center space-x-1.5"
            title="Wczytaj postać z klapkami Lidl i liśćmi"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Przykładowy Skin</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenGuide}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold mc-button-3d mc-button-stone flex items-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Instrukcja Launchera</span>
          </motion.button>

          <a
            href="https://github.com/dibhell/MC_sGen"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg mc-button-3d mc-button-stone text-neutral-300 hover:text-white"
            title="Repozytorium GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
