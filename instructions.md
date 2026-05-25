## CONTEXT

I have a Next.js 14 project with TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion already set up. I need you to build the **Shop page (`/shop`) and Product Configurator** for Memory3D -  a 3D crystal gift store.

The reference store is: **https://global.3dcrystalglobal.com/store/Memory3D/**

I have already studied exactly how it works. You must replicate its complete logic. Here is a full breakdown:

---

## HOW THE REFERENCE STORE WORKS (read every word)

### Step 1 -  Shape/Frame Selection (horizontal swipeable row)

The user picks a crystal **shape** from a horizontal scrollable thumbnail row at the top. There are 17 shapes total. When a shape is selected, it gets an orange border highlight. The selected shape determines:

- Which **size options** appear below (each shape has its own size list)
- Which **"upload preview" image** is shown in the upload zone

### Step 2 -  Size Selection (grid of clickable cards)

After picking a shape, 2–7 size buttons appear in a 2-column grid. Each size card shows:

- Size name (e.g. "Medium", "Large", "Extra Large")
- People count (e.g. "1-2 people", shown with an icon)
- Physical dimensions in inches and cm (e.g. "3x2x2 / 8x5x5cm")
- Price in USD

Clicking a size card selects it (orange border) and updates the **Total Price** at the bottom in real time.

### Step 3 -  Photo Upload

A large dashed-border upload zone below the sizes. It shows:

- An upload arrow icon
- "Upload Your Photo" label
- "Start Over" link to clear the photo
  After upload, a **preview thumbnail** of the user's image appears inside the zone.

### Step 4 -  Add-on Selection (checklist below upload)

A vertical list of optional add-on products, each with:

- Product image (thumbnail, left side)
- Product name (orange, linked)
- Price (e.g. "$ 25")
- Checkbox (right side)
- For keychains: a **Qty dropdown** (1–10) appears when checked

The add-on list is the SAME for all shapes. Checking/unchecking each one updates the Total Price instantly.

### Step 5 -  Custom Inscription (optional text)

A text input field: "CUSTOM INSCRIPTION $10" -  adds $10 to total when filled.

### Step 6 -  Customer Details Form

Fields (all required unless noted):

- Full Name
- Email (note: "We will notify you when your order is ready for pickup")
- Phone (note: same)
- Purchase Location (textarea, optional)

### Step 7 -  Shipping Details

A toggle between two modes:

- **Shipping To Home** (default)
- **Collect From Store**

When "Shipping To Home" is selected, show:

- Select Country (dropdown: United States, Canada)
- Street Address
- State/Region/Province
- City
- Zip/Postal Code

Shipping options (radio buttons):

- Free Store Pickup -  1-2 business days -  $0
- Free Shipping -  3-7 business days -  $0
- Fast Shipping -  1-2 business days -  $25

### Step 8 -  Total Price Display

A live-updating total at the bottom:

- Shows "SHIPPING PRICE" line
- Shows "TOTAL PRICE $ X.XX" in large bold text (orange/gold color)
- "ADD TO CART" button -  full width, dark background, white text

### Step 9 -  Contact Info Footer Strip

- support@memory3d.com
- 888-936-3667

---

## EXACT DATA -  All Shapes and Their Sizes

Build this as `/data/products.ts`. Use it as the single source of truth.

