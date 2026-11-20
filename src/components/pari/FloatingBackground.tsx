import { useEffect, useState, type CSSProperties } from "react";

const GLYPHS = ["♥", "♡", "✦", "✧", "✿", "❀", "⋆", "♥"];
const COLORS = ["text-primary", "text-accent", "text-lavender", "text-primary-glow"];

type Particle = {
  id: number;
  glyph: string;
  color: string;
  left: number;
  size: number;
  dur: number;
  delay: number;
  drift: number;
  op: number;
};

/** Continuously floating hearts, stars, flowers and sparkles. Generated client-side only. */
export function FloatingBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 640 ? 18 : 30;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        glyph: GLYPHS[i % GLYPHS.length] ?? "♥",
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "text-primary",
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        dur: 9 + Math.random() * 9,
        delay: -Math.random() * 18,
        drift: (Math.random() - 0.5) * 120,
        op: 0.35 + Math.random() * 0.45,
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle ${p.color}`}
          style={
            {
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--drift": `${p.drift}px`,
              "--op": p.op,
            } as CSSProperties
          }
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
