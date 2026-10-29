import { test, describe } from "node:test";
import assert from "node:assert/strict";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
}

function checkAccessPermission(
  user: UserProfile | null,
  action:
    | "payment_methods"
    | "wishlist_sync"
    | "account_settings"
    | "save_size_profile"
    | "checkout",
): { allowed: boolean; promptTitle?: string; promptMessage?: string; redirectUrl?: string } {
  const isGuest = user === null || user.isGuest;

  if (isGuest) {
    switch (action) {
      case "checkout":
        return {
          allowed: false,
          promptTitle: "Sign In Required to Checkout",
          promptMessage:
            "Please sign in or create an account to verify your delivery address and finalize your order.",
          redirectUrl: "/login?redirect=/checkout",
        };
      case "payment_methods":
        return {
          allowed: false,
          promptTitle: "Payment & Cards",
          promptMessage:
            "Sign in or create an account to securely save and manage your payment methods.",
        };
      case "wishlist_sync":
        return {
          allowed: false,
          promptTitle: "Modesty Wishlist",
          promptMessage:
            "Sign in or create an account to view and sync your favorited modest couture across all your devices.",
        };
      case "account_settings":
        return {
          allowed: false,
          promptTitle: "Account Settings",
          promptMessage:
            "Please sign in or create an account to access and manage your Al-Nur account settings.",
        };
      case "save_size_profile":
        return {
          allowed: false,
          promptTitle: "Save Modesty Size Profile",
          promptMessage:
            "Sign in or create an account to permanently save your custom modesty fit and abaya dimensions to your profile.",
        };
    }
  }

  return { allowed: true };
}

function calculateRecommendedAbayaSize(heightFeet: number, heightInches: number): number {
  const totalInches = heightFeet * 12 + heightInches;
  let recommended = 52 + Math.floor((totalInches - 60) / 2) * 2;
  if (recommended < 50) recommended = 50;
  if (recommended > 62) recommended = 62;
  return recommended;
}

describe("Guest Restrictions & Modesty Sizing Calculator Suite", () => {
  const guestUser: UserProfile = {
    id: "guest_user",
    name: "Guest Shopper",
    email: "",
    isGuest: true,
  };

  const authenticatedUser: UserProfile = {
    id: "usr_amina",
    name: "Amina Lawal",
    email: "amina@alnur.store",
    isGuest: false,
  };

  test("11. Guest shoppers are gated from accessing saved Payment & Cards", () => {
    const result = checkAccessPermission(guestUser, "payment_methods");
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.promptTitle, "Payment & Cards");
    assert.match(result.promptMessage!, /securely save and manage your payment methods/i);
  });

  test("12. Authenticated shoppers have full access to Payment & Cards without prompts", () => {
    const result = checkAccessPermission(authenticatedUser, "payment_methods");
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.promptTitle, undefined);
  });

  test("13. Guest shoppers are prompted when attempting to sync Modesty Wishlist", () => {
    const result = checkAccessPermission(guestUser, "wishlist_sync");
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.promptTitle, "Modesty Wishlist");
  });

  test("14. Guest shoppers are prompted when saving Abaya Size Profile", () => {
    const result = checkAccessPermission(guestUser, "save_size_profile");
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.promptTitle, "Save Modesty Size Profile");
  });

  test("15. Abaya size calculator accurately computes floor-grazing length based on height", () => {
    // 5' 6" (66 inches): 52 + ((66 - 60)/2)*2 = 58 -> Size 58
    assert.strictEqual(calculateRecommendedAbayaSize(5, 6), 58);

    // 5' 2" (62 inches): 52 + ((62 - 60)/2)*2 = 54 -> Size 54
    assert.strictEqual(calculateRecommendedAbayaSize(5, 2), 54);

    // 5' 0" (60 inches): 52 -> Size 52
    assert.strictEqual(calculateRecommendedAbayaSize(5, 0), 52);

    // Clamping: Under 50 clamped to 50
    assert.strictEqual(calculateRecommendedAbayaSize(4, 8), 50);

    // Clamping: Over 62 clamped to 62
    assert.strictEqual(calculateRecommendedAbayaSize(6, 4), 62);
  });

  test("16. Guest shoppers are strictly gated from accessing checkout (/checkout)", () => {
    const result = checkAccessPermission(guestUser, "checkout");
    assert.strictEqual(result.allowed, false);
    assert.strictEqual(result.promptTitle, "Sign In Required to Checkout");
    assert.strictEqual(result.redirectUrl, "/login?redirect=/checkout");
    assert.match(result.promptMessage!, /verify your delivery address and finalize your order/i);
  });

  test("17. Authenticated members have immediate permission to access checkout", () => {
    const result = checkAccessPermission(authenticatedUser, "checkout");
    assert.strictEqual(result.allowed, true);
    assert.strictEqual(result.redirectUrl, undefined);
  });
});
