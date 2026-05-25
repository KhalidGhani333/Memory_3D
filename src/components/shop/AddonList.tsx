import { Addon } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddonListProps {
  addons: Addon[];
  selectedAddons: Record<string, { checked: boolean; qty: number }>;
  onAddonChange: (addonId: string, checked: boolean, qty: number) => void;
}

export function AddonList({ addons, selectedAddons, onAddonChange }: AddonListProps) {
  return (
    <div className="mt-12 space-y-0 border-y border-border/60">
      {addons.map((addon) => {
        const isChecked = selectedAddons[addon.id]?.checked || false;
        const currentQty = selectedAddons[addon.id]?.qty || 1;

        return (
          <div
            key={addon.id}
            className="py-8 flex items-center gap-6 border-b border-border/60 last:border-0 group"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-card border border-border flex-shrink-0 flex items-center justify-center p-2">
              <img
                src={addon.image}
                alt={addon.label}
                className="max-w-full max-h-full object-contain transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=Add-on";
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[14px] tracking-[0.05em] uppercase font-bold text-foreground mb-4">
                {addon.label}
              </div>

              <div className="flex items-center gap-8">
                {addon.hasQty && isChecked && (
                  <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">
                      Quantity
                    </span>
                    <Select
                      value={currentQty.toString()}
                      onValueChange={(val) => onAddonChange(addon.id, true, parseInt(val))}
                    >
                      <SelectTrigger className="h-9 w-20 text-[14px] font-bold bg-background/50 border-gold/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) => onAddonChange(addon.id, !!checked, currentQty)}
                className="w-7 h-7 border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:border-gold transition-all"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
