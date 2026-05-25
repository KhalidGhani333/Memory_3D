import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { shapes, addons, type Size } from "@/data/products";
import { SizeSelector } from "@/components/shop/SizeSelector";
import { PhotoUpload } from "@/components/shop/PhotoUpload";
import { AddonList } from "@/components/shop/AddonList";
import { CustomerForm } from "@/components/shop/CustomerForm";
import { TotalBar } from "@/components/shop/TotalBar";
import { calculateTotal } from "@/components/shop/PriceCalculator";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$productId")({
  component: ProductPage,
});

const productDescriptions: Record<string, string> = {
  "rectangle-tall":
    "Our most versatile crystal -  the timeless portrait format works beautifully with individuals, couples, and small groups. Laser-etched with millions of micro-points for incredible 3D depth.",
  "rectangle-wide":
    "Perfect for landscape and group shots. The wide format captures more of your scene, making it ideal for family gatherings, sports teams, and panoramic memories.",
  heart:
    "Our signature wedding and anniversary crystal. The heart shape catches light from every angle, making it a breathtaking centrepiece in any home.",
  prestige:
    "The Prestige series features beveled edges and an extra-thick optical base that creates a floating 3D effect unlike any other crystal we make.",
  ball: "A flawless sphere of optical crystal -  no edges, no angles. Your photo engraved inside a perfect ball is truly mesmerizing from every direction.",
  "cut-corner-diamond":
    "Compact and striking. The diamond cut with angled corners makes this our best-value crystal without compromising on optical quality.",
  candle:
    "Cylindrical and elegant, the Candle crystal is designed to sit on any of our lightbases. The cylindrical form rotates light through your image beautifully.",
  urn: "A dignified memorial tribute. The Urn shape is designed for those honouring a loved one or beloved pet -  a lasting keepsake to hold their memory.",
  "notched-tall":
    "A contemporary take on the classic portrait. The distinctive notched top gives this crystal a modern architectural quality.",
  "notched-wide":
    "Wide-format crystal with a signature notched top. Ideal for landscape and group photos with a modern aesthetic.",
  "desk-lamp":
    "Crystal meets function. Your engraved crystal is built directly into an elegant desk lamp -  art you live with every day.",
  ornament:
    "Perfect for the holidays or as a year-round keepsake. Hang your cherished memory on the tree or display it on a stand.",
  "vertical-keychain":
    "Carry your memory wherever you go. Our precision-engraved vertical keychain is crafted in optical crystal and made to last.",
  "horizontal-keychain":
    "Sleek horizontal crystal keychain -  the perfect way to keep someone close every single day.",
  "heart-keychain":
    "A heart-shaped crystal keychain that makes the most meaningful small gift for a loved one.",
  "heart-necklace":
    "Wear your memory. Our heart necklace pendant is crafted from premium optical crystal engraved with your chosen image.",
  "dog-bone-vertical":
    "A loving tribute to your best friend. The dog bone shape honours your pet's memory in beautiful 3D crystal.",
  "dog-bone-horizontal":
    "Horizontal dog bone crystal -  a deeply personal memorial for the pet who meant the world to you.",
};

const trustBadges = [
  { icon: Shield, label: "Premium Optical Crystal" },
  { icon: Star, label: "4.9★ -  12k+ Reviews" },
  { icon: Truck, label: "10–14 Day Delivery" },
  { icon: RotateCcw, label: "Satisfaction Guaranteed" },
];

function ProductPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const shape = shapes.find((s) => s.id === productId);

  const [selectedSize, setSelectedSize] = useState<Size>(shape?.sizes[0] ?? shapes[0].sizes[0]);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<
    Record<string, { checked: boolean; qty: number }>
  >({});
  const [inscriptionText, setInscriptionText] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [formData, setFormData] = useState<any>({});

  // Reset size when shape changes (on direct URL change)
  // Not needed since each URL is a separate page load

  const totals = useMemo(
    () =>
      calculateTotal({
        sizePrice: selectedSize.price,
        selectedAddons,
        addons,
        inscriptionText,
        shippingPrice,
      }),
    [selectedSize, selectedAddons, inscriptionText, shippingPrice],
  );

  const missingFields = useMemo(() => {
    const fields: string[] = [];
    if (!uploadedPhoto) fields.push("photo");
    if (!formData.name) fields.push("Full Name");
    return fields;
  }, [uploadedPhoto, formData]);

  const isReady = missingFields.length === 0;

  const handleAddToCart = useCallback(() => {
    if (!shape) return;
    addItem({
      id: crypto.randomUUID(),
      shapeId: shape.id,
      shapeLabel: shape.label,
      sizeId: selectedSize.id,
      sizeLabel: selectedSize.label,
      price: totals.total,
      photo: uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : "",
      addons: addons
        .filter((a) => selectedAddons[a.id]?.checked)
        .map((a) => ({
          id: a.id,
          label: a.label,
          price: a.price,
          qty: selectedAddons[a.id]?.qty || 1,
        })),
      inscriptionText,
      quantity: 1,
    });
    toast.success(`${shape.label} added to cart! We'll review your photo shortly.`);
    navigate({ to: "/cart" });
  }, [shape, selectedSize, uploadedPhoto, selectedAddons, inscriptionText, addItem, navigate, totals.total]);

  // Product not found
  if (!shape) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-5xl text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">This crystal hasn't been carved yet.</p>
          <Link
            to="/shop"
            className="btn-shine bg-gradient-gold text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase rounded-full shadow-gold font-bold hover:-translate-y-px transition-all duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const startingPrice = Math.min(...shape.sizes.map((s) => s.price));
  const description = productDescriptions[shape.id] || "";

  // Related products (exclude current)
  const related = shapes.filter((s) => s.id !== shape.id).slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* ───────── TOP BAR ───────── */}
      <div className="pt-24 pb-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-gold transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">{shape.label}</span>
          </nav>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* ───────── PRODUCT HERO ───────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Sticky Product Image + Trust Badges */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                {/* Main Image */}
                <div className="aspect-square bg-card border border-border rounded-2xl shadow-card flex items-center justify-center p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
                  <motion.img
                    key={shape.id}
                    src={shape.previewImage}
                    alt={shape.label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 max-w-full max-h-full object-contain drop-shadow-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = shape.thumbImage;
                    }}
                  />
                </div>

                {/* Thumb strip */}
                <div className="flex gap-3 mt-4">
                  <div className="w-16 h-16 border-2 border-gold/40 rounded-xl overflow-hidden flex items-center justify-center bg-card p-2 shadow-sm">
                    <img
                      src={shape.thumbImage}
                      alt={shape.label}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {trustBadges.map(({ icon: I, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 p-3 bg-card border border-border rounded-xl shadow-sm"
                    >
                      <I className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-[10px] tracking-[0.1em] text-muted-foreground font-medium leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: Product Info + Order Form */}
            <div>
              <Reveal>
                {/* Product Header */}
                <div className="mb-3">
                  <span className="label-chip block">3D Laser-Engraved Crystal</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-4">
                  {shape.label}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">4.9 · 12,000+ reviews</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8 text-base">{description}</p>

                {/* Starting Price box */}
                <div className="mb-10 p-5 bg-card border border-border rounded-2xl shadow-card">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                    Starting from
                  </p>
                  <div className="font-display text-4xl text-gradient-gold">${startingPrice}</div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {shape.sizes.length} size option{shape.sizes.length > 1 ? "s" : ""} available
                    · Prices shown at checkout
                  </p>
                </div>
              </Reveal>

              {/* ── STEP 1: Size ── */}
              <Reveal delay={0.1}>
                <section className="mb-10">
                  <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold text-gold mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">
                      1
                    </span>
                    Select Size
                  </h2>
                  <SizeSelector
                    sizes={shape.sizes}
                    selectedSizeId={selectedSize.id}
                    onSizeChange={setSelectedSize}
                  />
                </section>
              </Reveal>

              {/* ── STEP 2: Photo Upload ── */}
              <Reveal delay={0.15}>
                <section className="mb-10">
                  <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold text-gold mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">
                      2
                    </span>
                    Upload Your Photo
                  </h2>
                  <PhotoUpload
                    shapePreviewImage={shape.previewImage}
                    onPhotoChange={setUploadedPhoto}
                  />
                  <p className="mt-3 text-[10px] text-muted-foreground italic">
                    Upload a clear, high-resolution photo. Our team will enhance it for the best
                    result.
                  </p>
                </section>
              </Reveal>

              {/* ── STEP 3: Add-ons ── */}
              <Reveal delay={0.2}>
                <section className="mb-10">
                  <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold text-gold mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">
                      3
                    </span>
                    Premium Add-ons
                  </h2>
                  <AddonList
                    addons={addons}
                    selectedAddons={selectedAddons}
                    onAddonChange={(id, checked, qty) =>
                      setSelectedAddons((prev) => ({ ...prev, [id]: { checked, qty } }))
                    }
                  />
                </section>
              </Reveal>

              {/* ── STEP 4: Inscription ── */}
              <Reveal delay={0.25}>
                <section className="mb-10">
                  <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold text-gold mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">
                      4
                    </span>
                    Custom Inscription
                    <span className="text-[9px] tracking-normal normal-case text-muted-foreground font-normal ml-1">
                      (Optional)
                    </span>
                  </h2>
                  <input
                    type="text"
                    placeholder="Type your engraving text -  names, dates, a short message…"
                    value={inscriptionText}
                    onChange={(e) => setInscriptionText(e.target.value)}
                    maxLength={80}
                    className="w-full bg-card border border-border rounded-xl px-5 py-4 text-sm focus:border-gold outline-none transition-colors text-foreground placeholder:text-muted-foreground focus:shadow-[0_0_0_3px_oklch(0.62_0.14_79/0.1)]"
                  />
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    {inscriptionText.length}/80 characters
                  </p>
                </section>
              </Reveal>

              {/* ── STEP 5: Customer & Shipping ── */}
              <Reveal delay={0.3}>
                <section className="mb-10">
                  <h2 className="text-[12px] tracking-[0.3em] uppercase font-bold text-gold mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-gold text-white text-[10px] font-bold grid place-items-center shrink-0">
                      5
                    </span>
                    Your Details & Shipping
                  </h2>
                  <CustomerForm onShippingChange={setShippingPrice} onFormChange={setFormData} />
                </section>
              </Reveal>

              {/* ── TOTAL & ADD TO CART ── */}
              <TotalBar
                subtotal={totals.subtotal}
                shippingPrice={totals.shipping}
                total={totals.total}
                isReady={isReady}
                missingFields={missingFields}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── RELATED PRODUCTS ───────── */}
      <section className="py-24 bg-card/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="label-chip mb-3 block">Explore More</span>
                <h2 className="font-display text-3xl md:text-4xl mt-2 text-foreground">
                  You might also like
                </h2>
              </div>
              <Link
                to="/shop"
                className="text-[11px] tracking-[0.2em] uppercase text-gold inline-flex items-center gap-2 hover:gap-3 transition-all font-medium hidden md:flex"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link to={`/shop/${s.id}`} className="group block">
                  <div className="card-lift aspect-square bg-card border border-border/80 rounded-xl overflow-hidden flex items-center justify-center p-6 shadow-card mb-3">
                    <img
                      src={s.thumbImage}
                      alt={s.label}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-0.5">
                    <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors leading-snug">
                      {s.label}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold mt-1">
                      From ${Math.min(...s.sizes.map((sz) => sz.price))}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
