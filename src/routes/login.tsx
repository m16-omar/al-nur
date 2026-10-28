import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles, Star, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { AuthHeader } from "@/components/AuthHeader";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login, savedUser, clearSavedUser, continueAsGuest } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [obscurePassword, setObscurePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Auto-populate saved user email if available
  useEffect(() => {
    if (savedUser?.email && !email) {
      setEmail(savedUser.email);
    }
  }, [savedUser]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    setLoading(true);
    const result = await login(email, password, rememberMe);
    setLoading(false);

    if (result.success) {
      const displayName = savedUser?.name || (email.includes("@") ? email.split("@")[0] : "Member");
      toast.success(`Assalamu Alaikum! Welcome back, ${displayName}.`);
      navigate({ to: "/" });
    } else {
      setErrorMessage(result.error || "Unable to sign in. Please verify your credentials.");
      toast.error(result.error || "Sign in failed");
    }
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    toast.info("Ahlan wa Sahlan! Browsing as Guest.");
    navigate({ to: "/" });
  };

  const handleQuickDemo = () => {
    setEmail("amina@alnur.store");
    setPassword("password123");
    toast.success("Filled demo credentials for Amina Lawal");
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
            title="Welcome Back"
            subtitle="Sign in to access your curated modest collections"
          />

          <div className="mt-6 space-y-4">
            {/* Returning User Personalized Pill */}
            {savedUser && (
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/50 text-foreground">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-[#D4AF37]/20 text-[#8F581B] dark:text-[#F0B135] flex items-center justify-center shrink-0">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-foreground">
                      Assalamu Alaikum, {savedUser.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Welcome back to your curated modest collections
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    clearSavedUser();
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-[11px] font-semibold text-primary hover:underline px-1.5 py-1"
                >
                  Switch
                </button>
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
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email / Username Input */}
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5">
                  Email Address or Phone
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aisha@alnur.store"
                    required
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
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
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-10 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setObscurePassword(!obscurePassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                  >
                    {obscurePassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-muted-foreground select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4 accent-primary"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="font-semibold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Quick Fill Demo Chip */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/40 text-[11px] font-bold text-primary hover:bg-primary/20 transition-all shadow-sm"
                >
                  <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  <span>Quick Fill Demo (Amina)</span>
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gold-grad py-3.5 px-5 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Social Auth Buttons */}
            <SocialAuthButtons
              isLoading={loading}
              onGoogleClick={() => {
                setEmail("google.user@alnur.store");
                setPassword("password123");
                handleLogin();
              }}
              onAppleClick={() => {
                setEmail("apple.user@alnur.store");
                setPassword("password123");
                handleLogin();
              }}
            />

            {/* Don't have an account? Sign Up */}
            <div className="pt-4 text-center text-xs text-muted-foreground">
              <span>Don't have an account? </span>
              <Link to="/signup" className="font-bold text-primary hover:underline">
                Sign Up
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

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        defaultEmail={email}
      />

      {/* Footer copyright */}
      <footer className="py-4 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Al-Nur Store. All rights reserved.
      </footer>
    </div>
  );
}

