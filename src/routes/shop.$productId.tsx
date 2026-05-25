import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { shapes } from "@/data/products";
import { Configurator } from "@/components/shop/Configurator";

export const Route = createFileRoute("/shop/$productId")({
  head: ({ params }) => {
    const shape = shapes.find((s) => s.id === params.productId);
    const name = shape?.label ?? "Product";
    return {
      meta: [
        { title: `${name} - 3D Crystal Gift | Memory3D` },
        {
          name: "description",
          content: `Order a custom 3D laser-engraved ${name} crystal. Upload your photo, choose your size, and receive a stunning keepsake.`,
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const shape = shapes.find((s) => s.id === productId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [productId]);

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

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* ───────── TOP BAR ───────── */}
      <div className="pt-32 pb-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-gold font-semibold">{shape.label}</span>
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Configurator shape={shape} />
      </div>
    </div>
  );
}
