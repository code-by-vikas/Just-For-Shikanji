import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FloatingBackground } from "@/components/pari/FloatingBackground";
import { Welcome } from "@/components/pari/Welcome";
import { Navbar, scrollToId } from "@/components/pari/Navbar";
import { Hero } from "@/components/pari/Hero";
import { Timeline } from "@/components/pari/Timeline";
import { LoveCards } from "@/components/pari/LoveCards";
import { Gallery } from "@/components/pari/Gallery";
import { Letter } from "@/components/pari/Letter";
import { FinalMessage } from "@/components/pari/FinalMessage";
import { BackToTop, MusicButton } from "@/components/pari/FloatingButtons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pari's World 💗 A little corner made just for you" },
      {
        name: "description",
        content: "A dreamy little scrapbook of memories, photos and a letter, made just for Pari.",
      },
      { property: "og:title", content: "Pari's World 💗" },
      {
        property: "og:description",
        content: "Someone has made a little corner of the internet just for you...",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Phase = "welcome" | "leaving" | "open";

function Index() {
  const [phase, setPhase] = useState<Phase>("welcome");

  const handleOpen = () => {
    setPhase("leaving");
    setTimeout(() => setPhase("open"), 1200);
  };

  useEffect(() => {
    if (phase !== "open") return;
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => scrollToId("story"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingBackground />

      {phase !== "open" && <Welcome leaving={phase === "leaving"} onOpen={handleOpen} />}

      {phase === "open" && <Navbar />}
      {phase === "open" && <BackToTop />}

      {phase === "open" && (
        <div className="relative z-10 animate-site-in">
          <main>
            <Hero />
            <Timeline />
            <LoveCards />
            <Gallery />
            <Letter />
            <FinalMessage />
          </main>
          <footer className="pb-24 pt-6 text-center font-hand text-2xl text-muted-foreground">
            made with <span className="inline-block animate-heart-pulse text-primary">♥</span> only for Pari
          </footer>
        </div>
      )}

      <MusicButton />
    </div>
  );
}
