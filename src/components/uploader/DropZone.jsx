import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Key, Sparkles, Loader2 } from 'lucide-react';

export const DropZone = ({ onImageSelected, isAnalyzing, analysisStatus }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const fileInputRef = useRef(null);

  // Paste support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) onImageSelected(file, geminiKey);
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [geminiKey, onImageSelected]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length > 0) {
      onImageSelected(e.dataTransfer.files[0], geminiKey);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length > 0) {
      onImageSelected(e.target.files[0], geminiKey);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Drag & Drop Container with Minecraft 3D Inset Slot styling */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer rounded-xl p-6 sm:p-8 transition-all duration-200 flex flex-col items-center justify-center text-center overflow-hidden mc-slot ${
          isDragOver
            ? 'bg-emerald-500/10 border-emerald-400/50 shadow-lg shadow-emerald-500/20 scale-[1.01]'
            : 'hover:bg-neutral-900/90'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {isAnalyzing ? (
          <div className="flex flex-col items-center space-y-3 py-4">
            <Loader2 className="w-10 h-10 text-[#55FF55] animate-spin" />
            <div className="text-sm font-bold text-white tracking-wide">
              {analysisStatus || 'Analizowanie sylwetki i cech ubioru...'}
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              [Voxel Segmenter] Próbkowanie bloków kolorów
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-lg bg-neutral-800 border-2 border-[#3c445c] flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 group-hover:scale-105 transition-all shadow-md">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold text-white">
                Przeciągnij i upuść swoje zdjęcie tutaj
              </p>
              <p className="text-xs text-neutral-400">
                lub kliknij, aby wybrać plik (albo wklej ze schowka <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-[10px] font-mono text-[#55FF55]">Ctrl + V</kbd>)
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-1 text-[11px] font-mono text-neutral-400">
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">.JPG</span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">.PNG</span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">.WEBP</span>
            </div>
          </div>
        )}
      </div>

      {/* Gemini AI Key Toggle */}
      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="self-start text-xs font-medium text-neutral-400 hover:text-emerald-400 transition-colors flex items-center space-x-1.5"
        >
          <Key className="w-3.5 h-3.5 text-cyan-400" />
          <span>{showKeyInput ? 'Ukryj klucz Gemini Vision API' : 'Użyj własnego klucza Gemini AI (opcjonalnie)'}</span>
        </button>

        <AnimatePresence>
          {showKeyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-lg mc-slot space-y-2">
                <div className="flex items-center space-x-2 text-xs text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Darmowy klucz Gemini 1.5 Flash do dokładniejszej analizy wzorów, nadruków i detali:</span>
                </div>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Wklej klucz AIzaSy..."
                  className="w-full px-3 py-1.5 text-xs bg-black/60 rounded border border-white/15 focus:border-emerald-400 focus:outline-none text-white font-mono placeholder:text-neutral-600"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
