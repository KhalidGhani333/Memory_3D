import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, SlidersHorizontal, ChevronRight } from "lucide-react";
import { shapes } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop 3D Crystal Gifts — Memory3D" },
      {
        name: "description",
        content:
          "Browse all premium 3D laser-engraved crystal gifts. Crystals, keychains, ornaments, pet memorials and more — all made from your photo.",
      },
    ],
  }),
  component: ShopWrapper,
});

/* ─── Metadata for each product ─── */
const productMeta: Record<
  string,
  { category: "crystal" | "keychain" | "pet" | "lamp"; description: string; badge?: string }
> = {
  "rectangle-tall": {
    category: "crystal",
    description: "Classic portrait format — perfect for individuals or couples.",
    badge: "Most Popular",
  },
  "rectangle-wide": {
    category: "crystal",
    description: "Landscape format — ideal for groups and family panoramas.",
  },
  heart: {
    category: "crystal",
    description: "Romantic heart shape — our top-selling wedding keepsake.",
    badge: "Bestseller",
  },
  prestige: {
    category: "crystal",
    description: "Elegant beveled crystal with a premium angled finish.",
    badge: "Premium",
  },
  ball: {
    category: "crystal",
    description: "Spherical optical crystal that stuns from every angle.",
  },
  "cut-corner-diamond": {
    category: "crystal",
    description: "Diamond cut with signature angled corners — great value.",
    badge: "Great Value",
  },
  candle: {
    category: "crystal",
    description: "Cylindrical crystal that glows beautifully with any lightbase.",
  },
  urn: {
    category: "crystal",
    description: "Memorial urn with 3D engraved portrait — forever cherished.",
  },
  "notched-tall": {
    category: "crystal",
    description: "Tall crystal with a distinctive notched top — modern look.",
  },
  "notched-wide": {
    category: "crystal",
    description: "Wide-format notched crystal — great for landscape photos.",
  },
  "desk-lamp": {
    category: "lamp",
    description: "Crystal integrated into an elegant illuminated desk lamp.",
  },
  ornament: {
    category: "crystal",
    description: "Holiday ornament — a perfect seasonal crystal keepsake.",
    badge: "Seasonal",
  },
  "vertical-keychain": {
    category: "keychain",
    description: "Carry your cherished memory everywhere you go.",
    badge: "Gift Idea",
  },
  "horizontal-keychain": {
    category: "keychain",
    description: "Horizontal crystal keychain — sleek and modern.",
  },
  "heart-keychain": {
    category: "keychain",
    description: "Heart-shaped crystal on a keychain — the perfect small gift.",
  },
  "heart-necklace": {
    category: "keychain",
    description: "Wearable crystal heart necklace pendant — wear your memory.",
  },
  "dog-bone-vertical": {
    category: "pet",
    description: "Vertical dog bone crystal — honour your beloved pet.",
  },
  "dog-bone-horizontal": {
    category: "pet",
    description: "Horizontal dog bone crystal — a touching pet memorial.",
  },
};

const FILTERS = [
  { key: "all", label: "All Products" },
  { key: "crystal", label: "Crystals" },
  { key: "keychain", label: "Keychains & Jewelry" },
  { key: "pet", label: "Pet Memorials" },
  { key: "lamp", label: "Desk Lamps" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/* ─── Wrapper: renders catalog at /shop, child route at /shop/$productId ─── */
function ShopWrapper() {
  const state = useRouterState();
  const pathname = state.location.pathname;

  // If we're on exactly /shop or /shop/ → show the catalog
  // If we're deeper (e.g. /shop/heart) → render the child route via Outlet
  const isExact = pathname === "/shop" || pathname === "/shop/";

  if (isExact) {
    return <ShopCatalog />;
  }
  return <Outlet />;
}

function ShopCatalog() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return shapes;
    return shapes.filter((s) => productMeta[s.id]?.category === activeFilter);
  }, [activeFilter]);

  const getStartingPrice = (shapeId: string) => {
    const shape = shapes.find((s) => s.id === shapeId);
    if (!shape) return 0;
    return Math.min(...shape.sizes.map((s) => s.price));
  };

  return (
    <div className="bg-background min-h-screen">
      {/* ───────── PAGE HERO ───────── */}
      <section className="pt-36 pb-16 bg-gradient-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">Shop</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[11px] tracking-[0.35em] uppercase text-gold font-medium">
                  Our Collection
                </span>
                <h1 className="font-display text-5xl md:text-7xl mt-3 leading-[0.95] text-foreground">
                  All Products
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl font-light">
                  Choose your shape, upload your photo, select your size — we'll craft it into a
                  stunning 3D laser-engraved keepsake.
                </p>
              </div>
              <div className="text-right hidden md:block">
                <div className="font-display text-5xl text-gradient-gold">{shapes.length}</div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  Products available
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── FILTER TABS ───────── */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-4">
            <SlidersHorizontal className="w-4 h-4 text-gold mr-3 shrink-0" />
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-bold rounded-sm transition-all ${
                  activeFilter === f.key
                    ? "bg-gradient-gold text-white shadow-gold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border"
                }`}
              >
                {f.label}
                <span
                  className={`ml-2 text-[9px] opacity-70 ${activeFilter === f.key ? "text-white/80" : "text-muted-foreground"}`}
                >
                  {f.key === "all"
                    ? shapes.length
                    : shapes.filter((s) => productMeta[s.id]?.category === f.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── PRODUCT GRID ───────── */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
            >
              {filtered.map((shape, i) => {
                const meta = productMeta[shape.id];
                const startingPrice = getStartingPrice(shape.id);

                return (
                  <motion.div
                    key={shape.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="group"
                  >
                    <Link to={`/shop/${shape.id}`} className="block">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-card border border-border rounded-sm shadow-sm group-hover:shadow-gold group-hover:border-gold/40 transition-all duration-500">
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <img
                            src={shape.thumbImage}
                            alt={shape.label}
                            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/300x300?text=" + shape.label;
                            }}
                          />
                        </div>

                        {/* Badge */}
                        {meta?.badge && (
                          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-gradient-gold text-white px-2.5 py-1 rounded-sm font-bold shadow-gold">
                            {meta.badge}
                          </span>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                          <span className="w-full py-3 text-center text-[10px] tracking-[0.2em] uppercase font-bold text-white bg-gradient-gold rounded-sm shadow-gold flex items-center justify-center gap-2">
                            Customize Now <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="pt-4 pb-2">
                        <h3 className="font-display text-lg md:text-xl text-foreground leading-snug group-hover:text-gold transition-colors mb-1">
                          {shape.label}
                        </h3>
                        {meta?.description && (
                          <p className="text-[11px] text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                            {meta.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
                            From ${startingPrice}
                          </span>
                          <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                            {shape.sizes.length} size{shape.sizes.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-32 text-muted-foreground">
              <p className="text-lg">No products in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ───────── BOTTOM CTA ───────── */}
      <section className="py-24 bg-gradient-crystal border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold font-medium">
              Need Help Choosing?
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 text-foreground">
              Talk to a crystal specialist.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Not sure which product is right for you? Our team is happy to help you pick the
              perfect crystal for any occasion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gradient-gold text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold font-bold inline-flex items-center gap-2 justify-center"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="border border-gold/40 text-foreground px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm hover:border-gold hover:bg-gold/5 transition font-medium"
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
