/**
 * Business Configuration for Royale Makeover Salon
 * All verified contact details, addresses, and social links are maintained here.
 */

export const BUSINESS_INFO = {
  name: "Royale Makeover",
  tagline: "Your Beauty, Our Art.",
  slogan: "Discover Your Beauty",
  eyebrow: "WELCOME TO ROYALE MAKEOVER",
  aboutHeading: "Discover Your Beauty",
  aboutText:
    "At Royale Makeover, we believe every client deserves personalized attention and professional beauty care. From signature haircuts to transformative hair color and specialized treatments, our goal is to help you feel confident and look your best.",
  heroSupportingText:
    "Discover your beauty with personalized hair styling, expert coloring, and professional beauty care in Sialkot.",
  
  // Physical Address
  address: "Bhagowal Road, Opposite Sialkot Model School, Nekapura, Sialkot, Punjab 51310, Pakistan",
  area: "Nekapura",
  city: "Sialkot",
  postalCode: "51310",
  province: "Punjab",
  country: "Pakistan",

  // Official Social Media
  instagramUrl: "https://www.instagram.com/royalemakeover/",
  facebookUrl: "https://www.facebook.com/113039387218376/",
  googleMapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Bhagowal+Road+Opposite+Sialkot+Model+School+Nekapura+Sialkot+Punjab+51310+Pakistan",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=Bhagowal%20Road,%20Opposite%20Sialkot%20Model%20School,%20Nekapura,%20Sialkot,%20Punjab%2051310,%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed",

  /**
   * WHATSAPP APPOINTMENT BOOKING CONFIGURATION:
   * -------------------------------------------------------------
   * IMPORTANT: The salon owner should insert their official WhatsApp phone number below.
   * Format: International number without '+' or spaces (e.g. "923001234567" for Pakistan).
   * 
   * When left empty, the website displays a friendly setup notice and provides
   * a booking preview & copy tool so no customer appointment requests are lost.
   */
  whatsappNumber: "923085749144",
  displayPhone: "+92 308 5749144",
  
  // Notice for pricing disclaimer
  pricingDisclaimer:
    "Prices may vary depending on hair length, thickness, and consultation. Please confirm the final price with the salon before your appointment.",

  logoPath: "/logo.png",
};

export const WHATSAPP_NUMBER = BUSINESS_INFO.whatsappNumber;

/**
 * Checks whether the salon WhatsApp number has been configured.
 */
export const isWhatsAppConfigured = (): boolean => {
  const num = BUSINESS_INFO.whatsappNumber.trim();
  return Boolean(num && num.length >= 8 && !num.includes("PLACEHOLDER"));
};

/**
 * Generates the WhatsApp booking link.
 */
export const buildWhatsAppUrl = (message: string): string => {
  const encoded = encodeURIComponent(message);
  if (isWhatsAppConfigured()) {
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
  }
  return "";
};
