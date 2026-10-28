import perfumesImg from "@/assets/perfumes.jpg";
import veilsImg from "@/assets/veils.jpg";
import jewelryImg from "@/assets/jewelry.jpg";
import bagsImg from "@/assets/bags.jpg";
import slippersImg from "@/assets/slippers.jpg";

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
      "Hand-tailored Dubai crepe abaya featuring intricate golden wrist embroidery and graceful drape.",
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
    img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
    category: "hijabs",
    rating: 4.8,
    reviewCount: 96,
    isPopular: true,
  },
  {
    id: "feat_3",
    name: "Moroccan Royal Jalabia",
    price: "₦36,000",
    originalPrice: "₦42,000",
    blurb:
      "Exquisite Moroccan Sfifa embroidery on premium emerald velvet with handmade sfifa buttons.",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
    category: "jalabias",
    rating: 4.9,
    reviewCount: 68,
    isPopular: true,
  },
  {
    id: "feat_4",
    name: "Emirati Minimalist Thobe",
    price: "₦26,000",
    originalPrice: "₦32,000",
    blurb:
      "Crisp white cotton thobe with round collar, tailored for prayer, Jumuah and formal events.",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    category: "thobes",
    rating: 4.8,
    reviewCount: 57,
  },
  {
    id: "feat_5",
    name: "Aisha 24K Bridal Set",
    price: "₦55,000",
    originalPrice: "₦68,000",
    blurb: "Complete heirloom bridal jewelry set: necklace, earrings, bangles and ring.",
    img: jewelryImg,
    category: "jewelries",
    rating: 5.0,
    reviewCount: 84,
    isPopular: true,
  },
  {
    id: "feat_6",
    name: "Royal Oud Attar",
    price: "₦18,000",
    originalPrice: "₦22,000",
    blurb: "Smoky Cambodian oud with a warm vanilla and amber finish.",
    img: perfumesImg,
    category: "perfumes",
    rating: 4.9,
    reviewCount: 110,
    isPopular: true,
  },
  {
    id: "feat_7",
    name: "Madinah Vegan Leather Tote",
    price: "₦28,000",
    originalPrice: "₦34,000",
    blurb: "Structured vegan leather tote, comfortably fits a Qur'an, tablet and daily essentials.",
    img: bagsImg,
    category: "bags",
    rating: 4.7,
    reviewCount: 43,
  },
  {
    id: "feat_8",
    name: "Hand-Beaded Pearl Slide",
    price: "₦9,500",
    originalPrice: "₦13,000",
    blurb: "Cushioned sole with hand-stitched pearl straps for effortless elegance.",
    img: slippersImg,
    category: "slippers",
    rating: 4.8,
    reviewCount: 52,
  },
];

