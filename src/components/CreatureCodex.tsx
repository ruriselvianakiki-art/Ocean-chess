import React, { useState } from 'react';
import { PieceIcon } from './OceanicPieces';
import { BookOpen, Shield, Anchor, Zap } from 'lucide-react';

interface CreatureEntry {
  type: string;
  name: string;
  mythos: string;
  title: string;
  role: string;
  piece: string;
  lore: string;
  traits: string[];
}

const CREATURES: CreatureEntry[] = [
  {
    type: 'k',
    name: 'Poseidon Sovereign',
    title: 'Supreme Lord of All Waters',
    piece: 'King (♔)',
    role: 'Divine Sovereign & Realm Heart',
    mythos: 'Crown of the Three-Pronged Golden Trident',
    lore: 'Wielding the golden trident that calms storms and fractures tectonic seabed faults. When Poseidon is cornered, the oceans fall into stillness; his defense is the absolute foundation of your underwater kingdom.',
    traits: ['Castles behind coral battlements', 'Trident aura protects adjacent squares', 'Victory relies on his survival']
  },
  {
    type: 'q',
    name: 'Leviathan Queen (Amphitrite)',
    title: 'Empress of the Fathomless Deeps',
    piece: 'Queen (♕)',
    role: 'Unstoppable Tidal Wave',
    mythos: 'Star-crested diadem of bioluminescent tides',
    lore: 'The fiercest spirit of the abyss. Gliding across ranks, files, and diagonals with effortless oceanic speed, she sweeps away invaders like flotsam caught in a tidal tsunami.',
    traits: ['Full board mobility', '9 material points of oceanic dominion', 'Deadliest tactical striker']
  },
  {
    type: 'r',
    name: 'Abyssal Citadel (Megalodon Bastion)',
    title: 'Sunken Fortress of Black Basalt',
    piece: 'Rook (♖)',
    role: 'Impenetrable Ocean Rampart',
    mythos: 'Heavy sea anchors & ancient sea-monster battlements',
    lore: 'Forged from volcanic black glass and calcified megalodon jaws on the trench floor. The Citadels dominate open oceanic files with steady, crushing momentum.',
    traits: ['Controls open files', 'Castles with Poseidon', 'Endgame tidal hammer']
  },
  {
    type: 'n',
    name: 'Hippocampus (Divine Sea Stallion)',
    title: 'Steed of the Celestial Currents',
    piece: 'Knight (♘)',
    role: 'Elusive Leaper of the Trench',
    mythos: 'Spined dorsal fin mane & pearl dragon whiskers',
    lore: 'Part warhorse, part sea serpent. The Hippocampus ignores surface blockades, leaping over closed coral barriers to deliver sudden, devastating tactical forks.',
    traits: ['Vaults over pieces', 'Delivers lethal tactical forks', 'Masters closed center boards']
  },
  {
    type: 'b',
    name: 'Siren Oracle (Manta Seer)',
    title: 'Prophet of the Abyssal Currents',
    piece: 'Bishop (♗)',
    role: 'Long-Range Diagonal Seer',
    mythos: 'Sacred pearl amulet & winged manta mitre',
    lore: 'Priestesses attuned to the ocean’s subtle thermal currents. Flying silently along color-bound pathways, they pierce enemy king castles from distant depths.',
    traits: ['Color-complex dominance', 'Fianchetto coral sniper', 'Deadly in bishop pairs']
  },
  {
    type: 'p',
    name: 'Abyssal Anglerfish',
    title: 'Vanguard of the Luminous Trench',
    piece: 'Pawn (♙)',
    role: 'Deep-Sea Vanguard & Lure Hunter',
    mythos: 'Bioluminescent golden lure antenna & razor needle fangs',
    lore: 'Inhabiting the sunless bathypelagic trenches, this cunning predator guides the vanguard using a hypnotic golden lantern. Small yet lethal in coordinated schools, the Anglerfish pushes forward relentlessly through hostile currents until ascending into an almighty deity at the far edge of the board.',
    traits: ['Hypnotic golden lantern lure', 'Sinuous predatory swimming vanguard', 'Promotes into any supreme ocean deity']
  }
];

export const CreatureCodex: React.FC = () => {
  const [activeCreature, setActiveCreature] = useState<CreatureEntry>(CREATURES[0]);

  return (
    <div className="bg-[#090D18] border border-amber-500/20 rounded-2xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-base sm:text-lg font-bold text-amber-200">
            Codex of Oceanic God Creatures
          </h2>
        </div>
        <span className="text-xs text-slate-400">
          6 Divine Ocean Deities
        </span>
      </div>

      {/* Creature Selector Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {CREATURES.map((c) => {
          const isSelected = activeCreature.type === c.type;
          return (
            <button
              key={c.type}
              onClick={() => setActiveCreature(c)}
              className={`p-2 rounded-xl border transition-all flex flex-col items-center gap-1 text-center group ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-400/10'
                  : 'bg-[#101726] border-slate-800 hover:border-amber-400/40 hover:bg-[#151F33]'
              }`}
            >
              <div className="w-9 h-9">
                <PieceIcon type={c.type} color="w" />
              </div>
              <span className={`text-[11px] font-medium leading-tight ${isSelected ? 'text-amber-300' : 'text-slate-300 group-hover:text-slate-100'}`}>
                {c.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-amber-400/80 font-mono">
                {c.piece.replace(/[()]/g, '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Creature Details Showcase */}
      <div className="bg-[#0C1220] border border-slate-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center md:items-start gap-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#070A12] border-2 border-amber-400/50 p-2 shrink-0 flex items-center justify-center shadow-lg shadow-black/60 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />
          <PieceIcon type={activeCreature.type} color="w" className="w-full h-full" />
        </div>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
            <h3 className="font-display text-lg font-bold text-amber-300">
              {activeCreature.name}
            </h3>
            <span className="text-xs text-amber-400/90 font-mono">
              {activeCreature.title} · {activeCreature.piece}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeCreature.lore}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            {activeCreature.traits.map((trait, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#131C2E] border border-amber-400/30 text-amber-200"
              >
                ✦ {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
