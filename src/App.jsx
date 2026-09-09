import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { VgpuMinecraftSky } from './components/layout/VgpuMinecraftSky';
import { MinecraftXpBar } from './components/ui/MinecraftXpBar';
import { Footer } from './components/layout/Footer';
import { DropZone } from './components/uploader/DropZone';
import { PhotoPreview } from './components/uploader/PhotoPreview';
import { ModelViewer3D } from './components/viewer/ModelViewer3D';
import { TextureMap2D } from './components/viewer/TextureMap2D';
import { CustomizerPanel } from './components/editor/CustomizerPanel';
import { LauncherGuideModal } from './components/guide/LauncherGuideModal';
import { SkinGenerator } from './core/skinGenerator';
import { ColorExtractor } from './core/colorExtractor';
import { GeminiVision } from './core/geminiVision';
import { Sparkles, Sliders, Box, Layers, HelpCircle, Check, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// Profil startowy (domyślna postać z klapkami Lidl i koszulką w liście)
const DEFAULT_PROFILE = {
  skinTone: '#ecbe9e',
  hairType: 'bald',
  hairColor: '#3b2f28',
  hasBeard: true,
  beardType: 'goatee',
  beardColor: '#ffffff',
  hasGlasses: true,
  glassesColor: '#1a1a1e',
  eyeColor: '#415f78',
  shirtColor: '#eae5dc',
  shirtAccent: '#546948',
  shirtPattern: 'leaves',
  pantsColor: '#7c9cbd',
  pantsType: 'shorts',
  shoesColor: '#0055aa',
  shoesType: 'slides',
  hasWatch: true,
  modelType: 'default'
};

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [skinCanvas, setSkinCanvas] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'uv'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Re-generate skin canvas whenever profile updates
  useEffect(() => {
    const canvas = SkinGenerator.generateCanvas(profile);
    setSkinCanvas(canvas);
  }, [profile]);

  // Handle Photo Upload / Drag & Drop
  const handleImageSelected = useCallback(async (file, geminiKey) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Proszę załadować poprawny plik graficzny (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Url = e.target.result;
      setPhotoUrl(base64Url);
      setIsAnalyzing(true);
      setAnalysisStatus('Segmentowanie sylwetki...');

      try {
        let detected = null;
        if (geminiKey && geminiKey.trim()) {
          setAnalysisStatus('Zaawansowana analiza Gemini Vision AI...');
          detected = await GeminiVision.analyzeWithAI(geminiKey.trim(), base64Url);
        } else {
          setAnalysisStatus('Próbkowanie kolorów twarzy, ubrań i stóp...');
          const img = new Image();
          img.src = base64Url;
          await img.decode();
          detected = ColorExtractor.analyzeImage(img);
        }

        setProfile((prev) => ({ ...prev, ...detected }));
        showToast('Sukces! Skin został wygenerowany ze zdjęcia.');
      } catch (err) {
        console.error('Błąd analizy:', err);
        showToast(`Błąd: ${err.message}`);
      } finally {
        setIsAnalyzing(false);
        setAnalysisStatus('');
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle Download Skin
  const handleDownload = () => {
    if (!skinCanvas) return;
    const link = document.createElement('a');
    link.download = 'skin.png';
    link.href = skinCanvas.toDataURL('image/png');
    link.click();
    showToast('Pobrano skin.png (64×64 px RGBA)');
  };

  // Reset to demo character
  const handleResetDemo = () => {
    setProfile(DEFAULT_PROFILE);
    setPhotoUrl(null);
    showToast('Wczytano przykładową postać');
  };

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <VgpuMinecraftSky />

      <Navbar
        onOpenGuide={() => setIsGuideOpen(true)}
        onResetDemo={handleResetDemo}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl mc-panel-3d text-xs text-neutral-200"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold tracking-wide">WebGPU VGPU Engine + Voxel 3D Generator</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Przekształć Swoje Zdjęcie w{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Skórkę Minecraft
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-400"
          >
            Wgraj zdjęcie portretowe lub sylwetki — aplikacja automatycznie dopasuje odcień skóry, fryzurę, okulary, brodę i ubrania, generując poprawny plik 64×64 PNG-32.
          </motion.p>

          {/* Minecraft Authentic 3D XP Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="pt-2 max-w-lg mx-auto"
          >
            <MinecraftXpBar
              progress={isAnalyzing ? 75 : (photoUrl ? 100 : 35)}
              level={photoUrl ? 64 : 30}
              status={isAnalyzing ? analysisStatus : (photoUrl ? 'SKIN WYGENEROWANY ZE ZDJĘCIA (64×64 PNG-32)' : 'PROFIL DOMYŚLNY • ZAŁADUJ ZDJĘCIE')}
              isActive={isAnalyzing}
            />
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEWA KOLUMNA: Uploader + Edytor (7 kolumn) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Bento Card 1: Wgrywanie zdjęcia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-2xl mc-panel-3d shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono border border-emerald-500/30">1</span>
                  <h2 className="font-bold text-sm sm:text-base text-white">Załaduj Zdjęcie</h2>
                </div>
                <span className="text-[11px] text-emerald-400/80 font-mono tracking-wider uppercase">AI Computer Vision</span>
              </div>

              {photoUrl ? (
                <PhotoPreview
                  photoUrl={photoUrl}
                  profile={profile}
                  onReset={() => setPhotoUrl(null)}
                />
              ) : (
                <DropZone
                  onImageSelected={handleImageSelected}
                  isAnalyzing={isAnalyzing}
                  analysisStatus={analysisStatus}
                />
              )}
            </motion.div>

            {/* Bento Card 2: Panel Personalizacji i Suwaków */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 sm:p-6 rounded-2xl mc-panel-3d shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono border border-cyan-500/30">2</span>
                  <h2 className="font-bold text-sm sm:text-base text-white">Dopracuj Detale (Edytor na żywo)</h2>
                </div>
                <span className="text-[11px] text-neutral-400">Podgląd aktualizuje się natychmiast</span>
              </div>

              <CustomizerPanel
                profile={profile}
                onChange={(newProfile) => setProfile(newProfile)}
              />
            </motion.div>
          </div>

          {/* PRAWA KOLUMNA: Interaktywny Model 3D + Siatka UV (5 kolumn) */}
          <div className="lg:col-span-5 sticky top-20 flex flex-col space-y-6">
            {/* Bento Card 3: Model 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl mc-panel-3d shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header with View Tabs */}
              <div className="px-5 py-3.5 border-b border-black/40 flex items-center justify-between bg-black/40">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-bold font-mono border border-teal-500/30">3</span>
                  <h2 className="font-bold text-sm text-white">Podgląd Modelu 3D</h2>
                </div>

                {/* Tab Switcher: 3D vs 2D */}
                <div className="flex p-1 rounded mc-slot text-xs space-x-1">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'editor'
                        ? 'mc-button-3d mc-button-emerald'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Live</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('uv')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'uv'
                        ? 'mc-button-3d mc-button-emerald'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Siatka 2D</span>
                  </button>
                </div>
              </div>

              {/* Viewer Body */}
              <div className="p-4 sm:p-5 flex flex-col items-center justify-center">
                {activeTab === 'editor' ? (
                  <ModelViewer3D
                    skinCanvas={skinCanvas}
                    modelType={profile.modelType}
                  />
                ) : (
                  <TextureMap2D
                    skinCanvas={skinCanvas}
                    onDownload={handleDownload}
                  />
                )}

                {/* Download CTA (Visible below 3D model) */}
                {activeTab === 'editor' && (
                  <div className="w-full pt-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDownload}
                      className="w-full py-3.5 px-5 rounded-xl font-black text-sm tracking-wider uppercase mc-button-3d mc-button-emerald flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>POBIERZ GOTOWY SKIN (.PNG)</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Helper Card */}
            <div className="p-4 rounded-xl mc-slot flex items-start space-x-3 text-xs text-neutral-300">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                Gotowy plik możesz od razu wgrać w oficjalnym launcherze gry. Masz pytania jak to zrobić? Skorzystaj z przycisku{' '}
                <button
                  onClick={() => setIsGuideOpen(true)}
                  className="text-emerald-400 hover:underline font-bold"
                >
                  Instrukcja Launchera
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Guide Modal */}
      <LauncherGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-emerald-500/40 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl flex items-center space-x-2"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
