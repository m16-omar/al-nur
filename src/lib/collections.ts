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
    id: "31",
    name: "Royal Amber & Cambodian Oud EDP (100ml)",
    price: "₦28,500",
    originalPrice: "₦35,000",
    blurb:
      "Opulent Cambodian oud infused with warm amber, Madagascar vanilla, and long-lasting sillage for Nigerian weddings and Jumu'ah celebrations.",
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
    category: "perfumes",
    rating: 5.0,
    reviewCount: 148,
    isPopular: true,
  },
  {
    id: "35",
    name: "Eternal Vows 18K Gold Plated Couple Wedding Bands",
    price: "₦68,000",
    originalPrice: "₦85,000",
    blurb:
      "His & Hers matching Nigerian marital rings finished in non-tarnish 18K brushed gold with curved comfort fit and luxury presentation case.",
    img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    category: "wedding-rings",
    rating: 5.0,
    reviewCount: 136,
    isPopular: true,
  },
  {
    id: "39",
    name: "Geneva Diamond-Bezel Emerald Rose Gold Watch",
    price: "₦36,000",
    originalPrice: "₦45,000",
    blurb:
      "Striking emerald green sunburst dial encircled with Austrian crystal accents and an 18K rose-gold Jubilee stainless steel link bracelet.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    category: "wristwatches",
    rating: 4.9,
    reviewCount: 124,
    isPopular: true,
  },
  {
    id: "43",
    name: "Dubai 18K Gold Multi-Layer Figaro Chain Necklace",
    price: "₦32,000",
    originalPrice: "₦40,000",
    blurb:
      "Triple-strand cascading Italian Figaro chain in lustrous 18K yellow gold finish, guaranteed fade and tarnish resistant.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    category: "necklaces",
    rating: 4.9,
    reviewCount: 118,
    isPopular: true,
  },
  {
    id: "47",
    name: "Kano Royal Filigree 18K Gold Bangle Set (Pair)",
    price: "₦42,000",
    originalPrice: "₦52,000",
    blurb:
      "Pair of hinged bangles with intricate Northern Nigerian floral openwork filigree and secure clasp.",
    img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
    category: "bangles",
    rating: 5.0,
    reviewCount: 128,
    isPopular: true,
  },
  {
    id: "51",
    name: "Grand Imperial Dubai 4-Piece Bridal Jewelry Set",
    price: "₦125,000",
    originalPrice: "₦155,000",
    blurb:
      "Complete majestic set comprising necklace, chandelier earrings, statement ring, and matching bangle for grand Nigerian celebrations.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    category: "jewelries",
    rating: 5.0,
    reviewCount: 89,
    isPopular: true,
  },
  {
    id: "55",
    name: "Emerald Cut Green Crystal Statement Ring",
    price: "₦18,500",
    originalPrice: "₦24,000",
    blurb:
      "Vibrant faceted emerald-green centerpiece stone set on an 18K gold-plated band, capturing magnificent light from every angle.",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    category: "rings",
    rating: 4.9,
    reviewCount: 116,
    isPopular: true,
  },
  {
    id: "33",
    name: "Lattafa Khamrah & Smoky Bukhoor Set",
    price: "₦38,000",
    originalPrice: "₦45,000",
    blurb:
      "Decadent blend of sweet dates, cinnamon bark, roasted praline, and smoky incense wood. An esteemed Nigerian bridal shower and anniversary gift.",
    img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
    category: "perfumes",
    rating: 4.9,
    reviewCount: 94,
    isPopular: true,
  },
];

