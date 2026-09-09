import React, { useEffect, useRef } from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TextureMap2D = ({ skinCanvas, onDownload }) => {
  const previewCanvasRef = useRef(null);

  useEffect(() => {
    if (!skinCanvas || !previewCanvasRef.current) return;
    const ctx = previewCanvasRef.current.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, 192, 192);
    ctx.drawImage(skinCanvas, 0, 0, 192, 192);
  }, [skinCanvas]);

  const handleDownloadClick = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#3b82f6']
      });
    } catch (e) {}

    onDownload();
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* 2D Canvas with Inset Minecraft Slot Border & Transparency Grid */}
      <div className="relative group p-2.5 rounded-lg mc-slot shadow-inner">
        <div
          className="relative rounded overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #181b24 25%, transparent 25%), 
              linear-gradient(-45deg, #181b24 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #181b24 75%), 
              linear-gradient(-45deg, transparent 75%, #181b24 75%)
            `,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
            backgroundColor: '#0f121a'
          }}
        >
          <canvas
            ref={previewCanvasRef}
            width={192}
            height={192}
            className="pixelated block cursor-crosshair w-44 h-44 sm:w-48 sm:h-48"
            title="Siatka UV 64x64 px (skalowana bez rozmycia)"
          />
        </div>

        <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-neutral-900 border border-white/20 text-[10px] font-mono text-[#55FF55] font-bold shadow-md">
          64 × 64 px
        </div>
      </div>

      {/* Verified RGBA Badge */}
      <div className="flex items-center space-x-1.5 text-xs text-neutral-300 bg-black/50 px-3 py-1.5 rounded border border-white/10">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Gwarancja <strong>PNG-32 (RGBA)</strong> z kanałem Alpha</span>
      </div>

      {/* Download Action Button in 3D Minecraft Style */}
      <button
        onClick={handleDownloadClick}
        className="w-full py-3 px-5 rounded-lg text-sm mc-button-3d mc-button-emerald flex items-center justify-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Pobierz Skin (.png)</span>
      </button>
    </div>
  );
};
