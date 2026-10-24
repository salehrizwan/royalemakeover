/**
 * Complete Service Catalogue for Royale Makeover Salon
 * All categories, subcategories, services, prices, package inclusions, and notes.
 * Strictly in English, with verified PKR pricing and no emojis.
 */

export type ServiceCategoryId =
  | "bridal-services"
  | "threading-hair-nails"
  | "facial-skincare-waxing"
  | "makeup-services"
  | "hair-services";

export type HairLengthType = "Shoulder Length" | "Chest Length" | "Waist Length";

export interface LengthPriceOption {
  length: HairLengthType;
  priceDisplay: string;
  numericMin?: number;
  numericMax?: number;
}

export interface ServiceItem {
  id: string;
  categoryId: ServiceCategoryId;
  categoryLabel: string;
  subcategory: string;
  group?: string; // Optional grouping within subcategory (e.g. Mehendi / Nikkah / Engagement)
  name: string;
  description?: string;
  priceDisplay: string; // e.g. "Rs 10,000" or "Rs 12,000–15,000" or "From Rs 1,500"
  numericPrice?: number;
  originalPriceDisplay?: string; // for packages with strikethrough original prices
  originalNumericPrice?: number;
  isPackage?: boolean;
  packageInclusions?: string[];
  hasLengthOptions?: boolean;
  lengthPrices?: LengthPriceOption[];
  notes?: string;
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  subcategories: string[];
  description: string;
}

export interface SelectedServiceItem {
  selectionId: string; // unique ID: e.g. "blow-dry-shoulder" or "silver-package"
  serviceId: string;
  categoryId: ServiceCategoryId;
  categoryName: string;
  subcategory: string;
  name: string;
  selectedLength?: HairLengthType;
  priceDisplay: string;
  numericPrice?: number;
  isPackage?: boolean;
  packageInclusions?: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "bridal-services",
    label: "Bridal Services",
    subcategories: ["Bridal Packages"],
    description: "Curated comprehensive bridal rituals designed for complete radiance.",
  },
  {
    id: "threading-hair-nails",
    label: "Threading, Hairstyling & Nail Extensions",
    subcategories: ["Threading", "Hairstyling", "Nail Extensions"],
    description: "Precision grooming, length-specific hairstyling, and salon nail art.",
  },
  {
    id: "facial-skincare-waxing",
    label: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategories: ["Facial & Skincare", "Manicure & Pedicure", "Waxing"],
    description: "Restorative facials, luxury hand & foot therapies, and gentle waxing.",
  },
  {
    id: "makeup-services",
    label: "Makeup Services",
    subcategories: ["Bridal Makeup", "Party Makeup"],
    description: "Flawless signature bridal beauty, evening glam, and event styling.",
  },
  {
    id: "hair-services",
    label: "Hair Services",
    subcategories: ["Haircuts", "Hair Coloring", "Hair Treatments"],
    description: "Signature cuts, bespoke balayage, dimensional tones, and smoothing treatments.",
  },
];