```typescript
// /data/products.ts

export type Size = {
  id: string;
  label: string; // e.g. "Medium"
  people: string; // e.g. "1-2"
  dimensions: string; // e.g. "3x2x2 / 8x5x5cm"
  price: number;
};

export type Shape = {
  id: string;
  label: string;
  thumbImage: string; // local path in /public/images/shop/
  previewImage: string; // shown in upload zone after shape selected
  sizes: Size[];
};

export const shapes: Shape[] = [
  {
    id: "rectangle-tall",
    label: "Rectangle Tall",
    thumbImage: "/images/shop/rectangle-tall.png",
    previewImage: "/images/shop/preview/rectangle-tall-new.png",
    sizes: [
      { id: "medium", label: "Medium", people: "1-2", dimensions: "3x2x2 / 8x5x5cm", price: 100 },
      {
        id: "large",
        label: "Large",
        people: "1-3",
        dimensions: "3.5x2.5x2.5 / 9x6x6cm",
        price: 170,
      },
      {
        id: "extra-large",
        label: "Extra Large",
        people: "1-4",
        dimensions: "4.8x3.2x2.4 / 12x8x6cm",
        price: 285,
      },
      {
        id: "mini-mantel",
        label: "Mini Mantel",
        people: "1-6",
        dimensions: "6x4x2.5 / 15x10x6cm",
        price: 325,
      },
      {
        id: "mantel",
        label: "Mantel",
        people: "1-8",
        dimensions: "7.1x4.8x3.2 / 18x12x8cm",
        price: 375,
      },
      {
        id: "mini-presidential",
        label: "Mini Presidential",
        people: "1-10",
        dimensions: "8.7x6.3x3.2 / 22x16x8cm",
        price: 595,
      },
    ],
  },
  {
    id: "rectangle-wide",
    label: "Rectangle Wide",
    thumbImage: "/images/shop/rectangle-wide-1.png",
    previewImage: "/images/shop/preview/rectangle-wide-new.png",
    sizes: [
      { id: "medium", label: "Medium", people: "1-2", dimensions: "3x2x2 / 8x5x5cm", price: 100 },
      {
        id: "large",
        label: "Large",
        people: "1-3",
        dimensions: "3.5x2.5x2.5 / 9x6x6cm",
        price: 170,
      },
      {
        id: "extra-large",
        label: "Extra Large",
        people: "1-4",
        dimensions: "4.8x3.2x2.4 / 12x8x6cm",
        price: 285,
      },
      {
        id: "mini-mantel",
        label: "Mini Mantel",
        people: "1-6",
        dimensions: "6x4x2.5 / 15x10x6cm",
        price: 325,
      },
      {
        id: "mantel",
        label: "Mantel",
        people: "1-8",
        dimensions: "7.1x4.8x3.2 / 18x12x8cm",
        price: 375,
      },
      {
        id: "mini-presidential",
        label: "Mini Presidential",
        people: "1-10",
        dimensions: "8.7x6.3x3.2 / 22x16x8cm",
        price: 595,
      },
      {
        id: "large-presidential",
        label: "Large Presidential",
        people: "1-12",
        dimensions: "10.7x7x3.2 / 27x18x8cm",
        price: 1000,
      },
    ],
  },
  {
    id: "heart",
    label: "Heart",
    thumbImage: "/images/shop/heart.png",
    previewImage: "/images/shop/preview/heart-new.png",
    sizes: [
      {
        id: "small",
        label: "Small",
        people: "1-2",
        dimensions: "3.2x2.8x1.6 / 8x7x4cm",
        price: 89,
      },
      {
        id: "medium",
        label: "Medium",
        people: "1-3",
        dimensions: "4x3.5x2.4 / 10x9x5cm",
        price: 155,
      },
      {
        id: "large",
        label: "Large",
        people: "1-8",
        dimensions: "5x4.3x2.4 / 13x11x5cm",
        price: 205,
      },
    ],
  },
  {
    id: "prestige",
    label: "Prestige",
    thumbImage: "/images/shop/prestige.png",
    previewImage: "/images/shop/preview/prestige-new.png",
    sizes: [
      {
        id: "small",
        label: "Small",
        people: "1-2",
        dimensions: "5x4.3x2.4 / 13x11x6cm",
        price: 225,
      },
      {
        id: "medium",
        label: "Medium",
        people: "1-3",
        dimensions: "6.8x5.3x2.4 / 17x14x6cm",
        price: 295,
      },
      { id: "large", label: "Large", people: "1-8", dimensions: "8x6x2.4 / 20x16x6cm", price: 375 },
    ],
  },
  {
    id: "ball",
    label: "Ball",
    thumbImage: "/images/shop/ball.png",
    previewImage: "/images/shop/preview/ball-new.png",
    sizes: [{ id: "small", label: "Small", people: "1", dimensions: "8cm", price: 155 }],
  },
  {
    id: "cut-corner-diamond",
    label: "Cut Corner Diamond",
    thumbImage: "/images/shop/cut-corner-diamond.png",
    previewImage: "/images/shop/preview/cut-corner-diamond-new.png",
    sizes: [
      { id: "small", label: "Small", people: "1", dimensions: "2x2x2 / 5x5x5cm", price: 65 },
      {
        id: "medium",
        label: "Medium",
        people: "1-3",
        dimensions: "2.4x2.4x2.4 / 6x6x6cm",
        price: 100,
      },
      { id: "large", label: "Large", people: "1-6", dimensions: "3x3x3 / 8x8x8cm", price: 125 },
    ],
  },
  {
    id: "vertical-keychain",
    label: "Vertical Keychain",
    thumbImage: "/images/shop/keychain-new-thumb.png",
    previewImage: "/images/shop/preview/vertical-keychain-new.png",
    sizes: [
      {
        id: "one-size",
        label: "One Size",
        people: "1-4",
        dimensions: "1.2x0.8x0.6 / 3x2x1.5cm",
        price: 40,
      },
    ],
  },
  {
    id: "horizontal-keychain",
    label: "Horizontal Keychain",
    thumbImage: "/images/shop/keychain-new-horizontal-thumb.png",
    previewImage: "/images/shop/preview/horizontal-keychain-new.png",
    sizes: [
      {
        id: "one-size",
        label: "One Size",
        people: "1-4",
        dimensions: "1.2x0.8x0.6 / 3x2x1.5cm",
        price: 40,
      },
    ],
  },
  {
    id: "heart-keychain",
    label: "Heart Keychain",
    thumbImage: "/images/shop/heart-keychain.png",
    previewImage: "/images/shop/preview/heart-keychain-new.png",
    sizes: [
      { id: "one-size", label: "One Size", people: "1-4", dimensions: "3.5x3.5x1.2cm", price: 40 },
    ],
  },
  {
    id: "heart-necklace",
    label: "Heart Necklace",
    thumbImage: "/images/shop/heart-keychain.png",
    previewImage: "/images/shop/preview/heart-necklace-new.png",
    sizes: [
      {
        id: "one-size",
        label: "One Size",
        people: "1-4",
        dimensions: "1.4x1.4x0.3 / 3.5x3.5x0.8cm",
        price: 55,
      },
    ],
  },
  {
    id: "ornament",
    label: "Ornament",
    thumbImage: "/images/shop/ornament.png",
    previewImage: "/images/shop/preview/ornament-new.png",
    sizes: [
      { id: "one-size", label: "One Size", people: "1-5", dimensions: "3x3 / 8x8cm", price: 100 },
    ],
  },
  {
    id: "candle",
    label: "Candle",
    thumbImage: "/images/shop/candle.png",
    previewImage: "/images/shop/preview/candle-new.png",
    sizes: [
      {
        id: "one-size",
        label: "One Size",
        people: "1-4",
        dimensions: "4x2.4x2.4 / 10x6x6cm",
        price: 170,
      },
    ],
  },
  {
    id: "urn",
    label: "Urn / Candles",
    thumbImage: "/images/shop/urn.png",
    previewImage: "/images/shop/preview/urn-new.png",
    sizes: [
      {
        id: "one-size",
        label: "One Size",
        people: "1-6",
        dimensions: "6x5x2.5 / 15x12x6cm",
        price: 195,
      },
    ],
  },
  {
    id: "notched-tall",
    label: "Notched Tall",
    thumbImage: "/images/shop/rectangle-tall.png",
    previewImage: "/images/shop/preview/rectangle-tall-new.png",
    sizes: [
      { id: "small", label: "Small", people: "1-4", dimensions: "6x4 / 15x10cm", price: 200 },
      { id: "medium", label: "Medium", people: "1-8", dimensions: "7x5 / 18x13cm", price: 225 },
    ],
  },
  {
    id: "notched-wide",
    label: "Notched Wide",
    thumbImage: "/images/shop/rectangle-wide-1.png",
    previewImage: "/images/shop/preview/rectangle-wide-new.png",
    sizes: [
      { id: "small", label: "Small", people: "1-4", dimensions: "6x5 / 15x10cm", price: 200 },
      { id: "medium", label: "Medium", people: "1-8", dimensions: "7x5 / 18x13cm", price: 225 },
    ],
  },
  {
    id: "dog-bone-vertical",
    label: "Dog Bone Vertical",
    thumbImage: "/images/shop/dog-bone-vertical.png",
    previewImage: "/images/shop/preview/dog-bone-vertical-new.png",
    sizes: [
      { id: "one-size", label: "One Size", people: "1-4", dimensions: "6x4 / 15x10cm", price: 205 },
    ],
  },
  {
    id: "dog-bone-horizontal",
    label: "Dog Bone Horizontal",
    thumbImage: "/images/shop/dog-bone-horizontal.png",
    previewImage: "/images/shop/preview/dog-bone-horizontal-new.png",
    sizes: [
      { id: "one-size", label: "One Size", people: "1-4", dimensions: "6x4 / 15x10cm", price: 205 },
    ],
  },
  {
    id: "desk-lamp",
    label: "Desk Lamp",
    thumbImage: "/images/shop/desk-lamp.png",
    previewImage: "/images/shop/preview/desk-lamp-new.png",
    sizes: [
      {
        id: "one-size",
        label: "One Size",
        people: "1-4",
        dimensions: "9.4x4.5 / 24x11cm",
        price: 250,
      },
    ],
  },
];
```

