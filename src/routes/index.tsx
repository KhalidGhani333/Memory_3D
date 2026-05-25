import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Gift,
  Calendar,
  Star,
  Camera,
  Cog,
  Truck,
  Trophy,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { QuickConfigModal } from "@/components/shop/QuickConfigModal";
import { Shape, shapes } from "@/data/products";

import heroCover from "@/assets/hero_cover.avif";
import familyCover from "@/assets/Family_Cover.avif";
import jamesCover from "@/assets/James_Castle-Cover.avif";
import sculpturesCover from "@/assets/Memory3D_Sculptures.avif";
import sculpturesCover1 from "@/assets/Memory3D_Sculptures_1.avif";

import c1 from "@/assets/3D_Crystals_1.avif";
import c2 from "@/assets/3D_Crystals_2.avif";
import c3 from "@/assets/3D_Crystals_3.avif";
import c4 from "@/assets/3D_Crystals_4.avif";
import c5 from "@/assets/3D_Crystals_5.avif";
import c6 from "@/assets/3D_Crystals_6.avif";

import s1 from "@/assets/3D-Sculp-1.avif";
import s2 from "@/assets/3D-Sculp-2.avif";
import s4 from "@/assets/3D-Sculp-4.jpg";
import s5 from "@/assets/3D-Sculp-5.jpg";
import s6 from "@/assets/3D-Sculp-6.jpg";
import s7 from "@/assets/3D-Sculp-7.jpg";

import m0 from "@/assets/memory_0.avif";
import m1 from "@/assets/memory_1.avif";
import m2 from "@/assets/memory_2.avif";
import m3 from "@/assets/memory_3.avif";
import m4 from "@/assets/memory_4.avif";
import m5 from "@/assets/memory_5.avif";
import m6 from "@/assets/memory_6.avif";
import m7 from "@/assets/memory_7.avif";
import m8 from "@/assets/memory_8.avif";
import m9 from "@/assets/memory_9.avif";

import pHeart from "@/assets/product-rotating-heart.webp";
import pSilver from "@/assets/product-lightbase-silver-heart.webp";
import pKey from "@/assets/product-keychain.webp";
import pWood from "@/assets/product-wooden-premium.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Memory3D -  Forever in Crystal | 3D Laser-Engraved Gifts" },
      {
        name: "description",
        content:
          "Turn your most precious moments into stunning 3D laser-engraved crystals and full-color sculptures. Weddings, memorials, pets and milestones -  preserved forever.",
      },
      { property: "og:title", content: "Memory3D -  Forever in Crystal" },
      {
        property: "og:description",
        content:
          "Premium 3D crystals and sculptures, personalized for the moments that matter.",
      },
      { property: "og:image", content: heroCover },
    ],
  }),
  component: Home,
});

const categories = [
  {
    title: "Weddings",
    img: familyCover,
    to: "/weddings",
    copy: "The first dance, captured in light.",
  },
  {
    title: "Memorials",
    img: jamesCover,
    to: "/memorials",
    copy: "Hold their memory in your hands.",
  },
  {
    title: "Sports Events",
    img: m4,
    to: "/shop",
    copy: "Trophy moments preserved in crystal.",
  },
  {
    title: "Custom Gifts",
    img: c2,
    to: "/shop",
    copy: "Birthdays, anniversaries, milestones.",
  },
];

const featured = [
  { img: pHeart, title: "Rotating Heart Crystal", price: 95, tag: "Bestseller", shapeId: "heart" },
  { img: pSilver, title: "Silver Lightbase Heart", price: 85, tag: "New", shapeId: "heart" },
  {
    img: pWood,
    title: "Wooden Premium Lightbase",
    price: 145,
    tag: "Premium",
    shapeId: "rectangle-tall",
  },
  {
    img: pKey,
    title: "Engraved Keychain",
    price: 35,
    tag: "Gift",
    shapeId: "vertical-keychain",
  },
];

const memoryWall = [
  { src: m0, tall: true },
  { src: c1, tall: false },
  { src: m1, tall: false },
  { src: m2, tall: false },
  { src: c2, tall: true },
  { src: m3, tall: false },
  { src: m4, tall: false },
  { src: c3, tall: false },
  { src: m5, tall: true },
  { src: m6, tall: false },
  { src: c4, tall: false },
  { src: m7, tall: false },
  { src: c5, tall: true },
  { src: m8, tall: false },
  { src: m9, tall: false },
  { src: c6, tall: false },
];

