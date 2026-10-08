import React from 'react';
import { GameMode, BoardThemeId, PieceSetId } from '../types/chess';
import { Compass, Volume2, Shield } from 'lucide-react';

interface Props {
  gameMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onOpenPuzzles: () => void;
  onOpenCodex: () => void;
  onNewGame: () => void;
}

export const Navbar: React.FC<Props> = ({
  gameMode,
  onSelectMode,
  onOpenPuzzles,
  onOpenCodex,
  onNewGame,
}) => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-amber-500/20 bg-[#070A11]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Brand Wordmark (Single text element in display face) */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectMode('vs-ai');
        }}
        className="text-lg sm:text-xl font-bold tracking-wider font-display text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
      >
        Thalassa Chess
      </a>

      {/* Zone 2: 4-6 Text Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
        <button
          onClick={() => onSelectMode('vs-ai')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            gameMode === 'vs-ai' ? 'text-amber-300 underline underline-offset-4' : ''
          }`}
        >
          Ocean Deities
        </button>
        <button
          onClick={() => onSelectMode('pass-and-play')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            gameMode === 'pass-and-play' ? 'text-amber-300 underline underline-offset-4' : ''
          }`}
        >
          Zen Pass & Play
        </button>
        <button
          onClick={onOpenPuzzles}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            gameMode === 'puzzle' ? 'text-amber-300 underline underline-offset-4' : ''
          }`}
        >
          Divine Trials
        </button>
        <button
          onClick={onOpenCodex}
          className="hover:text-amber-300 transition-colors cursor-pointer"
        >
          Creature Codex
        </button>
      </nav>

      {/* Zone 3: 1-2 Primary Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onNewGame}
          className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm shadow-amber-400/20 transition-colors whitespace-nowrap"
        >
          New Game
        </button>
      </div>
    </header>
  );
};
