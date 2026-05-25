"Create a Quick Config Modal/Drawer that opens when user clicks 'Add to Cart' on any product card on the landing page or shop grid. Here are the exact requirements:

1. Create /components/shop/QuickConfigModal.tsx
   This is a bottom drawer on mobile, side sheet on desktop (use shadcn Sheet component with side="right" on desktop and side="bottom" on mobile).
   It receives these props:
   typescriptinterface QuickConfigModalProps {
   isOpen: boolean;
   onClose: () => void;
   defaultShape?: Shape; // pre-selected shape if clicked from a specific product card
   }
   Inside the modal, render in this exact order:

Close button (X) top right
Selected shape name as heading
Shape thumbnail image (small, centered)
SizeSelector component (same one from /shop page)
PhotoUpload component (same one from /shop page, compact version)
AddonList component (scrollable, max-height 300px)
Inscription text input
Live total price display (large, gold)
"ADD TO CART" button (full width, dark)

State inside the modal:
typescriptconst [selectedShape, setSelectedShape] = useState(defaultShape || shapes[0]);
const [selectedSize, setSelectedSize] = useState(defaultShape?.sizes[0] || shapes[0].sizes[0]);
const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
const [selectedAddons, setSelectedAddons] = useState({});
const [inscriptionText, setInscriptionText] = useState('');
When ADD TO CART is clicked inside modal:

Validate photo is uploaded → toast if missing
dispatch ADD_ITEM to CartContext
Show success toast "Added to cart!"
Close the modal
Reset all modal state for next use

2. Modify /app/page.tsx (Home page)
   Add this state at the top:
   typescriptconst [quickConfigOpen, setQuickConfigOpen] = useState(false);
   const [quickConfigShape, setQuickConfigShape] = useState<Shape | null>(null);
   On every product card or category card that has "Add to Cart" or "Order Now" button:
   typescriptonClick={() => {
   setQuickConfigShape(shape); // pass the specific shape for that card
   setQuickConfigOpen(true);
   }}
   Render the modal at the bottom of the page:
   tsx<QuickConfigModal
   isOpen={quickConfigOpen}
   onClose={() => {
   setQuickConfigOpen(false);
   setQuickConfigShape(null);
   }}
   defaultShape={quickConfigShape || shapes[0]}
   />
3. Modify /app/shop/page.tsx
   The /shop page already has full configurator. Just make sure its ADD TO CART button:

Dispatches to CartContext (not opens modal — modal is only for landing page)
Shows success toast
Does NOT navigate away

4. Navbar Cart Icon behavior
   Cart icon in navbar:

Shows item count badge
On click → navigate to /cart
Does NOT open the modal

The complete user flow is now:
Home page → click "Add to Cart" on any product card
→ QuickConfigModal slides open (right side on desktop, bottom on mobile)
→ User picks size, uploads photo, selects addons
→ Clicks ADD TO CART inside modal
→ Modal closes, toast shows "Added to cart!"
→ Navbar badge updates to show count
→ User clicks cart icon → goes to /cart
→ Reviews items → clicks Proceed to Checkout → /checkout
→ Fills form → clicks Place Order → success confirmation shown
Files to create/modify:

/components/shop/QuickConfigModal.tsx — new
/app/page.tsx — modify (add modal state + pass to product cards)
/app/shop/page.tsx — no change needed to ADD TO CART logic
/app/cart/page.tsx — already built
/app/checkout/page.tsx — already built

Build QuickConfigModal.tsx now and show me the modifications needed in app/page.tsx."\*\*
