import React from 'react';
import { AIDifficulty, BoardThemeId, TimeControlId, GameMode } from '../types/chess';
import { BOT_PROFILES, BOARD_THEMES } from '../utils/chessEngine';
import { Bot, Clock, Palette, Sparkles } from 'lucide-react';

interface Props {
  gameMode: GameMode;
  difficulty: AIDifficulty;
  onSelectDifficulty: (d: AIDifficulty) => void;
  timeControl: TimeControlId;
  onSelectTimeControl: (t: TimeControlId) => void;
  boardThemeId: BoardThemeId;
  onSelectBoardTheme: (t: BoardThemeId) => void;
}

export const GameSettingsBar: React.FC<Props> = ({
  gameMode,
  difficulty,
  onSelectDifficulty,
  timeControl,
  onSelectTimeControl,
  boardThemeId,
  onSelectBoardTheme,
}) => {
  return (
    <div className="w-full max-w-[620px] mx-auto bg-[#090D18] border border-amber-500/20 rounded-xl p-3 space-y-3 text-xs">
      {/* Bot Difficulty (When in vs-ai mode) */}
      {gameMode === 'vs-ai' && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>Ocean Deity Opponent</span>
            </span>
            <span className="text-[11px] text-amber-400/90 font-mono">
              {BOT_PROFILES[difficulty].title}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#060910] rounded-lg border border-slate-800">
            {(['initiate', 'seer', 'kraken', 'poseidon'] as AIDifficulty[]).map((key) => {
              const b = BOT_PROFILES[key];
              const isActive = difficulty === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelectDifficulty(key)}
                  className={`py-1.5 px-2 rounded-md font-medium text-center transition-all truncate ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title={`${b.name} (${b.rating})`}
                >
                  <span className="whitespace-nowrap">{b.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Row for Time Control and Board Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800/60">
        {/* Time Control */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Time Control</span>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[#060910] rounded-lg border border-slate-800">
            {[
              { id: 'zen', label: 'Zen (∞)' },
              { id: 'blitz-3', label: '3 Min Blitz' },
              { id: 'rapid-10', label: '10 Min Rapid' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTimeControl(t.id as TimeControlId)}
                className={`flex-1 py-1 px-1.5 rounded-md font-medium text-center transition-all text-[11px] whitespace-nowrap ${
                  timeControl === t.id
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Board Theme */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Oceanic Board Color</span>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[#060910] rounded-lg border border-slate-800">
            {BOARD_THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => onSelectBoardTheme(th.id)}
                className={`flex-1 py-1 px-1.5 rounded-md font-medium text-center transition-all text-[11px] whitespace-nowrap ${
                  boardThemeId === th.id
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {th.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
