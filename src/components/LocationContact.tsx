import React from "react";
import { BUSINESS_INFO } from "../config/business";
import { MapPin, Navigation, Instagram, Facebook, Calendar, Phone, Sparkles } from "lucide-react";

interface LocationContactProps {
  onBookClick: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onBookClick }) => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FFFCFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9829F]">
            Visit Us in Sialkot
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#383038] tracking-tight">
            Location &amp; Contact
          </h2>
          <div className="w-16 h-0.5 bg-[#C9829F] mx-auto" />
          <p className="text-base sm:text-lg text-[#383038]/80 leading-relaxed font-normal">
            Conveniently situated in Nekapura, Sialkot. Connect with our team or plan your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Verified Salon Details & Social Media */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-8 rounded-3xl bg-[#F8F3F0]/60 border border-[#F6DCE4]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#E8A9BE] bg-white p-0.5 shadow-2xs overflow-hidden shrink-0">
                  <img
                    src={BUSINESS_INFO.logoPath}
                    alt="Royale Makeover"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#383038]">
                    Royale Makeover
                  </h3>
                  <p className="text-xs text-[#C9829F] font-medium tracking-wide uppercase">
                    Beauty Salon · Sialkot
                  </p>
                </div>
              </div>

              {/* Verified Physical Address */}
              <div className="space-y-2 pt-2 border-t border-[#F6DCE4]/60">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9829F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#383038]">
                      Salon Address
                    </h4>
                    <p className="text-sm text-[#383038]/85 mt-1 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={BUSINESS_INFO.googleMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#F6DCE4]/50 border border-[#E8A9BE] text-[#383038] text-xs font-medium shadow-2xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C9829F]" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="space-y-3 pt-4 border-t border-[#F6DCE4]/60">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#383038]">
                  Official Social Channels
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F6DCE4]/40 border border-[#F6DCE4] text-xs font-medium text-[#383038] hover:text-[#C9829F] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#C9829F]" />
                    <span>Instagram Profile</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F6DCE4]/40 border border-[#F6DCE4] text-xs font-medium text-[#383038] hover:text-[#C9829F] transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-[#C9829F]" />
                    <span>Facebook Page</span>
                  </a>
                </div>
              </div>

              {/* Direct Booking Notice */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C9829F] hover:bg-[#b86d8c] text-white text-sm font-medium shadow-2xs hover:shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request WhatsApp Appointment</span>
                </button>
              </div>
            </div>

            {/* Respectful Transparency Note regarding Phone Line */}
            <div className="pt-4 border-t border-[#F6DCE4]/60 flex items-center gap-2 text-xs text-[#383038]/60">
              <Phone className="w-3.5 h-3.5 text-[#C9829F]" />
              <span>Direct telephone line will be activated upon salon owner verification.</span>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#F6DCE4] shadow-md bg-stone-100 flex flex-col min-h-[380px]">
            <div className="p-3 bg-white border-b border-[#F6DCE4] flex items-center justify-between text-xs text-[#383038]/70">
              <span className="font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9829F]" />
                Nekapura, Sialkot, Punjab, Pakistan
              </span>
              <a
                href={BUSINESS_INFO.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9829F] hover:underline"
              >
                Open in Full Map &rarr;
              </a>
            </div>

            <iframe
              title="Royale Makeover Salon Vicinity Map"
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              className="w-full flex-1 border-0 min-h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
