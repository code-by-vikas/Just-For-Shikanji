import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "story", label: "Our Story" },
  { id: "love", label: "I Love" },
  { id: "gallery", label: "Gallery" },
  { id: "letter", label: "Letter" },
  { id: "message", label: "Message" },
];

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-30 px-4">
      <nav className="glass-card mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3 sm:px-7">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg font-semibold text-plum sm:text-xl"
        >
          💗 Pari's World
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-blush hover:text-plum"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-full p-2 text-plum transition-colors hover:bg-blush md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "glass-card mx-auto mt-3 max-w-5xl origin-top overflow-hidden rounded-3xl transition-all duration-300 md:hidden",
          open ? "max-h-96 scale-100 opacity-100" : "pointer-events-none max-h-0 scale-95 opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="w-full rounded-2xl px-4 py-3 text-left font-medium text-foreground/85 transition-colors hover:bg-blush hover:text-plum"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
