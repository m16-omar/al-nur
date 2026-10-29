import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { AuthHeader } from "@/components/AuthHeader";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, continueAsGuest } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscureConfirmPassword, setObscureConfirmPassword] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getRedirectTarget = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("redirect") || sessionStorage.getItem("alnur_redirect_after_login");
      if (r && r.startsWith("/")) return r;
    } catch (e) {
      void e;
    }
    return "/";
  };

  const isCheckoutRedirect = getRedirectTarget() === "/checkout";

  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!agreedToTerms) {
      setErrorMessage("Please accept the Terms of Service & Privacy Policy to proceed.");
      toast.error("Please accept the Terms of Service.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await signUp({ name, email, phone, password });
    setLoading(false);

    if (result.success) {
      toast.success(`Account created! Ahlan wa Sahlan, ${name}.`);
      const target = getRedirectTarget();
      try {
        sessionStorage.removeItem("alnur_redirect_after_login");
      } catch (e) {
        void e;
      }
      if (target === "/checkout") {
        navigate({ to: "/checkout" });
      } else {
        navigate({ to: "/" });
      }
    } else {
      setErrorMessage(result.error || "Unable to create account.");
      toast.error(result.error || "Sign up failed");
    }
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    toast.info("Ahlan wa Sahlan! Browsing as Guest.");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-primary/20">
      {/* Top Bar with Back to Store and Theme Toggle */}
      <header className="w-full border-b border-border/60 bg-background/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Store</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-md bg-card/90 backdrop-blur-md border border-border/80 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
          {/* Auth Header with 3D Arch Emblem */}
          <AuthHeader
            title="Create Account"
            subtitle="Join the premier modest fashion community today"
          />

          <div className="mt-6 space-y-4">
            {/* Checkout Redirect Notice Banner */}
            {isCheckoutRedirect && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs">
                <Lock className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span className="flex-1 font-medium">
                  Create an account to complete checkout and receive live order updates.
                </span>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="flex-1">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fatima Zahra"
                    required
                    className="w-full rounded-2xl border border-border bg-background py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. fatima@alnur.store"
                    required
                    className="w-full rounded-2xl border border-border bg-background py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 801 234 5678"
                    className="w-full rounded-2xl border border-border bg-background py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={obscurePassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-border bg-background py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setObscurePassword(!obscurePassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                  >
                    {obscurePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={obscureConfirmPassword ? "password" : "text"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-border bg-background py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setObscureConfirmPassword(!obscureConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                  >
                    {obscureConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded border-border text-primary focus:ring-primary/40 h-4 w-4 accent-primary"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="font-semibold text-foreground">Terms of Service</span> &{" "}
                    <span className="font-semibold text-foreground">Privacy Policy</span>
                  </span>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gold-grad py-3.5 px-5 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-3"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            {/* Social Auth Buttons */}
            <SocialAuthButtons
              isLoading={loading}
              onGoogleClick={() => {
                setName("Google Shopper");
                setEmail("google.user@alnur.store");
                setPassword("password123");
                setConfirmPassword("password123");
                signUp({
                  name: "Google Shopper",
                  email: "google.user@alnur.store",
                  password: "password123",
                }).then((res) => {
                  if (res.success) {
                    toast.success("Account created via Google! Ahlan wa Sahlan.");
                    navigate({ to: "/" });
                  }
                });
              }}
              onAppleClick={() => {
                setName("Apple Shopper");
                setEmail("apple.user@alnur.store");
                setPassword("password123");
                setConfirmPassword("password123");
                signUp({
                  name: "Apple Shopper",
                  email: "apple.user@alnur.store",
                  password: "password123",
                }).then((res) => {
                  if (res.success) {
                    toast.success("Account created via Apple! Ahlan wa Sahlan.");
                    navigate({ to: "/" });
                  }
                });
              }}
            />

            {/* Already have an account? Sign In */}
            <div className="pt-3 text-center text-xs text-muted-foreground">
              <span>Already have an account? </span>
              <Link
                to="/login"
                onClick={() => {
                  if (isCheckoutRedirect) {
                    try {
                      sessionStorage.setItem("alnur_redirect_after_login", "/checkout");
                    } catch (e) {
                      void e;
                    }
                  }
                }}
                className="font-bold text-primary hover:underline"
              >
                Sign In
              </Link>
            </div>

            {/* Continue as Guest */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border transition-colors cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Al-Nur Store. All rights reserved.
      </footer>
    </div>
  );
}
