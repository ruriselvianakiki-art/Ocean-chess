import { Chess } from 'chess.js';
import { AIDifficulty, BotProfile, BoardTheme, OceanicPuzzle } from '../types/chess';

// Piece values
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Positional bonuses (Piece-Square Tables for positional chess mastery)
const PAWN_TABLE = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
   5,  5, 10, 25, 25, 10,  5,  5,
   0,  0,  0, 20, 20,  0,  0,  0,
   5, -5,-10,  0,  0,-10, -5,  5,
   5, 10, 10,-20,-20, 10, 10,  5,
   0,  0,  0,  0,  0,  0,  0,  0,
];

const KNIGHT_TABLE = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50,
];

const BISHOP_TABLE = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20,
];

const ROOK_TABLE = [
    0,  0,  0,  0,  0,  0,  0,  0,
    5, 10, 10, 10, 10, 10, 10,  5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
   -5,  0,  0,  0,  0,  0,  0, -5,
    0,  0,  0,  5,  5,  0,  0,  0,
];

const QUEEN_TABLE = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20,
];

const KING_TABLE = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20,
];

export const BOT_PROFILES: Record<AIDifficulty, BotProfile> = {
  initiate: {
    id: 'initiate',
    name: 'Coral Initiate',
    title: 'Guardian of the Reef',
    rating: 800,
    depth: 1,
    avatar: '/src/assets/images/poseidon_avatar_emblem_1791451510129.jpg',
    avatarFallback: '🪸',
    description: 'A gentle ocean spirit just learning the currents of strategy.',
    quote: 'The shallow waters are peaceful. Let us share a tranquil match.'
  },
  seer: {
    id: 'seer',
    name: 'Manta Seer',
    title: 'Oracle of the Thermocline',
    rating: 1350,
    depth: 2,
    avatar: '/src/assets/images/oceanic_sanctuary_board_bg_1791451547674.jpg',
    avatarFallback: '🌊',
    description: 'Glides gracefully across the squares, anticipating open lanes and tactical forks.',
    quote: 'The deep tides reveal every movement before the waves break.'
  },
  kraken: {
    id: 'kraken',
    name: 'Abyssal Kraken',
    title: 'Terror of the Trench',
    rating: 1750,
    depth: 3,
    avatar: '/src/assets/images/abyssal_kraken_avatar_1791451533221.jpg',
    avatarFallback: '🦑',
    description: 'Extends crushing tentacles into enemy territory with relentless pressure.',
    quote: 'The abyss does not negotiate. Your pieces will sink into oblivion.'
  },
  poseidon: {
    id: 'poseidon',
    name: 'Poseidon Sovereign',
    title: 'Supreme Lord of All Waters',
    rating: 2150,
    depth: 4,
    avatar: '/src/assets/images/ocean_god_leviathan_hero_1791451495674.jpg',
    avatarFallback: '🔱',
    description: 'Commands the celestial currents and tectonic seabed with absolute mastery.',
    quote: 'Even the greatest kings kneel before the majesty of the boundless ocean.'
  }
};

export const BOARD_THEMES: BoardTheme[] = [
  {
    id: 'abyss',
    name: 'Obsidian Abyss & Sunlit Amber',
    lightSquare: 'bg-[#1e293b]',
    darkSquare: 'bg-[#090d16]',
    border: 'border-amber-500/40',
    highlightMove: 'bg-amber-400/35 ring-2 ring-amber-400/80',
    highlightCapture: 'bg-red-500/35 ring-2 ring-amber-400',
  },
  {
    id: 'atlantis',
    name: 'Atlantis Gold & Deep Azure',
    lightSquare: 'bg-[#183446]',
    darkSquare: 'bg-[#081824]',
    border: 'border-yellow-400/50',
    highlightMove: 'bg-yellow-400/30 ring-2 ring-yellow-300',
    highlightCapture: 'bg-amber-500/40 ring-2 ring-yellow-400',
  },
  {
    id: 'trench',
    name: 'Mariana Basalt & Bioluminescent Gold',
    lightSquare: 'bg-[#1b2432]',
    darkSquare: 'bg-[#0f141d]',
    border: 'border-amber-400/40',
    highlightMove: 'bg-yellow-500/35 ring-2 ring-amber-400',
    highlightCapture: 'bg-orange-500/35 ring-2 ring-amber-400',
  }
];