export const SALON_SERVICES_CATALOGUE: ServiceItem[] = [
  // ==========================================
  // CATEGORY ONE: BRIDAL SERVICES
  // ==========================================
  {
    id: "silver-package",
    categoryId: "bridal-services",
    categoryLabel: "Bridal Services",
    subcategory: "Bridal Packages",
    name: "Silver Package",
    description: "Essential pre-bridal pampering package for glow and relaxation.",
    priceDisplay: "Rs 10,000",
    numericPrice: 10000,
    originalPriceDisplay: "Rs 12,000",
    originalNumericPrice: 12000,
    isPackage: true,
    packageInclusions: [
      "Whitening Facial",
      "Whitening Manicure and Pedicure",
      "Head and Shoulder Massage",
      "Half Arms and Legs Waxing",
      "Eyebrows and Upper Lips",
    ],
  },
  {
    id: "gold-package",
    categoryId: "bridal-services",
    categoryLabel: "Bridal Services",
    subcategory: "Bridal Packages",
    name: "Gold Package",
    description: "Upgraded bridal preparation with gold facial and full waxing.",
    priceDisplay: "Rs 15,000",
    numericPrice: 15000,
    originalPriceDisplay: "Rs 17,000",
    originalNumericPrice: 17000,
    isPackage: true,
    packageInclusions: [
      "Gold Facial",
      "Detox Manicure and Pedicure",
      "Head and Shoulder Massage",
      "Full Arms and Legs Waxing",
      "Eyebrows and Upper Lips",
    ],
  },
  {
    id: "royale-package",
    categoryId: "bridal-services",
    categoryLabel: "Bridal Services",
    subcategory: "Bridal Packages",
    name: "Royale Package",
    description: "The ultimate bridal luxury experience featuring Janssen facial therapy.",
    priceDisplay: "Rs 17,000",
    numericPrice: 17000,
    originalPriceDisplay: "Rs 19,000",
    originalNumericPrice: 19000,
    isPackage: true,
    packageInclusions: [
      "Janssen Facial",
      "Detox Manicure and Pedicure",
      "Head and Shoulder Massage",
      "Full Arms and Legs Waxing",
      "Eyebrows and Upper Lips",
    ],
  },

  // ==========================================
  // CATEGORY TWO: THREADING, HAIRSTYLING & NAIL EXTENSIONS
  // ==========================================
  // Subcategory A: Threading
  {
    id: "upper-lips-threading",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Threading",
    name: "Upper Lips Threading",
    priceDisplay: "Rs 100",
    numericPrice: 100,
  },
  {
    id: "forehead-threading",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Threading",
    name: "Forehead Threading",
    priceDisplay: "Rs 200",
    numericPrice: 200,
  },
  {
    id: "eyebrows-threading",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Threading",
    name: "Eyebrows Threading",
    priceDisplay: "Rs 300",
    numericPrice: 300,
  },

  // Subcategory B: Hairstyling (with Hair Lengths)
  {
    id: "hairstyling-blow-dry",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Blow-Dry",
    description: "Smooth, voluminous styling tailored to your hair length.",
    priceDisplay: "From Rs 2,500",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
      { length: "Chest Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
      { length: "Waist Length", priceDisplay: "Rs 3,000", numericMin: 3000, numericMax: 3000 },
    ],
  },
  {
    id: "hairstyling-straightening",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Hair Straightening",
    description: "Sleek, heat-styled iron straightening for glossy smooth locks.",
    priceDisplay: "From Rs 1,500",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 1,500", numericMin: 1500, numericMax: 1500 },
      { length: "Chest Length", priceDisplay: "Rs 2,000", numericMin: 2000, numericMax: 2000 },
      { length: "Waist Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
    ],
  },
  {
    id: "hairstyling-curls",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Hair Curls",
    description: "Bouncy soft curls with long-lasting texture and movement.",
    priceDisplay: "From Rs 2,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 2,000", numericMin: 2000, numericMax: 2000 },
      { length: "Chest Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
      { length: "Waist Length", priceDisplay: "Rs 3,000", numericMin: 3000, numericMax: 3000 },
    ],
  },
  {
    id: "hairstyling-hollywood-waves",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Hollywood Waves",
    description: "Timeless red-carpet sculpted waves with refined shine.",
    priceDisplay: "From Rs 4,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 4,000", numericMin: 4000, numericMax: 4000 },
      { length: "Chest Length", priceDisplay: "Rs 4,500", numericMin: 4500, numericMax: 4500 },
      { length: "Waist Length", priceDisplay: "Rs 5,000", numericMin: 5000, numericMax: 5000 },
    ],
  },
  {
    id: "hairstyling-messy-bun",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Messy Bun",
    description: "Artfully textured updo with soft tendrils.",
    priceDisplay: "From Rs 2,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 2,000", numericMin: 2000, numericMax: 2000 },
      { length: "Chest Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
      { length: "Waist Length", priceDisplay: "Rs 3,000", numericMin: 3000, numericMax: 3000 },
    ],
  },
  {
    id: "hairstyling-sleek-bun",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Sleek Bun",
    description: "Polished, clean, sophisticated low or high bun.",
    priceDisplay: "From Rs 2,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 2,000", numericMin: 2000, numericMax: 2000 },
      { length: "Chest Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
      { length: "Waist Length", priceDisplay: "Rs 3,000", numericMin: 3000, numericMax: 3000 },
    ],
  },
  {
    id: "hairstyling-braids",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Braids",
    description: "Intricate traditional or contemporary braided patterns.",
    priceDisplay: "From Rs 1,500",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 1,500", numericMin: 1500, numericMax: 1500 },
      { length: "Chest Length", priceDisplay: "Rs 2,000", numericMin: 2000, numericMax: 2000 },
      { length: "Waist Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
    ],
  },
  {
    id: "hairstyling-fancy-ponytail",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Hairstyling",
    name: "Fancy Ponytail",
    description: "High-glam textured or sleek wrapped ponytail.",
    priceDisplay: "From Rs 2,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 2,000", numericMin: 2000, numericMax: 2000 },
      { length: "Chest Length", priceDisplay: "Rs 2,500", numericMin: 2500, numericMax: 2500 },
      { length: "Waist Length", priceDisplay: "Rs 3,000", numericMin: 3000, numericMax: 3000 },
    ],
  },

  // Subcategory C: Nail Extensions
  {
    id: "nail-acrylic-one-color",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Nail Extensions",
    name: "Acrylic Nails (One Color)",
    description: "Durable sculpted acrylic extensions with high-shine polish.",
    priceDisplay: "Rs 5,000",
    numericPrice: 5000,
  },
  {
    id: "nail-french",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Nail Extensions",
    name: "French Nails",
    description: "Classic clean white tip or modern nude French design.",
    priceDisplay: "Rs 5,000",
    numericPrice: 5000,
  },
  {
    id: "nail-chrome",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Nail Extensions",
    name: "Chrome Nails",
    description: "Reflective mirror-like metallic chrome powder finish.",
    priceDisplay: "Rs 6,000",
    numericPrice: 6000,
  },
  {
    id: "nail-cat-eye",
    categoryId: "threading-hair-nails",
    categoryLabel: "Threading, Hairstyling & Nail Extensions",
    subcategory: "Nail Extensions",
    name: "Cat Eye Nails",
    description: "Magnetic velvet shimmer shifting gracefully with the light.",
    priceDisplay: "Rs 6,500",
    numericPrice: 6500,
  },

  // ==========================================
  // CATEGORY THREE: FACIAL & SKINCARE, MANICURE & PEDICURE, WAXING
  // ==========================================
  // Subcategory A: Facial & Skincare
  {
    id: "facial-simple-bleach",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Simple Bleach",
    description: "Even tone brightening treatment for facial hair.",
    priceDisplay: "Rs 1,500",
    numericPrice: 1500,
  },
  {
    id: "facial-whitening-bleach",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Whitening Bleach",
    description: "Specialized formulation for visible brightness.",
    priceDisplay: "Rs 1,000",
    numericPrice: 1000,
  },
  {
    id: "facial-cleansing",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Cleansing",
    description: "Deep pore purification and gentle exfoliation.",
    priceDisplay: "Rs 2,000",
    numericPrice: 2000,
  },
  {
    id: "facial-gold-skin-polish",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Gold Skin Polish",
    description: "Gentle micro-polishing for instant glow and supple radiance.",
    priceDisplay: "Rs 2,500",
    numericPrice: 2500,
  },
  {
    id: "facial-shine",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Shine Facial",
    description: "Revitalizing botanical therapy to restore natural complexion luster.",
    priceDisplay: "Rs 3,000",
    numericPrice: 3000,
  },
  {
    id: "facial-hydrating",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Hydrating Facial",
    description: "Intense moisture replenishment for parched, tired skin.",
    priceDisplay: "Rs 4,000",
    numericPrice: 4000,
  },
  {
    id: "facial-whitening-with-massage",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Whitening Facial",
    description: "Brightening facial accompanied by tension-relieving massage therapy.",
    priceDisplay: "Rs 4,500",
    numericPrice: 4500,
    packageInclusions: ["Head and Shoulder Massage"],
  },
  {
    id: "facial-gold-with-massage",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Gold Facial",
    description: "Prestige anti-aging gold infused treatment with soothing massage.",
    priceDisplay: "Rs 5,500",
    numericPrice: 5500,
    packageInclusions: ["Head and Shoulder Massage"],
  },
  {
    id: "facial-janssen-with-massage",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Facial & Skincare",
    name: "Janssen Facial",
    description: "German dermatological luxury therapy with massage and upper lips grooming.",
    priceDisplay: "Rs 8,000",
    numericPrice: 8000,
    packageInclusions: ["Head and Shoulder Massage", "Upper Lips"],
  },

  // Subcategory B: Manicure & Pedicure
  {
    id: "mani-pedi-whitening",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Manicure & Pedicure",
    name: "Whitening Manicure and Pedicure",
    description: "Complete nail filing, cuticle care, brightening scrub, and massage.",
    priceDisplay: "Rs 4,500",
    numericPrice: 4500,
  },
  {
    id: "mani-pedi-detox-paraffin",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Manicure & Pedicure",
    name: "Detox Manicure and Pedicure",
    description: "Therapeutic detox soak, warm paraffin wax bath, and velvet hydration.",
    priceDisplay: "Rs 6,500",
    numericPrice: 6500,
    packageInclusions: ["Paraffin Wax"],
  },

  // Subcategory C: Waxing (12 separate selectable items)
  {
    id: "wax-upper-lips",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Upper Lips Wax",
    priceDisplay: "Rs 200",
    numericPrice: 200,
  },
  {
    id: "wax-eyebrow",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Eyebrow Wax",
    priceDisplay: "Rs 400",
    numericPrice: 400,
  },
  {
    id: "wax-chin",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Chin Wax",
    priceDisplay: "Rs 500",
    numericPrice: 500,
  },
  {
    id: "wax-chin-sideburns",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Chin and Sideburns Wax",
    priceDisplay: "Rs 800",
    numericPrice: 800,
  },
  {
    id: "wax-full-face",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Full Face Wax",
    priceDisplay: "Rs 1,500",
    numericPrice: 1500,
  },
  {
    id: "wax-under-arms",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Under Arms Wax",
    priceDisplay: "Rs 2,000",
    numericPrice: 2000,
  },
  {
    id: "wax-under-legs",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Under Legs Wax",
    priceDisplay: "Rs 3,000",
    numericPrice: 3000,
  },
  {
    id: "wax-half-arms",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Half Arms Wax",
    priceDisplay: "Rs 1,000",
    numericPrice: 1000,
  },
  {
    id: "wax-full-arms",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Full Arms Wax",
    priceDisplay: "Rs 2,000",
    numericPrice: 2000,
  },
  {
    id: "wax-half-legs",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Half Legs Wax",
    priceDisplay: "Rs 1,500",
    numericPrice: 1500,
  },
  {
    id: "wax-full-legs",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Full Legs Wax",
    priceDisplay: "Rs 3,000",
    numericPrice: 3000,
  },
  {
    id: "wax-full-body",
    categoryId: "facial-skincare-waxing",
    categoryLabel: "Facial & Skincare, Manicure & Pedicure, Waxing",
    subcategory: "Waxing",
    name: "Full Body Wax",
    priceDisplay: "Rs 10,000",
    numericPrice: 10000,
  },

  // ==========================================
  // CATEGORY FOUR: MAKEUP SERVICES
  // ==========================================
  // Subcategory A: Bridal Makeup (Group 1: Mehendi / Nikkah / Engagement)
  {
    id: "bridal-soft-glam-mehendi",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Bridal Makeup",
    group: "Mehendi / Nikkah / Engagement",
    name: "Soft Glam Bride",
    description: "Graceful luminous makeup tailored for Mehendi, Nikkah, or Engagement ceremonies.",
    priceDisplay: "Rs 25,000",
    numericPrice: 25000,
  },
  {
    id: "bridal-royale-glam-mehendi",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Bridal Makeup",
    group: "Mehendi / Nikkah / Engagement",
    name: "Royale Glam Bride",
    description: "Signature high-definition bridal artistry with customized hairstyling.",
    priceDisplay: "Rs 30,000",
    numericPrice: 30000,
  },

  // Subcategory A: Bridal Makeup (Group 2: Barat / Walima)
  {
    id: "bridal-soft-glam-barat",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Bridal Makeup",
    group: "Barat / Walima",
    name: "Soft Glam Bride",
    description: "Subtle elegance and dewy complexion for main wedding celebrations.",
    priceDisplay: "Rs 55,000",
    numericPrice: 55000,
  },
  {
    id: "bridal-signature-royale-barat",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Bridal Makeup",
    group: "Barat / Walima",
    name: "Signature Royale Bride",
    description: "Prestige full bridal transformation with high-end setting and jewelry placement.",
    priceDisplay: "Rs 65,000",
    numericPrice: 65000,
  },

  // Subcategory B: Party Makeup
  {
    id: "party-soft-makeup",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Party Makeup",
    name: "Soft Makeup with Open Hairdo",
    description: "Delicate base, natural enhancement, and open styling.",
    priceDisplay: "Rs 5,000",
    numericPrice: 5000,
    packageInclusions: ["Lashes", "Nail paint on hands", "Open hairdo"],
    notes: "Soft makeup does not include a heavy hairdo, smokey eyes, or glittery eyes.",
  },
  {
    id: "party-heavy-glam",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Party Makeup",
    name: "Heavy Glam with Customized Hairdo",
    description: "Dramatic eye makeup, defined contouring, and personalized hairstyle.",
    priceDisplay: "Rs 7,000",
    numericPrice: 7000,
    packageInclusions: ["Lashes", "Nail paint on hands", "Customized hairdo"],
  },
  {
    id: "party-signature-royale",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Party Makeup",
    name: "Signature Royale Party Glam",
    description: "Luxury full glam with bespoke hairstyle, lash craft, and hand nail paint.",
    priceDisplay: "Rs 10,000",
    numericPrice: 10000,
    packageInclusions: ["Lashes", "Nail paint on hands", "Hairstyling"],
  },
  {
    id: "party-kid-makeup",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Party Makeup",
    name: "Kid Makeup",
    description: "Gentle sparkle and soft touch designed specially for young girls.",
    priceDisplay: "Rs 2,000",
    numericPrice: 2000,
    packageInclusions: ["Open hairdo"],
    notes: "Kids makeup includes an open hairdo.",
  },
  {
    id: "party-dubatta-setting",
    categoryId: "makeup-services",
    categoryLabel: "Makeup Services",
    subcategory: "Party Makeup",
    name: "Dubatta Setting",
    description: "Precision pinning and pleating for party or wedding dupattas.",
    priceDisplay: "Rs 1,000",
    numericPrice: 1000,
  },

  // ==========================================
  // CATEGORY FIVE: HAIR SERVICES
  // ==========================================
  // Subcategory A: Haircuts
  {
    id: "haircut-straight-trim",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Haircuts",
    name: "Straight Trim",
    description: "Precision ends evening and maintenance trim.",
    priceDisplay: "Rs 500",
    numericPrice: 500,
  },
  {
    id: "haircut-bangs-cut",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Haircuts",
    name: "Bangs Cut",
    description: "Curtain bangs or tailored fringe styling.",
    priceDisplay: "Rs 1,000",
    numericPrice: 1000,
  },
  {
    id: "haircut-basic",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Haircuts",
    name: "Basic Haircut",
    description: "Customized layered or classic cut for healthy movement.",
    priceDisplay: "Rs 2,500",
    numericPrice: 2500,
  },
  {
    id: "haircut-signature",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Haircuts",
    name: "Signature Haircut",
    description: "Complete signature transformation cut including salon blow-dry.",
    priceDisplay: "Rs 3,500",
    numericPrice: 3500,
    packageInclusions: ["Blow-Dry"],
  },

  // Subcategory B: Hair Coloring
  {
    id: "haircolor-root-touchup",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Coloring",
    name: "Root Touchup",
    description: "Seamless regrowth coverage blending with your existing tone.",
    priceDisplay: "Rs 5,000",
    numericPrice: 5000,
  },
  {
    id: "haircolor-single-colour",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Coloring",
    name: "Single Colour",
    description: "Full head rich, uniform color formulated for depth and luster.",
    priceDisplay: "From Rs 12,000–15,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 12,000–15,000", numericMin: 12000, numericMax: 15000 },
      { length: "Chest Length", priceDisplay: "Rs 15,000–18,000", numericMin: 15000, numericMax: 18000 },
      { length: "Waist Length", priceDisplay: "Rs 18,000–20,000", numericMin: 18000, numericMax: 20000 },
    ],
  },
  {
    id: "haircolor-balayage",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Coloring",
    name: "Balayage",
    description: "Hand-painted dimensional transitions for a natural sun-kissed gradient.",
    priceDisplay: "From Rs 18,000–21,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 18,000–21,000", numericMin: 18000, numericMax: 21000 },
      { length: "Chest Length", priceDisplay: "Rs 21,000–24,000", numericMin: 21000, numericMax: 24000 },
      { length: "Waist Length", priceDisplay: "Rs 24,000–27,000", numericMin: 24000, numericMax: 27000 },
    ],
  },
  {
    id: "haircolor-highlights",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Coloring",
    name: "Highlights",
    description: "Finely woven luminous foil sections for multi-tonal brilliance.",
    priceDisplay: "From Rs 15,000–18,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 15,000–18,000", numericMin: 15000, numericMax: 18000 },
      { length: "Chest Length", priceDisplay: "Rs 18,000–22,000", numericMin: 18000, numericMax: 22000 },
      { length: "Waist Length", priceDisplay: "Rs 22,000–25,000", numericMin: 22000, numericMax: 25000 },
    ],
  },
  {
    id: "haircolor-lowlights",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Coloring",
    name: "Lowlights",
    description: "Deeper lowlight streaks to build contrast, dimension, and body.",
    priceDisplay: "From Rs 15,000–18,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 15,000–18,000", numericMin: 15000, numericMax: 18000 },
      { length: "Chest Length", priceDisplay: "Rs 18,000–22,000", numericMin: 18000, numericMax: 22000 },
      { length: "Waist Length", priceDisplay: "Rs 22,000–25,000", numericMin: 22000, numericMax: 25000 },
    ],
  },

  // Subcategory C: Hair Treatments
  {
    id: "hairtreatment-protein",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Treatments",
    name: "Protein Treatment",
    description: "Strengthening infusion to restore broken bonds and rebuild hair structure.",
    priceDisplay: "From Rs 4,000–6,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 4,000–6,000", numericMin: 4000, numericMax: 6000 },
      { length: "Chest Length", priceDisplay: "Rs 6,000–8,000", numericMin: 6000, numericMax: 8000 },
      { length: "Waist Length", priceDisplay: "Rs 8,000–10,000", numericMin: 8000, numericMax: 10000 },
    ],
  },
  {
    id: "hairtreatment-keratin",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Treatments",
    name: "Keratin Treatment",
    description: "Silken smoothing elixir to eliminate frizz and infuse glossy softness.",
    priceDisplay: "From Rs 15,000–18,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 15,000–18,000", numericMin: 15000, numericMax: 18000 },
      { length: "Chest Length", priceDisplay: "Rs 18,000–21,000", numericMin: 18000, numericMax: 21000 },
      { length: "Waist Length", priceDisplay: "Rs 22,000–25,000", numericMin: 22000, numericMax: 25000 },
    ],
  },
  {
    id: "hairtreatment-extenso",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Treatments",
    name: "Extenso",
    description: "Structural smoothing therapy for manageable, relaxed hair movement.",
    priceDisplay: "From Rs 20,000–25,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 20,000–25,000", numericMin: 20000, numericMax: 25000 },
      { length: "Chest Length", priceDisplay: "Rs 25,000–30,000", numericMin: 25000, numericMax: 30000 },
      { length: "Waist Length", priceDisplay: "Rs 30,000–35,000", numericMin: 30000, numericMax: 35000 },
    ],
  },
  {
    id: "hairtreatment-rebonding",
    categoryId: "hair-services",
    categoryLabel: "Hair Services",
    subcategory: "Hair Treatments",
    name: "Rebonding",
    description: "Permanent sleek straightening delivering pinpoint glass-like shine.",
    priceDisplay: "From Rs 20,000–25,000",
    hasLengthOptions: true,
    lengthPrices: [
      { length: "Shoulder Length", priceDisplay: "Rs 20,000–25,000", numericMin: 20000, numericMax: 25000 },
      { length: "Chest Length", priceDisplay: "Rs 25,000–30,000", numericMin: 25000, numericMax: 30000 },
      { length: "Waist Length", priceDisplay: "Rs 30,000–35,000", numericMin: 30000, numericMax: 35000 },
    ],
  },
];
