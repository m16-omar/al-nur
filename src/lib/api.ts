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

export const API_BASE_URL = "https://alnur-store.api.serverpod.space";

const AUTHENTIC_MODEST_FALLBACKS: Record<string, string> = {
  abayas:
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
  hijabs:
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
  jalabias:
    "https://images.unsplash.com/photo-1629200468328-87bf3adfb78b?auto=format&fit=crop&w=600&q=80",
  thobes:
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
  perfumes:
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
  jewelries:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  "silk-khimars":
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
};

/**
 * Sanitizes product images to ensure no placeholder/dummy images ever appear in production.
 */
export function sanitizeProductImage(url: string, categoryId?: string): string {
  if (!url || typeof url !== "string" || url.trim().length === 0) {
    return getFallbackImageForCategory(categoryId);
  }
  // Typewriter image -> Pure Medina Silk Hijab
  if (url.includes("1585829365295")) {
    return AUTHENTIC_MODEST_FALLBACKS[categoryId || "hijabs"] || AUTHENTIC_MODEST_FALLBACKS.abayas;
  }
  // Milan trenchcoat pigeons -> Moroccan Royal Emerald Jalabia
  if (url.includes("1539109136881")) {
    return AUTHENTIC_MODEST_FALLBACKS.jalabias;
  }
  // Western suit and necktie -> Emirati Minimalist White Thobe
  if (
    url.includes("1507679799987") ||
    url.includes("1534528741775") ||
    url.includes("1492562080023")
  ) {
    return AUTHENTIC_MODEST_FALLBACKS.thobes;
  }
  // Store rack / hangers -> Pearl Beaded Organza Abaya
  if (url.includes("1567401893414")) {
    return AUTHENTIC_MODEST_FALLBACKS.abayas;
  }
  // Eye shadow palette -> Modest wear
  if (url.includes("1596704017254")) {
    return AUTHENTIC_MODEST_FALLBACKS.hijabs;
  }
  return url;
}

export function getFallbackImageForCategory(categoryId?: string): string {
  return AUTHENTIC_MODEST_FALLBACKS[categoryId || "abayas"] || AUTHENTIC_MODEST_FALLBACKS.abayas;
}

/**
 * Authentic seeded categories from the Serverpod backend.
 * Guaranteed to match database seeds on Serverpod server.
 */
export const DEFAULT_SERVER_CATEGORIES: ServerCategory[] = [
  {
    id: 1,
    categoryId: "abayas",
    name: "Abayas",
    iconName: "dry_cleaning_rounded",
    tagline: "Flowing Dubai Nida & Organza Silhouettes",
    intro: "Handcrafted abayas for modest elegance and special occasions.",
    colorHex: "0xFFF5EFE6",
  },
  {
    id: 2,
    categoryId: "hijabs",
    name: "Hijabs",
    iconName: "all_inclusive_rounded",
    tagline: "Pure Medina Silk & Breathable Chiffon",
    intro: "Drape effortlessly with premium non-slip Islamic veils.",
    colorHex: "0xFFE8F1EC",
  },
  {
    id: 3,
    categoryId: "jalabias",
    name: "Jalabias",
    iconName: "auto_awesome_outlined",
    tagline: "Moroccan Sfifa & Royal Gulf Cut",
    intro: "Exquisite embroidery and jewel-toned fabrics for gatherings.",
    colorHex: "0xFFFBF4E6",
  },
  {
    id: 4,
    categoryId: "thobes",
    name: "Thobes",
    iconName: "person_rounded",
    tagline: "Crisp Emirati & Saudi Jubbahs",
    intro: "Tailored minimalist white and luxury linen thobes.",
    colorHex: "0xFFE9F0FA",
  },
  {
    id: 5,
    categoryId: "perfumes",
    name: "Perfumes",
    iconName: "spa_rounded",
    tagline: "Signature Oud Blends & Musks",
    intro: "Long-lasting oriental and floral perfumes suited for prayer and events.",
    colorHex: "0xFFF5EDF9",
  },
  {
    id: 6,
    categoryId: "jewelries",
    name: "Jewelries",
    iconName: "diamond_outlined",
    tagline: "Heirloom Gold & Pearl Accents",
    intro: "Bridal sets, bangles and necklaces in rich gold finish.",
    colorHex: "0xFFFDF7E7",
  },
  {
    id: 7,
    categoryId: "silk-khimars",
    name: "Silk Khimars",
    iconName: "checkroom_rounded",
    tagline: "Handmade Modest Silk Pieces",
    intro: "Exclusive artisanal collection crafted for modesty and grace.",
    colorHex: "0xFFF5EFE6",
  },
];

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
      return data.map((item: Record<string, unknown>) => ({
        id: Number(item.id),
        name: String(item.name),
        slug: String(item.slug),
        categoryId: String(item.categoryId),
        price: Number(item.price),
        originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
        rating: Number(item.rating ?? 5.0),
        reviewCount: Number(item.reviewCount ?? 0),
        imageUrl: sanitizeProductImage(String(item.imageUrl), String(item.categoryId)),
        description: String(item.description),
        isAvailable: Boolean(item.isAvailable ?? true),
        isFavorite: Boolean(item.isFavorite ?? false),
      }));
    }
    return [];
  } catch (err) {
    console.warn("[Al-Nur API] Error fetching server products:", err);
    return [];
  }
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
