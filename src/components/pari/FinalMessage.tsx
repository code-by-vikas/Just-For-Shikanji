import { finalMessage } from "@/content/pari";
import { Reveal } from "./Reveal";

export function FinalMessage() {
  return (
    <section id="message" className="relative scroll-mt-28 px-5 py-24">
      <Reveal className="mx-auto max-w-2xl">
        <div className="glass-card relative rounded-[2rem] px-7 py-14 text-center sm:px-14">
          <div className="mx-auto -mt-20 mb-6 flex size-16 animate-heart-pulse items-center justify-center rounded-full bg-romance text-3xl text-primary-foreground shadow-glow">
            ♥
          </div>
          <h2 className="text-4xl font-semibold italic text-plum sm:text-5xl">{finalMessage.heading}</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/85">
            {finalMessage.paragraphs.map((p, i) => (
              <p key={i} className={i === finalMessage.paragraphs.length - 1 ? "font-hand text-3xl text-primary" : ""}>
                {p}
              </p>
            ))}
          </div>
          <p className="mt-10 font-hand text-4xl text-romance">{finalMessage.signature}</p>
        </div>
      </Reveal>
    </section>
  );
}
