import React, { useState } from 'react';
import {
  User,
  Palette,
  Shirt,
  Watch,
  Sparkles,
  Glasses,
  Smile
} from 'lucide-react';

const SKIN_PRESETS = ['#f5d6c6', '#ecbe9e', '#d69f7e', '#a87355', '#6b442a'];
const SHIRT_PRESETS = ['#eae5dc', '#10b981', '#0284c7', '#e11d48', '#f59e0b', '#18181b'];
const PANTS_PRESETS = ['#7c9cbd', '#1e293b', '#334155', '#3b82f6', '#047857'];

export const CustomizerPanel = ({ profile, onChange }) => {
  const [activeTab, setActiveTab] = useState('character'); // 'character' | 'wardrobe'

  const update = (key, value) => {
    onChange({ ...profile, [key]: value });
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Sub-Navigation Tabs (Minecraft Inventory Style) */}
      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl mc-slot bg-black/40">
        <button
          type="button"
          onClick={() => setActiveTab('character')}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'character'
              ? 'mc-button-3d mc-button-emerald text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Postać & Twarz 3D</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('wardrobe')}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'wardrobe'
              ? 'mc-button-3d mc-button-emerald text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Garderoba Voxelowa</span>
        </button>
      </div>

      {/* TAB 1: POSTAĆ & TWARZ */}
      {activeTab === 'character' && (
        <div className="space-y-3.5">
          {/* Format Modelu (Steve vs Alex) */}
          <div className="p-3.5 rounded-xl mc-slot space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-300 font-mono flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Format Modelu</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {profile.modelType === 'slim' ? 'Alex (3px)' : 'Steve (4px)'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => update('modelType', 'default')}
                className={`py-2 px-3 rounded-lg text-xs mc-button-3d transition-all flex flex-col items-center space-y-0.5 ${
                  profile.modelType === 'default'
                    ? 'mc-button-active'
                    : 'mc-button-stone text-neutral-300'
                }`}
              >
                <span className="font-bold">Klasyczny (Steve)</span>
                <span className="text-[10px] opacity-80 font-mono">Ramiona 4 px</span>
              </button>

              <button
                type="button"
                onClick={() => update('modelType', 'slim')}
                className={`py-2 px-3 rounded-lg text-xs mc-button-3d transition-all flex flex-col items-center space-y-0.5 ${
                  profile.modelType === 'slim'
                    ? 'mc-button-active'
                    : 'mc-button-stone text-neutral-300'
                }`}
              >
                <span className="font-bold">Smukły (Alex)</span>
                <span className="text-[10px] opacity-80 font-mono">Ramiona 3 px</span>
              </button>
            </div>
          </div>

          {/* Karnacja & Presety */}
          <div className="p-3.5 rounded-xl mc-slot space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-300 font-mono flex items-center space-x-1.5">
                <Palette className="w-3.5 h-3.5 text-emerald-400" />
                <span>Odcień Skóry</span>
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.skinTone || '#ecbe9e'}
                  onChange={(e) => update('skinTone', e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                  title="Własny kolor"
                />
                <span className="font-mono text-neutral-300 uppercase font-bold text-[11px]">{profile.skinTone}</span>
              </div>
            </div>

            {/* Quick dye swatches */}
            <div className="flex items-center space-x-2 pt-0.5">
              <span className="text-[10px] text-neutral-400 uppercase font-mono">Szybki wybór:</span>
              <div className="flex items-center space-x-1.5">
                {SKIN_PRESETS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => update('skinTone', color)}
                    className={`w-5 h-5 rounded-sm border transition-transform ${
                      profile.skinTone?.toLowerCase() === color.toLowerCase()
                        ? 'scale-110 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'border-black/50 hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Oczy & Fryzura Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Oczy */}
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between">
              <span className="font-medium text-neutral-300">Kolor oczu:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.eyeColor || '#415f78'}
                  onChange={(e) => update('eyeColor', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <span className="font-mono text-neutral-400 uppercase font-semibold text-[11px]">{profile.eyeColor}</span>
              </div>
            </div>

            {/* Fryzura */}
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between">
              <span className="font-medium text-neutral-300">Fryzura:</span>
              <select
                value={profile.hairType || 'bald'}
                onChange={(e) => update('hairType', e.target.value)}
                className="bg-neutral-900 text-neutral-200 text-xs rounded px-2 py-1 border border-white/15 focus:outline-none focus:border-emerald-400 font-semibold"
              >
                <option value="bald">Łysa głowa</option>
                <option value="short">Krótkie włosy</option>
              </select>
            </div>
          </div>

          {/* Kolor włosów (jeśli nie łysy) */}
          {profile.hairType !== 'bald' && (
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-300">Kolor włosów:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.hairColor || '#3b2f28'}
                  onChange={(e) => update('hairColor', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <span className="font-mono text-neutral-400 uppercase font-semibold text-[11px]">{profile.hairColor}</span>
              </div>
            </div>
          )}

          {/* 3D Okulary & Broda Toggles */}
          <div className="space-y-2 text-xs">
            {/* Okulary 3D */}
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={profile.hasGlasses !== false}
                  onChange={(e) => update('hasGlasses', e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
                />
                <span className="font-semibold text-neutral-200 flex items-center space-x-1.5">
                  <Glasses className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Okulary 3D (druga warstwa)</span>
                </span>
              </label>
              {profile.hasGlasses && (
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={profile.glassesColor || '#1c1c20'}
                    onChange={(e) => update('glassesColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                    title="Kolor oprawek"
                  />
                  <span className="font-mono text-neutral-400 uppercase text-[10px]">{profile.glassesColor}</span>
                </div>
              )}
            </div>

            {/* Broda 3D */}
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={profile.hasBeard !== false}
                  onChange={(e) => update('hasBeard', e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
                />
                <span className="font-semibold text-neutral-200 flex items-center space-x-1.5">
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  <span>Broda & Wąsy 3D</span>
                </span>
              </label>
              {profile.hasBeard && (
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={profile.beardColor || '#ffffff'}
                    onChange={(e) => update('beardColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                    title="Kolor zarostu"
                  />
                  <span className="font-mono text-neutral-400 uppercase text-[10px]">{profile.beardColor}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GARDEROBA */}
      {activeTab === 'wardrobe' && (
        <div className="space-y-3.5">
          {/* Kolor koszulki & Presety */}
          <div className="p-3.5 rounded-xl mc-slot space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-300 font-mono flex items-center space-x-1.5">
                <Shirt className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kolor Koszulki</span>
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.shirtColor || '#eae5dc'}
                  onChange={(e) => update('shirtColor', e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <span className="font-mono text-neutral-300 uppercase font-bold text-[11px]">{profile.shirtColor}</span>
              </div>
            </div>

            {/* Quick dye swatches */}
            <div className="flex items-center space-x-2 pt-0.5">
              <span className="text-[10px] text-neutral-400 uppercase font-mono">Paleta:</span>
              <div className="flex items-center space-x-1.5">
                {SHIRT_PRESETS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => update('shirtColor', color)}
                    className={`w-5 h-5 rounded-sm border transition-transform ${
                      profile.shirtColor?.toLowerCase() === color.toLowerCase()
                        ? 'scale-110 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'border-black/50 hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Wzór koszulki */}
          <div className="p-3 rounded-xl mc-slot flex items-center justify-between text-xs">
            <span className="font-medium text-neutral-300">Wzór nadruku:</span>
            <select
              value={profile.shirtPattern || 'leaves'}
              onChange={(e) => update('shirtPattern', e.target.value)}
              className="bg-neutral-900 text-neutral-200 text-xs rounded px-2.5 py-1 border border-white/15 focus:outline-none focus:border-emerald-400 font-semibold"
            >
              <option value="leaves">Motyw liści oliwnych</option>
              <option value="solid">Jednolity (gładki)</option>
              <option value="stripes">Poziome paski</option>
              <option value="plaid">Kratka / plaid</option>
            </select>
          </div>

          {/* Spodnie & Presety */}
          <div className="p-3.5 rounded-xl mc-slot space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-300 font-mono">Długość & Kolor Spodni</span>
              <select
                value={profile.pantsType || 'shorts'}
                onChange={(e) => update('pantsType', e.target.value)}
                className="bg-neutral-900 text-neutral-200 text-xs rounded px-2 py-0.5 border border-white/15 focus:outline-none focus:border-emerald-400 font-semibold"
              >
                <option value="shorts">Krótkie spodenki</option>
                <option value="long">Długie spodnie</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center space-x-1.5">
                {PANTS_PRESETS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => update('pantsColor', color)}
                    className={`w-5 h-5 rounded-sm border transition-transform ${
                      profile.pantsColor?.toLowerCase() === color.toLowerCase()
                        ? 'scale-110 border-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'border-black/50 hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={profile.pantsColor || '#7c9cbd'}
                  onChange={(e) => update('pantsColor', e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                />
                <span className="font-mono text-neutral-400 uppercase text-[11px] font-semibold">{profile.pantsColor}</span>
              </div>
            </div>
          </div>

          {/* Obuwie & Zegarek Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Obuwie */}
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between">
              <span className="font-medium text-neutral-300">Obuwie:</span>
              <select
                value={profile.shoesType || 'slides'}
                onChange={(e) => update('shoesType', e.target.value)}
                className="bg-neutral-900 text-neutral-200 text-xs rounded px-2 py-1 border border-white/15 focus:outline-none focus:border-emerald-400 font-semibold"
              >
                <option value="slides">Klapki Lidl + Skarpety</option>
                <option value="sneakers">Sneakersy / Trampki</option>
              </select>
            </div>

            {/* Smartwatch 3D */}
            <div className="p-3 rounded-xl mc-slot flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={profile.hasWatch !== false}
                  onChange={(e) => update('hasWatch', e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-neutral-900 border-white/20"
                />
                <span className="font-semibold text-neutral-200 flex items-center space-x-1.5">
                  <Watch className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Smartwatch 3D</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
