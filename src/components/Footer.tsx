import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-amber-500/15 bg-[#05080E] py-8 px-4 sm:px-8 mt-16 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <p className="font-display font-semibold text-slate-200">
            Thalassa Chess · Oceanic God Creature Strategy Game
          </p>
          <p className="text-slate-500">
            Inspired by Poseidon, Amphitrite, the Abyssal Kraken, and timeless maritime mythos.
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-amber-400/80">Rules of FIDE Chess</span>
          <span aria-hidden="true">·</span>
          <span>Web Audio Synthesis</span>
          <span aria-hidden="true">·</span>
          <span>© 2026 Thalassa Chess</span>
        </div>
      </div>
    </footer>
  );
};
