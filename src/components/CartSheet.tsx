import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { WHATSAPP } from "@/lib/collections";
import { useNavigate } from "@tanstack/react-router";

export function CartSheet({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate({ to: "/checkout" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-border bg-card shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border p-6">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-2xl font-semibold">Your Bag ({totalItems})</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground opacity-40" />
                    </div>
                    <p className="text-muted-foreground">Your bag is empty.</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-4 text-sm font-medium text-primary hover:underline"
                    >
                      Start shopping →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.product.name} className="flex gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                           {/* Placeholder for product image since it's not in the Product type currently */}
                           <div className="w-full h-full bg-gold-grad opacity-20 flex items-center justify-center font-display text-xs">
                             Al-Nur
                           </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between gap-2">
                            <h3 className="font-display text-lg leading-tight">{item.product.name}</h3>
                            <button
                              onClick={() => removeFromCart(item.product.name)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-1 text-sm font-medium text-primary">{item.product.price}</div>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.name, item.quantity - 1)}
                              className="rounded-full border border-border p-1 hover:bg-muted transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.name, item.quantity + 1)}
                              className="rounded-full border border-border p-1 hover:bg-muted transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-border p-6 bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-display text-2xl font-semibold">₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6 text-center italic">
                    Final price includes platform fee breakdown at checkout.
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-full bg-gold-grad py-4 font-medium text-primary-foreground shadow-gold hover:shadow-glow transition-all"
                  >
                    Proceed to Checkout
                  </button>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Order via WhatsApp instead
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
