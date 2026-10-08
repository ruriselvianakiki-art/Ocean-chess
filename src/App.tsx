/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chess, Square } from 'chess.js';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OceanicHero } from './components/OceanicHero';
import { ChessBoard } from './components/ChessBoard';
import { GameHUD } from './components/GameHUD';
import { GameSettingsBar } from './components/GameSettingsBar';
import { MoveHistory } from './components/MoveHistory';
import { SoundtrackPlayer } from './components/SoundtrackPlayer';
import { CreatureCodex } from './components/CreatureCodex';
import { PuzzlesModal } from './components/PuzzlesModal';
import { GameOverModal } from './components/GameOverModal';
import { soundSystem } from './utils/audio';
import {
  BOT_PROFILES,
  BOARD_THEMES,
  getBestAIMove,
  evaluateBoard,
} from './utils/chessEngine';
import {
  GameMode,
  AIDifficulty,
  BoardThemeId,
  PieceSetId,
  TimeControlId,
  MoveRecord,
  OceanicPuzzle,
} from './types/chess';

export default function App() {
  // Chess Core Game State
  const [game, setGame] = useState<Chess>(() => new Chess());
  const [gameMode, setGameMode] = useState<GameMode>('vs-ai');
  const [difficulty, setDifficulty] = useState<AIDifficulty>('seer');
  const [boardThemeId, setBoardThemeId] = useState<BoardThemeId>('abyss');
  const [pieceSet, setPieceSet] = useState<PieceSetId>('mythic-creatures');
  const [orientation, setOrientation] = useState<'w' | 'b'>('w');
  const [timeControl, setTimeControl] = useState<TimeControlId>('zen');

  // Timers
  const [whiteTime, setWhiteTime] = useState<number>(600);
  const [blackTime, setBlackTime] = useState<number>(600);
  const timerRef = useRef<any>(null);

  // Move Tracking & Captures
  const [moves, setMoves] = useState<MoveRecord[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
  const [materialDiff, setMaterialDiff] = useState<number>(0);

  // AI State
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);

  // Modals & Popups
  const [isPuzzlesOpen, setIsPuzzlesOpen] = useState<boolean>(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState<boolean>(false);
  const [gameOverResult, setGameOverResult] = useState<{
    winner: 'w' | 'b' | 'draw' | null;
    reason: string;
  }>({ winner: null, reason: '' });
  const [activePuzzle, setActivePuzzle] = useState<OceanicPuzzle | null>(null);

  // Audio Music State
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Section Refs for smooth scrolling
  const boardSectionRef = useRef<HTMLDivElement | null>(null);
  const codexSectionRef = useRef<HTMLDivElement | null>(null);

  const currentTheme = BOARD_THEMES.find((t) => t.id === boardThemeId) || BOARD_THEMES[0];
  const botProfile = BOT_PROFILES[difficulty];

  // Helper to recompute captured pieces and material differences
  const calculateCapturesAndMaterial = useCallback((currentGame: Chess) => {
    const startPieces: Record<string, number> = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const currentCountsWhite: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };
    const currentCountsBlack: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };

    const board = currentGame.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type !== 'k') {
          if (piece.color === 'w') {
            currentCountsWhite[piece.type] = (currentCountsWhite[piece.type] || 0) + 1;
          } else {
            currentCountsBlack[piece.type] = (currentCountsBlack[piece.type] || 0) + 1;
          }
        }
      }
    }

    // Black pieces captured by White
    const lostBlack: string[] = [];
    // White pieces captured by Black
    const lostWhite: string[] = [];

    const pieceValues: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    let whiteScore = 0;
    let blackScore = 0;

    Object.keys(startPieces).forEach((type) => {
      const lostB = Math.max(0, startPieces[type] - (currentCountsBlack[type] || 0));
      for (let i = 0; i < lostB; i++) lostBlack.push(type);

      const lostW = Math.max(0, startPieces[type] - (currentCountsWhite[type] || 0));
      for (let i = 0; i < lostW; i++) lostWhite.push(type);

      whiteScore += (currentCountsWhite[type] || 0) * pieceValues[type];
      blackScore += (currentCountsBlack[type] || 0) * pieceValues[type];
    });

    setCapturedBlack(lostBlack);
    setCapturedWhite(lostWhite);
    setMaterialDiff(whiteScore - blackScore);
  }, []);

  // Check Game Over Conditions
  const checkGameOverStatus = useCallback((currentGame: Chess) => {
    if (currentGame.isCheckmate()) {
      const winner = currentGame.turn() === 'w' ? 'b' : 'w';
      setGameOverResult({
        winner,
        reason: `Checkmate! ${winner === 'w' ? 'White' : 'Black'} delivers the decisive tidal strike.`,
      });
      setIsGameOverOpen(true);
      if (winner === 'w') {
        soundSystem.playVictorySound();
      } else {
        soundSystem.playCheckSound();
      }
      return true;
    }

    if (currentGame.isStalemate()) {
      setGameOverResult({ winner: 'draw', reason: 'Stalemate — No legal moves remain in the waters.' });
      setIsGameOverOpen(true);
      return true;
    }

    if (currentGame.isThreefoldRepetition()) {
      setGameOverResult({ winner: 'draw', reason: 'Draw by Threefold Repetition of tidal currents.' });
      setIsGameOverOpen(true);
      return true;
    }

    if (currentGame.isInsufficientMaterial()) {
      setGameOverResult({ winner: 'draw', reason: 'Draw by Insufficient Material in the abyss.' });
      setIsGameOverOpen(true);
      return true;
    }

    if (currentGame.isDraw()) {
      setGameOverResult({ winner: 'draw', reason: 'Draw — The deep waters have reached equilibrium.' });
      setIsGameOverOpen(true);
      return true;
    }

    if (currentGame.inCheck()) {
      soundSystem.playCheckSound();
    }

    return false;
  }, []);

  // Handle Player Move
  const handleMoveComplete = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      try {
        const nextGame = new Chess(game.fen());
        const result = nextGame.move({
          from: move.from as Square,
          to: move.to as Square,
          promotion: move.promotion || 'q',
        });

        if (!result) return;

        setGame(nextGame);
        setLastMove({ from: move.from, to: move.to });

        // Add to history
        setMoves((prev) => [
          ...prev,
          {
            san: result.san,
            from: result.from,
            to: result.to,
            piece: result.piece,
            captured: result.captured,
            color: result.color,
            fen: nextGame.fen(),
          },
        ]);

        calculateCapturesAndMaterial(nextGame);
        checkGameOverStatus(nextGame);
      } catch (err) {
        console.error('Invalid move:', err);
      }
    },
    [game, calculateCapturesAndMaterial, checkGameOverStatus]
  );

  // AI Opponent Loop
  useEffect(() => {
    if (gameMode !== 'vs-ai' || game.turn() !== 'b' || game.isGameOver()) {
      setIsAIThinking(false);
      return;
    }

    setIsAIThinking(true);

    // Realistic calming thinking delay (700ms)
    const aiTimeout = setTimeout(() => {
      try {
        const gameCopy = new Chess(game.fen());
        const bestMove = getBestAIMove(gameCopy, difficulty);

        if (bestMove) {
          const result = gameCopy.move({
            from: bestMove.from as Square,
            to: bestMove.to as Square,
            promotion: bestMove.promotion || 'q',
          });

          if (result) {
            if (result.captured) {
              soundSystem.playCaptureSound();
            } else {
              soundSystem.playMoveSound();
            }

            setGame(gameCopy);
            setLastMove({ from: bestMove.from, to: bestMove.to });
            setMoves((prev) => [
              ...prev,
              {
                san: result.san,
                from: result.from,
                to: result.to,
                piece: result.piece,
                captured: result.captured,
                color: result.color,
                fen: gameCopy.fen(),
              },
            ]);

            calculateCapturesAndMaterial(gameCopy);
            checkGameOverStatus(gameCopy);
          }
        }
      } catch (e) {
        console.error('AI calculation error:', e);
      } finally {
        setIsAIThinking(false);
      }
    }, 700);

    return () => clearTimeout(aiTimeout);
  }, [game, gameMode, difficulty, calculateCapturesAndMaterial, checkGameOverStatus]);

  // Timers countdown
  useEffect(() => {
    if (timeControl === 'zen' || game.isGameOver()) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (game.turn() === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameOverResult({ winner: 'b', reason: 'White ran out of oceanic time.' });
            setIsGameOverOpen(true);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameOverResult({ winner: 'w', reason: 'Black ran out of oceanic time.' });
            setIsGameOverOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game, timeControl]);

  // Start New Game / Reset
  const handleNewGame = useCallback(() => {
    const newG = new Chess();
    setGame(newG);
    setMoves([]);
    setLastMove(null);
    setCapturedWhite([]);
    setCapturedBlack([]);
    setMaterialDiff(0);
    setIsGameOverOpen(false);
    setActivePuzzle(null);

    const seconds = timeControl === 'blitz-3' ? 180 : timeControl === 'rapid-10' ? 600 : 99999;
    setWhiteTime(seconds);
    setBlackTime(seconds);
  }, [timeControl]);

  // Undo Move
  const handleUndo = useCallback(() => {
    if (moves.length === 0 || isAIThinking) return;
    const newG = new Chess();
    // In vs-ai, undo 2 plies (bot move and player move)
    const stepsToUndo = gameMode === 'vs-ai' ? 2 : 1;
    const targetLength = Math.max(0, moves.length - stepsToUndo);

    for (let i = 0; i < targetLength; i++) {
      newG.move(moves[i].san);
    }

    setGame(newG);
    const newMoves = moves.slice(0, targetLength);
    setMoves(newMoves);
    if (newMoves.length > 0) {
      const last = newMoves[newMoves.length - 1];
      setLastMove({ from: last.from, to: last.to });
    } else {
      setLastMove(null);
    }

    calculateCapturesAndMaterial(newG);
  }, [moves, isAIThinking, gameMode, calculateCapturesAndMaterial]);

  // Toggle ambient soundtrack
  const handleToggleMusic = useCallback(() => {
    const playing = soundSystem.toggleMusic();
    setIsMusicPlaying(playing);
  }, []);

  // Select puzzle
  const handleSelectPuzzle = useCallback((puzzle: OceanicPuzzle) => {
    try {
      const puzzleGame = new Chess(puzzle.fen);
      setGame(puzzleGame);
      setGameMode('puzzle');
      setActivePuzzle(puzzle);
      setMoves([]);
      setLastMove(null);
      setOrientation(puzzle.turn);
      calculateCapturesAndMaterial(puzzleGame);
      boardSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      console.error('Failed to load puzzle FEN:', e);
    }
  }, [calculateCapturesAndMaterial]);

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        gameMode={gameMode}
        onSelectMode={(mode) => {
          setGameMode(mode);
          handleNewGame();
          boardSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPuzzles={() => setIsPuzzlesOpen(true)}
        onOpenCodex={() => {
          codexSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNewGame={handleNewGame}
      />

      {/* Main Sanctuary Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-8">
        {/* Oceanic Hero Banner */}
        <OceanicHero
          onStartPlaying={() => {
            boardSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreCodex={() => {
            codexSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Primary Interactive Board Stage */}
        <section
          ref={boardSectionRef}
          aria-label="Oceanic Chess Arena"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Board & Player HUDs */}
          <div className="lg:col-span-8 flex flex-col items-center space-y-4">
            {/* Top HUD (Black / Bot) */}
            <GameHUD
              currentTurn={game.turn()}
              gameMode={gameMode}
              botProfile={botProfile}
              whiteTime={whiteTime}
              blackTime={blackTime}
              timeControl={timeControl}
              capturedWhite={capturedWhite}
              capturedBlack={capturedBlack}
              materialDiff={materialDiff}
              isAIThinking={isAIThinking}
              onReset={handleNewGame}
              onUndo={handleUndo}
              onFlipBoard={() => setOrientation((prev) => (prev === 'w' ? 'b' : 'w'))}
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
            />

            {/* The 8x8 Chess Board */}
            <ChessBoard
              game={game}
              boardTheme={currentTheme}
              pieceSet={pieceSet}
              orientation={orientation}
              isInteractive={!isAIThinking && (gameMode !== 'vs-ai' || game.turn() === 'w')}
              onMoveComplete={handleMoveComplete}
              lastMove={lastMove}
            />

            {/* Quick Game Settings Bar */}
            <GameSettingsBar
              gameMode={gameMode}
              difficulty={difficulty}
              onSelectDifficulty={(d) => {
                setDifficulty(d);
                handleNewGame();
              }}
              timeControl={timeControl}
              onSelectTimeControl={(t) => {
                setTimeControl(t);
                const s = t === 'blitz-3' ? 180 : t === 'rapid-10' ? 600 : 99999;
                setWhiteTime(s);
                setBlackTime(s);
              }}
              boardThemeId={boardThemeId}
              onSelectBoardTheme={setBoardThemeId}
            />
          </div>

          {/* Right Column: Audio Player, Move History, and Tactical Status */}
          <div className="lg:col-span-4 space-y-5">
            {/* Oceanic Ambient Song Synthesizer */}
            <SoundtrackPlayer
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
            />

            {/* Move History / PGN / FEN Chronicle */}
            <MoveHistory
              moves={moves}
              fen={game.fen()}
              pgn={game.pgn()}
            />

            {/* Current Match Overview Card */}
            <div className="bg-[#090D18] border border-amber-500/20 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-display font-semibold text-amber-200">Current Sea Conditions</span>
                <span className="font-mono text-amber-400">
                  {game.turn() === 'w' ? 'White’s Turn' : 'Black’s Turn'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Opponent:</span>
                <span className="text-slate-200 font-medium">
                  {gameMode === 'vs-ai' ? `${botProfile.name} (${botProfile.rating})` : 'Local Challenger'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Theme:</span>
                <span className="text-slate-200">{currentTheme.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Status:</span>
                <span className={`font-semibold ${game.inCheck() ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>
                  {game.inCheck() ? '⚠️ King in Check!' : 'Calm Waters'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Ocean God Creatures Codex Section */}
        <section ref={codexSectionRef} className="pt-4">
          <CreatureCodex />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Puzzles Modal */}
      <PuzzlesModal
        isOpen={isPuzzlesOpen}
        onClose={() => setIsPuzzlesOpen(false)}
        onSelectPuzzle={handleSelectPuzzle}
        activePuzzleId={activePuzzle?.id}
      />

      {/* Game Over / Victory Modal */}
      <GameOverModal
        isOpen={isGameOverOpen}
        winner={gameOverResult.winner}
        reason={gameOverResult.reason}
        gameMode={gameMode}
        botProfile={botProfile}
        onRematch={handleNewGame}
        onClose={() => setIsGameOverOpen(false)}
      />
    </div>
  );
}
