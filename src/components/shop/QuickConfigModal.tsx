import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SizeSelector } from "./SizeSelector";
import { PhotoUpload } from "./PhotoUpload";
import { AddonList } from "./AddonList";
import { Shape, Size, shapes, addons } from "@/data/products";
import { calculateTotal } from "./PriceCalculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface QuickConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultShape?: Shape;
}

export function QuickConfigModal({ isOpen, onClose, defaultShape }: QuickConfigModalProps) {
  const isMobile = useIsMobile();
  const { addItem } = useCart();

  const [selectedShape, setSelectedShape] = useState<Shape>(defaultShape || shapes[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(
    defaultShape?.sizes[0] || shapes[0].sizes[0],
  );
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<
    Record<string, { checked: boolean; qty: number }>
  >({});
  const [inscriptionText, setInscriptionText] = useState("");

  // Update internal state when defaultShape changes
  useEffect(() => {
    if (defaultShape) {
      setSelectedShape(defaultShape);
      setSelectedSize(defaultShape.sizes[0]);
    }
  }, [defaultShape]);

  const handleAddonChange = (addonId: string, checked: boolean, qty: number) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: { checked, qty },
    }));
  };

  const { total } = calculateTotal({
    sizePrice: selectedSize.price,
    selectedAddons,
    addons,
    inscriptionText,
    shippingPrice: 0,
  });

  const handleAddToCart = () => {
    if (!uploadedPhoto) {
      toast.error("Please upload your photo to continue.");
      return;
    }

    const photoUrl = URL.createObjectURL(uploadedPhoto);

    addItem({
      id: crypto.randomUUID(),
      shapeId: selectedShape.id,
      shapeLabel: selectedShape.label,
      sizeId: selectedSize.id,
      sizeLabel: selectedSize.label,
      price: total,
      photo: photoUrl,
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

    toast.success("Added to cart!");
    onClose();
    // Reset state
    setUploadedPhoto(null);
    setSelectedAddons({});
    setInscriptionText("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={isMobile ? "h-[90vh] p-0" : "sm:max-w-md p-0 flex flex-col"}
      >
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-xl font-display font-bold text-center">
            {selectedShape.label}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8 pb-32">
            <div className="flex justify-center">
              <img
                src={selectedShape.thumbImage}
                alt={selectedShape.label}
                className="w-24 h-24 object-contain"
              />
            </div>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                Select Size
              </h3>
              <SizeSelector
                sizes={selectedShape.sizes}
                selectedSizeId={selectedSize.id}
                onSizeChange={setSelectedSize}
              />
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                Upload Photo
              </h3>
              <PhotoUpload
                shapePreviewImage={selectedShape.previewImage}
                onPhotoChange={setUploadedPhoto}
              />
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                Personalization
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Inscription Text (Optional)"
                  value={inscriptionText}
                  onChange={(e) => setInscriptionText(e.target.value)}
                  className="bg-background/50 border-gold/30"
                />
              </div>
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                Enhance Your Memory
              </h3>
              <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <AddonList
                  addons={addons}
                  selectedAddons={selectedAddons}
                  onAddonChange={handleAddonChange}
                />
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="p-6 border-t bg-background/95 backdrop-blur-md absolute bottom-0 left-0 right-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
              Live Total
            </span>
            <span className="text-3xl font-display font-bold text-gold">$0.00</span>
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 text-[12px] tracking-[0.2em] font-bold uppercase rounded-sm transition-all active:scale-[0.98]"
          >
            ADD TO CART
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
