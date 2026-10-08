import React, { useEffect, useRef } from 'react';
import { CaptureEffect } from '../types/chess';

interface Props {
  effects: CaptureEffect[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export const CaptureAnimationLayer: React.FC<Props> = ({ effects }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Spawn bioluminescent bubbles and gold sparks on new effect
  useEffect(() => {
    if (effects.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const latest = effects[effects.length - 1];

    const originX = (latest.xPercent / 100) * rect.width;
    const originY = (latest.yPercent / 100) * rect.height;

    // Spawn 24 glowing oceanic bubbles and amber droplets
    const colors = ['#FACC15', '#F59E0B', '#38BDF8', '#FEF08A', '#0284C7', '#FFFFFF'];
    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3.5 + 1.2;
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.8, // slight upward float like bubbles
        size: Math.random() * 5 + 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.025,
      });
    }
  }, [effects]);

  // Particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Sync canvas dimensions
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.03; // buoyant upward bubble force
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#FACC15';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Inner bubble gleam
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {/* Canvas for bioluminescent particle bubbles */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Render HTML/SVG ripple & whirlpool for active capture effects */}
      {effects.map((effect) => (
        <div
          key={effect.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${effect.xPercent}%`, top: `${effect.yPercent}%` }}
        >
          {/* Tidal Whirlpool Vortex */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <svg
              className="absolute inset-0 w-full h-full animate-whirlpool"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#whirlpoolGrad)"
                strokeWidth="4"
                strokeDasharray="16 12 8 16"
              />
              <circle
                cx="50"
                cy="50"
                r="26"
                stroke="#FACC15"
                strokeWidth="3"
                strokeDasharray="10 8"
                opacity="0.9"
              />
              <circle
                cx="50"
                cy="50"
                r="12"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="whirlpoolGrad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
            </svg>

            {/* Outward Tidal Splash Ring */}
            <div className="absolute w-20 h-20 rounded-full border-2 border-amber-300/80 animate-tidal-splash" />
            <div
              className="absolute w-20 h-20 rounded-full border border-sky-400/90 animate-tidal-splash"
              style={{ animationDelay: '120ms' }}
            />
          </div>

          {/* Floating Combat Text */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap z-40">
            <div className="animate-combat-text px-3 py-1 rounded bg-[#080D1A]/90 border border-amber-400/60 shadow-lg shadow-amber-500/20 text-xs sm:text-sm font-semibold tracking-wide text-amber-300 flex items-center gap-1.5 backdrop-blur-sm">
              <span className="text-amber-400">🔱</span>
              <span>{effect.combatText}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
