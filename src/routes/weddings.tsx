import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import cover from "@/assets/Family_Cover.avif";
import m1 from "@/assets/memory_1.avif";
import m3 from "@/assets/memory_3.avif";
import m5 from "@/assets/memory_5.avif";
import pHeart from "@/assets/product-rotating-heart.webp";
import pSilver from "@/assets/product-lightbase-silver-heart.webp";

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title: "Wedding Crystals — Memory3D" },
      {
        name: "description",
        content:
          "Capture your wedding day inside premium 3D crystal. First dance, vows, the kiss — preserved forever.",
      },
      { property: "og:title", content: "Wedding Crystals — Memory3D" },
      { property: "og:description", content: "The most beautiful day, forever in crystal." },
      { property: "og:image", content: cover },
    ],
  }),
  component: Weddings,
});

function Weddings() {
  return (
    <div className="bg-background">
      <section className="relative min-h-[85vh] flex items-end pt-40 pb-24">
        <div className="absolute inset-0">
          <img src={cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">
              Wedding Collection
            </span>
            <h1 className="font-display text-6xl md:text-8xl mt-4 max-w-4xl leading-[0.95]">
              The day you said <em className="text-gradient-gold not-italic">yes.</em>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl">
              Carve your first dance, your vows, the moment you became one into crystal that
              catches every light for the rest of your life.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-9 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold"
            >
              Shop Wedding Crystals <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-6">
        {[
          { img: pHeart, t: "Heart Lightbase", p: 95, d: "Our signature wedding piece." },
          { img: pSilver, t: "Silver Heart", p: 85, d: "Sleek, modern, timeless." },
          { img: m5, t: "Couples Cube", p: 110, d: "Three-dimensional first dance." },
        ].map((p, i) => (
          <Reveal key={p.t} delay={i * 0.1}>
            <div className="group">
              <div className="aspect-[4/5] overflow-hidden bg-card rounded-sm">
                <img
                  src={p.img}
                  alt={p.t}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-5 flex justify-between">
                <div>
                  <h3 className="font-display text-2xl">{p.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.d}</p>
                </div>
                <span className="font-display text-2xl text-gold">${p.p}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="py-32 bg-card/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl leading-tight">
              "We surprised each other with crystals on our first anniversary. It's the best gift
              we've ever given."
            </h2>
            <p className="mt-6 text-gold text-[11px] tracking-[0.3em] uppercase">— Marcus & Jen</p>
          </Reveal>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[m1, m3, m5].map((src, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