const sculptureShots = [
  { src: s4, pos: "object-[center_top]" },
  { src: s1, pos: "object-cover" },
  { src: s5, pos: "object-cover" },
  { src: s7, pos: "object-cover" },
  { src: s2, pos: "object-cover" },
  { src: s6, pos: "object-cover" },
];

const steps = [
  {
    icon: Camera,
    title: "Scan",
    body: "We capture you in 12 seconds with our pop-up 3D scanner or upload a single photo from anywhere.",
  },
  {
    icon: Cog,
    title: "Craft",
    body: "Master artisans render your model and laser-etch millions of micro-points inside premium optical crystal.",
  },
  {
    icon: Truck,
    title: "Cherish",
    body: "Hand-inspected, gift-boxed and delivered to your door in 10–14 days. Forever yours.",
  },
];

function Home() {
  const [quickConfigOpen, setQuickConfigOpen] = useState(false);
  const [quickConfigShape, setQuickConfigShape] = useState<Shape | null>(null);

  const handleOpenQuickConfig = (shapeId: string) => {
    const shape = shapes.find((s) => s.id === shapeId);
    if (shape) {
      setQuickConfigShape(shape);
      setQuickConfigOpen(true);
    }
  };

  return (
    <div className="bg-background overflow-x-hidden">
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-screen flex items-end pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/home_cover_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] tracking-[0.35em] uppercase text-gold font-medium">
                  Premium 3D Crystal Studio
                </span>
              </div>
              <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-white">
                Hold the moment <br />
                <em className="text-gradient-gold not-italic font-light">forever</em> in crystal.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light">
                Personalized 3D laser-engraved crystals and full-color sculptures. For weddings,
                memorials, milestones and everything that mattered enough to keep.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="btn-shine group inline-flex items-center justify-center gap-3 bg-gradient-gold text-white px-9 py-4 text-[11px] tracking-[0.3em] uppercase shadow-gold rounded-full hover:-translate-y-px transition-all duration-300 font-bold hover:shadow-[0_8px_28px_-4px_oklch(0.62_0.14_79/0.55)]"
                >
                  Shop Crystals{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 border border-white/40 text-white px-9 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-white/10 hover:border-white/70 rounded-full transition-all duration-300 font-medium"
                >
                  Schedule a Scan
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="space-y-6 text-right"
            >
              <div className="inline-block hairline pt-6">
                <div className="text-5xl font-display text-gradient-gold">50,000+</div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/55 mt-2">
                  Memories carved
                </p>
              </div>
              <div className="inline-block hairline pt-6 ml-8">
                <div className="text-5xl font-display text-gradient-gold">4.9★</div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/55 mt-2">
                  From 12k+ reviews
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/50 uppercase">
          Scroll
        </div>
      </section>

      {/* ───────── CATEGORIES ───────── */}
      <section className="py-32 relative bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="label-chip justify-center mb-4 block">Collections</span>
              <h2 className="font-display text-5xl md:text-6xl mt-4 text-foreground">
                A keepsake for every <em className="text-gradient-gold not-italic">chapter</em>.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.08}>
                <Link
                  to={cat.to}
                  className="group block relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm"
                >
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  {/* Dark overlay for image cards -  always dark for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-gold/50 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="font-display text-3xl text-white mb-2">{cat.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{cat.copy}</p>
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold font-medium">
                      Explore{" "}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FEATURED PRODUCTS ───────── */}
      <section className="py-32 bg-gradient-crystal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <Reveal>
              <div>
                <span className="label-chip mb-4 block">Featured</span>
                <h2 className="font-display text-5xl md:text-6xl mt-4 text-foreground max-w-xl">
                  The pieces everyone's gifting.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                to="/shop"
                className="text-[11px] tracking-[0.3em] uppercase text-gold inline-flex items-center gap-2 hover:gap-3 transition-all font-medium"
              >
                View all crystals <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Infinite Carousel */}
        <div className="relative">
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 50,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ width: "fit-content" }}
          >
            {[...featured, ...featured, ...featured, ...featured].map((p, i) => (
              <div key={i} className="w-[280px] md:w-[320px] shrink-0 group">
                <div className="relative aspect-square overflow-hidden bg-card border border-border rounded-2xl shadow-sm">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 badge-gold">
                    {p.tag}
                  </span>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleOpenQuickConfig(p.shapeId)}
                      className="btn-shine w-full bg-gradient-gold text-white py-3 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-gold cursor-pointer"
                    >
                      Customize Now
                    </button>
                  </div>
                </div>
                <div className="pt-5 flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-foreground leading-snug">{p.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* ───────── MEMORY IN MOTION ───────── */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Image mosaic */}
            <Reveal>
              <div className="grid grid-cols-2 gap-4 [grid-auto-rows:200px]">
                <div className="row-span-2 relative overflow-hidden rounded-2xl border border-border shadow-card group">
                  <img
                    src={pHeart}
                    alt="Rotating Heart Crystal"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="badge-gold">Bestseller</span>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-card group">
                  <img
                    src={pSilver}
                    alt="Silver Lightbase"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-card group">
                  <img
                    src={pWood}
                    alt="Wooden Premium Base"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="badge-gold">Premium</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Text */}
            <Reveal delay={0.2}>
              <div>
                <span className="label-chip mb-4 block">Illuminated Collection</span>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mt-4 leading-[1.0] text-foreground">
                  Memory <br />
                  <em className="text-gradient-gold not-italic">in Motion.</em>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Place your crystal on one of our premium LED lightbases and watch your memory
                  come alive. Rotating platforms, colour-changing bases, and warm golden glows —
                  every angle reveals something new.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "360° rotating lightbase — never the same angle twice",
                    "Warm LED glow enhances every engraved detail",
                    "Available in silver, wooden & colour-changing finishes",
                    "Pairs with any crystal shape in our collection",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-gold shrink-0" />
                      <span className="text-[15px] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    to="/shop"
                    className="btn-shine bg-gradient-gold text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full shadow-gold font-bold hover:-translate-y-px transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Shop Lightbases <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="border border-gold/40 px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full hover:border-gold hover:bg-gold/5 transition-all duration-300 text-foreground font-medium"
                  >
                    View All Crystals
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center mb-20">
              <span className="label-chip justify-center mb-4 block">The Process</span>
              <h2 className="font-display text-5xl md:text-6xl mt-4 text-foreground">
                From <em className="text-gradient-gold not-italic">moment</em> to masterpiece.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.15} className="text-center relative">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                  <div className="absolute inset-0 bg-gradient-gold rounded-full opacity-15 blur-xl" />
                  <div className="relative w-24 h-24 rounded-full border border-gold/40 bg-card shadow-sm grid place-items-center">
                    <s.icon className="w-8 h-8 text-gold" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 grid place-items-center rounded-full bg-gradient-gold text-white text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-3xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SCULPTURES BIG FEATURE ───────── */}
      <section className="py-32 bg-card/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div>
              <span className="label-chip mb-4 block">Full-color 3D Sculptures</span>
              <h2 className="font-display text-5xl md:text-6xl mt-4 leading-[1.05] text-foreground">
                You. <br />
                <em className="text-gradient-gold not-italic">In miniature.</em> <br />
                Down to the last freckle.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Step into our scanner. In twelve seconds we capture every detail, your favourite
                jacket, your dog mid-tail-wag, the way you hold your kid. We then craft a
                hand-finished, full-color figurine you'll keep on your shelf forever.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/sculptures"
                  className="btn-shine bg-gradient-gold text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full shadow-gold font-bold hover:-translate-y-px transition-all duration-300"
                >
                  Explore Sculptures
                </Link>
                <Link
                  to="/contact"
                  className="border border-gold/40 px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full hover:border-gold hover:bg-gold/5 transition-all duration-300 text-foreground font-medium"
                >
                  Book a Scan
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 h-[600px]">
              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-sm bg-card shadow-luxe border border-border">
                <img
                  src={sculpturesCover1}
                  alt="3D Sculpture Showcase"
                  className="w-full h-full object-cover object-[center_10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Secondary Grid */}
              <div className="grid grid-cols-2 grid-rows-3 gap-4">
                {sculptureShots.map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-sm shadow-sm border border-border">
                    <img src={img.src} alt="" className={`w-full h-full ${img.pos}`} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── MEMORY WALL ───────── */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-[100vw] px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
              <div className="flex-1">
                <span className="text-[12px] tracking-[0.5em] uppercase text-gold font-bold">
                  The Memory Wall
                </span>
                <h2 className="font-display text-[clamp(3.5rem,10vw,9rem)] mt-6 leading-[0.85] text-foreground">
                  Preserved <br />
                  <em className="text-gradient-gold not-italic">Chapters.</em>
                </h2>
              </div>
              <div className="max-w-lg">
                <p className="text-muted-foreground text-xl leading-relaxed font-light mb-10">
                  Every crystal is a masterpiece of light and memory. Explore our archive of
                  thousands of stories carved for eternity.
                </p>
                <div className="h-[2px] w-full bg-gradient-gold opacity-40" />
              </div>
            </div>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07 },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 [grid-auto-rows:220px]"
          >
            {memoryWall.map((item, i) => (
              <Link key={i} to="/shop" className={item.tall ? "row-span-2" : ""}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-2xl group h-full bg-card border border-border shadow-sm"
                >
                  <motion.img
                    src={item.src}
                    alt=""
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-[filter] duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-6">
                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-gold font-bold flex items-center gap-3">
                        View Story <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-700 pointer-events-none" />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── SCHEDULE VIDEO + CTA ───────── */}
      <section className="py-32 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-32 items-center">
          <Reveal>
            <div className="relative rounded-sm overflow-hidden shadow-luxe aspect-[3/4] max-w-[300px] mx-auto lg:ml-12 border border-gold/20">
              <video
                src="/schedule_vid.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur px-2.5 py-1 rounded-sm text-[9px] tracking-[0.2em] uppercase text-foreground font-medium">
                <span className="w-1 h-1 rounded-full bg-gold animate-pulse" /> Live Scan
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="lg:pr-12">
              <span className="label-chip mb-4 block">Schedule a Scan</span>
              <h2 className="font-display text-5xl md:text-7xl mt-4 leading-[1.05] text-foreground">
                We're coming to <em className="text-gradient-gold not-italic">your city.</em>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed font-light">
                Our pop-up 3D scanners travel nationwide. Sessions take twelve seconds. Book a spot
                for your family, your team, or your wedding party.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Calendar, t: "Same-day appointments" },
                  { icon: Heart, t: "Pets, kids, couples - all welcome" },
                  { icon: Trophy, t: "Sports teams & corporate events" },
                  { icon: Gift, t: "Sculptures and crystals from one scan" },
                ].map(({ icon: I, t }) => (
                  <li key={t} className="flex items-center gap-4 group">
                    <span className="w-10 h-10 grid place-items-center border border-gold/40 rounded-xl group-hover:border-gold bg-white/60 transition-colors">
                      <I className="w-4 h-4 text-gold" />
                    </span>
                    <span className="text-foreground/90 font-medium">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="btn-shine inline-flex items-center gap-3 bg-gradient-gold text-white px-9 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full shadow-gold font-bold hover:-translate-y-px transition-all duration-300"
                >
                  Reserve Your Scan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="label-chip justify-center mb-4 block">Loved by thousands</span>
              <h2 className="font-display text-5xl md:text-6xl mt-4 text-foreground">
                Words from the keepers.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                q: "I cried when I unboxed it. My mother is gone but I see her every morning now. Thank you.",
                a: "Sarah L.",
                c: "Memorial Crystal",
              },
              {
                q: "We surprised my husband with a sculpture of him and our daughter. He hasn't moved it from his desk since.",
                a: "Priya K.",
                c: "Family Sculpture",
              },
              {
                q: "The wedding crystal was on every guest's mind. Best money we spent on the day, by far.",
                a: "Marcus & Jen",
                c: "Wedding Heart",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <figure className="bg-card border border-border p-8 h-full flex flex-col rounded-2xl hover:border-gold/40 hover:shadow-gold transition-all shadow-sm">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl leading-snug text-foreground/90 flex-1">
                    "{t.q}"
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-border/60">
                    <div className="text-sm text-foreground font-medium">{t.a}</div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-gold mt-1">
                      {t.c}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="py-40 relative overflow-hidden bg-gradient-crystal">
        <Reveal>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
            <h2 className="font-display text-6xl md:text-8xl leading-[0.95] text-foreground">
              Some memories <br />
              deserve <em className="text-gradient-gold not-italic">forever.</em>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-lg mx-auto">
              Start with one photo. We'll craft something they'll keep for a lifetime.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/shop"
                className="btn-shine bg-gradient-gold text-white px-10 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full shadow-gold font-bold hover:-translate-y-px transition-all duration-300"
              >
                Start Your Crystal
              </Link>
              <Link
                to="/contact"
                className="border border-gold/40 px-10 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full hover:border-gold hover:bg-gold/5 transition-all duration-300 text-foreground font-medium"
              >
                Talk to a Specialist
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <QuickConfigModal
        isOpen={quickConfigOpen}
        onClose={() => {
          setQuickConfigOpen(false);
          setQuickConfigShape(null);
        }}
        defaultShape={quickConfigShape || shapes[0]}
      />
    </div>
  );
}
