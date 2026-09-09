import React from 'react';
import {
  User,
  Palette,
  Shirt,
  Watch
} from 'lucide-react';

export const CustomizerPanel = ({ profile, onChange }) => {
  const update = (key, value) => {
    onChange({ ...profile, [key]: value });
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 1. Format Modelu (Steve vs Alex) */}
      <div className="p-4 rounded-xl mc-panel-3d space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
            <User className="w-4 h-4 text-[#55FFFF]" />
            <span>Format Modelu (Steve / Alex)</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => update('modelType', 'default')}
            className={`py-2.5 px-3 rounded text-xs mc-button-3d transition-all flex flex-col items-center space-y-0.5 ${
              profile.modelType === 'default'
                ? 'mc-button-active'
                : 'mc-button-stone text-neutral-400 hover:text-white'
            }`}
          >
            <span className="font-bold">Klasyczny (Steve)</span>
            <span className="text-[10px] text-neutral-300 font-mono">Ramiona 4 px</span>
          </button>

          <button
            type="button"
            onClick={() => update('modelType', 'slim')}
            className={`py-2.5 px-3 rounded text-xs mc-button-3d transition-all flex flex-col items-center space-y-0.5 ${
              profile.modelType === 'slim'
                ? 'mc-button-active'
                : 'mc-button-stone text-neutral-400 hover:text-white'
            }`}
          >
            <span className="font-bold">Smukły (Alex)</span>
            <span className="text-[10px] text-neutral-300 font-mono">Ramiona 3 px</span>
          </button>
        </div>
      </div>

      {/* 2. Głowa, Włosy, Zarost, Okulary */}
      <div className="p-4 rounded-xl mc-panel-3d space-y-4">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
          <Palette className="w-4 h-4 text-[#55FF55]" />
          <span>Głowa & Twarz 3D</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Karnacja */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Odcień skóry:</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={profile.skinTone || '#ecbe9e'}
                onChange={(e) => update('skinTone', e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <span className="font-mono text-neutral-300 uppercase font-bold">{profile.skinTone}</span>
            </div>
          </div>

          {/* Oczy */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Kolor oczu:</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={profile.eyeColor || '#415f78'}
                onChange={(e) => update('eyeColor', e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <span className="font-mono text-neutral-300 uppercase font-bold">{profile.eyeColor}</span>
            </div>
          </div>

          {/* Fryzura */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Fryzura:</span>
            <select
              value={profile.hairType || 'bald'}
              onChange={(e) => update('hairType', e.target.value)}
              className="bg-neutral-900 text-neutral-200 rounded px-2.5 py-1 border border-white/20 focus:outline-none font-semibold"
            >
              <option value="bald">Łysa głowa (czysta skóra)</option>
              <option value="short">Krótkie włosy</option>
            </select>
          </div>

          {/* Kolor włosów (jeśli nie łysy) */}
          {profile.hairType !== 'bald' && (
            <div className="flex items-center justify-between p-2.5 rounded mc-slot">
              <span className="text-neutral-400">Kolor włosów:</span>
              <input
                type="color"
                value={profile.hairColor || '#3b2f28'}
                onChange={(e) => update('hairColor', e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              />
            </div>
          )}

          {/* Okulary 3D */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot col-span-1 sm:col-span-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.hasGlasses !== false}
                onChange={(e) => update('hasGlasses', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
              />
              <span className="text-neutral-200 font-bold">Okulary przeciwsłoneczne / korekcyjne 3D</span>
            </label>
            {profile.hasGlasses && (
              <input
                type="color"
                value={profile.glassesColor || '#1c1c20'}
                onChange={(e) => update('glassesColor', e.target.value)}
                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                title="Kolor oprawek"
              />
            )}
          </div>

          {/* Broda */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot col-span-1 sm:col-span-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.hasBeard !== false}
                onChange={(e) => update('hasBeard', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
              />
              <span className="text-neutral-200 font-bold">Broda i wąsy 3D</span>
            </label>
            {profile.hasBeard && (
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.beardColor || '#f5f5f7'}
                  onChange={(e) => update('beardColor', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                  title="Kolor zarostu"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Tors, Koszulka, Spodenki i Obuwie */}
      <div className="p-4 rounded-xl mc-panel-3d space-y-4">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
          <Shirt className="w-4 h-4 text-[#FFAA00]" />
          <span>Garderoba Voxelowa</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Kolor koszulki */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Kolor koszulki:</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={profile.shirtColor || '#eae5dc'}
                onChange={(e) => update('shirtColor', e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <span className="font-mono text-neutral-300 uppercase font-bold">{profile.shirtColor}</span>
            </div>
          </div>

          {/* Wzór koszulki */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Wzór:</span>
            <select
              value={profile.shirtPattern || 'leaves'}
              onChange={(e) => update('shirtPattern', e.target.value)}
              className="bg-neutral-900 text-neutral-200 rounded px-2.5 py-1 border border-white/20 focus:outline-none font-semibold"
            >
              <option value="leaves">Motyw liści oliwnych</option>
              <option value="solid">Jednolity (gładki)</option>
              <option value="stripes">Poziome paski</option>
              <option value="plaid">Kratka / plaid</option>
            </select>
          </div>

          {/* Spodnie */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Długość spodni:</span>
            <select
              value={profile.pantsType || 'shorts'}
              onChange={(e) => update('pantsType', e.target.value)}
              className="bg-neutral-900 text-neutral-200 rounded px-2.5 py-1 border border-white/20 focus:outline-none font-semibold"
            >
              <option value="shorts">Krótkie spodenki (gołe kolana)</option>
              <option value="long">Długie spodnie</option>
            </select>
          </div>

          {/* Kolor spodni */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Kolor spodni:</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={profile.pantsColor || '#7c9cbd'}
                onChange={(e) => update('pantsColor', e.target.value)}
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <span className="font-mono text-neutral-300 uppercase font-bold">{profile.pantsColor}</span>
            </div>
          </div>

          {/* Obuwie */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <span className="text-neutral-400">Obuwie:</span>
            <select
              value={profile.shoesType || 'slides'}
              onChange={(e) => update('shoesType', e.target.value)}
              className="bg-neutral-900 text-neutral-200 rounded px-2.5 py-1 border border-white/20 focus:outline-none font-semibold"
            >
              <option value="slides">Klapki Lidl + Czarne skarpety</option>
              <option value="sneakers">Trampki / Sneakersy</option>
            </select>
          </div>

          {/* Zegarek / Smartwatch */}
          <div className="flex items-center justify-between p-2.5 rounded mc-slot">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.hasWatch !== false}
                onChange={(e) => update('hasWatch', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
              />
              <span className="text-neutral-200 font-bold">Smartwatch 3D</span>
            </label>
            <Watch className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
