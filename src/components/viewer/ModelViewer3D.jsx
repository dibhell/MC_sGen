import React, { useEffect, useRef, useState } from 'react';
import {
  SkinViewer,
  WalkingAnimation,
  RunningAnimation,
  FlyingAnimation,
  IdleAnimation
} from 'skinview3d';
import { Camera, Play, Pause, RotateCw, Sparkles, Footprints, Flame, Plane, SunMedium } from 'lucide-react';
import { motion } from 'framer-motion';

export const ModelViewer3D = ({ skinCanvas, modelType = 'default' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const [activeAnim, setActiveAnim] = useState('walk');
  const [isRotating, setIsRotating] = useState(true);
  const [lightIntensity, setLightIntensity] = useState('high');

  // Inicjalizacja skinview3d
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 320;
    const height = containerRef.current.clientHeight || 420;

    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: width,
      height: height,
      model: modelType === 'slim' ? 'slim' : 'default'
    });

    viewer.camera.position.set(0, 0, 42);
    viewer.fov = 70;
    viewer.autoRotate = true;
    viewer.autoRotateSpeed = 1.0;

    // Default animation: Walking
    const walkAnim = new WalkingAnimation();
    walkAnim.speed = 0.8;
    viewer.animation = walkAnim;

    viewerRef.current = viewer;

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current && viewerRef.current) {
          const newW = entry.contentRect.width;
          const newH = entry.contentRect.height;
          viewerRef.current.width = newW;
          viewerRef.current.height = newH;
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      viewer.dispose();
      viewerRef.current = null;
    };
  }, []);

  // Update skin texture when skinCanvas or modelType changes
  useEffect(() => {
    if (!viewerRef.current || !skinCanvas) return;
    try {
      const dataUrl = skinCanvas.toDataURL('image/png');
      viewerRef.current.loadSkin(dataUrl, {
        model: modelType === 'slim' ? 'slim' : 'default'
      });
    } catch (err) {
      console.error('Błąd ładowania tekstury do widoku 3D:', err);
    }
  }, [skinCanvas, modelType]);

  // Handle animation change
  const setAnimation = (type) => {
    if (!viewerRef.current) return;
    setActiveAnim(type);

    if (type === 'none') {
      viewerRef.current.animation = null;
    } else if (type === 'idle') {
      const anim = new IdleAnimation();
      anim.speed = 0.8;
      viewerRef.current.animation = anim;
    } else if (type === 'walk') {
      const anim = new WalkingAnimation();
      anim.speed = 0.8;
      viewerRef.current.animation = anim;
    } else if (type === 'run') {
      const anim = new RunningAnimation();
      anim.speed = 1.2;
      viewerRef.current.animation = anim;
    } else if (type === 'fly') {
      const anim = new FlyingAnimation();
      anim.speed = 1.0;
      viewerRef.current.animation = anim;
    }
  };

  // Toggle rotation
  const toggleRotate = () => {
    if (!viewerRef.current) return;
    const newState = !isRotating;
    setIsRotating(newState);
    viewerRef.current.autoRotate = newState;
  };

  // Capture 3D screenshot
  const takeScreenshot = () => {
    if (!viewerRef.current) return;
    try {
      viewerRef.current.render();
      const dataUrl = viewerRef.current.canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `minecraft_character_3d_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Błąd zrzutu ekranu 3D:', err);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* Modern 3D Stage Pedestal Background Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full bg-gradient-to-b from-cyan-500/10 to-emerald-500/5 blur-2xl" />
          <div className="absolute bottom-6 w-44 h-12 rounded-[50%] bg-emerald-500/20 blur-md border border-emerald-400/30" />
        </div>

        {/* The WebGL Canvas */}
        <canvas ref={canvasRef} className="z-10 w-full h-full block" />

        {/* Floating Quick Action: 3D Snapshot */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={takeScreenshot}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 shadow-lg backdrop-blur-md transition-all"
          title="Pobierz zdjęcie 3D w przezroczystym PNG"
        >
          <Camera className="w-4 h-4" />
        </motion.button>

        {/* Floating Rotate Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRotate}
          className={`absolute top-4 left-4 z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all shadow-lg ${
            isRotating
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'bg-neutral-900/80 border-white/10 text-neutral-400'
          }`}
          title={isRotating ? 'Zatrzymaj obracanie' : 'Włącz obracanie 360°'}
        >
          <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </motion.button>
      </div>

      {/* Animation Control Bar */}
      <div className="w-full px-4 pb-4 pt-1 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap z-20">
        <button
          onClick={() => setAnimation('walk')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            activeAnim === 'walk'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 scale-105'
              : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 border border-white/10'
          }`}
        >
          <Footprints className="w-3.5 h-3.5" />
          <span>Chód</span>
        </button>

        <button
          onClick={() => setAnimation('run')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            activeAnim === 'run'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 scale-105'
              : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 border border-white/10'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Bieg</span>
        </button>

        <button
          onClick={() => setAnimation('fly')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            activeAnim === 'fly'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 scale-105'
              : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 border border-white/10'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>Lot</span>
        </button>

        <button
          onClick={() => setAnimation('idle')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            activeAnim === 'idle'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25 scale-105'
              : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 border border-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Spoczynek</span>
        </button>

        <button
          onClick={() => setAnimation('none')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            activeAnim === 'none'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105'
              : 'bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-400 border border-white/10'
          }`}
          title="Pauza / Stop klatka"
        >
          <Pause className="w-3.5 h-3.5" />
          <span>Pauza</span>
        </button>
      </div>
    </div>
  );
};