---

## EXACT DATA -  All Add-ons

```typescript
// Add to /data/products.ts

export type Addon = {
  id: string;
  label: string;
  image: string;
  price: number; // 0 = complementary/free
  hasQty: boolean; // if true, show Qty dropdown (1–10) when checked
  complementary?: boolean; // show "Complementary" badge instead of price
};

export const addons: Addon[] = [
  {
    id: "include-bg",
    label: "Include Background That's in Original Photo",
    image: "/images/shop/include-bg-$20.webp",
    price: 20,
    hasQty: false,
  },
  {
    id: "rectangle-keychain-free",
    label: "Rectangle Keychain (Same image as crystal)",
    image: "/images/shop/rectangle-keychain-1-$25.webp",
    price: 0,
    hasQty: true,
    complementary: true,
  },
  {
    id: "heart-keychain",
    label: "Add Heart Keychain",
    image: "/images/shop/heart-keychain-1-$25.webp",
    price: 25,
    hasQty: true,
  },
  {
    id: "rectangle-keychain",
    label: "Add Rectangle Keychain",
    image: "/images/shop/rectangle-keychain-1-$25.webp",
    price: 25,
    hasQty: true,
  },
  {
    id: "ornament-stand",
    label: "Ornament Stand",
    image: "/images/shop/ornament-stand.png",
    price: 25,
    hasQty: false,
  },
  {
    id: "concave-lightbase",
    label: "Concave Lightbase",
    image: "/images/shop/concave-lightbase.jpg",
    price: 28,
    hasQty: false,
  },
  {
    id: "lightbase-rectangle",
    label: "Lightbase Rectangle",
    image: "/images/shop/lightbase-rectangle-silver-heart-$25.webp",
    price: 24,
    hasQty: false,
  },
  {
    id: "wooden-premium-mini",
    label: "Wooden Premium Base Mini",
    image: "/images/shop/wooden-lightbase-Premium-300x300-1-$45.webp",
    price: 45,
    hasQty: false,
  },
  {
    id: "wooden-premium-small",
    label: "Wooden Premium Base Small",
    image: "/images/shop/wooden-lightbase-Premium-300x300-1-$45.webp",
    price: 35,
    hasQty: false,
  },
  {
    id: "lightbase-wood-long",
    label: "Lightbase Wood Long",
    image: "/images/shop/wooden-lightbase-Premium-300x300-1-$45.webp",
    price: 60,
    hasQty: false,
  },
  {
    id: "wooden-premium-medium",
    label: "Wooden Premium Base Medium",
    image: "/images/shop/wooden-lightbase-Premium-300x300-2.webp",
    price: 40,
    hasQty: false,
  },
  {
    id: "lightbase-square",
    label: "Lightbase Square",
    image: "/images/shop/lightbase-rectangle-silver-heart-$25.webp",
    price: 45,
    hasQty: false,
  },
  {
    id: "wooden-lightbase-free",
    label: "Wooden LightBase",
    image: "/images/shop/wooden-lightbase-Premium-300x300-1-$45.webp",
    price: 0,
    hasQty: false,
    complementary: true,
  },
  {
    id: "rotating-lightbase",
    label: "Rotating Light Base",
    image: "/images/shop/rotating-lightbase-heart-$25.webp",
    price: 25,
    hasQty: false,
  },
];
```

