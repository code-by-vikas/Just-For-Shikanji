import { scrollToId } from "./Navbar";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-5 pt-32 pb-10 text-center">
      <p className="font-hand text-3xl text-primary animate-site-in">welcome to</p>
      <h1 className="mt-2 text-6xl font-semibold text-plum animate-site-in sm:text-7xl md:text-8xl">
        Pari's <span className="text-romance italic">World</span>
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-site-in">
        A little scrapbook of voices, games, gaaliyan, smiles and every moment that made you you.
      </p>
      <button onClick={() => scrollToId("story")} className="btn-romance mt-10 animate-site-in">
        ♡ Begin our story ♡
      </button>
    </section>
  );
}
