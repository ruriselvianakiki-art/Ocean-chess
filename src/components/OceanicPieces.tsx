import React from 'react';

interface PieceProps {
  color: 'w' | 'b';
  className?: string;
}

/**
 * Poseidon Sovereign (King) - 3-Prong Trident Crown & Divine Ocean Mantle
 */
export const PoseidonKing: React.FC<PieceProps> = ({ color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';
  const mainFill = isWhite ? '#FACC15' : '#0B0F19';
  const strokeColor = isWhite ? '#78350F' : '#EAB308';
  const accentGold = '#F59E0B';
  const trimColor = isWhite ? '#FEF08A' : '#FBBF24';

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`goldGlow-${color}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      {/* Base Pedestal - Waves of the Deep */}
      <path
        d="M20 85 C30 80, 40 86, 50 82 C60 86, 70 80, 80 85 L84 92 C70 94, 30 94, 16 92 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Wave Tier */}
      <path
        d="M26 80 C36 76, 46 80, 50 78 C54 80, 64 76, 74 80 L72 74 C60 70, 40 70, 28 74 Z"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* Royal Robe / Torso */}
      <path
        d="M32 74 C34 56, 38 48, 44 44 C42 42, 40 40, 40 36 C40 30, 45 26, 50 26 C55 26, 60 30, 60 36 C60 40, 58 42, 56 44 C62 48, 66 56, 68 74 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Center Ocean Chest Rune (Trident Symbol) */}
      <path
        d="M50 48 L50 68 M44 54 C44 60, 50 63, 50 63 C50 63, 56 60, 56 54"
        fill="none"
        stroke={accentGold}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Divine Trident Crown */}
      <path
        d="M38 24 L34 10 L42 16 L50 6 L58 16 L66 10 L62 24 Z"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Central Pearl Gem */}
      <circle cx="50" cy="34" r="3.5" fill="#FEF08A" stroke={strokeColor} strokeWidth="1.5" />
      {/* Trident Cross finial */}
      <line x1="50" y1="3" x2="50" y2="7" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="47" y1="5" x2="53" y2="5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * Amphitrite / Leviathan Queen - Crested Fin Diadem & Flowing Tides
 */
export const LeviathanQueen: React.FC<PieceProps> = ({ color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';
  const mainFill = isWhite ? '#FACC15' : '#0B0F19';
  const strokeColor = isWhite ? '#78350F' : '#EAB308';
  const trimColor = isWhite ? '#FEF08A' : '#FBBF24';

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <path
        d="M22 86 C32 82, 42 86, 50 83 C58 86, 68 82, 78 86 L82 92 C68 94, 32 94, 18 92 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Body Curve - Slender Mermaid/Serpent Contour */}
      <path
        d="M30 82 C32 62, 38 48, 42 40 C38 36, 42 28, 50 28 C58 28, 62 36, 58 40 C62 48, 68 62, 70 82 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Flowing Sea Ribbons */}
      <path
        d="M38 78 C34 66, 36 50, 44 42"
        fill="none"
        stroke={trimColor}
        strokeWidth="2"
      />
      <path
        d="M62 78 C66 66, 64 50, 56 42"
        fill="none"
        stroke={trimColor}
        strokeWidth="2"
      />
      {/* Queen's 5-Pointed Sea-Star Crown */}
      <path
        d="M30 28 L28 14 L38 20 L50 10 L62 20 L72 14 L70 28 Z"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Floating Crown Pearl Spheres */}
      <circle cx="28" cy="13" r="2.5" fill="#FEF08A" stroke={strokeColor} strokeWidth="1" />
      <circle cx="50" cy="9" r="3" fill="#FEF08A" stroke={strokeColor} strokeWidth="1" />
      <circle cx="72" cy="13" r="2.5" fill="#FEF08A" stroke={strokeColor} strokeWidth="1" />
      {/* Sacred Heart of the Ocean Jewel */}
      <polygon points="50,48 55,55 50,62 45,55" fill="#FBBF24" stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
};

/**
 * Abyssal Citadel (Rook) - Megalodon Fortress & Sunken Bastion
 */
export const MegalodonRook: React.FC<PieceProps> = ({ color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';
  const mainFill = isWhite ? '#FACC15' : '#0B0F19';
  const strokeColor = isWhite ? '#78350F' : '#EAB308';
  const trimColor = isWhite ? '#FEF08A' : '#FBBF24';

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Citadel Base */}
      <rect x="20" y="84" width="60" height="9" rx="2" fill={mainFill} stroke={strokeColor} strokeWidth="2.5" />
      <path d="M26 84 L30 76 L70 76 L74 84 Z" fill={trimColor} stroke={strokeColor} strokeWidth="2" />
      {/* Fortress Tower with Slanted Basalt Edges */}
      <path
        d="M31 76 L34 36 L66 36 L69 76 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Embrasures / Wave Battlement Crown */}
      <path
        d="M26 36 L26 20 L36 20 L36 27 L44 27 L44 20 L56 20 L56 27 L64 27 L64 20 L74 20 L74 36 Z"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Oceanic Arrow Slits / Portals */}
      <rect x="47" y="44" width="6" height="14" rx="2" fill={isWhite ? '#0B0F19' : '#FACC15'} />
      {/* Anchor Crest */}
      <path
        d="M44 68 C44 73, 56 73, 56 68 M50 63 L50 72"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Hippocampus (Knight) - Divine Sea Stallion with Dorsal Fin Mane
 */
export const HippocampusKnight: React.FC<PieceProps> = ({ color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';
  const mainFill = isWhite ? '#FACC15' : '#0B0F19';
  const strokeColor = isWhite ? '#78350F' : '#EAB308';
  const trimColor = isWhite ? '#FEF08A' : '#FBBF24';

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <path
        d="M22 86 C32 83, 48 83, 78 86 L80 92 C56 94, 30 94, 20 92 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Seahorse Head & Curved Neck */}
      <path
        d="M34 85 C32 70, 28 55, 34 40 C36 34, 40 28, 48 20 C49 14, 46 12, 44 11 C42 10, 48 8, 54 13 C60 17, 68 25, 70 34 C72 38, 70 42, 64 43 C56 44, 52 46, 50 54 C54 52, 60 54, 62 60 C66 70, 68 76, 72 85 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Dorsal Fin Crest (Sea Horse Mane) */}
      <path
        d="M50 15 C54 18, 58 16, 62 14 C64 20, 68 22, 73 20 C74 26, 77 28, 80 27 C78 34, 80 38, 81 44 C77 46, 76 52, 76 60"
        fill="none"
        stroke={trimColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Glowing Bioluminescent Eye */}
      <circle cx="56" cy="27" r="3" fill="#FEF08A" stroke={strokeColor} strokeWidth="1.2" />
      {/* Snout Details & Water Whisker */}
      <path d="M42 28 C38 31, 35 32, 33 32" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      {/* Gills / Sea Dragon Scales */}
      <path d="M46 60 C48 64, 52 64, 54 60" fill="none" stroke={strokeColor} strokeWidth="1.8" />
      <path d="M48 68 C50 72, 54 72, 56 68" fill="none" stroke={strokeColor} strokeWidth="1.8" />
    </svg>
  );
};

/**
 * Siren Oracle / Manta Seer (Bishop) - Abyssal Miter & Sacred Pearl Staff
 */
export const SirenBishop: React.FC<PieceProps> = ({ color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';
  const mainFill = isWhite ? '#FACC15' : '#0B0F19';
  const strokeColor = isWhite ? '#78350F' : '#EAB308';
  const trimColor = isWhite ? '#FEF08A' : '#FBBF24';

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Pedestal */}
      <path
        d="M25 86 C35 83, 45 85, 50 83 C55 85, 65 83, 75 86 L78 92 C62 94, 38 94, 22 92 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* Body */}
      <path
        d="M32 82 C34 66, 40 54, 42 46 C36 40, 36 32, 42 22 C46 16, 50 13, 50 13 C50 13, 54 16, 58 22 C64 32, 64 40, 58 46 C60 54, 66 66, 68 82 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      {/* The Bishop's Mitre Slit (Resembling a Manta Wing Fold) */}
      <path
        d="M50 18 L50 36 M42 26 L58 34"
        stroke={trimColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Mitre Pearl Crown Ball */}
      <circle cx="50" cy="10" r="3.5" fill="#FEF08A" stroke={strokeColor} strokeWidth="1.5" />
      {/* Oceanic Pearl Amulet */}
      <circle cx="50" cy="56" r="4.5" fill={trimColor} stroke={strokeColor} strokeWidth="1.5" />
    </svg>
  );
};

/**
 * Abyssal Anglerfish (Pawn) - Bioluminescent Predator with Glowing Golden Lantern
 */
export const AnglerfishPawn: React.FC<PieceProps> = ({ color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';
  const mainFill = isWhite ? '#FACC15' : '#0B0F19';
  const strokeColor = isWhite ? '#78350F' : '#EAB308';
  const trimColor = isWhite ? '#FEF08A' : '#FBBF24';
  const glowId = `anglerGlow-${color}`;

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
          <stop offset="40%" stopColor="#FACC15" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ocean Wave Pedestal */}
      <path
        d="M24 86 C34 83, 44 85, 50 83 C56 85, 66 83, 76 86 L78 92 C62 94, 38 94, 22 92 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />
      <path d="M30 85 L34 78 L66 78 L70 85 Z" fill={trimColor} stroke={strokeColor} strokeWidth="1.8" />

      {/* Sinuous Fish Tail Fin */}
      <path
        d="M44 78 C38 72, 34 68, 32 74 C30 80, 26 82, 24 78 C28 70, 36 64, 42 62"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="2"
      />

      {/* Spined Dorsal Fins along the back */}
      <path
        d="M34 54 L26 48 L36 44 L30 38 L40 36 L36 30 L46 32"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Predatory Fish Body */}
      <path
        d="M42 78 C36 66, 36 50, 44 38 C48 32, 54 30, 62 34 C72 40, 76 52, 74 62 C72 70, 66 76, 56 78 Z"
        fill={mainFill}
        stroke={strokeColor}
        strokeWidth="2.5"
      />

      {/* Pectoral Fin */}
      <path
        d="M52 56 C58 54, 68 58, 66 68 C60 66, 54 62, 52 56 Z"
        fill={trimColor}
        stroke={strokeColor}
        strokeWidth="1.8"
      />

      {/* Gills / Armored Ridge Lines */}
      <path d="M50 44 C53 48, 53 54, 48 58" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      <path d="M46 46 C48 49, 48 53, 44 56" fill="none" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" />

      {/* Fierce Predatory Jaw & Sharp Teeth */}
      <path
        d="M72 48 C68 49, 62 50, 60 52 C64 54, 70 56, 73 54"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Needle Teeth */}
      <path d="M62 51 L63 53 M65 50 L66 53 M68 51 L69 53" stroke={trimColor} strokeWidth="1.8" strokeLinecap="round" />

      {/* Glowing Bioluminescent Eye */}
      <circle cx="58" cy="42" r="3.5" fill="#FEF08A" stroke={strokeColor} strokeWidth="1.5" />
      <circle cx="58.5" cy="41.5" r="1.2" fill={isWhite ? '#0B0F19' : '#FFFFFF'} />

      {/* Bioluminescent Lure (Illicium Antenna) arching over head */}
      <path
        d="M46 32 C40 22, 42 16, 50 14"
        fill="none"
        stroke={trimColor}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Glowing Lantern Halo & Orb (Esca) - Classical Pawn Crown */}
      <circle cx="50" cy="14" r="6.5" fill={`url(#${glowId})`} />
      <circle cx="50" cy="14" r="4.2" fill="#FEF08A" stroke={strokeColor} strokeWidth="1.8" />
      <circle cx="50" cy="14" r="2" fill="#FFFFFF" />

      {/* Starburst Glint on the Lantern */}
      <line x1="50" y1="6" x2="50" y2="9" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="19" x2="50" y2="22" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="14" x2="45" y2="14" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="14" x2="58" y2="14" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const PieceIcon: React.FC<{
  type: string;
  color: 'w' | 'b';
  pieceSet?: string;
  className?: string;
}> = ({ type, color, className = "w-full h-full" }) => {
  switch (type.toLowerCase()) {
    case 'k':
      return <PoseidonKing color={color} className={className} />;
    case 'q':
      return <LeviathanQueen color={color} className={className} />;
    case 'r':
      return <MegalodonRook color={color} className={className} />;
    case 'b':
      return <SirenBishop color={color} className={className} />;
    case 'n':
      return <HippocampusKnight color={color} className={className} />;
    case 'p':
      return <AnglerfishPawn color={color} className={className} />;
    default:
      return null;
  }
};
