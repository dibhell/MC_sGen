import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, ExternalLink, ShieldCheck, Box } from 'lucide-react';

export const LauncherGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12151f] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 text-neutral-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Box className="w-4 h-4" />
              <span>Instrukcja Instalacji</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Jak prawidłowo wgrać skin do Minecrafta?
            </h2>
            <p className="text-xs text-neutral-400">
              Krok po kroku: od pobrania pliku do gry w Minecraft Java & Bedrock Edition
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">1</span>
                <span>Pobierz plik `.png` z naszej strony</span>
              </div>
              <p className="text-neutral-400 pl-8 leading-relaxed">
                Kliknij przycisk <strong>„Pobierz Skin (.png)”</strong>. Plik ma fabrycznie dokładnie <strong>64×64 piksele</strong> w trybie <strong>PNG-32 (RGBA)</strong> z zachowaną pełną przezroczystością.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono">2</span>
                <span>Uruchom oficjalny Minecraft Launcher</span>
              </div>
              <ul className="list-disc list-inside text-neutral-400 pl-8 space-y-1">
                <li>Wybierz zakładkę <strong>Minecraft: Java Edition</strong> po lewej stronie.</li>
                <li>W górnym menu kliknij zakładkę <strong>Skórki (Skins)</strong>.</li>
                <li>Kliknij przycisk <strong>Nowa skórka (New Skin)</strong>.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono">3</span>
                <span>Wybierz model i wskaż pobrany plik</span>
              </div>
              <ul className="list-disc list-inside text-neutral-400 pl-8 space-y-1">
                <li>
                  Rozmiar gracza: wybierz <strong>Klasyczny / Szeroki (Classic)</strong> (jeśli wygenerowałeś ramiona 4px) lub <strong>Wąski / Slim</strong>.
                </li>
                <li>
                  Kliknij przycisk <strong>Przeglądaj (Browse)</strong> i wskaż pobrany plik <code>skin.png</code>.
                </li>
                <li>
                  Kliknij <strong>Zapisz i użyj (Save & Use)</strong>.
                </li>
              </ul>
            </div>

            {/* Warning Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-amber-200">
              <div className="flex items-center space-x-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Uwaga na programy graficzne (Affinity / Photoshop)!</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-200/90 pl-6">
                Jeśli zechcesz ręcznie edytować plik PNG w programie graficznym, pamiętaj o włączeniu opcji <strong>Transparent Background</strong> i eksporcie do <strong>RGB 8-bit z kanałem Alpha</strong>. Zapisanie pliku na czarnym tle sprawi, że Minecraft zinterpretuje zewnętrzną warstwę 3D jako nieprzejrzystą czarną skorupę, zakrywając całą postać!
              </p>
            </div>
          </div>

          {/* Footer Close */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Rozumiem, zamknij
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
