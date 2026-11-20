import { useState } from "react";
import { shayari } from "@/content/pari";
import { cn } from "@/lib/utils";
import { Reveal, SectionTitle } from "./Reveal";

export function Letter() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setShowLetter(true), 1300);
  };

  return (
    <section id="letter" className="relative scroll-mt-28 px-5 py-24">
      <SectionTitle kicker="sealed with love" title="A Letter For You" />

      <Reveal className="flex flex-col items-center pt-24 sm:pt-28">
        <div className="relative h-52 w-80 [perspective:1200px] sm:h-60 sm:w-96">
          <div className="absolute inset-0 rounded-2xl bg-envelope shadow-dreamy" />
          <div
            className={cn(
              "absolute inset-x-6 top-4 bottom-4 z-10 flex flex-col items-center justify-center rounded-xl bg-card shadow-polaroid transition-transform delay-500 duration-700 ease-out",
              opened && "-translate-y-28",
            )}
          >
            <p className="font-hand text-3xl text-primary">For Pari 💌</p>
            <div className="mt-3 w-2/3 space-y-2">
              <span className="block h-px bg-blush" />
              <span className="block h-px bg-blush" />
              <span className="block h-px w-3/4 bg-blush" />
            </div>
          </div>
          <div className="absolute inset-0 z-20 rounded-2xl bg-envelope-front" />
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-[58%] origin-top bg-envelope-flap transition-transform duration-700 ease-in-out [backface-visibility:visible]",
              opened ? "z-0 [transform:rotateX(180deg)]" : "z-30",
            )}
          />
          <button
            onClick={open}
            aria-label="Open the letter"
            className={cn(
              "absolute top-[48%] left-1/2 z-40 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-romance text-2xl text-primary-foreground shadow-glow transition-all duration-500",
              opened ? "scale-0 opacity-0" : "animate-heart-pulse",
            )}
          >
            ♥
          </button>
        </div>

        {!opened && (
          <button onClick={open} className="btn-romance mt-10">
            Open Me 💌
          </button>
        )}
      </Reveal>

      {showLetter && (
        <article className="glass-card relative mx-auto mt-16 max-w-2xl animate-letter-in rounded-[2rem] px-6 py-12 text-center sm:px-14 sm:py-16">
          <span aria-hidden className="absolute top-5 left-6 animate-soft-float text-2xl text-primary">✿</span>
          <span aria-hidden className="absolute right-6 bottom-6 animate-soft-float text-2xl text-accent">✦</span>
          <p className="font-hand text-3xl text-primary">Meri Pari,</p>
          <div className="mt-8 space-y-1 font-hand text-[1.7rem] leading-relaxed text-plum sm:text-3xl">
            {shayari.map((line, i) =>
              line.trim() === "" ? <div key={i} className="h-6" /> : <p key={i}>{line}</p>,
            )}
          </div>
          <p className="mt-12 font-hand text-4xl text-romance">— Vikas ❤️</p>
        </article>
      )}
    </section>
  );
}
