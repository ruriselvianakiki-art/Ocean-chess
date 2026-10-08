import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BotProfile, GameMode } from '../types/chess';
import { Trophy, RefreshCw, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  winner: 'w' | 'b' | 'draw' | null;
  reason: string;
  gameMode: GameMode;
  botProfile: BotProfile;
  onRematch: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<Props> = ({
  isOpen,
  winner,
  reason,
  gameMode,
  botProfile,
  onRematch,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen && winner === 'w') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#F59E0B', '#38BDF8', '#FEF08A'],
      });
    }
  }, [isOpen, winner]);

  if (!isOpen) return null;

  const isUserWinner = winner === 'w';
  const isDraw = winner === 'draw';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B101D] border-2 border-amber-400 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy / Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="font-display text-2xl font-bold text-amber-300">
            {isDraw
              ? 'Tidal Equilibrium'
              : isUserWinner
              ? 'Oceanic Triumph!'
              : 'Claimed by the Abyss'}
          </h2>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            {reason}
          </p>
        </div>

        {/* Deity Lore Commentary */}
        <div className="bg-[#101726] border border-slate-800 rounded-xl p-3 text-xs text-slate-300 italic">
          {gameMode === 'vs-ai' ? (
            isUserWinner ? (
              `"${botProfile.name}: 'Incredible mastery of the currents. You have proven yourself worthy of the oceanic throne.'"`
            ) : isDraw ? (
              `"${botProfile.name}: 'The tides have balanced. Neither shall drown today.'"`
            ) : (
              `"${botProfile.quote}"`
            )
          ) : (
            'A legendary contest across the fathomless depths has concluded.'
          )}
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={onRematch}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
          >
            Review Board
          </button>
        </div>
      </div>
    </div>
  );
};
