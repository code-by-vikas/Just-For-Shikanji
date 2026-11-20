import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { photos } from "@/content/pari";
import { cn } from "@/lib/utils";
import { Reveal, SectionTitle } from "./Reveal";

const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2", "rotate-2", "-rotate-3"];

function PhotoPlaceholder({ big = false }: { big?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-blush/70 text-primary">
      <Heart className={cn("animate-heart-pulse fill-current", big ? "size-14" : "size-9")} />
      <span className={cn("font-hand text-muted-foreground", big ? "text-3xl" : "text-xl")}>
        a memory coming soon
      </span>
    </div>
  );
}

/** Image that falls back to a pretty placeholder when the file is missing. */
function SafeImage({ src, alt, className, big }: { src: string; alt: string; className?: string; big?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Catch errors that fired before hydration attached onError.
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <PhotoPlaceholder big={big ?? false} />;
  return <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => setActive((a) => (a === null ? a : (a + d + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? undefined : photos[active];

  return (
    <section id="gallery" className="relative scroll-mt-28 px-5 py-24">
      <SectionTitle kicker="frozen little moments" title="Our Gallery" />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-4">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 4) * 100}>
            <button
              onClick={() => setActive(i)}
              className={cn(
                "group block w-full rounded-sm bg-card p-2.5 pb-4 text-left shadow-polaroid transition-all duration-500 hover:z-10 hover:-translate-y-3 hover:rotate-0 hover:scale-105 hover:shadow-dreamy sm:p-3 sm:pb-5",
                ROTATIONS[i % ROTATIONS.length],
              )}
              aria-label={`Open photo: ${p.caption}`}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <SafeImage
                  src={p.src}
                  alt={p.caption}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <p className="mt-3 text-center font-hand text-lg leading-tight text-plum sm:text-2xl">{p.caption}</p>
            </button>
          </Reveal>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={close} className="absolute top-5 right-5 rounded-full bg-card/90 p-2 text-plum" aria-label="Close">
            <X className="size-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 rounded-full bg-card/90 p-2 text-plum sm:left-8"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" />
          </button>
          <figure
            key={active}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-sm bg-card p-3 pb-6 shadow-dreamy animate-in zoom-in-95 fade-in duration-300 sm:p-4 sm:pb-8"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <SafeImage src={current.src} alt={current.caption} big className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-4 text-center font-hand text-3xl text-plum">{current.caption}</figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 rounded-full bg-card/90 p-2 text-plum sm:right-8"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  );
}
