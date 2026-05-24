import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

import pHeart from "@/assets/product-rotating-heart.webp";
import pSilver from "@/assets/product-lightbase-silver-heart.webp";
import pKey from "@/assets/product-keychain.webp";
import pWood from "@/assets/product-wooden-premium.webp";
import incBg from "@/assets/include-bg.webp";
import shapeHeart from "@/assets/shape-heart.png";
import shapeTall from "@/assets/shape-rect-tall.png";
import shapeTall2 from "@/assets/shape-rect-tall-2.png";
import shapeWide from "@/assets/shape-rect-wide.png";
import c1 from "@/assets/3D_Crystals_1.avif";
import c2 from "@/assets/3D_Crystals_2.avif";
import c3 from "@/assets/3D_Crystals_3.avif";
import c4 from "@/assets/3D_Crystals_4.avif";
import c5 from "@/assets/3D_Crystals_5.avif";
import c6 from "@/assets/3D_Crystals_6.avif";

const cats = ["All", "Hearts", "Lightbase", "Keychains", "Premium", "Couples", "Pets"] as const;

const products = [
  { img: pHeart, title: "Rotating Heart Lightbase", price: 95, cat: "Hearts" },
  { img: pSilver, title: "Silver Heart Lightbase", price: 85, cat: "Hearts" },
  { img: pWood, title: "Wooden Premium Lightbase", price: 145, cat: "Premium" },
  { img: pKey, title: "Photo Crystal Keychain", price: 35, cat: "Keychains" },
  { img: c1, title: "Tall Rectangle Crystal", price: 65, cat: "Lightbase" },
  { img: c2, title: "Wide Rectangle Crystal", price: 75, cat: "Couples" },
  { img: c3, title: "Heart Couples Crystal", price: 90, cat: "Couples" },
  { img: c4, title: "Family Memorial Cube", price: 110, cat: "Premium" },
  { img: c5, title: "Pet Portrait Crystal", price: 70, cat: "Pets" },
  { img: c6, title: "Anniversary Lightbase", price: 95, cat: "Premium" },
];

const shapes = [
  { img: shapeHeart, label: "Heart" },
  { img: shapeTall, label: "Tall Rectangle" },
  { img: shapeTall2, label: "Portrait" },
  { img: shapeWide, label: "Wide Rectangle" },
];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop 3D Crystal Gifts — Memory3D" },
      { name: "description", content: "Browse our full collection of personalized 3D laser-engraved crystals, lightbases, keychains and premium gifts." },
      { property: "og:title", content: "Shop — Memory3D" },
      { property: "og:description", content: "Personalized 3D crystals for every milestone." },
      { property: "og:image", content: pHeart },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.cat === active);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-40 pb-16 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">The Collection</span>
            <h1 className="font-display text-6xl md:text-7xl mt-3 max-w-3xl leading-[0.95]">
              Crystal gifts, <em className="text-gradient-gold not-italic">made for you.</em>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Choose your shape, upload your photo, and we'll handle the rest. Every piece is laser-etched in optical-grade crystal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Shape selector */}
      <section className="py-20 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-3xl">1. Pick your shape</h2>
              <span className="text-xs text-muted-foreground tracking-wider uppercase">Step 1 of 3</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shapes.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <button className="group w-full aspect-square bg-ink border border-border hover:border-gold rounded-sm grid place-items-center p-8 transition-all hover:-translate-y-1">
                  <img src={s.img} alt={s.label} className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition" />
                </button>
                <div className="mt-3 text-center text-sm text-muted-foreground group-hover:text-gold">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <Reveal>
              <h2 className="font-display text-4xl">2. Browse crystals</h2>
            </Reveal>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4 text-gold" />
              <span className="text-[11px] tracking-[0.25em] uppercase">Filter</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2 text-[11px] tracking-[0.2em] uppercase rounded-sm border transition ${
                  active === c
                    ? "bg-gradient-gold text-primary-foreground border-transparent"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.08}>
                <article className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-card border border-border rounded-sm">
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition flex items-end p-5">
                      <span className="text-[11px] tracking-[0.3em] uppercase text-gold border border-gold/60 px-4 py-2 rounded-sm bg-background/70">
                        Customize
                      </span>
                    </div>
                  </div>
                  <div className="pt-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg leading-snug">{p.title}</h3>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">{p.cat}</p>
                    </div>
                    <span className="font-display text-xl text-gold whitespace-nowrap">${p.price}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-32 bg-card/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-luxe">
              <img src={incBg} alt="" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <span className="text-[11px] tracking-[0.35em] uppercase text-gold">Every Order Includes</span>
              <h2 className="font-display text-5xl mt-4 leading-tight">A complete crystal experience.</h2>
              <ul className="mt-8 space-y-5 text-foreground/90">
                {[
                  "Premium optical-grade crystal, hand-polished",
                  "Free photo enhancement by our retouch team",
                  "Lifetime guarantee on engraving quality",
                  "Luxury gift box, ready to give",
                  "Free expedited shipping in the US",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold">
                Order Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
