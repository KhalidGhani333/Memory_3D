import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { shapes, type Shape } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";
import { Configurator } from "@/components/shop/Configurator";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop 3D Crystal Gifts -  Memory3D" },
      {
        name: "description",
        content:
          "Browse all premium 3D laser-engraved crystal gifts. Crystals, keychains, ornaments, pet memorials and more -  all made from your photo.",
      },
    ],
  }),
  component: ShopCatalog,
});

/* ─── Product metadata ─── */
const productMeta: Record<
  string,
  { category: "crystal" | "keychain" | "pet" | "lamp"; description: string; badge?: string }
> = {
  "rectangle-tall":   { category: "crystal",  description: "Classic portrait format -  perfect for individuals or couples.", badge: "Most Popular" },
  "rectangle-wide":   { category: "crystal",  description: "Landscape format -  ideal for groups and family panoramas." },
  heart:              { category: "crystal",  description: "Romantic heart shape -  our top-selling wedding keepsake.", badge: "Bestseller" },
  prestige:           { category: "crystal",  description: "Elegant beveled crystal with a premium angled finish.", badge: "Premium" },
  ball:               { category: "crystal",  description: "Spherical optical crystal that stuns from every angle." },
  "cut-corner-diamond": { category: "crystal", description: "Diamond cut with signature angled corners -  great value.", badge: "Great Value" },
  candle:             { category: "crystal",  description: "Cylindrical crystal that glows beautifully with any lightbase." },
  urn:                { category: "crystal",  description: "Memorial urn with 3D engraved portrait -  forever cherished." },
  "notched-tall":     { category: "crystal",  description: "Tall crystal with a distinctive notched top -  modern look." },
  "notched-wide":     { category: "crystal",  description: "Wide-format notched crystal -  great for landscape photos." },
  "desk-lamp":        { category: "lamp",     description: "Crystal integrated into an elegant illuminated desk lamp." },
  ornament:           { category: "crystal",  description: "Holiday ornament -  a perfect seasonal crystal keepsake.", badge: "Seasonal" },
  "vertical-keychain":   { category: "keychain", description: "Carry your memory everywhere you go.", badge: "Gift Idea" },
  "horizontal-keychain": { category: "keychain", description: "Horizontal crystal keychain -  sleek and modern." },
  "heart-keychain":      { category: "keychain", description: "Heart-shaped crystal on a keychain -  the perfect small gift." },
  "heart-necklace":      { category: "keychain", description: "Wearable crystal heart necklace pendant -  wear your memory." },
  "dog-bone-vertical":   { category: "pet",     description: "Vertical dog bone crystal -  honour your beloved pet." },
  "dog-bone-horizontal": { category: "pet",     description: "Horizontal dog bone crystal -  a touching pet memorial." },
};

