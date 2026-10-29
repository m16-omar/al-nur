import { describe, it } from "node:test";
import assert from "node:assert";
import {
  DEFAULT_SERVER_CATEGORIES,
  API_BASE_URL,
  mapServerProductToProduct,
  type ServerProduct,
} from "../src/lib/api.ts";
import {
  collections,
  featuredProducts,
  getAllProducts,
  getCollection,
  getProductById,
} from "../src/lib/collections.ts";

describe("Serverpod Authentic Categories & Collections Suite", () => {
  const authenticCategoryIds = new Set([
    "perfumes",
    "wedding-rings",
    "wristwatches",
    "necklaces",
    "bangles",
    "jewelries",
    "rings",
  ]);

  it("19. Server default categories match authentic Serverpod database seeds", () => {
    assert.strictEqual(DEFAULT_SERVER_CATEGORIES.length, 7);
    const categoryIds = DEFAULT_SERVER_CATEGORIES.map((c) => c.categoryId);

    assert.ok(categoryIds.includes("perfumes"), "Must include perfumes");
    assert.ok(categoryIds.includes("wedding-rings"), "Must include wedding-rings");
    assert.ok(categoryIds.includes("wristwatches"), "Must include wristwatches");
    assert.ok(categoryIds.includes("necklaces"), "Must include necklaces");
    assert.ok(categoryIds.includes("bangles"), "Must include bangles");
    assert.ok(categoryIds.includes("jewelries"), "Must include jewelries");
    assert.ok(categoryIds.includes("rings"), "Must include rings");
  });

  it("20. Fake non-server categories (veils, bags, slippers, abayas) are strictly excluded", () => {
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
    assert.strictEqual(
      defaultIds.includes("abayas"),
      false,
      "abayas must not be in server categories",
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

  it("23. mapServerProductToProduct maps raw Serverpod response to frontend Product format", () => {
    const mockServerProduct: ServerProduct = {
      id: 31,
      name: "Royal Amber & Cambodian Oud EDP (100ml)",
      slug: "royal-amber-cambodian-oud",
      categoryId: "perfumes",
      price: 28500,
      originalPrice: 35000,
      rating: 5.0,
      reviewCount: 148,
      imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f",
      description: "Opulent Cambodian oud infused with warm amber.",
      isAvailable: true,
      isFavorite: true,
    };

    const mapped = mapServerProductToProduct(mockServerProduct);
    assert.strictEqual(mapped.id, "31");
    assert.strictEqual(mapped.name, "Royal Amber & Cambodian Oud EDP (100ml)");
    assert.strictEqual(mapped.price, "₦28,500");
    assert.strictEqual(mapped.originalPrice, "₦35,000");
    assert.strictEqual(mapped.category, "perfumes");
    assert.strictEqual(mapped.blurb, "Opulent Cambodian oud infused with warm amber.");
    assert.strictEqual(mapped.rating, 5.0);
    assert.strictEqual(mapped.isPopular, true);
  });

  it("24. Static collections catalogue strictly matches all 7 Serverpod categories", () => {
    assert.strictEqual(collections.length, 7);
    const slugs = collections.map((c) => c.slug);
    for (const id of authenticCategoryIds) {
      assert.ok(slugs.includes(id), `Collections must include '${id}'`);
    }
  });

  it("25. All 28 authentic Serverpod products resolve via getProductById and getAllProducts", () => {
    const all = getAllProducts();
    assert.strictEqual(all.length, 28);

    // Verify key products across categories
    const oud = getProductById("31");
    assert.ok(oud, "Product 31 (Oud) must exist");
    assert.strictEqual(oud?.category, "perfumes");

    const weddingBands = getProductById("35");
    assert.ok(weddingBands, "Product 35 (Wedding Bands) must exist");
    assert.strictEqual(weddingBands?.category, "wedding-rings");

    const watch = getProductById("39");
    assert.ok(watch, "Product 39 (Geneva Watch) must exist");
    assert.strictEqual(watch?.category, "wristwatches");

    const bridalJewelry = getProductById("51");
    assert.ok(bridalJewelry, "Product 51 (Bridal Set) must exist");
    assert.strictEqual(bridalJewelry?.category, "jewelries");

    const statementRing = getProductById("55");
    assert.ok(statementRing, "Product 55 (Green Ring) must exist");
    assert.strictEqual(statementRing?.category, "rings");
  });

  it("26. getCollection resolves each of the 7 authentic categories with 4 products each", () => {
    for (const catId of authenticCategoryIds) {
      const col = getCollection(catId);
      assert.ok(col, `Collection for '${catId}' must resolve`);
      assert.strictEqual(col?.products.length, 4, `Category '${catId}' must have 4 products`);
      for (const p of col!.products) {
        assert.strictEqual(p.category, catId);
      }
    }
  });
});
