export type GameMode = 'vs-ai' | 'pass-and-play' | 'puzzle';

export type AIDifficulty = 'initiate' | 'seer' | 'kraken' | 'poseidon';

export interface BotProfile {
  id: AIDifficulty;
  name: string;
  title: string;
  rating: number;
  depth: number;
  avatar: string;
  avatarFallback: string;
  description: string;
  quote: string;
}

export type BoardThemeId = 'abyss' | 'atlantis' | 'trench';

export interface BoardTheme {
  id: BoardThemeId;
  name: string;
  lightSquare: string;
  darkSquare: string;
  border: string;
  highlightMove: string;
  highlightCapture: string;
}

export type PieceSetId = 'mythic-creatures' | 'classic-staunton';

export type TimeControlId = 'zen' | 'blitz-3' | 'rapid-10';

export interface TimeControl {
  id: TimeControlId;
  label: string;
  seconds: number;
}

export interface CaptureEffect {
  id: string;
  square: string;
  xPercent: number; // 0 to 100 on board
  yPercent: number; // 0 to 100 on board
  victim: string;
  attacker: string;
  combatText: string;
  isEnemyTaken: boolean;
  timestamp: number;
}

export interface MoveRecord {
  san: string;
  from: string;
  to: string;
  piece: string;
  captured?: string;
  color: 'w' | 'b';
  fen: string;
  evaluation?: number;
}

export interface OceanicPuzzle {
  id: string;
  title: string;
  mythos: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  fen: string;
  turn: 'w' | 'b';
  moves: string[]; // UCI or SAN sequence
  explanation: string;
}
