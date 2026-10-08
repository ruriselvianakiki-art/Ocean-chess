import React from 'react';
import { OCEANIC_PUZZLES } from '../utils/chessEngine';
import { OceanicPuzzle } from '../types/chess';
import { X, Award, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPuzzle: (puzzle: OceanicPuzzle) => void;
  activePuzzleId?: string;
}

export const PuzzlesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectPuzzle,
  activePuzzleId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B101D] border-2 border-amber-400/70 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-lg font-bold text-amber-200">
              Trials of the Oceanic Gods (Chess Puzzles)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 py-3">
          Sharpen your underwater intuition. Each trial tests tactical pattern recognition inspired by oceanic mythology.
        </p>

        {/* Puzzle Cards */}
        <div className="space-y-3">
          {OCEANIC_PUZZLES.map((puzzle) => {
            const isCurrent = activePuzzleId === puzzle.id;
            return (
              <div
                key={puzzle.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-400/10'
                    : 'bg-[#101726] border-slate-800 hover:border-amber-400/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-slate-100">
                      {puzzle.title}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        puzzle.difficulty === 'Easy'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50'
                          : puzzle.difficulty === 'Medium'
                          ? 'bg-amber-950 text-amber-300 border border-amber-700/50'
                          : 'bg-red-950 text-red-300 border border-red-700/50'
                      }`}
                    >
                      {puzzle.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{puzzle.mythos}</p>
                </div>

                <button
                  onClick={() => {
                    onSelectPuzzle(puzzle);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>{isCurrent ? 'Current' : 'Play Trial'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
