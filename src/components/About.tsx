import React from "react";
import { BUSINESS_INFO } from "../config/business";
import { Sparkles, Heart, Scissors, ShieldCheck } from "lucide-react";

interface AboutProps {
  onExploreServices: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreServices }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8F3F0]/60 relative overflow-hidden">
      {/* Delicate background watercolor accents */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-[#F6DCE4]/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Brand Visual & Circular Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative max-w-md w-full">
              {/* Outer circular flourish representing the logo's watercolor circle */}
              <div
                className="absolute inset-0 rounded-full border border-[#E8A9BE]/50 scale-105 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#F6DCE4] bg-white aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                  alt="Personalized hair styling and beauty care experience"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#383038]/50 via-transparent to-transparent pointer-events-none" />

                {/* Inset Brand Emblem */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFFCFD]/95 backdrop-blur-md border border-[#F6DCE4] shadow-sm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8A9BE] bg-white shrink-0 p-0.5">
                    <img
                      src={BUSINESS_INFO.logoPath}
                      alt="Royale Makeover Logo Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-sm text-[#383038]">
                      Royale Makeover
                    </p>
                    <p className="font-script text-base text-[#C9829F]">
                      Nekapura, Sialkot
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9829F]">
                About Royale Makeover
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#383038] tracking-tight">
                {BUSINESS_INFO.aboutHeading}
              </h2>
              <div className="w-16 h-0.5 bg-[#C9829F] mt-2" />
            </div>

            <p className="text-lg text-[#383038]/85 leading-relaxed font-normal">
              {BUSINESS_INFO.aboutText}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white border border-[#F6DCE4]/80 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#F6DCE4]/40 text-[#C9829F]">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#383038]">
                    Personalized Attention
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#383038]/70 leading-relaxed">
                  Tailored consultations crafted around your unique hair texture, skin tone, and personal aesthetic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#F6DCE4]/80 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#F6DCE4]/40 text-[#C9829F]">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#383038]">
                    Signature Styling &amp; Colour
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#383038]/70 leading-relaxed">
                  Precision haircuts, multidimensional coloring, balayage, and restorative treatments in Sialkot.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#C9829F] hover:text-[#383038] transition-colors group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C9829F] rounded-sm"
              >
                <span>View our services and confirmed pricing</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
