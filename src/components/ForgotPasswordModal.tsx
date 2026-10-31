import React, { useState } from "react";
import { X, Mail, CheckCircle2, ArrowRight, KeyRound, Lock, Eye, EyeOff, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { SERVERPOD_API_URL } from "@/lib/orders";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
  onPasswordResetSuccess?: (email: string) => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  defaultEmail = "",
  onPasswordResetSuccess,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [passwordResetRequestId, setPasswordResetRequestId] = useState<string | null>(null);
  const [finishToken, setFinishToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${SERVERPOD_API_URL}/emailIdp/startPasswordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        const reason = String(errJson?.data?.reason || errJson?.message || "");
        if (reason.toLowerCase().includes("notfound") || reason.toLowerCase().includes("not_found")) {
          throw new Error("No account found with this email. Please check your spelling or register.");
        } else if (reason.toLowerCase().includes("toomany")) {
          throw new Error("Too many attempts. Please wait 15 minutes before requesting another code.");
        } else {
          throw new Error("Unable to initiate password reset. Please verify your email.");
        }
      }

      const reqId = await res.json();
      setPasswordResetRequestId(reqId);
      setStep(2);
      toast.success(`Verification code sent to ${cleanEmail}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send reset code. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = otpCode.trim();
    if (!cleanCode) {
      setErrorMsg("Please enter the verification code sent to your email.");
      return;
    }
    if (!passwordResetRequestId) {
      setStep(1);
      setErrorMsg("Reset session expired. Please enter your email again.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${SERVERPOD_API_URL}/emailIdp/verifyPasswordResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordResetRequestId,
          verificationCode: cleanCode,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        const reason = errJson?.data?.reason || "invalid";
        if (reason === "expired") {
          throw new Error("Verification code has expired. Please request a new one.");
        } else if (reason === "tooManyAttempts") {
          throw new Error("Too many incorrect attempts. Please request a new code.");
        } else {
          throw new Error("Invalid verification code. Please check your email.");
        }
      }

      const token = await res.json();
      setFinishToken(token);
      setStep(3);
      toast.success("Code verified! You can now set your new password.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid code. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanPass) {
      setErrorMsg("Please enter a new password.");
      return;
    }
    if (cleanPass.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }
    if (cleanPass !== cleanConfirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!finishToken) {
      setStep(1);
      setErrorMsg("Reset session expired. Please restart.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${SERVERPOD_API_URL}/emailIdp/finishPasswordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          finishPasswordResetToken: finishToken,
          newPassword: cleanPass,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update password. Please ensure it meets policy requirements.");
      }

      toast.success("Password updated successfully! Please sign in with your new password.");
      if (onPasswordResetSuccess) {
        onPasswordResetSuccess(email.trim());
      }
      handleDone();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to save password. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setResending(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${SERVERPOD_API_URL}/emailIdp/startPasswordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      if (res.ok) {
        const reqId = await res.json();
        setPasswordResetRequestId(reqId);
        toast.success(`New verification code sent to ${cleanEmail}`);
      }
    } catch (e) {
      console.warn("Resend notice:", e);
    } finally {
      setResending(false);
    }
  };

  const handleDone = () => {
    setStep(1);
    setPasswordResetRequestId(null);
    setFinishToken(null);
    setOtpCode("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleDone}
          className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step Indicator Header */}
        <div className="flex items-center justify-between pr-8 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
              Al-Nur Boutique
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-muted-foreground">
              Step {step} of 3
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
              Reset Password
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
              Enter your registered email address to receive an 8-character verification OTP.
            </p>

            <form onSubmit={handleStartReset} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5 font-body">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. zainab@alnur.store"
                    required
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-body"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gold-grad py-3 px-5 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Enter OTP Code */}
        {step === 2 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
              Verify Code
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
              An 8-character verification code was sent to{" "}
              <strong className="text-foreground">{email}</strong>.
            </p>

            <form onSubmit={handleVerifyCode} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5 font-body">
                  Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    required
                    autoFocus
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground uppercase tracking-widest font-mono placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-muted-foreground hover:text-foreground font-medium"
                >
                  ← Change Email
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className={`h-3 w-3 ${resending ? "animate-spin" : ""}`} />
                  <span>Resend Code</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gold-grad py-3 px-5 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify Code</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Set New Password */}
        {step === 3 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
              Create New Password
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-body">
              Your identity has been verified. Choose a strong new password for your Al-Nur account.
            </p>

            <form onSubmit={handleFinishReset} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5 font-body">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/90 mb-1.5 font-body">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    minLength={8}
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-body"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gold-grad py-3 px-5 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Save New Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
