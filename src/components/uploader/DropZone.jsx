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
        className={`relative group cursor-pointer rounded-xl p-5 sm:p-6 transition-all duration-150 flex flex-col items-center justify-center text-center overflow-hidden mc-slot ${
          isDragOver
            ? 'bg-emerald-500/15 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]'
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
          <div className="flex flex-col items-center space-y-3 py-3">
            <Loader2 className="w-9 h-9 text-emerald-400 animate-spin" />
            <div className="text-sm font-bold text-white tracking-wide">
              {analysisStatus || 'Analizowanie sylwetki i cech ubioru...'}
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              [Voxel Segmenter] Próbkowanie bloków kolorów
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2.5">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border-2 border-[#2b3347] flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 group-hover:scale-105 transition-all shadow-md">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-white tracking-tight">
                Przeciągnij i upuść swoje zdjęcie tutaj
              </p>
              <p className="text-xs text-neutral-400">
                lub kliknij plik (albo wklej ze schowka <kbd className="px-1.5 py-0.5 rounded bg-black/70 border border-white/20 text-[10px] font-mono text-emerald-400 font-bold">Ctrl + V</kbd>)
              </p>
            </div>

            <div className="flex items-center space-x-1.5 pt-0.5 text-[10px] font-mono text-neutral-400">
              <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">JPG</span>
              <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">PNG</span>
              <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">WEBP</span>
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
