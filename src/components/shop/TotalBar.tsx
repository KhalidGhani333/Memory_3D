import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface TotalBarProps {
  subtotal: number;
  shippingPrice: number;
  total: number;
  isReady: boolean;
  missingFields: string[];
  onAddToCart: () => void;
}

export function TotalBar({
  shippingPrice,
  total,
  isReady,
  missingFields,
  onAddToCart,
}: TotalBarProps) {
  const handleAddToCart = () => {
    if (!isReady) {
      if (missingFields.includes("photo")) {
        toast.error("Please upload your photo to continue.");
      } else {
        toast.error(`Please fill in: ${missingFields.join(", ")}`);
      }
      return;
    }
    onAddToCart();
  };

  return (
    <div className="mt-16 border-t-2 border-gold/20 pt-8 space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-[12px] tracking-[0.3em] uppercase font-bold text-foreground">
            Total Price
          </span>
          <span className="font-display text-4xl md:text-5xl text-gold font-bold">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="btn-shine w-full bg-gradient-gold text-white py-5 rounded-full text-[11px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-3 shadow-gold transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_28px_-4px_oklch(0.62_0.14_79/0.55)] active:scale-[0.98]"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
}
