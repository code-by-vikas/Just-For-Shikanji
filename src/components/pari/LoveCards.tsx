import { loves } from "@/content/pari";
import { Reveal, SectionTitle } from "./Reveal";

export function LoveCards() {
  return (
    <section id="love" className="relative scroll-mt-28 px-5 py-24">
      <SectionTitle kicker="the little things" title="Things I Love About You" />
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loves.map((l, i) => (
          <Reveal key={l.title} delay={(i % 3) * 120}>
            <div className="glass-card group h-full rounded-3xl p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:rotate-[-1deg] hover:shadow-glow">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blush text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {l.emoji}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-plum">{l.title}</h3>
              <p className="mt-2 font-hand text-2xl leading-snug text-muted-foreground">{l.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