---

## FILES TO CREATE

### 1. `/data/products.ts`

Paste the full data above (shapes + addons merged into one file).

### 2. `/components/shop/ShapeSelector.tsx`

Horizontally scrollable row of shape thumbnails.

**Exact behavior:**

- Renders all 18 shapes from `shapes` array
- Each item: `<Image>` thumbnail + label below
- Selected shape gets `border-2 border-orange-500` (or your gold color token) styling
- On click → calls `onShapeChange(shape)` prop
- Scroll arrows (left/right chevrons) at ends on desktop
- Touch/swipe on mobile (use CSS `overflow-x: auto` + `scroll-snap-type: x mandatory`)
- Default selected: `rectangle-tall`

```tsx
interface ShapeSelectorProps {
  selectedShapeId: string;
  onShapeChange: (shape: Shape) => void;
}
```

### 3. `/components/shop/SizeSelector.tsx`

Grid of clickable size cards for the currently selected shape.

**Exact behavior:**

- Receives `sizes: Size[]` and `selectedSizeId: string`
- Renders in a 2-column CSS grid
- Each card:
  - Top-left: size label (orange/gold)
  - Below label: people count with a people icon (use Lucide `Users` icon)
  - Below people: dimensions in gray text
  - Bottom: price `$ X` (bold, large)
  - Selected: orange border + gold checkmark icon bottom-right (use Lucide `CheckCircle`)
