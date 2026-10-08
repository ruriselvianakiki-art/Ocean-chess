import React, { useState } from 'react';
import { MoveRecord } from '../types/chess';
import { Copy, Check, Download, FileText } from 'lucide-react';

interface Props {
  moves: MoveRecord[];
  fen: string;
  pgn: string;
}

export const MoveHistory: React.FC<Props> = ({ moves, fen, pgn }) => {
  const [copiedType, setCopiedType] = useState<'pgn' | 'fen' | null>(null);

  // Group moves into pairs (White & Black)
  const movePairs: { num: number; white: MoveRecord; black?: MoveRecord }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      num: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  const handleCopy = (text: string, type: 'pgn' | 'fen') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="bg-[#090D18] border border-amber-500/20 rounded-xl p-3 flex flex-col h-full max-h-[360px]">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <h3 className="font-display text-sm font-semibold text-amber-200">
            Tidal Chronicle (Move Log)
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono tabular-nums">
          {moves.length} half-moves
        </span>
      </div>

      {/* Move List Table */}
      <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-1 font-mono text-xs">
        {movePairs.length === 0 ? (
          <div className="h-28 flex items-center justify-center text-slate-500 text-center italic">
            The waters are still. Make your first move to awaken the deep.
          </div>
        ) : (
          movePairs.map((pair) => (
            <div
              key={pair.num}
              className="grid grid-cols-[36px_1fr_1fr] gap-2 px-2 py-1 rounded hover:bg-slate-800/40 transition-colors"
            >
              <span className="text-slate-500 tabular-nums">{pair.num}.</span>
              <span className="text-amber-200 font-medium">
                {pair.white.san}
                {pair.white.captured && <span className="text-amber-400 text-[10px] ml-1">×</span>}
              </span>
              <span className="text-slate-300">
                {pair.black ? (
                  <>
                    {pair.black.san}
                    {pair.black.captured && <span className="text-amber-400 text-[10px] ml-1">×</span>}
                  </>
                ) : (
                  '—'
                )}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Export Actions */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => handleCopy(pgn, 'pgn')}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-[#101726] hover:bg-[#182238] border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-colors"
          title="Copy PGN Notation"
        >
          {copiedType === 'pgn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="whitespace-nowrap">{copiedType === 'pgn' ? 'PGN Copied' : 'Copy PGN'}</span>
        </button>

        <button
          onClick={() => handleCopy(fen, 'fen')}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-[#101726] hover:bg-[#182238] border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-colors"
          title="Copy FEN Board State"
        >
          {copiedType === 'fen' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="whitespace-nowrap">{copiedType === 'fen' ? 'FEN Copied' : 'Copy FEN'}</span>
        </button>
      </div>
    </div>
  );
};
