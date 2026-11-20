import { timeline } from "@/content/pari";
import { cn } from "@/lib/utils";
import { Reveal, SectionTitle } from "./Reveal";

export function Timeline() {
  return (
    <section id="story" className="relative scroll-mt-28 px-5 py-24">
      <SectionTitle kicker="every moment counts" title="Our Little Story" />

      <ol className="relative mx-auto max-w-5xl">
        <span
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-0.5 rounded-full bg-romance opacity-60 md:left-1/2 md:-translate-x-1/2"
        />
        {timeline.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <li key={item.title} className="relative mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-16">
              <span
                aria-hidden
                className="absolute top-8 left-4 z-10 size-4 -translate-x-1/2 rounded-full border-2 border-card bg-primary shadow-glow md:left-1/2"
              />
              <Reveal
                rotate={left ? -3 : 3}
                className={cn(
                  "ml-12 md:ml-0",
                  left ? "md:col-start-1 md:text-right" : "md:col-start-2",
                )}
              >
                <article
                  className={cn(
                    "glass-card group relative rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7",
                    left ? "md:rotate-[-1deg]" : "md:rotate-[1deg]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-3 animate-soft-float text-xl text-primary",
                      left ? "right-6" : "left-6 md:left-auto md:right-6",
                    )}
                  >
                    ♥
                  </span>
                  <p className="font-hand text-2xl text-primary">{item.date}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-plum">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
