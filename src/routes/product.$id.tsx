import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  CheckCircle2,
  ShieldCheck,
  Feather,
  Sparkles,
  ShoppingBag,
  Ruler,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { toast } from "sonner";
import { getProductById, getAllProducts, Product } from "@/lib/collections";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { Nav, Footer } from "@/components/SiteChrome";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { ImageZoomModal } from "@/components/ImageZoomModal";
import { GuestPromptModal } from "@/components/GuestPromptModal";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailsPage,
});

const COLOR_SWATCHES = [
  { name: "Midnight Black", color: "#18181B" },
  { name: "Royal Emerald", color: "#064E3B" },
  { name: "Desert Gold", color: "#D97706" },
  { name: "Medina Ivory", color: "#F4EFE6" },
  { name: "Deep Burgundy", color: "#831843" },
];

const AVAILABLE_SIZES = ["50", "52", "54", "56", "58", "60", "62"];

const CLIENT_REVIEWS = [
  {
    name: "Fatima Zahra",
    city: "Lagos, Nigeria",
    rating: 5,
    date: "3 days ago",
    comment:
      "The drape and modesty of this piece is breathtaking! The fabric is truly opaque without feeling heavy in the humid Lagos heat. MashAllah, worth every naira.",
  },
  {
    name: "Amina Lawal",
    city: "Abuja, FCT",
    rating: 5,
    date: "1 week ago",
    comment:
      "Floor grazing length is exact to my measurement (Size 56). The gold threading on the wrists adds such a regal touch for Eid and Jumu'ah.",
  },
  {
    name: "Halima Bello",
    city: "Kano, Nigeria",
    rating: 4.8,
    date: "2 weeks ago",
    comment:
      "Received in luxury packaging smelling of natural oud. Fast delivery and master quality stitching.",
  },
];

function ProductDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  // Resolve product or fallback
  const resolvedProduct = getProductById(id) || {
    id: id || "feat_1",
    name: "Al-Nur Modest Couture Item",
    price: "₦32,000",
    originalPrice: "₦38,000",
    blurb:
      "Handcrafted from luxurious imported Medina crepe. Tailored with a modest flowing silhouette that offers maximum opacity, elegance, and comfort.",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    category: "abayas",
    rating: 4.9,
    reviewCount: 48,
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].name);
  const [selectedSize, setSelectedSize] = useState("56");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  // Guest restriction prompt
  const [guestPromptOpen, setGuestPromptOpen] = useState(false);
  const [guestPromptContent, setGuestPromptContent] = useState({ title: "", message: "" });

  const galleryImages = [
    resolvedProduct.img,
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
  ];

  const handleShare = () => {
    const link = `https://alnur.store/product/${resolvedProduct.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${link} • ${resolvedProduct.name} - ${resolvedProduct.price}`);
      toast.success("Product link copied to clipboard! Share the modesty couture look.");
    }
  };

  const handleAddToCart = () => {
    addToCart(resolvedProduct, quantity);
    toast.success(
      `Added ${quantity}x "${resolvedProduct.name}" (${selectedSize}, ${selectedColor}) to Shopping Bag! 🛍️`,
    );
  };

  const handleBuyNow = () => {
    addToCart(resolvedProduct, quantity);
    if (!isAuthenticated || isGuest) {
      try {
        sessionStorage.setItem("alnur_redirect_after_login", "/checkout");
      } catch (e) {
        void e;
      }
      toast.info("Sign in required to checkout", {
        description: `"${resolvedProduct.name}" added to bag. Please sign in to finalize order.`,
      });
      navigate({ to: "/login" });
      return;
    }
    navigate({ to: "/checkout" });
  };

  const triggerGuestRestriction = (title: string, message: string) => {
    setGuestPromptContent({ title, message });
    setGuestPromptOpen(true);
  };

  const favorited = isFavorite(resolvedProduct.id);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-primary/20">
      <Nav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Collection</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full border border-border bg-card hover:bg-muted/40 text-foreground transition-colors"
              title="Share look"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(resolvedProduct)}
              className="p-2 rounded-full border border-border bg-card hover:bg-muted/40 transition-colors"
              title={favorited ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`h-4 w-4 ${
                  favorited ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery with Zoom & Carousel */}
          <div className="space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card group shadow-md aspect-[4/5] sm:aspect-square">
              <img
                src={galleryImages[selectedImageIndex]}
                alt={resolvedProduct.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                onClick={() => setZoomOpen(true)}
              />

              {/* Zoom pill indicator */}
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
              >
                <ZoomIn className="h-3.5 w-3.5" />
                <span>Pinch / Click to Zoom</span>
              </button>

              {/* Carousel navigation arrows */}
              <button
                type="button"
                onClick={() =>
                  setSelectedImageIndex((idx) => (idx === 0 ? galleryImages.length - 1 : idx - 1))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 dark:bg-black/80 text-foreground flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedImageIndex((idx) => (idx === galleryImages.length - 1 ? 0 : idx + 1))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 dark:bg-black/80 text-foreground flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail selector strips */}
            <div className="flex items-center gap-3 justify-center">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-primary ring-2 ring-primary/30 scale-105"
                      : "border-border/80 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details, Modesty Badges & Configurator */}
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/25">
                  {resolvedProduct.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{resolvedProduct.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground font-normal">
                    ({resolvedProduct.reviewCount} client reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground font-display">
                {resolvedProduct.name}
              </h1>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary font-display">
                  {resolvedProduct.price}
                </span>
                {resolvedProduct.originalPrice && (
                  <span className="text-sm sm:text-base text-muted-foreground line-through">
                    {resolvedProduct.originalPrice}
                  </span>
                )}
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  In Stock • Artisanal Handcrafted
                </span>
              </div>
            </div>

            {/* Blurb */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {resolvedProduct.blurb}
            </p>

            {/* Modesty Badges */}
            <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-card border border-border/80 shadow-sm text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground">100% Opaque</span>
                <span className="text-[9px] text-muted-foreground">Certified Medina Crepe</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Feather className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground">Breathable</span>
                <span className="text-[9px] text-muted-foreground">Flowing & Light</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground">Master Stitch</span>
                <span className="text-[9px] text-muted-foreground">Hand-stitched Sfifa</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-foreground">
                  Color: <span className="text-primary">{selectedColor}</span>
                </label>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setSelectedColor(swatch.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs ${
                      selectedColor === swatch.name
                        ? "border-primary bg-primary/10 font-bold shadow-sm ring-1 ring-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: swatch.color }}
                    />
                    <span>{swatch.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Modal */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-foreground">
                  Abaya & Thobe Length: <span className="text-primary">Size {selectedSize}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Size Calculator</span>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {AVAILABLE_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-center rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground shadow-sm scale-105"
                        : "border border-border bg-card text-foreground hover:border-primary/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Primary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-border bg-card rounded-2xl p-1 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-foreground hover:bg-muted/50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex-1 rounded-2xl border border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary py-3.5 px-5 text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Bag</span>
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full flex-1 rounded-2xl bg-gold-grad text-primary-foreground py-3.5 px-5 text-xs font-bold shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Client Reviews Section */}
            <div className="pt-6 border-t border-border/60">
              <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <span>Verified Client Reviews</span>
                <span className="text-xs text-primary font-normal">(4.9 / 5.0 Rating)</span>
              </h3>

              <div className="space-y-3">
                {CLIENT_REVIEWS.map((rev, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-card border border-border/60 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{rev.name}</span>
                        <span className="text-[10px] text-muted-foreground">• {rev.city}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: 5 }, (_, k) => (
                          <Star key={k} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar for Mobile View */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t border-border/80 p-3 px-4 flex items-center justify-between gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div>
          <span className="text-[10px] text-muted-foreground block">Total Price</span>
          <span className="text-sm font-extrabold text-primary font-display">
            {resolvedProduct.price}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-xl border border-primary/50 bg-primary/10 text-primary py-2 px-3 text-xs font-bold"
          >
            Add to Bag
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="rounded-xl bg-gold-grad text-primary-foreground py-2 px-4 text-xs font-bold shadow-gold"
          >
            Buy Now
          </button>
        </div>
      </div>

      <Footer />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onSelectSize={(s) => setSelectedSize(s)}
        onGuestRestricted={triggerGuestRestriction}
      />

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
        imageUrl={galleryImages[selectedImageIndex]}
        productName={resolvedProduct.name}
      />

      {/* Guest Restriction Modal */}
      <GuestPromptModal
        isOpen={guestPromptOpen}
        onClose={() => setGuestPromptOpen(false)}
        title={guestPromptContent.title}
        message={guestPromptContent.message}
      />
    </div>
  );
}
