import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShoppingCart, ArrowRight, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/Memory_3D_Logo (1) (3).png";
import { useCart } from "@/hooks/use-cart";

const nav = [
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact Us" },
] as const;

const mobileNav = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About Us" },
  { to: "/shop" as const, label: "Shop" },
  { to: "/contact" as const, label: "Contact Us" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ══════════════ ANNOUNCEMENT BANNER ══════════════ */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 inset-x-0 z-[60] bg-gradient-gold overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 h-[34px] flex items-center justify-between">
              <div className="flex-1" />
              <p className="text-white text-[9.5px] tracking-[0.32em] uppercase font-bold text-center flex-[3]">
                ✦ &nbsp; Free Shipping on Orders Over $100 &nbsp;·&nbsp; Ships in 10–14 Days &nbsp; ✦
              </p>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setBannerVisible(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Dismiss announcement"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ MAIN HEADER ══════════════ */}
      <motion.header
        animate={{ top: bannerVisible ? 34 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed inset-x-0 z-50 transition-[background,box-shadow] duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-[0_1px_0_0_oklch(0.87_0.006_80/0.6),0_6px_24px_-6px_oklch(0_0_0/0.07)]"
            : "bg-white/85 backdrop-blur-xl"
        }`}
      >
        {/* Thin gold accent stripe at very top */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-gold opacity-90" />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[68px] flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="shrink-0 flex items-center" aria-label="Memory3D Home">
            <img
              src={logo}
              alt="Memory3D"
              className="h-8 md:h-9 w-auto"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 xl:gap-14">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="nav-link text-[11px] xl:text-[12px] tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors duration-200 uppercase font-semibold whitespace-nowrap"
                activeProps={{ className: "nav-link nav-link-active !text-gold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1.5 md:gap-3">

            {/* Cart icon */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/10 transition-all duration-200"
              aria-label={`View cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
            >
              <ShoppingCart className="w-[17px] h-[17px]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[8px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold px-0.5"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Order Now -  pill CTA */}
            <Link
              to="/shop"
              className="btn-shine hidden sm:inline-flex items-center gap-2 pl-5 pr-4 py-2.5 text-[10px] tracking-[0.22em] uppercase bg-gradient-gold text-white rounded-full font-bold shadow-gold transition-all duration-300 hover:shadow-[0_8px_28px_-4px_oklch(0.62_0.14_79/0.55)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
            >
              Order Now
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </Link>

            {/* Animated hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden relative flex items-center justify-center w-9 h-9 rounded-full text-foreground/60 hover:text-gold hover:bg-gold/10 transition-all duration-200"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
                <motion.span
                  className="block h-[1.5px] bg-current rounded-full origin-left"
                  animate={open ? { rotate: 45, y: -1, x: 2 } : { rotate: 0, y: 0, x: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block h-[1.5px] bg-current rounded-full"
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.span
                  className="block h-[1.5px] bg-current rounded-full origin-left"
                  animate={open ? { rotate: -45, y: 1, x: 2 } : { rotate: 0, y: 0, x: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════ MOBILE FULL-SCREEN MENU ══════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
            style={{ paddingTop: bannerVisible ? "calc(34px + 68px)" : "68px" }}
          >
            {/* Gold top accent replicated */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-gold" />

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-8 py-6 overflow-y-auto">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
                }}
                className="space-y-0"
              >
                {mobileNav.map((n, i) => (
                  <motion.li
                    key={n.to}
                    variants={{
                      hidden: { opacity: 0, x: -24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 border-b border-border/60"
                      activeProps={{}}
                    >
                      <span className="font-display text-[clamp(2rem,7vw,3rem)] text-foreground group-hover:text-gold transition-colors duration-200 leading-tight">
                        {n.label}
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-gold"
                      >
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="btn-shine flex items-center justify-center gap-3 w-full py-4 bg-gradient-gold text-white rounded-full text-[11px] tracking-[0.3em] uppercase font-bold shadow-gold"
                >
                  Order Now
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Bottom contact strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="px-8 py-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
            >
              <a
                href="tel:888-936-3667"
                className="flex items-center gap-2 hover:text-gold transition-colors font-medium"
              >
                <Phone className="w-3 h-3 text-gold" />
                888-936-3667
              </a>
              <a
                href="mailto:support@memory3d.com"
                className="hover:text-gold transition-colors font-medium"
              >
                support@memory3d.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