export const collections: Collection[] = [
  {
    slug: "perfumes",
    name: "Perfumes & Oud",
    tagline: "Smoky Cambodian oud & French floral essences",
    intro:
      "Distilled from rare agarwood and rare floral petals for day-long serenity and enduring sillage.",
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "31",
        name: "Royal Amber & Cambodian Oud EDP (100ml)",
        price: "₦28,500",
        originalPrice: "₦35,000",
        blurb:
          "Opulent Cambodian oud infused with warm amber, Madagascar vanilla, and long-lasting sillage.",
        img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
        category: "perfumes",
        rating: 5.0,
        reviewCount: 148,
        isPopular: true,
      },
      {
        id: "32",
        name: "Pure Musk Tahara & White Lotus Oil (12ml)",
        price: "₦14,000",
        originalPrice: "₦18,000",
        blurb:
          "Concentrated alcohol-free white musk oil with powdery lotus floral accents for daily freshness.",
        img: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
        category: "perfumes",
        rating: 4.9,
        reviewCount: 112,
      },
      {
        id: "33",
        name: "Lattafa Khamrah & Smoky Bukhoor Set",
        price: "₦38,000",
        originalPrice: "₦45,000",
        blurb:
          "Decadent blend of sweet dates, cinnamon bark, roasted praline, and smoky incense wood.",
        img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
        category: "perfumes",
        rating: 4.9,
        reviewCount: 94,
        isPopular: true,
      },
      {
        id: "34",
        name: "Golden Damask Rose & Vanilla Arabian Extrait",
        price: "₦24,000",
        originalPrice: "₦30,000",
        blurb: "Exotic damask rose petals steeped in caramelized vanilla pods and amberwood.",
        img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
        category: "perfumes",
        rating: 4.8,
        reviewCount: 86,
      },
    ],
  },
  {
    slug: "wedding-rings",
    name: "Wedding Rings",
    tagline: "Eternal platinum & 18k gold bands",
    intro:
      "Hand-finished marriage bands inscribed with timeless elegance, comfort fit, and permanent devotion.",
    img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "35",
        name: "Eternal Vows 18K Gold Plated Couple Wedding Bands",
        price: "₦68,000",
        originalPrice: "₦85,000",
        blurb:
          "His & Hers matching Nigerian marital rings finished in non-tarnish 18K brushed gold with curved comfort fit.",
        img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
        category: "wedding-rings",
        rating: 5.0,
        reviewCount: 136,
        isPopular: true,
      },
      {
        id: "36",
        name: "Zirconia Solitaire Halo Engagement Ring (925 Silver)",
        price: "₦38,500",
        originalPrice: "₦48,000",
        blurb:
          "Dazzling 2-carat round brilliant cubic zirconia stone bordered by a pavé halo on solid rhodium-plated sterling silver.",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        category: "wedding-rings",
        rating: 4.9,
        reviewCount: 92,
        isPopular: true,
      },
      {
        id: "37",
        name: "Crown Tiara Diamond-Simulant Wedding Band",
        price: "₦32,000",
        originalPrice: "₦40,000",
        blurb:
          "Regal tiara contour ring encrusted with micro-pavé crystals, designed to stack seamlessly with engagement rings.",
        img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
        category: "wedding-rings",
        rating: 4.8,
        reviewCount: 64,
      },
      {
        id: "38",
        name: "Dubai 18K Solid Gold-Bonded Marital Bands (Pair)",
        price: "₦85,000",
        originalPrice: "₦105,000",
        blurb:
          "Heavyweight classic dome wedding bands crafted with multi-layer 18K gold bonded core, guaranteed resistant to tarnish.",
        img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
        category: "wedding-rings",
        rating: 5.0,
        reviewCount: 78,
        isPopular: true,
      },
    ],
  },
  {
    slug: "wristwatches",
    name: "Wristwatches",
    tagline: "Precision automatic chronometers",
    intro:
      "Sapphire glass, genuine leather and stainless steel timepieces designed for prestige and enduring accuracy.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "39",
        name: "Geneva Diamond-Bezel Emerald Rose Gold Watch",
        price: "₦36,000",
        originalPrice: "₦45,000",
        blurb:
          "Striking emerald green sunburst dial encircled with Austrian crystal accents and an 18K rose-gold Jubilee bracelet.",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        category: "wristwatches",
        rating: 4.9,
        reviewCount: 124,
        isPopular: true,
      },
      {
        id: "40",
        name: "Naviforce Royal Roman Numeral Men's Timepiece",
        price: "₦32,500",
        originalPrice: "₦40,000",
        blurb:
          "Distinguished black dial with embossed golden Roman numerals, quartz movement, and date display with water resistance.",
        img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
        category: "wristwatches",
        rating: 4.8,
        reviewCount: 108,
      },
      {
        id: "41",
        name: "Hannah Martin Minimalist Mesh Strap Women's Watch",
        price: "₦22,000",
        originalPrice: "₦28,000",
        blurb:
          "Ultra-slim rose gold case with shimmering sunray dial and magnetic adjustable Milanese mesh strap.",
        img: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80",
        category: "wristwatches",
        rating: 4.7,
        reviewCount: 88,
      },
      {
        id: "42",
        name: "Al-Nur Dual His & Hers Luxury Watch Gift Set",
        price: "₦58,000",
        originalPrice: "₦72,000",
        blurb:
          "Complementary couple watches presented in a plush velvet dual watch box. The ultimate Nigerian wedding and anniversary gift.",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
        category: "wristwatches",
        rating: 5.0,
        reviewCount: 95,
        isPopular: true,
      },
    ],
  },
  {
    slug: "necklaces",
    name: "Luxury Necklaces",
    tagline: "Delicate royal pendants & chokers",
    intro:
      "Fine diamond-cut links and bridal necklace sets crafted for enduring brilliance and royal poise.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "43",
        name: "Dubai 18K Gold Multi-Layer Figaro Chain Necklace",
        price: "₦32,000",
        originalPrice: "₦40,000",
        blurb:
          "Triple-strand cascading Italian Figaro chain in lustrous 18K yellow gold finish, guaranteed fade and tarnish resistant.",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        category: "necklaces",
        rating: 4.9,
        reviewCount: 118,
        isPopular: true,
      },
      {
        id: "44",
        name: "Zainab Bridal Austrian Crystal Choker Set",
        price: "₦75,000",
        originalPrice: "₦95,000",
        blurb:
          "Royal collar choker encrusted with light-catching cubic crystals, accompanied by drop earrings for wedding ceremonies.",
        img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=80",
        category: "necklaces",
        rating: 5.0,
        reviewCount: 142,
        isPopular: true,
      },
      {
        id: "45",
        name: "18K Gold-Layered Heavyweight Dubai Rope Chain (5mm)",
        price: "₦26,000",
        originalPrice: "₦32,000",
        blurb:
          "Durable diamond-cut twist rope chain with secure lobster claw clasp. Water, sweat, and perfume proof for everyday luxury.",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        category: "necklaces",
        rating: 4.8,
        reviewCount: 115,
      },
      {
        id: "46",
        name: 'Arabic "Sabr & Shukr" Coin Medallion Necklace',
        price: "₦22,500",
        originalPrice: "₦28,000",
        blurb:
          "Double-sided coin pendant engraved with Islamic calligraphy for Patience (Sabr) and Gratitude (Shukr).",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        category: "necklaces",
        rating: 4.9,
        reviewCount: 96,
      },
    ],
  },
  {
    slug: "bangles",
    name: "Royal Bangles & Bracelets",
    tagline: "Intricate filigree & solid cuffs",
    intro:
      "Heirloom gold cuffs and hinged bangles designed to complement festive attire and bridal celebrations.",
    img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "47",
        name: "Kano Royal Filigree 18K Gold Bangle Set (Pair)",
        price: "₦42,000",
        originalPrice: "₦52,000",
        blurb:
          "Pair of hinged bangles with intricate Northern Nigerian floral openwork filigree and secure clasp.",
        img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        category: "bangles",
        rating: 5.0,
        reviewCount: 128,
        isPopular: true,
      },
      {
        id: "48",
        name: "Sparkling 4mm Zirconia Tennis Bracelet (White Gold Finish)",
        price: "₦28,000",
        originalPrice: "₦35,000",
        blurb:
          "Seamless row of prong-set brilliant round zirconia stones with double safety latch. Pure elegance for daily and evening wear.",
        img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        category: "bangles",
        rating: 4.9,
        reviewCount: 104,
      },
      {
        id: "49",
        name: "Dubai Intricate Lattice Open-Cuff Gold Bangle",
        price: "₦35,000",
        originalPrice: "₦44,000",
        blurb:
          "Wide architectural lattice open cuff bangle with micro-beaded borders. Fits all wrist sizes with flexible tension adjustment.",
        img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        category: "bangles",
        rating: 4.8,
        reviewCount: 79,
      },
      {
        id: "50",
        name: "Stackable Twisted Gold Wire Bangles (Set of 3)",
        price: "₦38,000",
        originalPrice: "₦46,000",
        blurb:
          "Trio of high-shine diamond-cut and twisted gold wire bangles designed to jingle gracefully with traditional Nigerian attire.",
        img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
        category: "bangles",
        rating: 4.9,
        reviewCount: 88,
      },
    ],
  },
  {
    slug: "jewelries",
    name: "Fine Jewelry",
    tagline: "Curated heirloom sets & earrings",
    intro:
      "Complete jewelry sets for celebrations and milestone moments, curated with majestic craftsmanship.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "51",
        name: "Grand Imperial Dubai 4-Piece Bridal Jewelry Set",
        price: "₦125,000",
        originalPrice: "₦155,000",
        blurb:
          "Complete majestic set comprising necklace, chandelier earrings, statement ring, and matching bangle for grand Nigerian celebrations.",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        category: "jewelries",
        rating: 5.0,
        reviewCount: 89,
        isPopular: true,
      },
      {
        id: "52",
        name: "Royal Emerald Crystal Teardrop Gala Jewelry Set",
        price: "₦68,000",
        originalPrice: "₦85,000",
        blurb:
          "Lush deep emerald teardrop crystals surrounded by halo pavé stones on gold-plated collar necklace with matching earrings.",
        img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=80",
        category: "jewelries",
        rating: 4.9,
        reviewCount: 92,
      },
      {
        id: "53",
        name: "Traditional Arewa Gold Filigree Brooch & Earring Set",
        price: "₦34,000",
        originalPrice: "₦42,000",
        blurb:
          "Northern Nigerian inspired geometric filigree brooch pin and clip earrings, an aristocratic addition to lace and headties.",
        img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
        category: "jewelries",
        rating: 4.8,
        reviewCount: 67,
      },
      {
        id: "54",
        name: "Pearl & 18K Gold Bead Layered Owambe Statement Set",
        price: "₦48,000",
        originalPrice: "₦60,000",
        blurb:
          "Lustrous faux baroque pearls interspersed with textured 18K gold beads. Crafted for mother-of-the-day and dignitaries.",
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
        category: "jewelries",
        rating: 4.9,
        reviewCount: 110,
        isPopular: true,
      },
    ],
  },
  {
    slug: "rings",
    name: "Rings",
    tagline: "Solitaire and cocktail statement rings",
    intro: "Brilliant-cut stones set in sterling silver and 18k gold bands with unmatched sparkle.",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    products: [
      {
        id: "55",
        name: "Emerald Cut Green Crystal Statement Ring",
        price: "₦18,500",
        originalPrice: "₦24,000",
        blurb:
          "Vibrant faceted emerald-green centerpiece stone set on an 18K gold-plated band, capturing magnificent light from every angle.",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        category: "rings",
        rating: 4.9,
        reviewCount: 116,
        isPopular: true,
      },
      {
        id: "56",
        name: "Arabic Calligraphy 'Barakah' Open Band Ring",
        price: "₦16,000",
        originalPrice: "₦20,000",
        blurb:
          "Adjustable 925 sterling silver band engraved with the Arabic prayer for blessing (Barakah), accented with micro-pave zirconia.",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        category: "rings",
        rating: 4.8,
        reviewCount: 94,
      },
      {
        id: "57",
        name: "Classic 3-Row Pavé Crystal Eternity Band",
        price: "₦15,000",
        originalPrice: "₦19,000",
        blurb:
          "Triple row of shimmering hand-set cubic zirconia crystals. Perfect for everyday luxury, ring stacking, or vow renewal.",
        img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
        category: "rings",
        rating: 4.7,
        reviewCount: 84,
      },
      {
        id: "58",
        name: "Vintage Black Onyx Signet Ring",
        price: "₦19,500",
        originalPrice: "₦25,000",
        blurb:
          "Bold octagonal natural black onyx gemstone encased in heavy gold-tone bezel, favored by both men and women for distinctive elegance.",
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        category: "rings",
        rating: 4.9,
        reviewCount: 76,
        isPopular: true,
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
