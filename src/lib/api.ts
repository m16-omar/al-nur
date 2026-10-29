export interface ServerCategory {
  id: number;
  categoryId: string;
  name: string;
  iconName?: string;
  tagline?: string;
  intro?: string;
  colorHex?: string;
}

export interface ServerProduct {
  id: number;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  isAvailable?: boolean;
  isFavorite?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  blurb: string;
  img: string;
  category: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
}

export const API_BASE_URL = "https://alnur-store.api.serverpod.space";

/**
 * Authentic seeded categories from the Serverpod backend database.
 */
export const DEFAULT_SERVER_CATEGORIES: ServerCategory[] = [
  {
    id: 13,
    categoryId: "perfumes",
    name: "Perfumes & Oud",
    iconName: "spa_rounded",
    tagline: "Royal Arabian Oud, Vanilla & Musks",
    intro:
      "Long-lasting concentrated perfume oils and royal Arabian scents crafted for Nigerian celebrations.",
    colorHex: "0xFFF5EDF9",
  },
  {
    id: 14,
    categoryId: "wedding-rings",
    name: "Wedding Rings",
    iconName: "diamond_rounded",
    tagline: "18K Gold Plated & Moissanite Sets",
    intro:
      "Timeless matching couple bands and bridal proposal rings crafted for Nigerian weddings.",
    colorHex: "0xFFFDF7E7",
  },
  {
    id: 15,
    categoryId: "wristwatches",
    name: "Wristwatches",
    iconName: "watch_outlined",
    tagline: "Diamond-Bezel & Luxury Steel Timepieces",
    intro: "Precision quartz and automatic wristwatches for elegant men, women, and couples.",
    colorHex: "0xFFE9F0FA",
  },
  {
    id: 16,
    categoryId: "necklaces",
    name: "Luxury Necklaces",
    iconName: "diamond_outlined",
    tagline: "Dubai Rope Chains, Chokers & Pendants",
    intro:
      "Non-tarnish 18K gold layered chains, Arabic coin medallions, and Austrian bridal chokers crafted for Nigerian weddings and galas.",
    colorHex: "0xFFF3E8FF",
  },
  {
    id: 17,
    categoryId: "bangles",
    name: "Royal Bangles & Bracelets",
    iconName: "circle_outlined",
    tagline: "Kano Filigree Bangles & Tennis Bracelets",
    intro:
      "Exquisite embossed gold bangles, open cuffs, and sparkling cubic zirconia tennis bracelets for Owambe and everyday grace.",
    colorHex: "0xFFFEF3C7",
  },
  {
    id: 18,
    categoryId: "jewelries",
    name: "Fine Jewelry",
    iconName: "auto_awesome_rounded",
    tagline: "Bridal Sets, Gala Brooches & Ensembles",
    intro:
      "Exquisite 4-piece bridal sets, emerald crystals, and heirloom gold jewelry for grand Nigerian celebrations.",
    colorHex: "0xFFF9EAE1",
  },
  {
    id: 19,
    categoryId: "rings",
    name: "Rings",
    iconName: "circle_outlined",
    tagline: "Everyday Luxury, Gemstones & Signet Bands",
    intro: "Hand-finished emerald crystals, signets and barakah statement rings.",
    colorHex: "0xFFE8F1EC",
  },
];

/**
 * Maps a ServerProduct model returned from Serverpod into the UI Product shape.
 */
export function mapServerProductToProduct(sp: ServerProduct): Product {
  const formattedPrice =
    typeof sp.price === "number" ? `₦${sp.price.toLocaleString("en-NG")}` : String(sp.price);
  const formattedOriginalPrice =
    typeof sp.originalPrice === "number" && sp.originalPrice > 0
      ? `₦${sp.originalPrice.toLocaleString("en-NG")}`
      : undefined;

  return {
    id: String(sp.id),
    name: sp.name,
    price: formattedPrice,
    originalPrice: formattedOriginalPrice,
    blurb: sp.description,
    img: sp.imageUrl,
    category: sp.categoryId,
    rating: typeof sp.rating === "number" ? sp.rating : 5.0,
    reviewCount: typeof sp.reviewCount === "number" ? sp.reviewCount : 0,
    isPopular: (sp.rating ?? 0) >= 4.9 || Boolean(sp.isFavorite),
  };
}