const FILTERS = [
  { key: "all",     label: "All",               icon: "✦" },
  { key: "crystal", label: "Crystals",           icon: "💎" },
  { key: "keychain",label: "Keychains & Jewelry",icon: "🔑" },
  { key: "pet",     label: "Pet Memorials",      icon: "🐾" },
  { key: "lamp",    label: "Desk Lamps",         icon: "💡" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/* ─── Catalog page ─── */
function ShopCatalog() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return shapes;
    return shapes.filter((s) => productMeta[s.id]?.category === activeFilter);
  }, [activeFilter]);

  const getStartingPrice = (id: string) => {
    const s = shapes.find((s) => s.id === id);
    return s ? Math.min(...s.sizes.map((z) => z.price)) : 0;
  };

  const handleSelectShape = (shape: Shape) => {
    setSelectedShape(shape);
    // Scroll to configurator after a short delay to allow React to render it
    setTimeout(() => {
      document.getElementById("configurator-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-background min-h-screen">

      {/* ══════════ HERO BANNER ══════════ */}
      {!selectedShape && (
        <section className="relative pt-36 pb-20 overflow-hidden">
          {/* Soft gradient bg */}
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-10">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="text-gold font-semibold">Shop</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="label-chip mb-4 block">Our Collection</span>
                <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] text-foreground">
                  Shop All<br />
                  <em className="text-gradient-gold not-italic font-light">Crystals</em>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
                  Choose your shape, upload your photo, select your size -  we'll craft a
                  stunning 3D laser-engraved keepsake delivered to your door.
                </p>
              </div>

              {/* Stats block */}
              <div className="flex gap-10 lg:gap-12 shrink-0 pb-2">
                {[
                  { n: shapes.length + "+", l: "Products" },
                  { n: "50k+", l: "Happy Customers" },
                  { n: "4.9★", l: "Avg Rating" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-display text-3xl md:text-4xl text-gradient-gold">{s.n}</div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ STICKY FILTER BAR ══════════ */}
      {!selectedShape && (
        <div className="sticky top-[68px] z-30 bg-white/96 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_0_oklch(0.87_0.006_80/0.5),0_4px_16px_-4px_oklch(0_0_0/0.04)]">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3.5">
              {FILTERS.map((f) => {
                const count = f.key === "all"
                  ? shapes.length
                  : shapes.filter((s) => productMeta[s.id]?.category === f.key).length;
                const isActive = activeFilter === f.key;

                return (
                  <motion.button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    layout
                    className={`btn-shine shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] tracking-[0.18em] uppercase font-bold transition-all duration-250 ${
                      isActive
                        ? "bg-gradient-gold text-white shadow-gold"
                        : "bg-muted text-muted-foreground hover:bg-card hover:text-foreground border border-border hover:border-gold/30"
                    }`}
                  >
                    <span className="text-[11px]">{f.icon}</span>
                    {f.label}
                    <span className={`text-[9px] font-normal ${isActive ? "text-white/70" : "text-muted-foreground"}`}>
                      ({count})
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ PRODUCT SELECTION ══════════ */}
      <section className={`${selectedShape ? "pt-24 pb-14" : "py-14 pb-32"}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          
          {selectedShape && (
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-2">
                STUNNING 3D GIFT
              </h2>
              <p className="text-muted-foreground tracking-[0.1em] uppercase text-[11px] font-semibold">
                MADE FROM YOUR PHOTO
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={`${
                selectedShape 
                  ? "flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-px-10 justify-center" 
                  : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              }`}
            >
              {filtered.map((shape, i) => {
                const meta    = productMeta[shape.id];
                const price   = getStartingPrice(shape.id);
                const sizes   = shape.sizes.length;
                const isSelected = selectedShape?.id === shape.id;

                return (
                  <motion.article
                    key={shape.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.035, 0.35), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`${selectedShape ? "min-w-[160px] md:min-w-[200px] snap-start" : "group"}`}
                  >
                    <div 
                      onClick={() => handleSelectShape(shape)}
                      className={`block cursor-pointer transition-all duration-300 rounded-2xl ${
                        isSelected 
                          ? "ring-2 ring-gold p-1" 
                          : selectedShape ? "opacity-60 grayscale-[0.2] hover:opacity-100 hover:grayscale-0" : ""
                      }`}
                    >

                      {/* ── Image card ── */}
                      <div className={`card-lift relative aspect-square rounded-xl overflow-hidden bg-card border border-border/80 shadow-card ${selectedShape ? "mb-2" : "mb-4"}`}>

                        {/* Subtle radial glow bg */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,oklch(0.62_0.14_79/0.06),transparent_65%)]" />

                        {/* Product image -  scales on hover */}
                        <div className={`absolute inset-0 flex items-center justify-center ${selectedShape ? "p-4" : "p-7"}`}>
                          <motion.img
                            src={shape.thumbImage}
                            alt={shape.label}
                            className="max-w-full max-h-full object-contain drop-shadow-sm"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://placehold.co/280x280?text=${encodeURIComponent(shape.label)}`;
                            }}
                          />
                        </div>

                        {/* Badge -  hide if selectedShape view to save space */}
                        {!selectedShape && meta?.badge && (
                          <div className="absolute top-3 left-3">
                            <span className="badge-gold">{meta.badge}</span>
                          </div>
                        )}

                        {/* Sizes chip -  hide if selectedShape view */}
                        {!selectedShape && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-semibold shadow-sm border border-border/50">
                            {sizes} size{sizes > 1 ? "s" : ""}
                          </div>
                        )}

                        {/* Hover CTA sweep */}
                        {!selectedShape && (
                          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-400 bg-gradient-to-t from-black/75 via-black/15 to-transparent">
                            <motion.div
                              initial={{ y: 10 }}
                              whileInView={{ y: 0 }}
                              className="btn-shine flex items-center justify-center gap-2 w-full py-3 bg-gradient-gold text-white rounded-full text-[10px] tracking-[0.22em] uppercase font-bold shadow-gold"
                            >
                              Customize Now
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </motion.div>
                          </div>
                        )}
                      </div>

                      {/* ── Product info ── */}
                      <div className="px-0.5 mt-1 text-center">
                        <h3 className={`${selectedShape ? "text-[12px]" : "text-[1.15rem] md:text-[1.25rem]"} font-display text-foreground leading-snug group-hover:text-gold transition-colors duration-200 mb-1`}>
                          {shape.label}
                        </h3>
                        {!selectedShape && meta?.description && (
                          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1 mb-2.5">
                            {meta.description}
                          </p>
                        )}
                        {!selectedShape && (
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] tracking-[0.15em] uppercase font-bold text-gold">
                              From ${price}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              {sizes} sizes
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {selectedShape && (
            <div className="flex items-center justify-center gap-3 text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-12">
              <span className="h-px w-8 bg-border" />
              Swipe for more products
              <span className="h-px w-8 bg-border" />
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-40">
              <Sparkles className="w-10 h-10 text-gold/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No products in this category yet.</p>
            </div>
          )}

          {/* ══════════ CONFIGURATOR SECTION ══════════ */}
          {selectedShape && (
            <div id="configurator-section">
              <Configurator shape={selectedShape} />
            </div>
          )}
        </div>
      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="py-24 bg-gradient-crystal border-t border-border/60">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <span className="label-chip justify-center mb-6 block">Need Help Choosing?</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Talk to a crystal specialist.
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Not sure which product suits your occasion? Our team is ready to guide you to the
              perfect keepsake.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-shine inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-gold text-white rounded-full text-[10px] tracking-[0.25em] uppercase font-bold shadow-gold hover:-translate-y-px transition-transform"
              >
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border border-gold/40 text-foreground rounded-full text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-gold/5 hover:border-gold transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
