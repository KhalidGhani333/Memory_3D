import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero_cover.avif";
import sculp from "@/assets/Memory3D_Sculptures_1.avif";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Memory3D — The Art of Crystal Keepsakes" },
      { name: "description", content: "We carve memory into crystal. Meet the studio, the artisans and the process behind every Memory3D piece." },
      { property: "og:title", content: "About — Memory3D" },
      { property: "og:description", content: "The art of crystal keepsakes." },
      { property: "og:image", content: hero },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-background">
      <section className="pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">Our Story</span>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-[0.95]">
              We carve memory <br />into <em className="text-gradient-gold not-italic">crystal.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-luxe">
              <img src={hero} alt="" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Memory3D began in a small studio with one belief: the moments that shape us deserve more than a folder on a phone.
              </p>
              <p>
                Today our artisans use precision lasers to etch millions of micro-points inside optical-grade crystal,
                rendering your most precious photographs in three dimensions you can hold, light, and pass down.
              </p>
              <p>
                Over 50,000 families have trusted us with their first dances, their last goodbyes, the faces they don't want to forget.
                We don't take that lightly. Every crystal is hand-inspected before it leaves the studio.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-12">
          {[
            { n: "50k+", t: "Memories carved" },
            { n: "12 yrs", t: "Crafting crystal" },
            { n: "4.9★", t: "Average rating" },
          ].map((s) => (
            <Reveal key={s.t}>
              <div className="text-center">
                <div className="font-display text-7xl text-gradient-gold">{s.n}</div>
                <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{s.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl leading-tight">
              Hand-finished. <em className="text-gradient-gold not-italic">Always.</em>
            </h2>
            <p className="mt-6 text-muted-foreground">
              From the first frame retouched by our digital team to the final crystal polished by our artisans —
              every step happens under one roof, in one studio, by one team.
            </p>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold">
              Visit the Studio <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={sculp} alt="" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