/**
 * Fetch live store categories from Serverpod backend, falling back to authentic server defaults.
 */
export async function fetchServerCategories(): Promise<ServerCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ method: "getCategories" }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: Record<string, unknown>) => ({
        id: Number(item.id),
        categoryId: String(item.categoryId),
        name: String(item.name),
        iconName: item.iconName ? String(item.iconName) : undefined,
        tagline: item.tagline ? String(item.tagline) : undefined,
        intro: item.intro ? String(item.intro) : undefined,
        colorHex: item.colorHex ? String(item.colorHex) : undefined,
      }));
    }
    return DEFAULT_SERVER_CATEGORIES;
  } catch (err) {
    console.warn("[Al-Nur API] Using default server categories:", err);
    return DEFAULT_SERVER_CATEGORIES;
  }
}

/**
 * In-memory product cache to accelerate consecutive lookups.
 */
let cachedServerProducts: ServerProduct[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60000; // 1 minute

/**
 * Fetch live store products from Serverpod backend, filtering optionally by categoryId.
 */
export async function fetchServerProducts(
  categoryId?: string,
  search?: string,
): Promise<ServerProduct[]> {
  try {
    const payload: Record<string, unknown> = { method: "getProducts" };
    if (categoryId && categoryId !== "all") {
      payload.categoryId = categoryId;
    }
    if (search && search.trim().length > 0) {
      payload.search = search.trim();
    }

    const res = await fetch(`${API_BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      const parsed: ServerProduct[] = data.map((item: Record<string, unknown>) => ({
        id: Number(item.id),
        name: String(item.name),
        slug: String(item.slug),
        categoryId: String(item.categoryId),
        price: Number(item.price),
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        rating: Number(item.rating ?? 5.0),
        reviewCount: Number(item.reviewCount ?? 0),
        imageUrl: String(item.imageUrl),
        description: String(item.description),
        isAvailable: Boolean(item.isAvailable ?? true),
        isFavorite: Boolean(item.isFavorite ?? false),
      }));

      // Cache if this was an unfiltered fetch
      if (!categoryId || categoryId === "all") {
        if (!search) {
          cachedServerProducts = parsed;
          lastCacheTime = Date.now();
        }
      }

      return parsed;
    }
    return [];
  } catch (err) {
    console.warn("[Al-Nur API] Error fetching server products:", err);
    return [];
  }
}

/**
 * Fetch a single product by ID or slug directly from the backend.
 */
export async function fetchServerProductById(
  idOrSlug: string | number,
): Promise<Product | undefined> {
  const queryStr = String(idOrSlug).toLowerCase();

  // Check cache first
  if (
    cachedServerProducts &&
    Date.now() - lastCacheTime < CACHE_TTL_MS &&
    cachedServerProducts.length > 0
  ) {
    const found = cachedServerProducts.find(
      (p) =>
        String(p.id) === queryStr ||
        p.slug.toLowerCase() === queryStr ||
        `prod_${p.id}` === queryStr,
    );
    if (found) return mapServerProductToProduct(found);
  }

  // Fetch all products from server
  const all = await fetchServerProducts();
  const match = all.find(
    (p) =>
      String(p.id) === queryStr || p.slug.toLowerCase() === queryStr || `prod_${p.id}` === queryStr,
  );
  return match ? mapServerProductToProduct(match) : undefined;
}

/**
 * Toggle favorite status on the Serverpod backend.
 */
export async function toggleServerFavorite(productId: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ method: "toggleFavorite", productId }),
    });
    return res.ok;
  } catch (err) {
    console.warn("[Al-Nur API] Error toggling server favorite:", err);
    return false;
  }
}