- On click → calls `onSizeChange(size)` prop
- Animate with Framer Motion `variants` stagger on mount

### 4. `/components/shop/PhotoUpload.tsx`

Drag-and-drop photo upload zone.

**Exact behavior:**

- Large dashed border box (2px dashed, rounded-xl)
- Inside (before upload):
  - Upload arrow icon (Lucide `Upload`, large, ~48px)
  - Text "Upload Your Photo" (bold, orange)
  - "Start Over" link (small, gray, below)
- When a file is dropped or selected:
  - Show `<img>` preview of the uploaded file (use `URL.createObjectURL`)
  - "Start Over" link clears the preview and resets
- Use `react-dropzone` with `accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.heic', '.webp'] }`
- The shape preview image (from `shape.previewImage`) appears as a faint watermark overlay on top of the upload zone when no photo is uploaded yet
- Calls `onPhotoChange(file | null)` prop

```tsx
interface PhotoUploadProps {
  shapePreviewImage: string;
  onPhotoChange: (file: File | null) => void;
}
```

### 5. `/components/shop/AddonList.tsx`

Vertical list of add-on checkboxes.

**Exact behavior:**

- Each addon row (horizontal flex):
  - Left: `<Image>` thumbnail (80x80px, object-cover, rounded)
  - Middle: addon label (orange, bold), price below (`$ X` or "Complementary")
  - Right: shadcn `<Checkbox>` component
  - If `hasQty: true` AND checkbox is checked → show a `<Select>` dropdown (Qty: 1–10) below the price