// Curated Oceanic God Trials (Puzzles)
export const OCEANIC_PUZZLES: OceanicPuzzle[] = [
  {
    id: 'puzzle-1',
    title: 'Trial of the Golden Trident',
    mythos: 'Poseidon strikes the enemy fortress with an unyielding back-rank spear.',
    difficulty: 'Easy',
    fen: '6k1/5ppp/8/8/8/8/4QPPP/6K1 w - - 0 1',
    turn: 'w',
    moves: ['e2e8'],
    explanation: 'Queen delivers back-rank checkmate at e8. The oceanic king has no breathing squares.'
  },
  {
    id: 'puzzle-2',
    title: 'The Kraken’s Smothered Whirlpool',
    mythos: 'The abyssal sea stallion traps the enemy sovereign within his own coral guard.',
    difficulty: 'Medium',
    fen: '6k1/5Npp/8/8/8/8/8/6K1 w - - 0 1',
    turn: 'w',
    // Realistic tactical mate: White queen & knight combo
    moves: [],
    explanation: 'Coordinate the knight jump to exploit trapped royal lines.'
  },
  {
    id: 'puzzle-3',
    title: 'Siren’s Fatal Fork',
    mythos: 'The Hippocampus vaults between the enemy monarch and queen in a single leap.',
    difficulty: 'Easy',
    fen: 'r1bqk2r/pppp1ppp/2n5/4p3/1b2n3/3P1N2/PPP1BPPP/RNBQK2R w KQkq - 0 6',
    turn: 'w',
    moves: ['c2c3'],
    explanation: 'Solidify the center and parry the siren with pawn push c3.'
  },
  {
    id: 'puzzle-4',
    title: 'Amphitrite’s Tidal Sacrifice',
    mythos: 'Lure the abyssal monarch into the center before the rook unleashes the final wave.',
    difficulty: 'Hard',
    fen: 'r1b2rk1/pp3ppp/2n5/3qp3/8/3B4/PPP2PPP/R1BQK2R w KQ - 0 11',
    turn: 'w',
    moves: ['d3h7', 'g8h7', 'd1d5'],
    explanation: 'Discovered attack! Greek gift bishop sacrifice at h7 wins the enemy Queen at d5.'
  }
];

/**
 * Static evaluation function of a chess board state
 */
export function evaluateBoard(game: Chess): number {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -99999 : 99999;
  }
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }

  let totalScore = 0;
  const board = game.board();

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;

      const baseVal = PIECE_VALUES[piece.type] || 0;
      const squareIdx = r * 8 + c;

      // Position table bonus
      let positionalBonus = 0;
      const orientedIdx = piece.color === 'w' ? (7 - r) * 8 + c : squareIdx;

      switch (piece.type) {
        case 'p':
          positionalBonus = PAWN_TABLE[orientedIdx] || 0;
          break;
        case 'n':
          positionalBonus = KNIGHT_TABLE[orientedIdx] || 0;
          break;
        case 'b':
          positionalBonus = BISHOP_TABLE[orientedIdx] || 0;
          break;
        case 'r':
          positionalBonus = ROOK_TABLE[orientedIdx] || 0;
          break;
        case 'q':
          positionalBonus = QUEEN_TABLE[orientedIdx] || 0;
          break;
        case 'k':
          positionalBonus = KING_TABLE[orientedIdx] || 0;
          break;
      }

      const pieceTotal = baseVal + positionalBonus;

      if (piece.color === 'w') {
        totalScore += pieceTotal;
      } else {
        totalScore -= pieceTotal;
      }
    }
  }

  return totalScore;
}

/**
 * Minimax algorithm with Alpha-Beta pruning
 */
function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves({ verbose: true });
  // Move ordering: order captures first for effective alpha-beta cutoffs
  moves.sort((a, b) => {
    const scoreA = a.captured ? PIECE_VALUES[a.captured] * 10 - PIECE_VALUES[a.piece] : 0;
    const scoreB = b.captured ? PIECE_VALUES[b.captured] * 10 - PIECE_VALUES[b.piece] : 0;
    return scoreB - scoreA;
  });

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Computes the best move for the AI opponent
 */
export function getBestAIMove(
  game: Chess,
  difficulty: AIDifficulty
): { from: string; to: string; promotion?: string } | null {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  // Level 1: Coral Initiate: occasional random move or simple capture
  if (difficulty === 'initiate') {
    if (Math.random() < 0.35) {
      const randMove = moves[Math.floor(Math.random() * moves.length)];
      return { from: randMove.from, to: randMove.to, promotion: 'q' };
    }
  }

  const botProfile = BOT_PROFILES[difficulty];
  const depth = botProfile.depth;
  const isBlack = game.turn() === 'b';

  let bestMove = moves[0];
  let bestScore = isBlack ? Infinity : -Infinity;

  // Shuffle moves slightly to avoid repetitive gameplay on identical scores
  const randomizedMoves = [...moves].sort(() => Math.random() - 0.5);

  for (const move of randomizedMoves) {
    game.move(move);
    const score = minimax(game, depth - 1, -Infinity, Infinity, !isBlack);
    game.undo();

    if (isBlack) {
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    } else {
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }

  return {
    from: bestMove.from,
    to: bestMove.to,
    promotion: bestMove.promotion || 'q',
  };
}

/**
 * Returns poetic oceanic capture praise/lore
 */
export function getOceanicCombatText(victim: string, isEnemyTaken: boolean): string {
  const victimName =
    victim === 'q' ? 'Queen' :
    victim === 'r' ? 'Citadel' :
    victim === 'b' ? 'Siren' :
    victim === 'n' ? 'Seahorse' : 'Anglerfish';

  const enemyPhrases = [
    `Tidal Strike! Defeated ${victimName}`,
    `Swallowed by the Depths!`,
    `Poseidon's Wrath!`,
    `Abyssal Surge!`,
    `Sunken into the Trench!`,
    `Oceanic Judgement!`
  ];

  const friendlyPhrases = [
    `The Deeps claimed your ${victimName}`,
    `Lost to the Abyssal Tide`,
    `Crushed by the Current`
  ];

  const pool = isEnemyTaken ? enemyPhrases : friendlyPhrases;
  return pool[Math.floor(Math.random() * pool.length)];
}
