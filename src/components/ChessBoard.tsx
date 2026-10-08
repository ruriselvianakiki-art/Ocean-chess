import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { PieceIcon } from './OceanicPieces';
import { CaptureAnimationLayer } from './CaptureAnimationLayer';
import { BoardTheme, CaptureEffect, PieceSetId } from '../types/chess';
import { soundSystem } from '../utils/audio';
import { getOceanicCombatText } from '../utils/chessEngine';

interface Props {
  game: Chess;
  boardTheme: BoardTheme;
  pieceSet: PieceSetId;
  orientation: 'w' | 'b';
  isInteractive: boolean;
  onMoveComplete: (move: { from: string; to: string; promotion?: string }) => void;
  lastMove: { from: string; to: string } | null;
}

interface PendingPromotion {
  from: Square;
  to: Square;
  color: 'w' | 'b';
}

export const ChessBoard: React.FC<Props> = ({
  game,
  boardTheme,
  pieceSet,
  orientation,
  isInteractive,
  onMoveComplete,
  lastMove,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<{ to: Square; captured?: string }[]>([]);
  const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);
  const [captureEffects, setCaptureEffects] = useState<CaptureEffect[]>([]);

  // Clear selection if turn changes or board resets
  useEffect(() => {
    setSelectedSquare(null);
    setLegalMoves([]);
  }, [game.fen()]);

  // Clean up capture effects after animation duration
  useEffect(() => {
    if (captureEffects.length === 0) return;
    const timer = setTimeout(() => {
      setCaptureEffects((prev) => prev.filter((e) => Date.now() - e.timestamp < 1500));
    }, 1600);
    return () => clearTimeout(timer);
  }, [captureEffects]);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const displayFiles = orientation === 'w' ? files : [...files].reverse();
  const displayRanks = orientation === 'w' ? ranks : [...ranks].reverse();

  // Find King square if in check
  let checkSquare: Square | null = null;
  if (game.inCheck()) {
    const turn = game.turn();
    const board = game.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type === 'k' && p.color === turn) {
          checkSquare = `${files[c]}${8 - r}` as Square;
          break;
        }
      }
      if (checkSquare) break;
    }
  }

  // Handle square click
  const handleSquareClick = (square: Square) => {
    if (!isInteractive || pendingPromotion) return;

    const piece = game.get(square);
    const isCurrentTurn = piece && piece.color === game.turn();

    // 1. If clicking our own piece, select it and get legal moves
    if (isCurrentTurn) {
      soundSystem.playSelectSound();
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      setLegalMoves(moves.map((m) => ({ to: m.to as Square, captured: m.captured })));
      return;
    }

    // 2. If already selected and clicking a valid destination square
    if (selectedSquare) {
      const isLegal = legalMoves.some((m) => m.to === square);
      if (isLegal) {
        attemptMove(selectedSquare, square);
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  };

  const attemptMove = (from: Square, to: Square) => {
    const movingPiece = game.get(from);
    if (!movingPiece) return;

    // Check for pawn promotion (reaching last rank)
    const isPromotion =
      movingPiece.type === 'p' &&
      ((movingPiece.color === 'w' && to[1] === '8') ||
        (movingPiece.color === 'b' && to[1] === '1'));

    if (isPromotion) {
      setPendingPromotion({ from, to, color: movingPiece.color });
      return;
    }

    executeMove({ from, to });
  };

  const executeMove = ({
    from,
    to,
    promotion,
  }: {
    from: Square;
    to: Square;
    promotion?: string;
  }) => {
    const movingPiece = game.get(from);
    const targetPiece = game.get(to);

    // Calculate percentage coords for capture animation
    if (targetPiece) {
      const colIdx = displayFiles.indexOf(to[0]);
      const rowIdx = displayRanks.indexOf(to[1]);
      const xPercent = (colIdx + 0.5) * 12.5;
      const yPercent = (rowIdx + 0.5) * 12.5;

      const isEnemyTaken = movingPiece?.color === 'w';
      const combatText = getOceanicCombatText(targetPiece.type, isEnemyTaken);

      setCaptureEffects((prev) => [
        ...prev,
        {
          id: `cap-${Date.now()}-${Math.random()}`,
          square: to,
          xPercent,
          yPercent,
          victim: targetPiece.type,
          attacker: movingPiece?.type || 'p',
          combatText,
          isEnemyTaken,
          timestamp: Date.now(),
        },
      ]);

      soundSystem.playCaptureSound();
    } else {
      soundSystem.playMoveSound();
    }

    setSelectedSquare(null);
    setLegalMoves([]);
    setPendingPromotion(null);

    onMoveComplete({ from, to, promotion });
  };

  return (
    <div className="relative select-none w-full max-w-[620px] mx-auto">
      {/* Outer Oceanic Frame */}
      <div className={`p-2 sm:p-3 rounded-2xl bg-[#090D18] border-2 ${boardTheme.border} shadow-2xl shadow-black/80 relative`}>
        {/* Subtle Underwater Background Caustic Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/5 via-sky-950/20 to-black/60 pointer-events-none" />

        {/* The 8x8 Grid Container */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-black/40 grid grid-cols-8 grid-rows-8 shadow-inner">
          {displayRanks.map((rank, rIdx) =>
            displayFiles.map((file, cIdx) => {
              const square = `${file}${rank}` as Square;
              const isLight = (rIdx + cIdx) % 2 === 0;
              const piece = game.get(square);
              const isSelected = selectedSquare === square;
              const legalMoveOption = legalMoves.find((m) => m.to === square);
              const isLastMove = lastMove && (lastMove.from === square || lastMove.to === square);
              const isKingInCheck = checkSquare === square;

              return (
                <button
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  aria-label={`Square ${square}${piece ? ` occupied by ${piece.color === 'w' ? 'White' : 'Black'} ${piece.type}` : ''}`}
                  className={`relative flex items-center justify-center p-0.5 sm:p-1.5 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isLight ? boardTheme.lightSquare : boardTheme.darkSquare
                  } ${isLastMove ? 'bg-amber-400/20' : ''}`}
                >
                  {/* Square Coordinates (Corner text) */}
                  {cIdx === 0 && (
                    <span className="absolute top-0.5 left-1 text-[9px] sm:text-[10px] font-mono font-semibold opacity-40 text-amber-100 pointer-events-none">
                      {rank}
                    </span>
                  )}
                  {rIdx === 7 && (
                    <span className="absolute bottom-0.5 right-1 text-[9px] sm:text-[10px] font-mono font-semibold opacity-40 text-amber-100 pointer-events-none">
                      {file}
                    </span>
                  )}

                  {/* King in Check Pulsing Highlight */}
                  {isKingInCheck && (
                    <div className="absolute inset-0 bg-red-600/40 ring-4 ring-red-500/80 rounded animate-pulse pointer-events-none" />
                  )}

                  {/* Selected Square Golden Glow */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/30 ring-2 ring-amber-400 rounded pointer-events-none" />
                  )}

                  {/* Legal Move Indicators */}
                  {legalMoveOption && !legalMoveOption.captured && (
                    <div className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-amber-400/70 shadow-md shadow-amber-400/40 ring-1 ring-amber-200 pointer-events-none animate-pulse" />
                  )}
                  {legalMoveOption && legalMoveOption.captured && (
                    <div className="absolute inset-1 rounded-full border-2 sm:border-3 border-amber-400/90 bg-red-500/20 shadow-md pointer-events-none animate-pulse" />
                  )}

                  {/* Chess Piece Graphic */}
                  {piece && (
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none transform transition-transform duration-100 hover:scale-105 active:scale-95">
                      <PieceIcon
                        type={piece.type}
                        color={piece.color}
                        pieceSet={pieceSet}
                        className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
                      />
                    </div>
                  )}
                </button>
              );
            })
          )}

          {/* Capture Animation & Tidal Splash Layer */}
          <CaptureAnimationLayer effects={captureEffects} />

          {/* Promotion Selection Dialog */}
          {pendingPromotion && (
            <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#0D1322] border-2 border-amber-400/80 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-sm text-center">
                <h2 className="text-lg font-bold text-amber-300 font-display mb-1">
                  🔱 Oceanic Ascendance
                </h2>
                <p className="text-xs text-slate-300 mb-4">
                  Select your divine oceanic evolution
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { type: 'q', name: 'Leviathan Queen' },
                    { type: 'n', name: 'Hippocampus' },
                    { type: 'r', name: 'Abyssal Citadel' },
                    { type: 'b', name: 'Siren Oracle' },
                  ].map((p) => (
                    <button
                      key={p.type}
                      onClick={() =>
                        executeMove({
                          from: pendingPromotion.from,
                          to: pendingPromotion.to,
                          promotion: p.type,
                        })
                      }
                      className="p-2 sm:p-3 rounded-xl bg-[#151D30] hover:bg-amber-500/20 border border-amber-400/40 hover:border-amber-400 transition-all flex flex-col items-center gap-1 group"
                    >
                      <div className="w-12 h-12">
                        <PieceIcon type={p.type} color={pendingPromotion.color} />
                      </div>
                      <span className="text-[10px] text-slate-300 group-hover:text-amber-300 font-medium whitespace-nowrap">
                        {p.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
