import { Addon } from "@/data/products";

export function calculateTotal(params: {
  sizePrice: number;
  selectedAddons: Record<string, { checked: boolean; qty: number }>;
  addons: Addon[];
  inscriptionText: string;
  shippingPrice: number;
}): { subtotal: number; shipping: number; total: number } {
  const addonTotal = params.addons
    .filter((a) => params.selectedAddons[a.id]?.checked && a.price > 0)
    .reduce((sum, a) => {
      const qty = params.selectedAddons[a.id]?.qty || 1;
      return sum + (a.hasQty ? a.price * qty : a.price);
    }, 0);

  const inscriptionCost = params.inscriptionText.trim().length > 0 ? 10 : 0;
  const subtotal = params.sizePrice + addonTotal + inscriptionCost;

  return {
    subtotal,
    shipping: params.shippingPrice,
    total: subtotal + params.shippingPrice,
  };
}
