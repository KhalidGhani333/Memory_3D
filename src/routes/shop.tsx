import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { shapes, type Shape } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

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

/* ─── Category filters ─── */
const productMeta: Record<string, { category: "crystal" | "keychain" | "pet" | "lamp" }> = {
  "rectangle-tall":      { category: "crystal"  },
  "rectangle-wide":      { category: "crystal"  },
  heart:                 { category: "crystal"  },
  prestige:              { category: "crystal"  },
  ball:                  { category: "crystal"  },
  "cut-corner-diamond":  { category: "crystal"  },
  candle:                { category: "crystal"  },
  urn:                   { category: "crystal"  },
  "notched-tall":        { category: "crystal"  },
  "notched-wide":        { category: "crystal"  },
  "desk-lamp":           { category: "lamp"     },
  ornament:              { category: "crystal"  },
  "vertical-keychain":   { category: "keychain" },
  "horizontal-keychain": { category: "keychain" },
  "heart-keychain":      { category: "keychain" },
  "heart-necklace":      { category: "keychain" },
  "dog-bone-vertical":   { category: "pet"      },
  "dog-bone-horizontal": { category: "pet"      },
};

const FILTERS = [
  { key: "all",      label: "All",                icon: "✦" },
  { key: "crystal",  label: "Crystals",            icon: "💎" },
  { key: "keychain", label: "Keychains & Jewelry", icon: "🔑" },
  { key: "pet",      label: "Pet Memorials",       icon: "🐾" },
  { key: "lamp",     label: "Desk Lamps",          icon: "💡" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/* ─── Catalog page ─── */
function ShopCatalog() {
  // ── ALL hooks must be at the top   no hooks after any conditional return ──
  const matches      = useRouterState({ select: (s) => s.matches });
  const productsRef  = useRef<HTMLDivElement>(null);
  const [activeFilter,  setActiveFilter]  = useState<FilterKey>("all");
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);

  const filteredFrames = useMemo(() => {
    if (activeFilter === "all") return shapes;
    return shapes.filter((s) => productMeta[s.id]?.category === activeFilter);
  }, [activeFilter]);

  const visibleProducts = useMemo(() => {
    const sourceFrames = selectedShape ? [selectedShape] : filteredFrames;
    return sourceFrames.flatMap((s) =>
      s.products.map((p) => ({ ...p, shapeId: s.id, startingPrice: Math.min(...s.sizes.map((z) => z.price)) }))
    );
  }, [selectedShape, filteredFrames]);

  const getStartingPrice = (shape: Shape) => Math.min(...shape.sizes.map((z) => z.price));

  const handleFrameClick = (shape: Shape) => {
    setSelectedShape((prev) => (prev?.id === shape.id ? null : shape));
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleFilterChange = (key: FilterKey) => {
    setActiveFilter(key);
    setSelectedShape(null);
  };

  // ── After all hooks: conditional render for child route ──
  const isProductPage = matches.some((m) => m.routeId === "/shop/$productId");
  if (isProductPage) return <Outlet />;

  return (
    <div className="bg-background min-h-screen">

      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-10">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-gold font-semibold">Shop</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="label-chip mb-4 block">Our Collection</span>
              <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] text-foreground">
                Stunning 3D Gift
              </h1>
              <p className="mt-4 text-[11px] tracking-[0.35em] uppercase font-semibold text-gold">
                Made from your photo
              </p>
              <p className="mt-5 text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
                Choose your frame, pick a design, upload your photo   we'll craft a stunning
                3D laser-engraved keepsake delivered to your door.
              </p>
            </div>
            <div className="flex gap-10 lg:gap-12 shrink-0 pb-2">
              {[
                { n: shapes.length + "+", l: "Frames" },
                { n: "50k+",              l: "Happy Customers" },
                { n: "4.9★",             l: "Avg Rating" },
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

      {/* ══════════ STICKY FILTER BAR ══════════ */}
      <div className="sticky top-[68px] z-30 bg-white/96 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_16px_-4px_oklch(0_0_0/0.04)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3.5">
            {FILTERS.map((f) => {
              const count = f.key === "all" ? shapes.length : shapes.filter((s) => productMeta[s.id]?.category === f.key).length;
              const isActive = activeFilter === f.key;
              return (
                <motion.button
                  key={f.key}
                  layout
                  onClick={() => handleFilterChange(f.key)}
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

      {/* ══════════ STEP 1   FRAME SELECTOR ══════════ */}
      <section className="pt-10 pb-6">
        <div className="px-5 lg:px-10">

          <div className="flex items-center gap-3 mb-5 max-w-7xl mx-auto">
            <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">1</span>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-foreground">Select a Frame</p>
            {selectedShape && (
              <button
                onClick={() => setSelectedShape(null)}
                className="ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-gold transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(130px,1fr)] gap-3 overflow-x-auto no-scrollbar pb-2"
            >
              {filteredFrames.map((shape, i) => {
                const isSelected = selectedShape?.id === shape.id;
                return (
                  <motion.button
                    key={shape.id}
                    onClick={() => handleFrameClick(shape)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i * 0.025, 0.25), duration: 0.3 }}
                    className={`group relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-250 cursor-pointer ${
                      isSelected
                        ? "border-gold bg-gold/5 shadow-gold"
                        : "border-border bg-card hover:border-gold/50 hover:bg-gold/[0.03]"
                    }`}
                  >
                    {/* Frame image */}
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={shape.thumbImage}
                        alt={shape.label}
                        className={`max-w-full max-h-full object-contain transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-105"}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://placehold.co/64x64?text=${encodeURIComponent(shape.label[0])}`;
                        }}
                      />
                    </div>
                    <span className={`text-[9px] tracking-[0.1em] uppercase font-semibold text-center leading-tight transition-colors ${isSelected ? "text-gold" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {shape.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-gold flex items-center justify-center">
                        <span className="text-white text-[7px] font-bold">✓</span>
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════ STEP 2   PRODUCTS GRID ══════════ */}
      <section ref={productsRef} className="pb-28 pt-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">2</span>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-foreground">
                {selectedShape ? `${selectedShape.label}   Products` : "All Products"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
                {selectedShape ? ` · from $${getStartingPrice(selectedShape)}` : ""}
              </p>
            </div>
            {selectedShape && (
              <button
                onClick={() => setSelectedShape(null)}
                className="ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-gold transition-colors"
              >
                <X className="w-3 h-3" /> Show All
              </button>
            )}
          </div>

          {/* Products grid   animate on filter/frame change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedShape?.id ?? activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {visibleProducts.map((product, i) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <Link
                    to="/shop/$productId"
                    params={{ productId: product.shapeId }}
                    className="block"
                  >
                    {/* Product image */}
                    <div className="card-lift relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border/80 shadow-card mb-3">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,oklch(0.62_0.14_79/0.07),transparent_65%)]" />

                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://placehold.co/400x500?text=${encodeURIComponent(product.name)}`;
                        }}
                      />

                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="badge-gold">{product.badge}</span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-350 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <div className="btn-shine flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-gold text-white rounded-full text-[9px] tracking-[0.2em] uppercase font-bold shadow-gold">
                          Customize
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Product info */}
                    <h3 className="text-[13px] font-display text-foreground group-hover:text-gold transition-colors leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] tracking-[0.12em] uppercase font-bold text-gold">
                      From ${product.startingPrice}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
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
