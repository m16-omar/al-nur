import perfumesImg from "@/assets/perfumes.jpg";
import veilsImg from "@/assets/veils.jpg";
import jewelryImg from "@/assets/jewelry.jpg";
import heroPortraitImg from "@/assets/hero-portrait.jpg";
import thobeWhiteImg from "@/assets/thobe-white.jpg";
import abayaOrganzaImg from "@/assets/abaya-organza.jpg";
import jalabiaEmeraldImg from "@/assets/jalabia-emerald.jpg";
import hijabMedinaImg from "@/assets/hijab-medina.jpg";
import hijabSageImg from "@/assets/hijab-sage.jpg";

export const WHATSAPP = "https://wa.me/2349166261575";

export const waLink = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

export type Product = {
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
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  img: string;
  products: Product[];
};

export const featuredProducts: Product[] = [
  {
    id: "feat_1",
    name: "Dubai Gold Noir Abaya",
    price: "₦28,500",
    originalPrice: "₦35,000",
    blurb:
      "Hand-tailored Dubai crepe abaya featuring intricate golden wrist embroidery and graceful flowing drape.",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    category: "abayas",
    rating: 4.9,
    reviewCount: 142,
    isPopular: true,
  },
  {
    id: "feat_2",
    name: "Pure Medina Silk Hijab",
    price: "₦8,500",
    originalPrice: "₦11,000",
    blurb:
      "Ultra-soft, opaque Medina silk hijab with subtle luster, breathable for all-day comfort.",
    img: hijabMedinaImg,
    category: "hijabs",
    rating: 4.8,
    reviewCount: 96,
    isPopular: true,
  },
  {
    id: "feat_3",
    name: "Moroccan Royal Emerald Jalabia",
    price: "₦36,000",
    originalPrice: "₦42,000",
    blurb:
      "Exquisite Moroccan Sfifa embroidery on premium emerald velvet with handmade sfifa buttons.",
    img: jalabiaEmeraldImg,
    category: "jalabias",
    rating: 4.9,
    reviewCount: 68,
    isPopular: true,
  },
  {
    id: "feat_4",
    name: "Emirati Minimalist White Thobe",
    price: "₦26,000",
    originalPrice: "₦32,000",
    blurb:
      "Crisp white cotton thobe with round collar, tailored for daily prayer, Friday Jumuah, and formal events.",
    img: thobeWhiteImg,
    category: "thobes",
    rating: 4.8,
    reviewCount: 57,
  },
  {
    id: "feat_5",
    name: "Royal Oud Signature Flacon",
    price: "₦18,000",
    originalPrice: "₦22,000",
    blurb:
      "Smoky Cambodian oud with a warm amber-vanilla finish. Suitable for Jumuah and festive evenings.",
    img: perfumesImg,
    category: "perfumes",
    rating: 5.0,
    reviewCount: 110,
    isPopular: true,
  },
  {
    id: "feat_6",
    name: "Aisha Bridal Heirloom Set",
    price: "₦55,000",
    originalPrice: "₦65,000",
    blurb:
      "18k gold-finish bridal set complete with necklace, matching drop earrings, bangles and ornate ring.",
    img: jewelryImg,
    category: "jewelries",
    rating: 4.9,
    reviewCount: 45,
    isPopular: true,
  },
  {
    id: "feat_7",
    name: "Ivory Silk Royal Khimar",
    price: "₦16,000",
    originalPrice: "₦19,500",
    blurb:
      "Two-layer pure silk khimar providing graceful modesty, full front and back coverage with breathable drape.",
    img: veilsImg,
    category: "silk-khimars",
    rating: 4.9,
    reviewCount: 88,
    isPopular: true,
  },
  {
    id: "feat_8",
    name: "Pearl Beaded Organza Abaya",
    price: "₦38,000",
    originalPrice: "₦45,000",
    blurb:
      "Luxurious double-layer organza abaya with hand-set river pearls along the lapel and cuffs.",
    img: abayaOrganzaImg,
    category: "abayas",
    rating: 4.9,
    reviewCount: 82,
  },
];

