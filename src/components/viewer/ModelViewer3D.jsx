import React, { useEffect, useRef, useState } from 'react';
import {
  SkinViewer,
  WalkingAnimation,
  RunningAnimation,
  FlyingAnimation,
  IdleAnimation
} from 'skinview3d';
import { Camera, RotateCw, Footprints, Flame, Plane, Sparkles, Pause, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildVoxelPedestal } from './voxelBlocks';

export const ModelViewer3D = ({ skinCanvas, modelType = 'default' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const pedestalRef = useRef(null);
  const [activeAnim, setActiveAnim] = useState('walk');
  const [isRotating, setIsRotating] = useState(true);
  const [pedestalType, setPedestalType] = useState('grass'); // 'grass' | 'diamond' | 'obsidian'

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

    // Domyślna animacja: Walking
    const walkAnim = new WalkingAnimation();
    walkAnim.speed = 0.8;
    viewer.animation = walkAnim;

    // Dodanie trójwymiarowego bloku pod stopy postaci
    try {
      const pedestal = buildVoxelPedestal(pedestalType);
      viewer.playerObject.add(pedestal);
      pedestalRef.current = pedestal;
    } catch (e) {
      console.warn('Nie udało się dodać podestu 3D:', e);
    }

    viewerRef.current = viewer;

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current && viewerRef.current) {
          viewerRef.current.width = entry.contentRect.width;
          viewerRef.current.height = entry.contentRect.height;
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

  // Aktualizacja podestu 3D po zmianie motywu bloku
  useEffect(() => {
    if (!viewerRef.current?.playerObject) return;
    try {
      if (pedestalRef.current) {
        viewerRef.current.playerObject.remove(pedestalRef.current);
      }
      const newPedestal = buildVoxelPedestal(pedestalType);
      viewerRef.current.playerObject.add(newPedestal);
      pedestalRef.current = newPedestal;
    } catch (e) {
      console.warn('Błąd zmiany podestu:', e);
    }
  }, [pedestalType]);

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
        {/* Subtle Ambient Minecraft lighting glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full bg-gradient-to-b from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl" />
        </div>

        {/* The WebGL Canvas */}
        <canvas ref={canvasRef} className="z-10 w-full h-full block" />

        {/* Top Controls: 3D Snapshot & Rotate */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          <button
            onClick={takeScreenshot}
            className="p-2.5 rounded-lg mc-button-3d mc-button-stone text-neutral-300 hover:text-white"
            title="Pobierz zdjęcie 3D w przezroczystym PNG"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={toggleRotate}
            className={`p-2.5 rounded-lg mc-button-3d ${
              isRotating ? 'mc-button-emerald' : 'mc-button-stone text-neutral-400'
            }`}
            title={isRotating ? 'Zatrzymaj obracanie' : 'Włącz obracanie 360°'}
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '7s' }} />
          </button>
        </div>

        {/* Pedestal Selector floating at bottom of 3D frame */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-1.5 p-1 rounded-md bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setPedestalType('grass')}
            className={`px-2 py-1 rounded transition-all ${
              pedestalType === 'grass' ? 'bg-[#5c8e32] text-white shadow-sm font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🌱 Trawa
          </button>
          <button
            type="button"
            onClick={() => setPedestalType('diamond')}
            className={`px-2 py-1 rounded transition-all ${
              pedestalType === 'diamond' ? 'bg-[#2de4df] text-black shadow-sm font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            💎 Diament
          </button>
          <button
            type="button"
            onClick={() => setPedestalType('obsidian')}
            className={`px-2 py-1 rounded transition-all ${
              pedestalType === 'obsidian' ? 'bg-[#3c2b69] text-white shadow-sm font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🟣 Obsydian
          </button>
        </div>
      </div>

      {/* 3D Minecraft Animation Control Bar */}
      <div className="w-full px-4 pb-4 pt-2 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap z-20">
        <button
          onClick={() => setAnimation('walk')}
          className={`px-3 py-1.5 rounded-lg text-xs mc-button-3d flex items-center space-x-1.5 ${
            activeAnim === 'walk' ? 'mc-button-emerald' : 'mc-button-stone'
          }`}
        >
          <Footprints className="w-3.5 h-3.5" />
          <span>Chód</span>
        </button>

        <button
          onClick={() => setAnimation('run')}
          className={`px-3 py-1.5 rounded-lg text-xs mc-button-3d flex items-center space-x-1.5 ${
            activeAnim === 'run' ? 'mc-button-emerald' : 'mc-button-stone'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Bieg</span>
        </button>

        <button
          onClick={() => setAnimation('fly')}
          className={`px-3 py-1.5 rounded-lg text-xs mc-button-3d flex items-center space-x-1.5 ${
            activeAnim === 'fly' ? 'mc-button-emerald' : 'mc-button-stone'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>Lot</span>
        </button>

        <button
          onClick={() => setAnimation('idle')}
          className={`px-3 py-1.5 rounded-lg text-xs mc-button-3d flex items-center space-x-1.5 ${
            activeAnim === 'idle' ? 'mc-button-emerald' : 'mc-button-stone'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Spoczynek</span>
        </button>

        <button
          onClick={() => setAnimation('none')}
          className={`px-3 py-1.5 rounded-lg text-xs mc-button-3d flex items-center space-x-1.5 ${
            activeAnim === 'none' ? 'mc-button-active' : 'mc-button-stone text-neutral-400'
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