- Checking updates `selectedAddons` state (parent manages)
- Price of checked addons (× qty for qty-based ones) feeds into total price calculation
- Complementary items show "Complementary" text in green, not a price, and are NOT added to total

```tsx
interface AddonListProps {
  addons: Addon[];
  selectedAddons: Record<string, { checked: boolean; qty: number }>;
  onAddonChange: (addonId: string, checked: boolean, qty: number) => void;
}
```

### 6. `/components/shop/PriceCalculator.ts` (utility, not a component)

Pure function that calculates total price:

```typescript
export function calculateTotal(params: {
  sizePrice: number;
  selectedAddons: Record<string, { checked: boolean; qty: number }>;
  addons: Addon[];
  inscriptionText: string;
  shippingPrice: number;
}): { subtotal: number; shipping: number; total: number } {
  const addonTotal = params.addons
    .filter((a) => params.selectedAddons[a.id]?.checked && !a.complementary)
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
```

### 7. `/components/shop/CustomerForm.tsx`

Customer details + shipping form.

**Exact fields and behavior:**

_Customer Details section:_

- Full Name (required)
- Email (required) + helper: "We will notify you when your order is ready for pickup"
- Phone (required) + same helper text
- Purchase Location (textarea, optional)

_Shipping Details section:_

- Toggle buttons: "Shipping To Home" | "Collect From Store"
- When "Shipping To Home":
  - Country dropdown (United States, Canada)
  - Street Address input
  - State/Region/Province input
  - City input
  - Zip/Postal Code input
  - Shipping option radio group:
    - Free Store Pickup -  1-2 business days -  $0
    - Free Shipping -  3-7 business days -  $0
    - Fast -  1-2 business days -  $25
  - Selected shipping option price feeds into total via `onShippingChange(price)` prop
- When "Collect From Store": hide address fields

Use shadcn `<Input>`, `<Textarea>`, `<Select>`, `<RadioGroup>` components.
Use React Hook Form for validation (install `react-hook-form` if not present).

### 8. `/components/shop/TotalBar.tsx`

Sticky bottom bar (or inline section) showing total.

```
SHIPPING PRICE: $X
TOTAL PRICE: $ X.XX   ← large, bold, gold/orange color
[ADD TO CART]         ← full-width dark button, white text
```

"ADD TO CART" behavior: validates that a shape, size, and photo are all selected. If any are missing, show a shadcn `toast` with the missing field. On success, show a success toast.

### 9. `/app/shop/page.tsx` -  Main Orchestrator

This page holds all state and composes the components:

