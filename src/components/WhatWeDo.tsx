import React, { useRef, useState, useEffect } from "react";
import { INSTAGRAM_REELS, InstagramReelItem } from "../data/reels";
import { BUSINESS_INFO } from "../config/business";
import { ChevronLeft, ChevronRight, Play, Instagram, ExternalLink } from "lucide-react";

export const WhatWeDo: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = sliderRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = 280; // approximate card width + gap
      const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#E4AD91] block">
              Instagram Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302D2C] tracking-tight">
              What We Do
            </h2>
            <p className="text-base sm:text-lg text-[#77706D] leading-relaxed font-normal">
              Explore our beauty transformations, bridal looks, and salon work.
            </p>
          </div>

          {/* Navigation Arrows for Slider */}
          <div className="hidden md:flex items-center justify-center md:justify-end gap-3">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                canScrollLeft
                  ? "bg-white border-[#F0E6E1] text-[#302D2C] hover:bg-[#FDF3F0] hover:border-[#E4AD91] shadow-2xs"
                  : "bg-[#FFFBF9] border-[#F0E6E1]/50 text-[#77706D]/30 cursor-not-allowed"
              }`}
              aria-label="Previous reels"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                canScrollRight
                  ? "bg-white border-[#F0E6E1] text-[#302D2C] hover:bg-[#FDF3F0] hover:border-[#E4AD91] shadow-2xs"
                  : "bg-[#FFFBF9] border-[#F0E6E1]/50 text-[#77706D]/30 cursor-not-allowed"
              }`}
              aria-label="Next reels"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Reel Slider Container */}
        <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
            ref={sliderRef}
          
className="flex gap-3 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"

            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {INSTAGRAM_REELS.map((reel) => (
              <a
                key={reel.id}
                href={reel.reelUrl}
                target="_blank"
                rel="noopener noreferrer"

className="group relative flex-none w-[78vw] max-w-[320px] sm:w-[270px] lg:w-[290px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#242221] border border-[#F0E6E1] shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 snap-start cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91]"

                aria-label={`Open Instagram Reel: ${reel.title}`}
              >
                {/* Reel Cover Thumbnail */}
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#242221]/90 via-[#242221]/20 to-transparent pointer-events-none" />

                {/* Top Instagram Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium border border-white/10">
                    <Instagram className="w-3.5 h-3.5 text-[#E4AD91]" />
                    <span>Reel</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-[#E4AD91] transition-all">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-[#E4AD91] text-[#302D2C] group-hover:text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Information Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1 text-white pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider text-[#E4AD91] font-semibold block">
                    @royalemakeover
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug truncate">
                    {reel.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 pt-1 group-hover:text-[#E4AD91] transition-colors">
                    <span>Watch on Instagram</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Notice & Instagram Profile Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77706D] border-t border-[#F0E6E1]/60 pt-6">
          <p className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-[#E4AD91]" />
            <span>Click any Reel to view on Royale Makeover&apos;s official Instagram profile.</span>
          </p>

          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FDF3F0] hover:bg-[#F8E5DE] text-[#302D2C] font-medium transition-colors"
          >
            <span>Follow @royalemakeover</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
