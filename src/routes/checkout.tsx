import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { getSavedAddresses, saveOrder } from "@/lib/orders";
import { Nav, Footer } from "@/components/SiteChrome";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Lock,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  CreditCard,
  Building2,
  Smartphone,
} from "lucide-react";
import { WHATSAPP, waLink } from "@/lib/collections";
import {
  DEFAULT_SELAR_STORE_URL,
  getActiveSelarStoreUrl,
  buildSelarCheckoutUrl,
} from "@/lib/selar";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const { user, isAuthenticated, isGuest } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentGateway, setPaymentGateway] = useState<"monnify" | "selar">("monnify");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Guard: Users must sign in to access checkout
  useEffect(() => {
    if (!isAuthenticated || isGuest) {
      try {
        sessionStorage.setItem("alnur_redirect_after_login", "/checkout");
      } catch (e) {
        void e;
      }
      toast.error("Sign in required to checkout", {
        description: "Please sign in or create an account to finalize your order.",
      });
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isGuest, navigate]);

  useEffect(() => {
    if (isAuthenticated && user && !isGuest) {
      const addresses = getSavedAddresses();
      const defaultAddr =
        addresses.find((a) => a.isDefault)?.address || addresses[0]?.address || "";
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
        address: prev.address || defaultAddr,
      }));
    }
  }, [isAuthenticated, user, isGuest]);

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // If user is a guest or unauthenticated, block checkout and render gated screen
  if (!isAuthenticated || isGuest) {
    return (
      <main className="min-h-screen bg-background text-foreground font-body">
        <Nav />
        <div className="pt-32 pb-20 px-4 sm:px-6">
          <div className="mx-auto max-w-lg text-center p-8 sm:p-10 rounded-3xl border border-primary/25 bg-card shadow-2xl">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5 border border-primary/20 shadow-sm">
              <Lock className="h-7 w-7" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold block mb-1">
              Member Verification
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-foreground">
              Sign In Required to Checkout
            </h1>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Assalamu Alaikum! Your modest couture items are securely saved in your shopping bag.
              Please sign in or create an account to verify your delivery address and finalize your
              halal order.
            </p>

            {cart.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-muted/40 border border-border/80 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-foreground block">
                      {totalItems} {totalItems === 1 ? "garment" : "garments"} in bag
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Subtotal: ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-primary">Preserved</span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => {
                  try {
                    sessionStorage.setItem("alnur_redirect_after_login", "/checkout");
                  } catch (e) {
                    void e;
                  }
                }}
                className="w-full rounded-full bg-gold-grad py-3.5 font-bold text-primary-foreground shadow-gold hover:shadow-glow transition text-center text-sm flex items-center justify-center gap-2"
              >
                <span>Sign In to Complete Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/signup"
                onClick={() => {
                  try {
                    sessionStorage.setItem("alnur_redirect_after_login", "/checkout");
                  } catch (e) {
                    void e;
                  }
                }}
                className="w-full rounded-full border border-border bg-background py-3.5 font-bold text-foreground hover:bg-muted/40 transition text-center text-sm"
              >
                Create an Account
              </Link>

              <a
                href={waLink(
                  `Assalamu Alaikum! I would like to order my Al-Nur shopping bag (${totalItems} items, ₦${totalPrice.toLocaleString()}) via WhatsApp Concierge.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition mt-3 font-medium"
              >
                Or order directly via WhatsApp Concierge →
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMonnifyPayment = () => {
    if (!formData.name || !formData.email) {
      toast.error("Please provide your name and email address.");
      return;
    }
    setLoading(true);

    const orderId = `ALN-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNum = `ALN-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const itemsSummary = cart.map((i) => `${i.quantity}x ${i.product.name}`).join(", ");

    saveOrder({
      id: orderId,
      orderDate: "Today, Just now",
      status: "processing",
      trackingNumber: trackingNum,
      deliveryAddress: formData.address || "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
      estimatedDelivery: "In 2-3 business days",
      subtotal: totalPrice,
      shippingFee: 2500,
      totalAmount: totalPrice + 2500,
      courierName: "Ibrahim",
      courierPhone: "+234 803 123 4567",
      items: cart.map((i) => ({
        name: i.product.name,
        category: i.product.category,
        quantity: i.quantity,
        price: Number(i.product.price.replace(/[^0-9]/g, "")),
        imageUrl: i.product.img,
      })),
      timeline: [
        {
          title: "Order Placed",
          subtitle: "Payment initiated via Monnify Gateway",
          date: "Just now",
          isCompleted: true,
          isCurrent: true,
        },
        {
          title: "Custom Sizing & Quality Check",
          subtitle: "Scheduled with Al-Nur Master Tailors",
          date: "Pending",
          isCompleted: false,
        },
        {
          title: "Courier Dispatch",
          subtitle: "Waybill assigned for delivery",
          date: "Pending",
          isCompleted: false,
        },
      ],
    });

    // Check if Monnify SDK is loaded
    if (typeof window !== "undefined" && (window as any).MonnifySDK) {
      try {
        const cleanRef = `ALN${Date.now()}`;
        (window as any).MonnifySDK.initialize({
          amount: totalPrice,
          currency: "NGN",
          reference: cleanRef,
          customerName: formData.name,
          customerFullName: formData.name,
          customerEmail: formData.email,
          customerMobileNumber: formData.phone || "08031902398",
          apiKey: "MK_TEST_F0NB310FSJ",
          contractCode: "6355760337",
          paymentDescription: `Al-Nur Order - ${itemsSummary}`.slice(0, 60),
          isTestMode: true,
          paymentMethods: ["CARD", "ACCOUNT_TRANSFER", "USSD"],
          metadata: {
            orderId,
            items: itemsSummary,
          },
          metaData: {
            orderId,
            items: itemsSummary,
          },
          onComplete: function (response: any) {
            setLoading(false);
            if (response && (response.paymentStatus === "PAID" || response.status === "SUCCESS")) {
              clearCart();
              setCompleted(true);
              toast.success("Payment Received! Your Al-Nur order is confirmed.");
            } else {
              toast.error("Payment could not be completed. You can pay securely with Selar.", {
                action: {
                  label: "Use Selar",
                  onClick: () => handleSelarPayment(),
                },
              });
            }
          },
          onClose: function () {
            setLoading(false);
            toast.info("Monnify gateway closed. You can switch to Selar or WhatsApp Concierge anytime.", {
              action: {
                label: "Pay with Selar",
                onClick: () => handleSelarPayment(),
              },
            });
          },
        });
        return;
      } catch (err) {
        console.error("Monnify SDK initialization notice:", err);
      }
    }

    // Fallback if SDK blocked or loading
    handleSelarPayment();
  };

  const handleSelarPayment = () => {
    setLoading(true);

    const orderId = `ALN-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNum = `ALN-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`;

    saveOrder({
      id: orderId,
      orderDate: "Today, Just now",
      status: "processing",
      trackingNumber: trackingNum,
      deliveryAddress: formData.address || "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
      estimatedDelivery: "In 2-3 business days",
      subtotal: totalPrice,
      shippingFee: 2500,
      totalAmount: totalPrice + 2500,
      courierName: "Ibrahim",
      courierPhone: "+234 803 123 4567",
      items: cart.map((i) => ({
        name: i.product.name,
        category: i.product.category,
        quantity: i.quantity,
        price: Number(i.product.price.replace(/[^0-9]/g, "")),
        imageUrl: i.product.img,
      })),
      timeline: [
        {
          title: "Order Placed",
          subtitle: "Payment initiated via Selar Halal Gateway",
          date: "Just now",
          isCompleted: true,
          isCurrent: true,
        },
        {
          title: "Custom Sizing & Quality Check",
          subtitle: "Scheduled with Al-Nur Master Tailors",
          date: "Pending",
          isCompleted: false,
        },
        {
          title: "Courier Dispatch",
          subtitle: "Waybill assigned for delivery",
          date: "Pending",
          isCompleted: false,
        },
      ],
    });

    const itemsSummary = cart.map((i) => `${i.quantity}x ${i.product.name}`).join(", ");
    const selarUrl = buildSelarCheckoutUrl({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: totalPrice,
      orderSummary: itemsSummary,
      orderId,
      origin: typeof window !== "undefined" ? window.location.origin : undefined,
    });

    // Redirect to official Al-Nur Selar Gateway
    setTimeout(() => {
      window.location.href = selarUrl;
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
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 text-foreground">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Thank you, <span className="text-foreground font-semibold">{formData.name}</span>.
              We've received your order for {totalItems} pieces. Our team is preparing your package
              for delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/orders"
                className="w-full sm:w-auto rounded-full bg-gold-grad px-8 py-3.5 font-bold text-primary-foreground shadow-gold hover:shadow-glow transition text-center"
              >
                Track Order Live
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto rounded-full border border-border bg-card px-8 py-3.5 font-bold text-foreground hover:bg-muted/40 transition text-center"
              >
                Return to Boutique
              </Link>
            </div>
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
                  <div
                    className={`space-y-4 p-6 rounded-3xl border border-border bg-card/60 transition-opacity ${
                      step !== 1 ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        1
                      </span>
                      <h2 className="text-lg font-bold text-foreground">
                        Customer & Delivery Details
                      </h2>
                    </div>
                    <div className="grid gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">
                          Full Name
                        </label>
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
                          <label className="text-xs font-semibold text-muted-foreground">
                            Email Address
                          </label>
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
                          <label className="text-xs font-semibold text-muted-foreground">
                            Phone Number (WhatsApp)
                          </label>
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
                        <label className="text-xs font-semibold text-muted-foreground">
                          Delivery Address & City
                        </label>
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

                  {/* Step 2: Payment Gateway Selection & Execution */}
                  <div
                    className={`space-y-4 p-6 rounded-3xl border border-border bg-card/60 transition-opacity ${
                      step !== 2 ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        2
                      </span>
                      <h2 className="text-lg font-bold text-foreground">Select Payment Method</h2>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4">
                      Choose your preferred secure checkout option. Both support Nigerian Bank Transfers,
                      Mastercard, Visa, and Verve.
                    </p>

                    {/* Gateway Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {/* Monnify Option (Recommended) */}
                      <button
                        type="button"
                        onClick={() => setPaymentGateway("monnify")}
                        className={`text-left p-4 rounded-2xl border transition-all relative ${
                          paymentGateway === "monnify"
                            ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                            : "border-border bg-card/40 hover:bg-card hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold text-foreground">Monnify</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Exact Amount (₦{totalPrice.toLocaleString()})
                        </p>
                        <p className="text-[11px] text-muted-foreground/80 mt-1">
                          Bank Transfer, Debit Cards & USSD
                        </p>
                      </button>

                      {/* Selar Option */}
                      <button
                        type="button"
                        onClick={() => setPaymentGateway("selar")}
                        className={`text-left p-4 rounded-2xl border transition-all relative ${
                          paymentGateway === "selar"
                            ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                            : "border-border bg-card/40 hover:bg-card hover:border-border/80"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
                              <ShieldCheck className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold text-foreground">Selar</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            Alternative
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Official Merchant Checkout
                        </p>
                        <p className="text-[11px] text-muted-foreground/80 mt-1">
                          Direct Selar Storefront Page
                        </p>
                      </button>
                    </div>

                    {/* Active Gateway Details & Action */}
                    {paymentGateway === "monnify" ? (
                      <div className="rounded-2xl border border-primary/30 p-5 bg-primary/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span className="text-sm font-bold text-foreground">
                              Monnify Dynamic Checkout
                            </span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            Exact ₦{totalPrice.toLocaleString()}
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>
                              <strong>Instant Virtual Bank Transfer:</strong> Generates a dedicated Wema / Sterling virtual account for this exact order with instant verification.
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CreditCard className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>
                              <strong>Debit Cards & USSD:</strong> Mastercard, Visa, and Verve supported with 2FA OTP security.
                            </span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 flex items-start gap-2">
                          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                          <span>
                            <strong>Developer Notice:</strong> Monnify Test Sandbox (<code className="text-[10px]">sandbox.monnify.com</code>) is temporarily undergoing upstream maintenance (HTTP 503). If the sandbox modal says <em>Unable to process</em>, select <strong>Selar</strong> above.
                          </span>
                        </div>

                        <button
                          onClick={handleMonnifyPayment}
                          disabled={loading}
                          className="w-full rounded-full bg-gold-grad py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <span>Opening Monnify Gateway...</span>
                          ) : (
                            <>
                              <span>Pay ₦{totalPrice.toLocaleString()} with Monnify</span>
                              <ChevronRight className="h-4 w-4" />
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentGateway("selar")}
                          className="w-full text-center text-xs font-semibold text-primary hover:underline py-0.5"
                        >
                          Switch to Selar Gateway instead →
                        </button>

                        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
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
                    ) : (
                      <div className="rounded-2xl border border-primary/30 p-5 bg-primary/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span className="text-sm font-bold text-foreground">
                              Selar Halal Payment Gateway
                            </span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
                          <p>
                            Cards (Mastercard, Visa, Verve), Bank Transfers, and USSD supported
                            securely via your verified Selar product link.
                          </p>
                          <p className="text-[11px] font-mono text-primary flex items-center gap-1.5 pt-0.5">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Product Link: https://selar.com/h3wa923367</span>
                          </p>
                        </div>

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

                        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
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
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right side: Summary */}
            <div className="w-full md:w-[360px]">
              <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-5 max-h-[260px] overflow-y-auto pr-1 divide-y divide-border/60">
                  {cart.map((item) => (
                    <div
                      key={item.product.name}
                      className="pt-2.5 first:pt-0 flex justify-between gap-3 text-xs"
                    >
                      <div className="flex gap-2 min-w-0">
                        <span className="text-primary font-bold">{item.quantity}x</span>
                        <span className="truncate font-medium text-foreground">
                          {item.product.name}
                        </span>
                      </div>
                      <span className="font-bold shrink-0">{item.product.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-foreground">
                      ₦{totalPrice.toLocaleString()}
                    </span>
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
                  <span>256-bit encrypted SSL payment powered by Monnify & Selar.</span>
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
