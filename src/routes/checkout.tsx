import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { clearCart } = useCart();

  // Clear cart on successful reach of this page (simulating order completion)
  useEffect(() => {
    // In a real app, you'd clear this after the actual payment
    // But for this demo, let's just clear it.
    // clearCart()
  }, []);

  return (
    <div className="pt-40 pb-24 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Reveal>
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/10 border border-gold/20 mb-8">
              <CheckCircle className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              Order Received.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto mb-10">
              Your memory is now in the hands of our master artisans. We'll send you a tracking
              number once your crystal has been hand-inspected and shipped.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-card/50 border border-border rounded-sm p-10 mb-12">
            <h3 className="font-display text-2xl mb-4 text-foreground">What's Next?</h3>
            <ul className="text-left space-y-6 max-w-sm mx-auto">
              {[
                {
                  t: "Photo Review",
                  d: "Our team will manually review your photo for optimal laser-etching.",
                },
                {
                  t: "Laser-Engraving",
                  d: "Millions of micro-points are etched into your optical crystal.",
                },
                { t: "Shipping", d: "Your order arrives in 10-14 days in a premium gift box." },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-6 h-6 shrink-0 rounded-full border border-gold/40 text-[10px] flex items-center justify-center text-gold font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest font-bold text-foreground">
                      {step.t}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{step.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="w-full sm:w-auto bg-gradient-gold text-primary-foreground px-10 py-6 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold">
                Return to Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-gold/40 text-foreground px-10 py-6 text-[11px] tracking-[0.3em] uppercase rounded-sm hover:border-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Order Another
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
