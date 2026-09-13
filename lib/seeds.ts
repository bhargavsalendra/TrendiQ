import { SignalKey, TrendSeed } from "./types";

export const SERIES_DAYS = 120;
export const DATASET_END = new Date("2026-09-12T00:00:00Z");

export const TREND_SEEDS: TrendSeed[] = [
  {
    slug: "cherry-red",
    name: "Cherry Red",
    category: "Color",
    colorFamily: "Red",
    garmentType: "Ready-to-wear",
    material: "Mixed",
    aesthetic: "Editorial color",
    summary: "A saturated red moving from runway accents into everyday wardrobe replacements.",
    seed: 11,
    instagram: { early: 36, mid: 56, late: 82, postCount: 18420, engagementRate: 5.4, topHashtag: "#cherryred" },
    signals: {
      search: { early: 41, mid: 58, late: 86 },
      social: { early: 38, mid: 62, late: 92 },
      products: { early: 44, mid: 61, late: 86 },
      consumer: { early: 48, mid: 63, late: 84 },
      engagement: { early: 46, mid: 61, late: 82 }
    }
  },
  {
    slug: "oversized-denim",
    name: "Oversized Denim",
    category: "Garment",
    colorFamily: "Indigo",
    garmentType: "Denim",
    material: "Cotton denim",
    aesthetic: "Relaxed tailoring",
    summary: "Volume denim expanding beyond jeans into jackets, dresses, and layered sets.",
    seed: 21,
    instagram: { early: 32, mid: 49, late: 74, postCount: 14210, engagementRate: 4.8, topHashtag: "#oversizeddenim" },
    signals: {
      search: { early: 36, mid: 52, late: 78 },
      social: { early: 34, mid: 55, late: 84 },
      products: { early: 40, mid: 54, late: 76 },
      consumer: { early: 42, mid: 56, late: 74 },
      engagement: { early: 39, mid: 53, late: 71 }
    }
  },
  {
    slug: "utility-core",
    name: "Utility Core",
    category: "Aesthetic",
    colorFamily: "Olive",
    garmentType: "Outerwear",
    material: "Technical cotton",
    aesthetic: "Utility",
    summary: "Workwear hardware and functional pockets moving from niche street into broader assortments.",
    seed: 33,
    instagram: { early: 29, mid: 38, late: 59, postCount: 9860, engagementRate: 4.4, topHashtag: "#utilitycore" },
    signals: {
      search: { early: 34, mid: 40, late: 54 },
      social: { early: 30, mid: 39, late: 61 },
      products: { early: 33, mid: 41, late: 52 },
      consumer: { early: 36, mid: 42, late: 50 },
      engagement: { early: 35, mid: 41, late: 48 }
    }
  },
  {
    slug: "butter-yellow",
    name: "Butter Yellow",
    category: "Color",
    colorFamily: "Yellow",
    garmentType: "Ready-to-wear",
    material: "Silk blends",
    aesthetic: "Soft luxury",
    summary: "A pale yellow replacing stark brights in spring edits and social styling.",
    seed: 44,
    instagram: { early: 28, mid: 46, late: 72, postCount: 11980, engagementRate: 4.9, topHashtag: "#butteryellow" },
    signals: {
      search: { early: 32, mid: 49, late: 74 },
      social: { early: 29, mid: 51, late: 81 },
      products: { early: 35, mid: 50, late: 72 },
      consumer: { early: 38, mid: 52, late: 70 },
      engagement: { early: 36, mid: 49, late: 67 }
    }
  },
  {
    slug: "cargo-pants",
    name: "Cargo Pants",
    category: "Garment",
    colorFamily: "Khaki",
    garmentType: "Bottoms",
    material: "Ripstop",
    aesthetic: "Utility",
    summary: "Pocketed trousers cycling back through fashion and performance hybrids.",
    seed: 51,
    signals: {
      search: { early: 40, mid: 46, late: 69 },
      social: { early: 37, mid: 48, late: 73 },
      products: { early: 44, mid: 50, late: 68 },
      consumer: { early: 43, mid: 49, late: 64 },
      engagement: { early: 41, mid: 47, late: 62 }
    }
  },
  {
    slug: "quiet-luxury",
    name: "Quiet Luxury",
    category: "Aesthetic",
    colorFamily: "Camel",
    garmentType: "Tailoring",
    material: "Cashmere",
    aesthetic: "Quiet luxury",
    summary: "Understated quality cues remaining present but no longer accelerating.",
    seed: 61,
    signals: {
      search: { early: 62, mid: 64, late: 61 },
      social: { early: 58, mid: 61, late: 57 },
      products: { early: 66, mid: 65, late: 63 },
      consumer: { early: 64, mid: 63, late: 60 },
      engagement: { early: 60, mid: 59, late: 56 }
    }
  },
  {
    slug: "y2k",
    name: "Y2K",
    category: "Aesthetic",
    colorFamily: "Pink",
    garmentType: "Mixed",
    material: "Synthetics",
    aesthetic: "Y2K",
    summary: "Early-2000s references still circulating, with slower new-product expansion.",
    seed: 71,
    signals: {
      search: { early: 70, mid: 66, late: 58 },
      social: { early: 74, mid: 68, late: 55 },
      products: { early: 68, mid: 64, late: 57 },
      consumer: { early: 69, mid: 63, late: 54 },
      engagement: { early: 72, mid: 65, late: 52 }
    }
  },
  {
    slug: "athleisure",
    name: "Athleisure",
    category: "Aesthetic",
    colorFamily: "Grey",
    garmentType: "Knitwear",
    material: "Performance knits",
    aesthetic: "Athleisure",
    summary: "Comfort dressing remains a wardrobe baseline with muted incremental growth.",
    seed: 81,
    signals: {
      search: { early: 57, mid: 59, late: 63 },
      social: { early: 54, mid: 57, late: 62 },
      products: { early: 60, mid: 61, late: 64 },
      consumer: { early: 58, mid: 60, late: 63 },
      engagement: { early: 55, mid: 58, late: 61 }
    }
  },
  {
    slug: "olive-green",
    name: "Olive Green",
    category: "Color",
    colorFamily: "Green",
    garmentType: "Outerwear",
    material: "Wool blends",
    aesthetic: "Utility",
    summary: "Military-adjacent greens gaining search and listing breadth without peak hype.",
    seed: 91,
    signals: {
      search: { early: 38, mid: 47, late: 66 },
      social: { early: 35, mid: 48, late: 70 },
      products: { early: 40, mid: 49, late: 64 },
      consumer: { early: 41, mid: 48, late: 62 },
      engagement: { early: 39, mid: 46, late: 60 }
    }
  },
  {
    slug: "wide-leg-jeans",
    name: "Wide Leg Jeans",
    category: "Garment",
    colorFamily: "Indigo",
    garmentType: "Denim",
    material: "Cotton denim",
    aesthetic: "Relaxed tailoring",
    summary: "Silhouette shift from skinny remaining one of the more durable denim moves.",
    seed: 101,
    signals: {
      search: { early: 48, mid: 58, late: 77 },
      social: { early: 45, mid: 59, late: 80 },
      products: { early: 51, mid: 60, late: 75 },
      consumer: { early: 50, mid: 59, late: 73 },
      engagement: { early: 47, mid: 57, late: 71 }
    }
  },
  {
    slug: "streetwear",
    name: "Streetwear",
    category: "Aesthetic",
    colorFamily: "Black",
    garmentType: "Graphics",
    material: "Cotton fleece",
    aesthetic: "Streetwear",
    summary: "Core street codes holding share while logos and drops lose incremental heat.",
    seed: 111,
    signals: {
      search: { early: 72, mid: 69, late: 64 },
      social: { early: 75, mid: 70, late: 61 },
      products: { early: 74, mid: 71, late: 66 },
      consumer: { early: 70, mid: 67, late: 63 },
      engagement: { early: 73, mid: 68, late: 60 }
    }
  },
  {
    slug: "cottagecore",
    name: "Cottagecore",
    category: "Aesthetic",
    colorFamily: "Cream",
    garmentType: "Dresses",
    material: "Linen",
    aesthetic: "Cottagecore",
    summary: "Pastoral dressing with modest residual interest after its earlier peak.",
    seed: 121,
    signals: {
      search: { early: 55, mid: 49, late: 42 },
      social: { early: 58, mid: 50, late: 40 },
      products: { early: 52, mid: 47, late: 43 },
      consumer: { early: 54, mid: 48, late: 41 },
      engagement: { early: 56, mid: 49, late: 39 }
    }
  },
  {
    slug: "platform-sneakers",
    name: "Platform Sneakers",
    category: "Footwear",
    colorFamily: "White",
    garmentType: "Sneakers",
    material: "Leather",
    aesthetic: "Y2K",
    summary: "Height and chunk returning in footwear after a quieter season.",
    seed: 131,
    signals: {
      search: { early: 33, mid: 42, late: 63 },
      social: { early: 31, mid: 44, late: 68 },
      products: { early: 36, mid: 43, late: 61 },
      consumer: { early: 35, mid: 42, late: 58 },
      engagement: { early: 34, mid: 41, late: 57 }
    }
  },
  {
    slug: "denim-jackets",
    name: "Denim Jackets",
    category: "Garment",
    colorFamily: "Indigo",
    garmentType: "Jackets",
    material: "Cotton denim",
    aesthetic: "Americana",
    summary: "A wardrobe staple with stable replenishment rather than a new fashion event.",
    seed: 141,
    signals: {
      search: { early: 50, mid: 52, late: 54 },
      social: { early: 47, mid: 50, late: 53 },
      products: { early: 55, mid: 56, late: 57 },
      consumer: { early: 51, mid: 52, late: 54 },
      engagement: { early: 48, mid: 50, late: 52 }
    }
  },
  {
    slug: "floral-prints",
    name: "Floral Prints",
    category: "Aesthetic",
    colorFamily: "Multi",
    garmentType: "Dresses",
    material: "Silk",
    aesthetic: "Romantic",
    summary: "Seasonal print language lifting earlier than last year across dresses and shirts.",
    seed: 151,
    signals: {
      search: { early: 28, mid: 39, late: 58 },
      social: { early: 26, mid: 41, late: 64 },
      products: { early: 31, mid: 40, late: 56 },
      consumer: { early: 30, mid: 38, late: 54 },
      engagement: { early: 29, mid: 37, late: 53 }
    }
  },
  {
    slug: "ballet-flats",
    name: "Ballet Flats",
    category: "Footwear",
    colorFamily: "Nude",
    garmentType: "Flats",
    material: "Leather",
    aesthetic: "Balletcore",
    summary: "Soft footwear continuing its climb from costume into daily rotation.",
    seed: 161,
    signals: {
      search: { early: 37, mid: 49, late: 71 },
      social: { early: 34, mid: 51, late: 76 },
      products: { early: 39, mid: 50, late: 69 },
      consumer: { early: 40, mid: 51, late: 68 },
      engagement: { early: 36, mid: 48, late: 66 }
    }
  },
  {
    slug: "metallic-silver",
    name: "Metallic Silver",
    category: "Color",
    colorFamily: "Silver",
    garmentType: "Accessories",
    material: "Metallics",
    aesthetic: "Futurist",
    summary: "Cool metallics spreading from party dressing into handbags and shoes.",
    seed: 171,
    signals: {
      search: { early: 24, mid: 36, late: 57 },
      social: { early: 22, mid: 38, late: 63 },
      products: { early: 27, mid: 37, late: 55 },
      consumer: { early: 26, mid: 35, late: 52 },
      engagement: { early: 25, mid: 34, late: 51 }
    }
  },
  {
    slug: "sheer-layering",
    name: "Sheer Layering",
    category: "Garment",
    colorFamily: "Nude",
    garmentType: "Tops",
    material: "Chiffon",
    aesthetic: "Evening-day",
    summary: "Transparent layers used as styling devices rather than occasion-only pieces.",
    seed: 181,
    signals: {
      search: { early: 21, mid: 33, late: 52 },
      social: { early: 20, mid: 35, late: 58 },
      products: { early: 24, mid: 34, late: 50 },
      consumer: { early: 23, mid: 32, late: 48 },
      engagement: { early: 22, mid: 31, late: 47 }
    }
  },
  {
    slug: "workwear-chic",
    name: "Workwear Chic",
    category: "Aesthetic",
    colorFamily: "Navy",
    garmentType: "Tailoring",
    material: "Wool",
    aesthetic: "Office",
    summary: "Polished workwear recovering as return-to-office dressing re-enters content.",
    seed: 191,
    signals: {
      search: { early: 30, mid: 38, late: 55 },
      social: { early: 28, mid: 39, late: 59 },
      products: { early: 33, mid: 40, late: 54 },
      consumer: { early: 32, mid: 39, late: 53 },
      engagement: { early: 31, mid: 37, late: 51 }
    }
  },
  {
    slug: "pastel-knits",
    name: "Pastel Knits",
    category: "Garment",
    colorFamily: "Pastel",
    garmentType: "Knitwear",
    material: "Merino",
    aesthetic: "Soft luxury",
    summary: "Desaturated knit colors building a quieter alternative to black basics.",
    seed: 201,
    signals: {
      search: { early: 27, mid: 36, late: 54 },
      social: { early: 25, mid: 37, late: 58 },
      products: { early: 29, mid: 36, late: 52 },
      consumer: { early: 28, mid: 35, late: 51 },
      engagement: { early: 26, mid: 34, late: 49 }
    }
  },
  {
    slug: "boxy-blazers",
    name: "Boxy Blazers",
    category: "Garment",
    colorFamily: "Grey",
    garmentType: "Tailoring",
    material: "Wool",
    aesthetic: "Relaxed tailoring",
    summary: "Shoulder-light, shorter blazers replacing elongated 2010s tailoring.",
    seed: 211,
    signals: {
      search: { early: 34, mid: 43, late: 62 },
      social: { early: 32, mid: 45, late: 67 },
      products: { early: 37, mid: 44, late: 61 },
      consumer: { early: 36, mid: 43, late: 59 },
      engagement: { early: 33, mid: 42, late: 57 }
    }
  },
  {
    slug: "animal-print",
    name: "Animal Print",
    category: "Aesthetic",
    colorFamily: "Brown",
    garmentType: "Ready-to-wear",
    material: "Mixed",
    aesthetic: "Glam",
    summary: "Leopard and zebra returning as accent prints rather than full looks.",
    seed: 221,
    signals: {
      search: { early: 31, mid: 40, late: 59 },
      social: { early: 29, mid: 42, late: 64 },
      products: { early: 34, mid: 41, late: 57 },
      consumer: { early: 33, mid: 40, late: 56 },
      engagement: { early: 30, mid: 39, late: 54 }
    }
  },
  {
    slug: "minimal-tailoring",
    name: "Minimal Tailoring",
    category: "Aesthetic",
    colorFamily: "Black",
    garmentType: "Tailoring",
    material: "Wool",
    aesthetic: "Minimal",
    summary: "Clean tailoring remaining relevant but losing share to softer volumes.",
    seed: 231,
    signals: {
      search: { early: 64, mid: 58, late: 47 },
      social: { early: 61, mid: 54, late: 43 },
      products: { early: 66, mid: 60, late: 50 },
      consumer: { early: 63, mid: 57, late: 46 },
      engagement: { early: 60, mid: 54, late: 44 }
    }
  },
  {
    slug: "neon-windbreakers",
    name: "Neon Windbreakers",
    category: "Garment",
    colorFamily: "Neon",
    garmentType: "Outerwear",
    material: "Nylon",
    aesthetic: "Sport",
    summary: "High-visibility outerwear cooling after a short social spike.",
    seed: 241,
    signals: {
      search: { early: 68, mid: 52, late: 31 },
      social: { early: 72, mid: 49, late: 27 },
      products: { early: 63, mid: 50, late: 34 },
      consumer: { early: 65, mid: 48, late: 30 },
      engagement: { early: 70, mid: 47, late: 26 }
    }
  },
  {
    slug: "relaxed-mens-tailoring",
    name: "Relaxed Men's Tailoring",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Charcoal",
    garmentType: "Tailoring",
    material: "Wool blend",
    aesthetic: "Soft tailoring",
    summary: "Unstructured jackets, wider trousers, and fluid suiting are rewriting the modern menswear uniform.",
    seed: 251,
    instagram: { early: 31, mid: 47, late: 78, postCount: 16840, engagementRate: 5.2, topHashtag: "#relaxedtailoring" },
    signals: {
      search: { early: 30, mid: 44, late: 72 },
      social: { early: 28, mid: 46, late: 79 },
      products: { early: 32, mid: 45, late: 68 },
      consumer: { early: 34, mid: 47, late: 70 },
      engagement: { early: 30, mid: 44, late: 73 }
    }
  },
  {
    slug: "technical-outerwear",
    name: "Technical Outerwear",
    gender: "Menswear",
    category: "Material",
    colorFamily: "Graphite",
    garmentType: "Outerwear",
    material: "Ripstop nylon",
    aesthetic: "Urban utility",
    summary: "Weather-ready shells and modular layers are moving from trail gear into everyday city wardrobes.",
    seed: 261,
    instagram: { early: 35, mid: 50, late: 76, postCount: 14320, engagementRate: 4.7, topHashtag: "#technicalouterwear" },
    signals: {
      search: { early: 35, mid: 48, late: 70 },
      social: { early: 33, mid: 51, late: 77 },
      products: { early: 38, mid: 49, late: 69 },
      consumer: { early: 37, mid: 50, late: 68 },
      engagement: { early: 34, mid: 48, late: 71 }
    }
  },
  {
    slug: "mens-knit-polo",
    name: "Knit Polo",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Ecru",
    garmentType: "Knitwear",
    material: "Cotton knit",
    aesthetic: "Modern preppy",
    summary: "Textured knit polos are replacing basic tees as the easy elevated layer for warmer days.",
    seed: 271,
    instagram: { early: 29, mid: 43, late: 68, postCount: 11260, engagementRate: 4.5, topHashtag: "#knitpolo" },
    signals: {
      search: { early: 31, mid: 43, late: 66 },
      social: { early: 29, mid: 45, late: 70 },
      products: { early: 34, mid: 44, late: 64 },
      consumer: { early: 35, mid: 46, late: 65 },
      engagement: { early: 30, mid: 42, late: 63 }
    }
  },
  {
    slug: "wide-leg-chinos",
    name: "Wide-Leg Chinos",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Stone",
    garmentType: "Bottoms",
    material: "Cotton twill",
    aesthetic: "Relaxed classic",
    summary: "Roomier chinos are bringing comfort and structure together in the next everyday trouser silhouette.",
    seed: 281,
    instagram: { early: 26, mid: 40, late: 63, postCount: 9340, engagementRate: 4.1, topHashtag: "#widelegchinos" },
    signals: {
      search: { early: 28, mid: 40, late: 61 },
      social: { early: 27, mid: 42, late: 66 },
      products: { early: 30, mid: 41, late: 60 },
      consumer: { early: 32, mid: 43, late: 62 },
      engagement: { early: 28, mid: 39, late: 58 }
    }
  },
  {
    slug: "retro-running-sneakers",
    name: "Retro Running Sneakers",
    gender: "Menswear",
    category: "Footwear",
    colorFamily: "Silver",
    garmentType: "Sneakers",
    material: "Mesh and suede",
    aesthetic: "Archive sport",
    summary: "Slim retro runners are challenging oversized soles with lightweight color and archival detailing.",
    seed: 291,
    instagram: { early: 38, mid: 55, late: 83, postCount: 20780, engagementRate: 5.7, topHashtag: "#retrorunners" },
    signals: {
      search: { early: 36, mid: 51, late: 80 },
      social: { early: 34, mid: 54, late: 85 },
      products: { early: 39, mid: 52, late: 77 },
      consumer: { early: 40, mid: 54, late: 79 },
      engagement: { early: 37, mid: 50, late: 76 }
    }
  },
  {
    slug: "resort-shirt",
    name: "Resort Shirt",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Cobalt",
    garmentType: "Shirts",
    material: "Linen blend",
    aesthetic: "Modern resort",
    summary: "Open collars, bold botanicals, and breathable fabrics are making vacation dressing more directional.",
    seed: 301,
    instagram: { early: 27, mid: 44, late: 71, postCount: 12540, engagementRate: 4.9, topHashtag: "#resortshirt" },
    signals: {
      search: { early: 29, mid: 45, late: 69 },
      social: { early: 27, mid: 47, late: 74 },
      products: { early: 31, mid: 44, late: 66 },
      consumer: { early: 33, mid: 46, late: 67 },
      engagement: { early: 28, mid: 43, late: 65 }
    }
  },
  {
    slug: "mens-relaxed-denim",
    name: "Relaxed Denim Jeans",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Washed Indigo",
    garmentType: "Denim",
    material: "Organic cotton denim",
    aesthetic: "Everyday utility",
    summary: "Relaxed straight and barrel-leg jeans are replacing narrow fits with a more considered, comfortable silhouette.",
    seed: 311,
    instagram: { early: 39, mid: 56, late: 84, postCount: 23680, engagementRate: 5.9, topHashtag: "#relaxeddenim" },
    signals: {
      search: { early: 42, mid: 56, late: 82 },
      social: { early: 39, mid: 58, late: 86 },
      products: { early: 44, mid: 57, late: 79 },
      consumer: { early: 45, mid: 59, late: 80 },
      engagement: { early: 41, mid: 55, late: 77 }
    }
  },
  {
    slug: "mens-cargo-trousers",
    name: "Modern Cargo Trousers",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Olive",
    garmentType: "Bottoms",
    material: "Cotton ripstop",
    aesthetic: "Refined utility",
    summary: "Streamlined cargos with engineered pockets bring function into tailored, city-ready proportions.",
    seed: 321,
    instagram: { early: 34, mid: 52, late: 80, postCount: 19420, engagementRate: 5.4, topHashtag: "#moderncargo" },
    signals: {
      search: { early: 36, mid: 51, late: 77 },
      social: { early: 33, mid: 54, late: 82 },
      products: { early: 38, mid: 52, late: 74 },
      consumer: { early: 40, mid: 54, late: 76 },
      engagement: { early: 35, mid: 50, late: 73 }
    }
  },
  {
    slug: "mens-linen-shirt",
    name: "Linen Camp Shirt",
    gender: "Menswear",
    category: "Garment",
    colorFamily: "Natural",
    garmentType: "Shirts",
    material: "European linen",
    aesthetic: "Relaxed resort",
    summary: "Breathable linen camp shirts are moving beyond vacation wardrobes into polished everyday summer dressing.",
    seed: 331,
    instagram: { early: 32, mid: 49, late: 75, postCount: 15760, engagementRate: 5.1, topHashtag: "#linenshirt" },
    signals: {
      search: { early: 34, mid: 48, late: 72 },
      social: { early: 31, mid: 51, late: 78 },
      products: { early: 36, mid: 49, late: 70 },
      consumer: { early: 38, mid: 52, late: 72 },
      engagement: { early: 33, mid: 47, late: 68 }
    }
  }
];

export const SIGNAL_KEYS: SignalKey[] = [
  "search",
  "social",
  "products",
  "consumer",
  "engagement"
];
