import React from "react";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 bg-[#F8E5DE] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#77706D] block">
              WELCOME TO ROYALE MAKEOVER
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#302D2C] leading-[1.12]">
              Luxury Beauty &amp; <br className="hidden sm:inline" />
              Bridal Styling
            </h1>

            <p className="text-base sm:text-lg text-[#77706D] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover personalized beauty care, elegant bridal makeup, expert hairstyling, and professional treatments at Royale Makeover.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-sm font-medium rounded-full shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91]"
              >
                Book Appointment
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/80 hover:bg-white text-[#302D2C] text-sm font-medium rounded-full border border-[#F0E6E1] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#77706D]" />
              </button>
            </div>
          </div>

          {/* Right Column: Arched Bridal Frame Matching Reference Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              {/* White border arched container */}
              <div className="p-3 sm:p-3.5 bg-white rounded-t-full rounded-b-3xl shadow-xl border border-white">
                <div className="w-full aspect-4/5 sm:aspect-3/4 rounded-t-full rounded-b-2xl overflow-hidden bg-[#FDF3F0]">
                  <img
                    src="/makeup.jpg"
                    alt="Royale Makeover Luxury Beauty &amp; Bridal Styling"
                    className="w-full h-full object-cover object-[center_20%] hover:scale-103 transition-transform duration-700"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
