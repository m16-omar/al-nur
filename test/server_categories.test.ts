import { describe, it } from "node:test";
import assert from "node:assert";
import { DEFAULT_SERVER_CATEGORIES, API_BASE_URL } from "../src/lib/api.ts";

describe("Serverpod Authentic Categories & Collections Suite", () => {
  const authenticCategoryIds = new Set([
    "abayas",
    "hijabs",
    "jalabias",
    "thobes",
    "perfumes",
    "jewelries",
    "silk-khimars",
  ]);

  it("19. Server default categories match authentic Serverpod database seeds", () => {
    assert.strictEqual(DEFAULT_SERVER_CATEGORIES.length, 7);
    const categoryIds = DEFAULT_SERVER_CATEGORIES.map((c) => c.categoryId);

    assert.ok(categoryIds.includes("abayas"), "Must include abayas");
    assert.ok(categoryIds.includes("hijabs"), "Must include hijabs");
    assert.ok(categoryIds.includes("jalabias"), "Must include jalabias");
    assert.ok(categoryIds.includes("thobes"), "Must include thobes");
    assert.ok(categoryIds.includes("perfumes"), "Must include perfumes");
    assert.ok(categoryIds.includes("jewelries"), "Must include jewelries");
    assert.ok(categoryIds.includes("silk-khimars"), "Must include silk-khimars");
  });

  it("20. Fake non-server categories (veils, bags, slippers) are strictly excluded", () => {
    const defaultIds = DEFAULT_SERVER_CATEGORIES.map((c) => c.categoryId);
    assert.strictEqual(
      defaultIds.includes("veils"),
      false,
      "veils must not be in server categories",
    );
    assert.strictEqual(defaultIds.includes("bags"), false, "bags must not be in server categories");
    assert.strictEqual(
      defaultIds.includes("slippers"),
      false,
      "slippers must not be in server categories",
    );
  });

  it("21. All server categories contain authentic luxury taglines, intros and colorHex", () => {
    for (const cat of DEFAULT_SERVER_CATEGORIES) {
      assert.ok(
        authenticCategoryIds.has(cat.categoryId),
        `Category '${cat.categoryId}' is authentic`,
      );
      assert.ok(cat.name.length > 0, `Category '${cat.categoryId}' must have a name`);
      assert.ok(
        cat.tagline && cat.tagline.length > 0,
        `Category '${cat.categoryId}' must have a tagline`,
      );
      assert.ok(
        cat.intro && cat.intro.length > 0,
        `Category '${cat.categoryId}' must have an intro`,
      );
      assert.ok(
        cat.colorHex && cat.colorHex.startsWith("0xFF"),
        `Category '${cat.categoryId}' must have a valid colorHex`,
      );
      assert.ok(
        cat.iconName && cat.iconName.length > 0,
        `Category '${cat.categoryId}' must have an iconName`,
      );
    }
  });

  it("22. Base Serverpod API URL points to live Serverpod deployment", () => {
    assert.strictEqual(API_BASE_URL, "https://alnur-store.api.serverpod.space");
  });
});
