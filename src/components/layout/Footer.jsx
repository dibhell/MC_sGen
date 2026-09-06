import React from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#090a0f]/90 py-6 mt-16 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
        <div className="flex items-center space-x-2">
          <span>Stworzone dla społeczności Minecraft</span>
          <span>•</span>
          <span className="flex items-center text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            100% Client-side (Zero uploadu zdjęć na serwer)
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-neutral-500">Format: 64×64 PNG-32 RGBA</span>
          <a
            href="https://github.com/dibhell/MC_sGen"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>dibhell/MC_sGen</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