export const collections: Collection[] = [
  {
    slug: "abayas",
    name: "Abayas",
    tagline: "Modest silhouettes with royal golden accents",
    intro: "Exquisite crepe and silk abayas designed with modesty, poise, and subtle luxury.",
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
        name: "Champagne Silk Bisht Abaya",
        price: "₦32,000",
        originalPrice: "₦38,000",
        blurb: "Flowing open front cape abaya with gold braided trims.",
        img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        category: "abayas",
        rating: 4.9,
        reviewCount: 76,
      },
    ],
  },
  {
    slug: "perfumes",
    name: "Perfumes & Oils",
    tagline: "Signature scents that linger in memory",
    intro:
      "Long-lasting oriental and floral perfumes — hand-picked oud blends, musks and attars that suit prayer, work and special evenings alike.",
    img: perfumesImg,
    products: [
      {
        id: "p_1",
        name: "Royal Oud",
        price: "₦18,000",
        originalPrice: "₦22,000",
        blurb: "Smoky oud with a warm vanilla finish.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.9,
        reviewCount: 110,
      },
      {
        id: "p_2",
        name: "Misk Al-Fajr",
        price: "₦12,500",
        originalPrice: "₦15,000",
        blurb: "Soft white musk for everyday wear.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.8,
        reviewCount: 94,
      },
      {
        id: "p_3",
        name: "Amber Noir",
        price: "₦22,000",
        originalPrice: "₦26,000",
        blurb: "Deep amber, rose petal & saffron.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.9,
        reviewCount: 65,
      },
      {
        id: "p_4",
        name: "Yasmin",
        price: "₦15,000",
        originalPrice: "₦18,000",
        blurb: "Bright jasmine with citrus top notes.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.7,
        reviewCount: 48,
      },
      {
        id: "p_5",
        name: "Bridal Attar",
        price: "₦25,000",
        originalPrice: "₦30,000",
        blurb: "Bespoke nikkah blend in gold flacon.",
        img: perfumesImg,
        category: "perfumes",
        rating: 5.0,
        reviewCount: 52,
      },
      {
        id: "p_6",
        name: "Layali",
        price: "₦14,000",
        originalPrice: "₦17,000",
        blurb: "Evening musk, soft and powdery.",
        img: perfumesImg,
        category: "perfumes",
        rating: 4.8,
        reviewCount: 37,
      },
    ],
  },
  {
    slug: "veils",
    name: "Veils & Hijabs",
    tagline: "Featherlight silks that move like poetry",
    intro:
      "Premium chiffon, silk and instant veils in a palette curated for modesty and grace. Made to drape beautifully, all day long.",
    img: veilsImg,
    products: [
      {
        id: "v_1",
        name: "Pure Medina Silk Hijab",
        price: "₦8,500",
        originalPrice: "₦11,000",
        blurb: "Ultra-soft, opaque Medina silk hijab with subtle luster.",
        img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
        category: "hijabs",
        rating: 4.8,
        reviewCount: 96,
      },
      {
        id: "v_2",
        name: "Ivory Silk Khimar",
        price: "₦16,000",
        originalPrice: "₦19,500",
        blurb: "Two-layer silk, full chest and back coverage.",
        img: veilsImg,
        category: "veils",
        rating: 4.9,
        reviewCount: 88,
      },
      {
        id: "v_3",
        name: "Rose Chiffon Hijab",
        price: "₦7,500",
        originalPrice: "₦9,000",
        blurb: "Lightweight, breathable luxury chiffon.",
        img: veilsImg,
        category: "hijabs",
        rating: 4.7,
        reviewCount: 112,
      },
      {
        id: "v_4",
        name: "Pearl-Edged Niqab",
        price: "₦9,000",
        originalPrice: "₦11,500",
        blurb: "Hand-finished with delicate pearls.",
        img: veilsImg,
        category: "veils",
        rating: 4.9,
        reviewCount: 64,
      },
      {
        id: "v_5",
        name: "Bridal Veil Set",
        price: "₦35,000",
        originalPrice: "₦42,000",
        blurb: "Matching khimar, veil & satin undercap.",
        img: veilsImg,
        category: "veils",
        rating: 5.0,
        reviewCount: 45,
      },
    ],
  },
  {
    slug: "jewelries",
    name: "Jewelries",
    tagline: "Heirloom gold for moments that matter",
    intro:
      "Bridal sets, necklaces, bangles and earrings in luxe gold and rose-gold finishes. Designed to be worn, treasured and passed down.",
    img: jewelryImg,
    products: [
      {
        id: "j_1",
        name: "Aisha Bridal Set",
        price: "₦55,000",
        originalPrice: "₦68,000",
        blurb: "Necklace, earrings, bangles & ring in 24k gold plating.",
        img: jewelryImg,
        category: "jewelries",
        rating: 5.0,
        reviewCount: 84,
      },
      {
        id: "j_2",
        name: "Nur Crescent Necklace",
        price: "₦18,000",
        originalPrice: "₦22,000",
        blurb: "Layered chains with ornate crescent pendant.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.9,
        reviewCount: 73,
      },
      {
        id: "j_3",
        name: "Zahra Bangles (set of 6)",
        price: "₦22,000",
        originalPrice: "₦27,000",
        blurb: "Hand-engraved gold-tone bangles.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.8,
        reviewCount: 61,
      },
      {
        id: "j_4",
        name: "Pearl Drop Earrings",
        price: "₦9,500",
        originalPrice: "₦12,000",
        blurb: "Freshwater pearls on gold posts.",
        img: jewelryImg,
        category: "jewelries",
        rating: 4.8,
        reviewCount: 50,
      },
    ],
  },
  {
    slug: "bags",
    name: "Bags",
    tagline: "Quiet luxury you carry every day",
    intro:
      "Structured handbags, soft clutches and roomy totes — picked for craftsmanship, finish and that effortless modest aesthetic.",
    img: bagsImg,
    products: [
      {
        id: "b_1",
        name: "Madinah Tote",
        price: "₦28,000",
        originalPrice: "₦34,000",
        blurb: "Vegan leather, fits a Qur'an + laptop.",
        img: bagsImg,
        category: "bags",
        rating: 4.7,
        reviewCount: 43,
      },
      {
        id: "b_2",
        name: "Pearl Clutch",
        price: "₦16,500",
        originalPrice: "₦20,000",
        blurb: "Beaded evening clutch with detachable chain.",
        img: bagsImg,
        category: "bags",
        rating: 4.9,
        reviewCount: 39,
      },
      {
        id: "b_3",
        name: "Nur Crossbody",
        price: "₦19,000",
        originalPrice: "₦23,000",
        blurb: "Compact, gold-chain crossbody in taupe.",
        img: bagsImg,
        category: "bags",
        rating: 4.8,
        reviewCount: 31,
      },
    ],
  },
  {
    slug: "slippers",
    name: "Female Slippers",
    tagline: "Hand-beaded comfort, head-to-toe grace",
    intro:
      "Soft soles, hand-beaded straps and breathable finishes. Comfort that completes every modest look from morning to evening.",
    img: slippersImg,
    products: [
      {
        id: "s_1",
        name: "Pearl Slide",
        price: "₦9,500",
        originalPrice: "₦13,000",
        blurb: "Cushioned sole with pearl strap.",
        img: slippersImg,
        category: "slippers",
        rating: 4.8,
        reviewCount: 52,
      },
      {
        id: "s_2",
        name: "Beaded Mule",
        price: "₦11,000",
        originalPrice: "₦14,500",
        blurb: "Hand-beaded close-toe mule.",
        img: slippersImg,
        category: "slippers",
        rating: 4.8,
        reviewCount: 44,
      },
      {
        id: "s_3",
        name: "Bridal Heel",
        price: "₦18,000",
        originalPrice: "₦22,000",
        blurb: "Low-block heel with rhinestones.",
        img: slippersImg,
        category: "slippers",
        rating: 4.9,
        reviewCount: 38,
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
