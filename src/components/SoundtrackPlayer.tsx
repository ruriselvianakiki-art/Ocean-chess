import React, { useState } from 'react';
import { soundSystem } from '../utils/audio';
import { Play, Pause, Volume2, VolumeX, Sparkles, Waves } from 'lucide-react';

interface Props {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const SoundtrackPlayer: React.FC<Props> = ({ isMusicPlaying, onToggleMusic }) => {
  const [musicVol, setMusicVol] = useState(45);
  const [sfxVol, setSfxVol] = useState(60);

  const handleMusicVolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMusicVol(val);
    soundSystem.setMusicVolume(val / 100);
  };

  const handleSfxVolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSfxVol(val);
    soundSystem.setSfxVolume(val / 100);
  };

  return (
    <div className="bg-[#090D18] border border-amber-500/20 rounded-xl p-3.5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-amber-400 animate-pulse" />
          <div>
            <h3 className="font-display text-sm font-semibold text-amber-200">
              Oceanic Sanctuary Song
            </h3>
            <p className="text-[11px] text-slate-400">
              Synthesized Eb pentatonic bells & tranquil wave swells
            </p>
          </div>
        </div>

        <button
          onClick={onToggleMusic}
          className={`p-2 rounded-full border transition-transform active:scale-95 flex items-center justify-center ${
            isMusicPlaying
              ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/20'
              : 'bg-slate-800 text-amber-400 border-slate-700 hover:border-amber-400'
          }`}
          title={isMusicPlaying ? 'Pause Ambient Soundtrack' : 'Play Ambient Soundtrack'}
        >
          {isMusicPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Visualizer Waveform Bar */}
      <div className="h-8 rounded-lg bg-[#060910] border border-slate-800/80 px-3 flex items-center justify-between gap-1 overflow-hidden">
        {[20, 45, 80, 60, 30, 95, 75, 40, 85, 30, 70, 90, 50, 65, 35, 80, 55, 40].map((h, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${
              isMusicPlaying ? 'bg-amber-400' : 'bg-slate-700'
            }`}
            style={{
              height: isMusicPlaying ? `${Math.max(15, (h * (musicVol / 100)))}%` : '15%',
              opacity: isMusicPlaying ? 0.85 : 0.4,
              animation: isMusicPlaying ? `oceanic-pulse ${1.5 + (i % 4) * 0.4}s ease-in-out infinite` : 'none',
            }}
          />
        ))}
      </div>

      {/* Volume Controls */}
      <div className="grid grid-cols-2 gap-3 pt-1 text-xs text-slate-400">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-amber-400" /> Music Volume
            </span>
            <span className="font-mono text-amber-400">{musicVol}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={musicVol}
            onChange={handleMusicVolChange}
            className="w-full accent-amber-400 bg-slate-800 h-1 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Tidal FX
            </span>
            <span className="font-mono text-amber-400">{sfxVol}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVol}
            onChange={handleSfxVolChange}
            className="w-full accent-amber-400 bg-slate-800 h-1 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
