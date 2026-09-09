import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const VgpuMinecraftSky = () => {
  const canvasRef = useRef(null);
  const [hasWebGpu, setHasWebGpu] = useState(false);
  const [gpuReady, setGpuReady] = useState(false);

  useEffect(() => {
    let disposeLoop = null;
    let activeGpu = null;
    let isCancelled = false;

    async function setupVgpu() {
      // Check if WebGPU is available in browser
      if (!navigator.gpu) {
        console.info('[MC_sGen] WebGPU nie jest obsługiwane w tej przeglądarce - używam fallbacku CSS/Canvas.');
        return;
      }

      try {
        const { init, effect, surface, clock, frameLoop } = await import('vgpu');
        
        if (isCancelled || !canvasRef.current) return;

        const gpu = await init();
        if (isCancelled || !canvasRef.current) {
          gpu.dispose();
          return;
        }

        activeGpu = gpu;
        setHasWebGpu(true);

        const canvas = canvasRef.current;
        const canvasSurface = surface(gpu, canvas, { dpr: [1, 1.5] });

        // WGSL Shader for dynamic 3D Minecraft voxel atmosphere
        const WGSL_SHADER = `
          struct Params {
            time: f32,
            pad0: f32,
            resolution: vec2f,
          }

          @group(0) @binding(0) var<uniform> params: Params;

          fn hash2(p: vec2f) -> f32 {
            let p2 = fract(p * vec2f(123.34, 456.21));
            return fract(sin(dot(p2, vec2f(12.9898, 78.233))) * 43758.5453);
          }

          @fragment
          fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
            let t = params.time * 0.12;
            
            // Voxel block grid quantization (authentic Minecraft 16px pixelation)
            let pixelBlocks = 96.0;
            let buv = floor(uv * pixelBlocks) / pixelBlocks;
            
            // Atmospheric gradient (Deep twilight Minecraft sky)
            let skyTop = vec3f(0.04, 0.05, 0.08);     // #0a0d14
            let skyMid = vec3f(0.06, 0.12, 0.15);     // Cyan-emerald twilight
            let skyHorizon = vec3f(0.08, 0.16, 0.14); // Minecraft foliage green tint
            
            var col = mix(skyHorizon, skyTop, clamp(uv.y * 1.3 - 0.1, 0.0, 1.0));
            col = mix(col, skyMid, sin(uv.y * 3.1415) * 0.25);

            // 1. Voxel 3D clouds drifting overhead
            if (buv.y > 0.25 && buv.y < 0.75) {
              let cloudScale = vec2f(10.0, 5.0);
              let cloudCoord = (buv + vec2f(t * 0.08, 0.0)) * cloudScale;
              let cloudCell = floor(cloudCoord);
              let h = hash2(cloudCell);
              
              if (h > 0.62) {
                let cloudEdge = fract(cloudCoord.y);
                var cloudCol = vec3f(0.12, 0.16, 0.24); // cloud base shade
                if (cloudEdge > 0.35) {
                  cloudCol = vec3f(0.24, 0.32, 0.42); // cloud lit top
                }
                let alpha = smoothstep(0.62, 0.85, h) * 0.35;
                col = mix(col, cloudCol, alpha);
              }
            }

            // 2. Minecraft square voxel stars
            let starGrid = floor(uv * 50.0);
            let sh = hash2(starGrid);
            if (sh > 0.982 && uv.y > 0.35) {
              let twinkle = sin(params.time * 3.0 + sh * 20.0) * 0.5 + 0.5;
              let starCol = mix(vec3f(0.3, 0.9, 0.7), vec3f(0.4, 0.7, 1.0), sh);
              col += starCol * twinkle * 0.45;
            }

            // 3. Subtle isometric voxel ground horizon grid
            if (uv.y < 0.25) {
              let groundCoord = floor(uv * vec2f(64.0, 32.0));
              let gh = hash2(groundCoord);
              let blockShade = mix(0.85, 1.15, gh * 0.3);
              col *= blockShade;
            }

            return vec4f(col, 1.0);
          }
        `;

        const skyEffect = effect(gpu, WGSL_SHADER, {
          set: {
            params: {
              time: 0,
              pad0: 0,
              resolution: [canvas.width || 800, canvas.height || 600]
            }
          }
        });

        const timeTracker = clock(gpu);

        disposeLoop = frameLoop(gpu, (frame) => {
          skyEffect.set({
            params: {
              time: timeTracker.time,
              pad0: 0,
              resolution: [canvas.width || 800, canvas.height || 600]
            }
          });
          frame.pass(canvasSurface, skyEffect);
        });

        setGpuReady(true);
      } catch (err) {
        console.warn('[MC_sGen] Inicjalizacja vgpu WebGPU nie powiodła się, przełączam na fallback:', err);
      }
    }

    setupVgpu();

    return () => {
      isCancelled = true;
      if (disposeLoop) disposeLoop();
      if (activeGpu) activeGpu.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. vgpu WebGPU Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          gpuReady ? 'opacity-80' : 'opacity-0'
        }`}
      />

      {/* 2. Minecraft 3D Voxel Atmosphere CSS Fallback / Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090b12] via-[#0d121c]/80 to-[#080a0f] pointer-events-none" />

      {/* Ambient Voxel Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />

      {/* 3. Minecraft 3D Isometric Voxel Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.14]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mc-voxel-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(16, 185, 129, 0.4)"
              strokeWidth="0.8"
            />
            <rect x="0" y="0" width="4" height="4" fill="rgba(6, 182, 212, 0.4)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mc-voxel-grid)" />
      </svg>

      {/* WebGPU Status Indicator Pill */}
      <div className="absolute bottom-3 left-4 z-20 hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-400">
        <span className={`w-2 h-2 rounded-full ${gpuReady ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-500'}`} />
        <span>{gpuReady ? 'Silnik: vgpu (WebGPU Aktywne)' : 'Silnik: WebGPU / Canvas 3D'}</span>
      </div>
    </div>
  );
};