```tsx
"use client";

import { useState, useCallback } from "react";
import { shapes, addons } from "@/data/products";
import { calculateTotal } from "@/components/shop/PriceCalculator";
// import all components

export default function ShopPage() {
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [selectedSize, setSelectedSize] = useState(shapes[0].sizes[0]);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<
    Record<string, { checked: boolean; qty: number }>
  >({});
  const [inscriptionText, setInscriptionText] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [formData, setFormData] = useState({});

  // When shape changes, reset size to that shape's first size
  const handleShapeChange = useCallback((shape) => {
    setSelectedShape(shape);
    setSelectedSize(shape.sizes[0]);
  }, []);

  const totals = calculateTotal({
    sizePrice: selectedSize.price,
    selectedAddons,
    addons,
    inscriptionText,
    shippingPrice,
  });

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Header banner */}
      <div className="bg-gray-900 text-white text-center py-6 rounded-xl mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wider">Stunning 3D Gift</h1>
        <p className="text-gray-400 uppercase text-sm mt-1">Made From Your Photo</p>
      </div>

      <ShapeSelector selectedShapeId={selectedShape.id} onShapeChange={handleShapeChange} />

      <h2 className="text-gold font-bold uppercase tracking-widest text-center mt-8 mb-4">
        Choose Size
      </h2>
      <SizeSelector
        sizes={selectedShape.sizes}
        selectedSizeId={selectedSize.id}
        onSizeChange={setSelectedSize}
      />

      <PhotoUpload
        shapePreviewImage={selectedShape.previewImage}
        onPhotoChange={setUploadedPhoto}
      />

      <AddonList
        addons={addons}
        selectedAddons={selectedAddons}
        onAddonChange={(id, checked, qty) =>
          setSelectedAddons((prev) => ({ ...prev, [id]: { checked, qty } }))
        }
      />

      {/* Custom Inscription */}
      <div className="mt-6">
        <h3 className="font-bold uppercase text-gold tracking-wider mb-2">
          Custom Inscription <span className="text-sm font-normal">$ 10</span>
        </h3>
        <input
          type="text"
          placeholder="Text Engraving"
          value={inscriptionText}
          onChange={(e) => setInscriptionText(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <CustomerForm onShippingChange={setShippingPrice} onFormChange={setFormData} />

      <TotalBar
        subtotal={totals.subtotal}
        shippingPrice={totals.shipping}
        total={totals.total}
        isReady={!!uploadedPhoto && !!selectedSize}
      />

      {/* Contact strip */}
      <div className="text-center mt-8 border rounded-xl p-4 text-sm text-gray-500">
        <p className="font-bold uppercase mb-2">Contact Us for Queries/Support</p>
        <p>✉ support@memory3d.com &nbsp;|&nbsp; 📞 888-936-3667</p>
      </div>
    </main>
  );
}
```

---

## STYLING RULES

- The shop page uses a **centered single-column layout** (max-width ~640px), like the reference store
- Color for all labels, selected borders, price amounts, section headers: your project's **gold token** (`#C9A84C`) -  or use `text-orange-500` as a fallback if gold token isn't set
- Size card selected state: `border-2 border-gold` + checkmark icon
- Shape thumbnail selected state: `border-2 border-gold ring-2 ring-gold/30`
- Upload zone: `border-2 border-dashed border-gray-300 rounded-xl` with min-height 200px
- ADD TO CART button: `bg-gray-900 text-white font-bold uppercase tracking-widest py-4 w-full rounded-xl`
- Addon rows: separated by `border-b border-gray-100`, 16px padding top/bottom
- All Framer Motion animations: `initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}` on section mount

---

## PACKAGES TO INSTALL (if not already present)

```bash
npm install react-dropzone react-hook-form
```

---

## VALIDATION RULES

Before allowing "Add to Cart":

1. A shape must be selected ✓ (always true, default is first shape)
2. A size must be selected ✓ (always true, default is first size of shape)
3. A photo must be uploaded ✗ -  if missing, show toast: "Please upload your photo to continue."
4. Full Name, Email, Phone must be filled -  if missing, show toast with field name.

---

## WHAT NOT TO DO

- Do NOT create a separate `/shop/[productId]` page -  the reference store uses ONE page for all products, with shape selection at the top
- Do NOT show a product grid/catalog -  the shop IS the configurator
- Do NOT use a multi-step wizard/modal -  everything is on one scrollable page, exactly like the reference
- Do NOT omit any shape or size from the data -  all 18 shapes and their exact sizes and prices must be present
- Do NOT hardcode prices anywhere except `/data/products.ts`

---

## SUMMARY OF WHAT TO BUILD

1. `/data/products.ts` -  all shapes + sizes + addons data
2. `/components/shop/ShapeSelector.tsx` -  horizontal swipeable shape picker
3. `/components/shop/SizeSelector.tsx` -  2-col grid of size cards with live price
4. `/components/shop/PhotoUpload.tsx` -  drag-drop upload with preview
5. `/components/shop/AddonList.tsx` -  checkbox list with qty selectors
6. `/components/shop/PriceCalculator.ts` -  pure total calculation utility
7. `/components/shop/CustomerForm.tsx` -  details + shipping form
8. `/components/shop/TotalBar.tsx` -  live total + Add to Cart CTA
9. `/app/shop/page.tsx` -  main page orchestrating all components with shared state

Build all 9 files now.
