import { useEffect, useRef, useState } from "react";
import { Heart, Music, Pause } from "lucide-react";
import { musicSrc } from "@/content/pari";
import { cn } from "@/lib/utils";

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setMissing(false);
    } catch {
      setMissing(true);
      setTimeout(() => setMissing(false), 3500);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-30 flex items-center gap-3">
      <audio ref={audioRef} src={musicSrc} loop preload="none" onError={() => setPlaying(false)} />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className={cn(
          "glass-card flex size-14 items-center justify-center rounded-full text-primary transition-transform hover:scale-110",
          playing && "shadow-glow",
        )}
      >
        {playing ? (
          <span className="relative flex items-center justify-center">
            <Music className="size-6 animate-spin-slow" />
            <Pause className="absolute size-3 translate-x-3 translate-y-3 fill-current" />
          </span>
        ) : (
          <Music className="size-6" />
        )}
      </button>
      {missing && (
        <span className="glass-card rounded-full px-4 py-2 font-hand text-lg text-plum animate-in fade-in slide-in-from-left-2">
          Music is on its way 🎵
        </span>
      )}
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full bg-romance text-primary-foreground shadow-glow transition-all duration-500 hover:-translate-y-1",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Heart className="size-6 animate-heart-pulse fill-current" />
    </button>
  );
}
