import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Burst = { id: number; tx: number; ty: number; s: number; r: number; color: string; size: number };
const BURST_COLORS = ["text-primary", "text-accent", "text-primary-glow", "text-lavender"];

export function Welcome({ leaving, onOpen }: { leaving: boolean; onOpen: () => void }) {
  const [burst, setBurst] = useState<Burst[]>([]);

  const handleClick = () => {
    if (leaving) return;
    setBurst(
      Array.from({ length: 40 }, (_, i) => {
        const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
        const dist = 160 + Math.random() * 320;
        return {
          id: i,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          s: 0.8 + Math.random() * 1.6,
          r: (Math.random() - 0.5) * 120,
          color: BURST_COLORS[i % BURST_COLORS.length] ?? "text-primary",
          size: 16 + Math.random() * 20,
        };
      }),
    );
    onOpen();
  };

  return (
    <section
      className={cn(
        "fixed inset-0 z-40 flex flex-col items-center justify-center px-5 transition-all duration-700",
        leaving && "pointer-events-none opacity-0 delay-500",
      )}
    >
      <div className="w-full max-w-md animate-site-in">
      <div
        className={cn(
          "glass-card relative w-full rounded-[2rem] px-8 py-12 text-center transition-transform duration-700 sm:px-12",
          leaving && "scale-90",
        )}
      >
        <div className="animate-heart-pulse text-5xl drop-glow">💗</div>
        <h1 className="mt-5 text-4xl font-semibold text-plum sm:text-5xl">
          Hey <span className="text-romance italic">Pari!</span>
        </h1>
        <p className="mt-4 font-hand text-2xl leading-snug text-muted-foreground sm:text-[1.7rem]">
          "Someone has made a little corner of the internet just for you..."
        </p>
        <button onClick={handleClick} className="btn-romance mt-8 text-base sm:text-lg">
          ♡ Open Your Little World ♡
        </button>
      </div>
      </div>

      <div className="mt-10 animate-heart-pulse text-3xl text-primary drop-glow" aria-hidden>
        ♥
      </div>

      {burst.length > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {burst.map((b) => (
            <span
              key={b.id}
              className={cn("burst-heart", b.color)}
              style={
                {
                  fontSize: `${b.size}px`,
                  "--tx": `${b.tx}px`,
                  "--ty": `${b.ty}px`,
                  "--s": b.s,
                  "--r": `${b.r}deg`,
                } as CSSProperties
              }
            >
              ♥
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
