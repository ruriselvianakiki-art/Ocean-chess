import React from 'react';
import { Sparkles, Waves, Shield, Play } from 'lucide-react';

interface Props {
  onStartPlaying: () => void;
  onExploreCodex: () => void;
}

export const OceanicHero: React.FC<Props> = ({ onStartPlaying, onExploreCodex }) => {
  return (
    <section className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#070B14] mb-8 shadow-2xl">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/ocean_god_leviathan_hero_1791451495674.jpg"
          alt="Majestic Oceanic God Deity Leviathan swimming through crystal deep abyss"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-4">
        {/* Unboxed clean metadata (NO pills) */}
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
          <span>Oceanic Pantheon Strategy</span>
          <span aria-hidden="true">·</span>
          <span>Ambient Web Audio</span>
          <span aria-hidden="true">·</span>
          <span>FIDE Standard Engine</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-wide leading-tight">
          Master the Depths in <span className="text-amber-400">Thalassa Chess</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
          Immerse yourself in a tranquil aquatic sanctuary. Command legendary oceanic god creatures—Poseidon’s Golden Trident, Amphitrite’s Leviathan tidal wave, and the Hippocampus sea stallion—accompanied by soothing ambient ocean wave harmonics.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={onStartPlaying}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Engage the Deities</span>
          </button>

          <button
            onClick={onExploreCodex}
            className="px-4 py-2.5 rounded-xl bg-[#0D1526] hover:bg-[#15203A] border border-amber-400/40 text-amber-300 hover:text-amber-200 font-medium text-xs sm:text-sm transition-colors"
          >
            Explore Creature Codex
          </button>
        </div>
      </div>
    </section>
  );
};