export const collections: Collection[] = [
  {
    slug: "abayas",
    name: "Abayas",
    tagline: "Flowing Dubai Nida & Organza Silhouettes",
    intro: "Handcrafted abayas for modest elegance, poise, and special occasions.",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "ab_1",
        name: "Dubai Gold Noir Abaya",
        price: "₦28,500",
        originalPrice: "₦35,000",
        blurb: "Hand-tailored Dubai crepe with golden wrist embroidery.",
        img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        category: "abayas",
        rating: 4.9,
        reviewCount: 142,
      },
      {
        id: "ab_2",
        name: "Classic Black Korean Abaya",
        price: "₦24,500",
        originalPrice: "₦29,000",
        blurb: "Wrinkle-resistant Korean nida fabric with button front.",
        img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        category: "abayas",
        rating: 4.8,
        reviewCount: 118,
      },
      {
        id: "ab_3",
        name: "Pearl Beaded Organza Abaya",
        price: "₦38,000",
        originalPrice: "₦45,000",
        blurb: "Luxurious double-layer organza abaya with hand-set pearls.",
        img: abayaOrganzaImg,
        category: "abayas",
        rating: 4.9,
        reviewCount: 82,
      },
      {
        id: "ab_4",
        name: "Kimono Flare Linen Abaya",
        price: "₦27,500",
        originalPrice: "₦32,000",
        blurb: "Breathable European linen blend with wide relaxed sleeves.",
        img: abayaOrganzaImg,
        category: "abayas",
        rating: 4.7,
        reviewCount: 64,
      },
    ],
  },
  {
    slug: "hijabs",
    name: "Hijabs",
    tagline: "Pure Medina Silk & Breathable Chiffon",
    intro: "Drape effortlessly with premium non-slip Islamic veils in rich modest hues.",
    img: hijabMedinaImg,
    products: [
      {
        id: "hj_1",
        name: "Pure Medina Silk Hijab",
        price: "₦8,500",
        originalPrice: "₦11,000",
        blurb: "Ultra-soft, opaque Medina silk hijab with subtle luster.",
        img: hijabMedinaImg,
        category: "hijabs",
        rating: 4.8,
        reviewCount: 96,
      },
      {
        id: "hj_2",
        name: "Rose Chiffon Everyday Hijab",
        price: "₦7,500",
        originalPrice: "₦9,500",
        blurb: "Lightweight, breathable luxury chiffon that drapes gracefully.",
        img: hijabSageImg,
        category: "hijabs",
        rating: 4.8,
        reviewCount: 78,
      },
      {
        id: "hj_3",
        name: "Sage Emerald Medina Hijab",
        price: "₦8,800",
        originalPrice: "₦10,500",
        blurb: "Lustrous emerald green Medina silk crafted for formal celebrations.",
        img: veilsImg,
        category: "hijabs",
        rating: 4.9,
        reviewCount: 94,
      },
      {
        id: "hj_4",
        name: "Pleated Rose Crepe Hijab",
        price: "₦6,800",
        originalPrice: "₦8,500",
        blurb: "Delicate accordion pleated chiffon crepe in dusty rose.",
        img: heroPortraitImg,
        category: "hijabs",
        rating: 4.7,
        reviewCount: 54,
      },
    ],
  },
  {
    slug: "jalabias",
    name: "Jalabias",
    tagline: "Moroccan Sfifa & Royal Gulf Cut",
    intro: "Exquisite embroidery and jewel-toned fabrics for gatherings and festive celebrations.",
    img: jalabiaEmeraldImg,
    products: [
      {
        id: "jal_1",
        name: "Moroccan Royal Emerald Jalabia",
        price: "₦36,000",
        originalPrice: "₦42,000",
        blurb: "Exquisite Moroccan Sfifa embroidery on emerald velvet.",
        img: jalabiaEmeraldImg,
        category: "jalabias",
        rating: 4.9,
        reviewCount: 68,
      },
      {
        id: "jal_2",
        name: "Gold Embellished Eid Jalabia",
        price: "₦45,000",
        originalPrice: "₦52,000",
        blurb: "Festive floor-length jalabia adorned with golden zardozi thread.",
        img: "https://images.unsplash.com/photo-1629200468328-87bf3adfb78b?auto=format&fit=crop&w=600&q=80",
        category: "jalabias",
        rating: 4.9,
        reviewCount: 89,
      },
      {
        id: "jal_3",
        name: "Moroccan Kaftan Jalabia",
        price: "₦34,000",
        originalPrice: "₦40,000",
        blurb: "Handcrafted Moroccan jalabia with braided cord neckline.",
        img: jalabiaEmeraldImg,
        category: "jalabias",
        rating: 4.8,
        reviewCount: 67,
      },
      {
        id: "jal_4",
        name: "Royal Sapphire Velvet Jalabia",
        price: "₦48,000",
        originalPrice: "₦58,000",
        blurb: "Plush sapphire velvet jalabia with artisanal threadwork.",
        img: jalabiaEmeraldImg,
        category: "jalabias",
        rating: 4.9,
        reviewCount: 42,
      },
    ],
  },
  {
    slug: "thobes",
    name: "Thobes",
    tagline: "Crisp Emirati & Saudi Jubbahs",
    intro:
      "Tailored minimalist white and luxury linen thobes for prayer, Jumuah, and formal events.",
    img: thobeWhiteImg,
    products: [
      {
        id: "th_1",
        name: "Emirati Minimalist White Thobe",
        price: "₦26,000",
        originalPrice: "₦32,000",
        blurb: "Crisp white cotton thobe with round collar and tailored cuffs.",
        img: thobeWhiteImg,
        category: "thobes",
        rating: 4.8,
        reviewCount: 57,
      },
      {
        id: "th_2",
        name: "Saudi Gold Collar Jubbah",
        price: "₦34,000",
        originalPrice: "₦40,000",
        blurb: "Tailored luxury Jubbah with subtle gold embroidery on Mandarin collar.",
        img: thobeWhiteImg,
        category: "thobes",
        rating: 4.9,
        reviewCount: 48,
      },
      {
        id: "th_3",
        name: "Omani Tassel Royal Thobe",
        price: "₦29,500",
        originalPrice: "₦35,000",
        blurb: "Authentic Omani thobe with signature handcrafted chest tassel.",
        img: thobeWhiteImg,
        category: "thobes",
        rating: 4.7,
        reviewCount: 39,
      },
      {
        id: "th_4",
        name: "Moroccan Wool Blend Djellaba",
        price: "₦42,000",
        originalPrice: "₦49,000",
        blurb: "Traditional hooded Moroccan djellaba crafted with warm wool-blend fabric.",
        img: thobeWhiteImg,
        category: "thobes",
        rating: 4.9,
        reviewCount: 34,
      },
    ],
  },
  {
    slug: "perfumes",
    name: "Perfumes",
    tagline: "Signature Oud Blends & Musks",
    intro:
      "Long-lasting oriental and floral perfumes suited for prayer, Jumuah, and festive evenings.",
    img: perfumesImg,
    products: [
      {
        id: "p_1",
        name: "Royal Oud Signature Flacon",
        price: "₦18,000",
        originalPrice: "₦22,000",
        blurb: "Smoky Cambodian oud with warm vanilla and amber finish.",
        img: perfumesImg,
        category: "perfumes",
        rating: 5.0,
        reviewCount: 110,
      },
      {
        id: "p_2",
        name: "Misk Al-Fajr White Musk",
        price: "₦12,500",
        originalPrice: "₦15,000",
        blurb: "Soft white musk with subtle floral base for everyday wear.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.8,
        reviewCount: 94,
      },
      {
        id: "p_3",
        name: "Amber Noir Luxury Attar",
        price: "₦22,000",
        originalPrice: "₦26,000",
        blurb: "Deep amber, Taif rose petals & rare Kashmiri saffron.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.9,
        reviewCount: 65,
      },
      {
        id: "p_4",
        name: "Yasmin Pure Floral Essence",
        price: "₦15,000",
        originalPrice: "₦18,000",
        blurb: "Bright night-blooming jasmine with sparkling citrus notes.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.7,
        reviewCount: 48,
      },
    ],
  },
  {
    slug: "jewelries",
    name: "Jewelries",
    tagline: "Heirloom Gold & Pearl Accents",
    intro:
      "Bridal sets, bangles and necklaces in rich gold finish, designed to be treasured across generations.",
    img: jewelryImg,
    products: [
      {
        id: "j_1",
        name: "Aisha Bridal Heirloom Set",
        price: "₦55,000",
        originalPrice: "₦65,000",
        blurb: "Complete 18k gold-finish bridal set with necklace, earrings, bangles and ring.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.9,
        reviewCount: 45,
      },
      {
        id: "j_2",
        name: "Nur Crescent 24K Necklace",
        price: "₦18,000",
        originalPrice: "₦22,000",
        blurb: "Layered delicate chains featuring an ornate filigree crescent.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.9,
        reviewCount: 73,
      },
      {
        id: "j_3",
        name: "Zahra Hand-Engraved Bangles (Set of 6)",
        price: "₦22,000",
        originalPrice: "₦27,000",
        blurb: "Artisanal gold-tone bangles with geometric Islamic motifs.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.8,
        reviewCount: 61,
      },
      {
        id: "j_4",
        name: "Freshwater Pearl Drop Earrings",
        price: "₦9,500",
        originalPrice: "₦12,000",
        blurb: "Lustrous genuine freshwater pearls on hypogenic gold posts.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.8,
        reviewCount: 50,
      },
    ],
  },
  {
    slug: "silk-khimars",
    name: "Silk Khimars",
    tagline: "Handmade Modest Silk Pieces",
    intro:
      "Exclusive artisanal collection crafted for modesty, grace, and effortless full-coverage elegance.",
    img: veilsImg,
    products: [
      {
        id: "sk_1",
        name: "Ivory Silk Royal Khimar",
        price: "₦16,000",
        originalPrice: "₦19,500",
        blurb: "Two-layer pure silk khimar providing graceful full coverage.",
        img: veilsImg,
        category: "silk-khimars",
        rating: 4.9,
        reviewCount: 88,
      },
      {
        id: "sk_2",
        name: "Two-Layer Medina Silk Khimar",
        price: "₦18,500",
        originalPrice: "₦22,000",
        blurb: "Flowing non-slip Medina silk khimar with tie-back undercap.",
        img: veilsImg,
        category: "silk-khimars",
        rating: 4.9,
        reviewCount: 56,
      },
      {
        id: "sk_3",
        name: "Pearl-Edged Flowing Khimar",
        price: "₦19,000",
        originalPrice: "₦23,500",
        blurb: "Hand-finished edge embellished with delicate micro-pearls.",
        img: veilsImg,
        category: "silk-khimars",
        rating: 5.0,
        reviewCount: 42,
      },
    ],
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const getAllProducts = (): Product[] => {
  const map = new Map<string, Product>();
  featuredProducts.forEach((p) => map.set(p.id, p));
  collections.forEach((col) => {
    col.products.forEach((p) => {
      if (!map.has(p.id)) {
        map.set(p.id, p);
      }
    });
  });
  return Array.from(map.values());
};

export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find((p) => p.id === id);
};
