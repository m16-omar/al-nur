import React, { useState } from "react";
import { X, Checkroom, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: string) => void;
  onGuestRestricted: (title: string, message: string) => void;
}

export function SizeGuideModal({
  isOpen,
  onClose,
  onSelectSize,
  onGuestRestricted,
}: SizeGuideModalProps) {
  const { isGuest, isAuthenticated } = useAuth();
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(6);

  if (!isOpen) return null;

  // Calculate abaya length
  const totalInches = heightFeet * 12 + heightInches;
  let recommendedSize = 52 + Math.floor((totalInches - 60) / 2) * 2;
  if (recommendedSize < 50) recommendedSize = 50;
  if (recommendedSize > 62) recommendedSize = 62;

  const handleSelectSize = () => {
    onSelectSize(String(recommendedSize));
    toast.success(`Selected Size ${recommendedSize}!`);
    onClose();
  };

  const handleSaveToProfile = () => {
    if (isGuest || !isAuthenticated) {
      onGuestRestricted(
        "Save Modesty Size Profile",
        "Sign in or create an account to permanently save your custom modesty fit and abaya dimensions to your profile.",
      );
      return;
    }

    try {
      localStorage.setItem("alnur_saved_abaya_size", String(recommendedSize));
      localStorage.setItem("alnur_saved_height", `${heightFeet}' ${heightInches}"`);
      toast.success(`Saved Size ${recommendedSize} to your Modesty Profile! 👗`);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div>
            <h2 className="text-lg font-bold text-foreground">Abaya & Thobe Size Guide</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select your height to calculate your ideal floor-grazing modest length.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Height Selectors */}
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-center gap-6">
            {/* Feet */}
            <div className="text-center">
              <label className="block text-xs font-bold text-foreground mb-2">Feet</label>
              <div className="flex items-center gap-1.5">
                {[4, 5, 6].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setHeightFeet(f)}
                    className={`h-10 w-11 rounded-xl text-xs font-bold transition-all ${
                      heightFeet === f
                        ? "bg-primary text-primary-foreground shadow-sm scale-105"
                        : "bg-muted/40 text-foreground hover:bg-muted/70"
                    }`}
                  >
                    {f}'
                  </button>
                ))}
              </div>
            </div>

            {/* Inches */}
            <div className="text-center">
              <label className="block text-xs font-bold text-foreground mb-2">Inches</label>
              <select
                value={heightInches}
                onChange={(e) => setHeightInches(Number(e.target.value))}
                className="h-10 rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}"
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Recommendation Display */}
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-primary">
                Recommended Size: {recommendedSize}
              </p>
              <p className="text-xs text-muted-foreground">
                Perfect floor-grazing drape for {heightFeet}' {heightInches}" height.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={handleSelectSize}
              className="w-full rounded-2xl bg-gold-grad py-3 px-4 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow transition-all"
            >
              Select Size {recommendedSize}
            </button>

            <button
              type="button"
              onClick={handleSaveToProfile}
              className="w-full rounded-2xl border border-border bg-card hover:bg-muted/40 py-2.5 px-4 text-xs font-semibold text-foreground transition-all"
            >
              Save to My Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
