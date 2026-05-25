import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.avif";
import { useCart } from "@/hooks/use-cart";

const nav = [
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="group flex items-center shrink-0">
            <img
              src={logo}
              alt="Memory3D Logo"
              className="h-9 md:h-10 w-auto transition-all duration-500"
              style={{
                filter:
                  "invert(42%) sepia(55%) saturate(600%) hue-rotate(5deg) brightness(85%) contrast(90%)",
              }}
            />
          </Link>
        </div>

        {/* Center: Navigation (Hidden on Mobile) */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 xl:gap-12">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[12px] xl:text-[13px] tracking-widest text-foreground/60 hover:text-gold transition-colors uppercase font-medium whitespace-nowrap"
              activeProps={{ className: "text-gold font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-5">
          <Link
            to="/cart"
            className="relative p-2 text-foreground/70 hover:text-gold transition-colors"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-gradient-gold text-white hover:opacity-90 transition shadow-gold rounded-sm font-bold"
          >
            Order Now
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-foreground/70 hover:text-gold transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-6 py-8 flex flex-col items-center gap-6">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-[12px] tracking-[0.3em] uppercase font-bold text-foreground/60 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              Home
            </Link>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-[12px] tracking-[0.3em] uppercase font-bold text-foreground/60 hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="w-full text-center py-4 bg-gradient-gold text-white text-[10px] tracking-[0.3em] uppercase font-bold rounded-sm shadow-gold"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
