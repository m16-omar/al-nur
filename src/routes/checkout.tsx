import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { Nav, Footer } from "@/components/SiteChrome";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Lock, ExternalLink, ShieldCheck } from "lucide-react";
import { WHATSAPP } from "@/lib/collections";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const DEFAULT_SELAR_URL = "https://selar.com/m/fatima-muhammad3397104";

function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [isAuthenticated, user]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelarPayment = () => {
    setLoading(true);

    const savedStoreUrl = localStorage.getItem("alnur_selar_store_url") || DEFAULT_SELAR_URL;
    const itemsSummary = cart.map((i) => `${i.quantity}x ${i.product.name}`).join(", ");

    // Construct pre-filled Selar checkout URL
    const url = new URL(savedStoreUrl);
    url.searchParams.set("name", formData.name);
    url.searchParams.set("email", formData.email);
    if (formData.phone) url.searchParams.set("phone", formData.phone);
    url.searchParams.set("amount", totalPrice.toString());
    url.searchParams.set("order_summary", itemsSummary);
    url.searchParams.set("ref", `ALNUR-${Date.now()}`);

    // Redirect to Selar Gateway
    setTimeout(() => {
      window.location.href = url.toString();
    }, 600);
  };

  if (completed) {
    return (
      <main className="min-h-screen bg-background text-foreground font-body">
        <Nav />
        <div className="pt-40 pb-20 px-6 max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="h-20 w-20 rounded-full bg-gold-grad flex items-center justify-center text-primary-foreground mb-6 shadow-lg">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 text-foreground">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. 
              We've received your order for {totalItems} pieces. Our team is preparing your package for delivery.
            </p>
            <Link
              to="/"
              className="rounded-full bg-gold-grad px-8 py-3.5 font-bold text-primary-foreground shadow-gold hover:shadow-glow transition"
            >
              Return to Boutique
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-body">
      <Nav />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
            {/* Left side: Form */}
            <div className="flex-1">
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
                  Al-Nur Checkout
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1">
                  Complete Your <span className="italic text-gold-grad">Order</span>
                </h1>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-3xl bg-card/40">
                  <p className="text-muted-foreground mb-4 text-sm">Your shopping bag is empty.</p>
                  <Link to="/" className="text-primary font-bold hover:underline text-sm">
                    ← Explore Collections
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Step 1: Contact Info */}
                  <div className={`space-y-4 p-6 rounded-3xl border border-border bg-card/60 transition-opacity ${
                    step !== 1 ? "opacity-60 pointer-events-none" : ""
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        1
                      </span>
                      <h2 className="text-lg font-bold text-foreground">Customer & Delivery Details</h2>
                    </div>
                    <div className="grid gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Amina Bello"
                          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="amina@example.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-muted-foreground">Phone Number (WhatsApp)</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="0801 234 5678"
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Delivery Address & City</label>
                        <textarea
                          name="address"
                          rows={2}
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="12 Admiralty Way, Lekki Phase 1, Lagos"
                          className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                    </div>

                    {step === 1 && (
                      <button
                        onClick={() => {
                          if (!formData.name || !formData.email) {
                            alert("Please provide your name and email address.");
                            return;
                          }
                          setStep(2);
                        }}
                        className="mt-4 w-full rounded-full bg-primary text-primary-foreground py-3 text-xs font-bold hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Continue to Payment</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Step 2: Selar Gateway Payment */}
                  <div className={`space-y-4 p-6 rounded-3xl border border-border bg-card/60 transition-opacity ${
                    step !== 2 ? "opacity-60 pointer-events-none" : ""
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        2
                      </span>
                      <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
                    </div>

                    <div className="rounded-2xl border border-primary/30 p-5 bg-primary/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                          <span className="text-sm font-bold text-foreground">Selar Halal Payment Gateway</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        Cards (Mastercard, Visa, Verve), Bank Transfers, and USSD supported securely via your verified Selar merchant account.
                      </p>

                      <button
                        onClick={handleSelarPayment}
                        disabled={loading}
                        className="w-full rounded-full bg-gold-grad py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <span>Redirecting to Selar...</span>
                        ) : (
                          <>
                            <span>Pay ₦{totalPrice.toLocaleString()} via Selar</span>
                            <ExternalLink className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-border/60 text-xs">
                        <button
                          onClick={() => setStep(1)}
                          className="text-muted-foreground hover:text-foreground font-medium"
                        >
                          ← Edit Details
                        </button>
                        <a
                          href={WHATSAPP}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary font-bold hover:underline"
                        >
                          Or pay via WhatsApp Concierge
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Summary */}
            <div className="w-full md:w-[360px]">
              <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">Order Summary</h3>
                <div className="space-y-3 mb-5 max-h-[260px] overflow-y-auto pr-1 divide-y divide-border/60">
                  {cart.map((item) => (
                    <div key={item.product.name} className="pt-2.5 first:pt-0 flex justify-between gap-3 text-xs">
                      <div className="flex gap-2 min-w-0">
                        <span className="text-primary font-bold">{item.quantity}x</span>
                        <span className="truncate font-medium text-foreground">{item.product.name}</span>
                      </div>
                      <span className="font-bold shrink-0">{item.product.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-foreground">₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary font-bold">Calculated by Selar / Free Lagos</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border/80 text-sm">
                    <span className="font-bold text-foreground">Total Amount</span>
                    <span className="font-display text-xl font-bold text-primary">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-muted/40 border border-border/60 text-[11px] text-muted-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary shrink-0" />
                  <span>256-bit encrypted SSL payment powered by Selar.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
