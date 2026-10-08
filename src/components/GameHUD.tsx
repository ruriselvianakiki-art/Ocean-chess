import React from 'react';
import { BotProfile, GameMode, TimeControlId } from '../types/chess';
import { PieceIcon } from './OceanicPieces';
import { RefreshCw, RotateCcw, ArrowUpDown, Volume2, VolumeX, Music, Shield } from 'lucide-react';

interface Props {
  currentTurn: 'w' | 'b';
  gameMode: GameMode;
  botProfile: BotProfile;
  whiteTime: number;
  blackTime: number;
  timeControl: TimeControlId;
  capturedWhite: string[]; // Pieces white has lost (black captured)
  capturedBlack: string[]; // Pieces black has lost (white captured)
  materialDiff: number; // Positive = white ahead, Negative = black ahead
  isAIThinking: boolean;
  onReset: () => void;
  onUndo: () => void;
  onFlipBoard: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const GameHUD: React.FC<Props> = ({
  currentTurn,
  gameMode,
  botProfile,
  whiteTime,
  blackTime,
  timeControl,
  capturedWhite,
  capturedBlack,
  materialDiff,
  isAIThinking,
  onReset,
  onUndo,
  onFlipBoard,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const formatTime = (secs: number) => {
    if (timeControl === 'zen') return '∞ Zen';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-[620px] mx-auto space-y-3">
      {/* Black Player Card (Top) */}
      <div
        className={`px-3 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
          currentTurn === 'b'
            ? 'bg-[#101726] border-amber-400 shadow-md shadow-amber-500/10'
            : 'bg-[#0A0E17] border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-500/40 bg-slate-900 shrink-0">
            <img
              src={gameMode === 'vs-ai' ? botProfile.avatar : '/src/assets/images/abyssal_kraken_avatar_1791451533221.jpg'}
              alt={gameMode === 'vs-ai' ? botProfile.name : 'Black Sovereign'}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-semibold text-slate-100">
                {gameMode === 'vs-ai' ? botProfile.name : 'Abyssal Monarch'}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                {gameMode === 'vs-ai' ? `(${botProfile.rating})` : '(1600)'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              {isAIThinking && currentTurn === 'b' ? (
                <span className="text-amber-300 animate-pulse font-medium">Deep tide calculating...</span>
              ) : (
                <span>{gameMode === 'vs-ai' ? botProfile.title : 'Black Challenger'}</span>
              )}
              {materialDiff < 0 && (
                <span className="font-mono text-amber-400 font-semibold">+{Math.abs(materialDiff)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Captured Pieces By Black */}
          <div className="flex items-center -space-x-1 max-w-[120px] overflow-hidden">
            {capturedWhite.slice(0, 7).map((p, idx) => (
              <div key={idx} className="w-5 h-5 opacity-90">
                <PieceIcon type={p} color="w" />
              </div>
            ))}
          </div>

          {/* Timer Clock */}
          <div
            className={`font-mono text-sm px-2.5 py-1 rounded-md border tabular-nums ${
              currentTurn === 'b'
                ? 'bg-amber-400/10 border-amber-400/60 text-amber-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {formatTime(blackTime)}
          </div>
        </div>
      </div>

      {/* Control Quick Actions Bar */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#101726] hover:bg-[#1A2338] border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 transition-colors"
            title="Start New Oceanic Game"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rematch</span>
          </button>
          <button
            onClick={onUndo}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#101726] hover:bg-[#1A2338] border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 transition-colors"
            title="Undo Last Move"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>
          <button
            onClick={onFlipBoard}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#101726] hover:bg-[#1A2338] border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 transition-colors"
            title="Flip Board View"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Flip</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              isMusicPlaying
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-[#101726] border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Oceanic Calming Ambient Music"
          >
            <Music className="w-3.5 h-3.5" />
            <span>{isMusicPlaying ? 'Soundtrack: Playing' : 'Play Song'}</span>
          </button>
        </div>
      </div>

      {/* White Player Card (Bottom) */}
      <div
        className={`px-3 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
          currentTurn === 'w'
            ? 'bg-[#101726] border-amber-400 shadow-md shadow-amber-500/10'
            : 'bg-[#0A0E17] border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-400/60 bg-slate-900 shrink-0">
            <img
              src="/src/assets/images/poseidon_avatar_emblem_1791451510129.jpg"
              alt="Poseidon Sovereign"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-semibold text-amber-300">
                Ocean Sovereign (White)
              </span>
              <span className="text-xs text-amber-400 font-mono">(You)</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>Ruler of the Surface Tides</span>
              {materialDiff > 0 && (
                <span className="font-mono text-amber-400 font-semibold">+{materialDiff}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Captured Pieces By White */}
          <div className="flex items-center -space-x-1 max-w-[120px] overflow-hidden">
            {capturedBlack.slice(0, 7).map((p, idx) => (
              <div key={idx} className="w-5 h-5 opacity-90">
                <PieceIcon type={p} color="b" />
              </div>
            ))}
          </div>

          {/* Timer Clock */}
          <div
            className={`font-mono text-sm px-2.5 py-1 rounded-md border tabular-nums ${
              currentTurn === 'w'
                ? 'bg-amber-400/10 border-amber-400/60 text-amber-300 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {formatTime(whiteTime)}
          </div>
        </div>
      </div>
    </div>
  );
};
