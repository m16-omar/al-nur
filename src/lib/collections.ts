import perfumesImg from "@/assets/perfumes.jpg";
import veilsImg from "@/assets/veils.jpg";
import jewelryImg from "@/assets/jewelry.jpg";
import bagsImg from "@/assets/bags.jpg";
import slippersImg from "@/assets/slippers.jpg";

export const WHATSAPP = "https://wa.me/2349166261575";

export const waLink = (text: string) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

export type Product = {
  name: string;
  price: string;
  blurb: string;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  img: string;
  products: Product[];
};

export const collections: Collection[] = [
  {
    slug: "perfumes",
    name: "Perfumes",
    tagline: "Signature scents that linger in memory",
    intro:
      "Long-lasting oriental and floral perfumes — hand-picked oud blends, musks and attars that suit prayer, work and special evenings alike.",
    img: perfumesImg,
    products: [
      { name: "Royal Oud", price: "₦18,000", blurb: "Smoky oud with a warm vanilla finish." },
      { name: "Misk Al-Fajr", price: "₦12,500", blurb: "Soft white musk for everyday wear." },
      { name: "Amber Noir", price: "₦22,000", blurb: "Deep amber, rose petal & saffron." },
      { name: "Yasmin", price: "₦15,000", blurb: "Bright jasmine with citrus top notes." },
      { name: "Bridal Attar", price: "₦25,000", blurb: "Bespoke nikkah blend in gold flacon." },
      { name: "Layali", price: "₦14,000", blurb: "Evening musk, soft and powdery." },
    ],
  },
  {
    slug: "veils",
    name: "Veils",
    tagline: "Featherlight silks that move like poetry",
    intro:
      "Premium chiffon, silk and instant veils in a palette curated for modesty and grace. Made to drape beautifully, all day long.",
    img: veilsImg,
    products: [
      { name: "Ivory Silk Khimar", price: "₦16,000", blurb: "Two-layer silk, full coverage." },
      { name: "Rose Chiffon Hijab", price: "₦7,500", blurb: "Lightweight, breathable chiffon." },
      { name: "Pearl-Edged Niqab", price: "₦9,000", blurb: "Hand-finished with delicate pearls." },
      { name: "Bridal Veil Set", price: "₦35,000", blurb: "Matching khimar, scarf & undercap." },
      { name: "Everyday Jersey", price: "₦5,500", blurb: "Stretch jersey, no-pin styling." },
      { name: "Embroidered Shayla", price: "₦12,000", blurb: "Tone-on-tone gold embroidery." },
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
      { name: "Aisha Bridal Set", price: "₦55,000", blurb: "Necklace, earrings, bangles & ring." },
      { name: "Nur Necklace", price: "₦18,000", blurb: "Layered chains with crescent pendant." },
      {
        name: "Zahra Bangles (set of 6)",
        price: "₦22,000",
        blurb: "Hand-engraved gold-tone bangles.",
      },
      { name: "Pearl Drop Earrings", price: "₦9,500", blurb: "Freshwater pearls on gold posts." },
      { name: "Khadija Choker", price: "₦14,000", blurb: "Statement choker with cz stones." },
      { name: "Signature Ring", price: "₦7,500", blurb: "Adjustable, ornate band." },
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
      { name: "Madinah Tote", price: "₦28,000", blurb: "Vegan leather, fits a Qur'an + laptop." },
      { name: "Pearl Clutch", price: "₦16,500", blurb: "Beaded evening clutch with chain." },
      { name: "Nur Crossbody", price: "₦19,000", blurb: "Compact, gold-chain crossbody." },
      { name: "Bridal Box Bag", price: "₦24,000", blurb: "Ornate hard-case nikkah bag." },
      { name: "Everyday Hobo", price: "₦21,000", blurb: "Slouchy shoulder bag, soft finish." },
      { name: "Mini Top-Handle", price: "₦18,500", blurb: "Structured mini in nude tones." },
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
      { name: "Pearl Slide", price: "₦9,500", blurb: "Cushioned sole with pearl strap." },
      { name: "Beaded Mule", price: "₦11,000", blurb: "Hand-beaded close-toe mule." },
      { name: "Bridal Heel", price: "₦18,000", blurb: "Low-block heel with rhinestones." },
      { name: "Everyday Flat", price: "₦7,500", blurb: "Soft suede flat, all-day comfort." },
      { name: "Velvet Loafer", price: "₦12,500", blurb: "Embroidered velvet loafer." },
      { name: "Crystal Sandal", price: "₦14,000", blurb: "Crystal-strap dressy sandal." },
    ],
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
