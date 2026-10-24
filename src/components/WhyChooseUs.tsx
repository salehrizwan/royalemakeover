import React from "react";
import { Sparkles, Scissors, Heart, CalendarCheck2 } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#C9829F]" />,
      title: "Personalized Beauty Care",
      description:
        "Every client receives individual care and attention tailored to their hair texture, personal preferences, and lifestyle.",
    },
    {
      icon: <Scissors className="w-5 h-5 text-[#C9829F]" />,
      title: "Hair Styling and Coloring",
      description:
        "Specialized in precision cuts, multi-tonal balayage, radiant highlights, and smoothing treatments in Sialkot.",
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C9829F]" />,
      title: "A Welcoming Salon Experience",
      description:
        "A peaceful, clean, and comfortable salon environment designed for relaxation and confidence.",
    },
    {
      icon: <CalendarCheck2 className="w-5 h-5 text-[#C9829F]" />,
      title: "Convenient Appointment Booking",
      description:
        "Direct appointment requests via WhatsApp with transparent pricing details and personalized scheduling.",
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#FFFCFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9829F]">
            The Royale Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#383038] tracking-tight">
            Why Choose Royale Makeover
          </h2>
          <div className="w-16 h-0.5 bg-[#C9829F] mx-auto" />
          <p className="text-base sm:text-lg text-[#383038]/80 leading-relaxed font-normal">
            Our commitment is to provide sincere beauty care and refined hairstyling for every client who walks through our doors.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-7 rounded-2xl bg-[#F8F3F0]/60 border border-[#F6DCE4] hover:border-[#E8A9BE] shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-[#F6DCE4] flex items-center justify-center shadow-2xs mb-5">
                  {pillar.icon}
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#383038] mb-2.5">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#383038]/75 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F6DCE4]/40 flex items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-widest text-[#C9829F]">
                  0{idx + 1}
                </span>
                <span className="h-px flex-1 bg-[#F6DCE4]/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
