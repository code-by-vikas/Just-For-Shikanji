import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fades/slides children in once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-rotate": `${rotate}deg` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="font-hand text-2xl text-primary sm:text-3xl">{kicker}</p>
      <h2 className="mt-1 text-4xl font-semibold text-plum sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-3 text-primary">
        <span className="h-px w-12 bg-romance" />
        <span className="animate-heart-pulse">♥</span>
        <span className="h-px w-12 bg-romance" />
      </div>
    </Reveal>
  );
}
