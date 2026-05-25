import { Shape } from "@/data/products";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShapeSelectorProps {
  shapes: Shape[];
  selectedShapeId: string;
  onShapeChange: (shape: Shape) => void;
}

export function ShapeSelector({ shapes, selectedShapeId, onShapeChange }: ShapeSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/80 backdrop-blur border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5 text-gold" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background/80 backdrop-blur border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
      >
        <ChevronRight className="w-5 h-5 text-gold" />
      </button>

      {/* Shapes Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-2 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onShapeChange(shape)}
            className={`flex-shrink-0 w-24 md:w-28 snap-start flex flex-col items-center gap-2 group/item`}
          >
            <div
              className={`relative aspect-square w-full rounded-sm overflow-hidden border-2 transition-all ${
                selectedShapeId === shape.id
                  ? "border-gold ring-2 ring-gold/30"
                  : "border-border group-hover/item:border-gold/50"
              }`}
            >
              <img
                src={shape.thumbImage}
                alt={shape.label}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/100x100?text=" + shape.label;
                }}
              />
            </div>
            <span
              className={`text-[10px] tracking-wider uppercase text-center leading-tight transition-colors ${
                selectedShapeId === shape.id ? "text-gold font-bold" : "text-muted-foreground"
              }`}
            >
              {shape.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
