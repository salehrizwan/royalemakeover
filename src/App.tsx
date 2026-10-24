import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { BookingSummary } from "./components/BookingSummary";
import { WhatWeDo } from "./components/WhatWeDo";
import { BookingForm } from "./components/BookingForm";
import { Footer } from "./components/Footer";
import {
  ServiceItem,
  SelectedServiceItem,
  HairLengthType,
} from "./data/services";
import { MessageCircle } from "lucide-react";

export default function App() {
  const [selectedServices, setSelectedServices] = useState<SelectedServiceItem[]>([]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProceedToBooking = () => {
    scrollToSection("contact");
  };

  const handleToggleSelectService = (service: ServiceItem, length?: HairLengthType) => {
    const selectionId = length
      ? `${service.id}-${length.toLowerCase().replace(/\s+/g, "-")}`
      : service.id;

    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.selectionId === selectionId);
      if (exists) {
        return prev.filter((s) => s.selectionId !== selectionId);
      } else {
        const lengthOption = length && service.lengthPrices?.find((lp) => lp.length === length);
        const priceDisplay = lengthOption ? lengthOption.priceDisplay : service.priceDisplay;
        const numericPrice = lengthOption ? lengthOption.numericMin : service.numericPrice;

        const newItem: SelectedServiceItem = {
          selectionId,
          serviceId: service.id,
          categoryId: service.categoryId,
          categoryName: service.categoryLabel,
          subcategory: service.subcategory,
          name: service.name,
          selectedLength: length,
          priceDisplay,
          numericPrice,
          isPackage: service.isPackage,
          packageInclusions: service.packageInclusions,
        };
        return [...prev, newItem];
      }
    });
  };

  const handleRemoveService = (selectionId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.selectionId !== selectionId));
  };

  const handleClearSelection = () => {
    setSelectedServices([]);
  };

  return (
    <div className="min-h-screen bg-white text-[#302D2C] flex flex-col font-sans selection:bg-[#F8E5DE] selection:text-[#302D2C]">
      {/* 1. Minimal White Navigation Bar */}
      <Navbar onBookClick={handleProceedToBooking} />

      {/* Main Content Sections (Matching Reference Screenshot Flow) */}
      <main className="flex-1">
        {/* 2. Soft Peach Hero Section with Arched Bridal Frame */}
        <Hero
          onBookClick={handleProceedToBooking}
          onExploreServices={() => scrollToSection("services")}
        />

        {/* 3. Our Professional Services (5 Category Cards + Full Interactive Catalogue) */}
        <Services
          selectedServices={selectedServices}
          onToggleSelectService={handleToggleSelectService}
          onRemoveService={handleRemoveService}
          onProceedToBooking={handleProceedToBooking}
        />

        {/* 4. What We Do (Horizontal Instagram Reels Slider) */}
        <WhatWeDo />

        {/* 5. Appointment Booking & Contact (2-Column Form + Charcoal Packages Card) */}
        <div id="booking">
          <BookingForm
            selectedServices={selectedServices}
            onRemoveService={handleRemoveService}
            onClearSelection={handleClearSelection}
            onNavigateToServices={() => scrollToSection("services")}
          />
        </div>
      </main>

      {/* 6. Clean Understated Footer */}
      <Footer />

      {/* Persistent Floating Booking Summary (Activates when services are selected) */}
      <BookingSummary
        selectedServices={selectedServices}
        onRemoveService={handleRemoveService}
        onClearSelection={handleClearSelection}
        onProceedToBooking={handleProceedToBooking}
      />

      {/* Quick WhatsApp Action (Hidden when BookingSummary is active to prevent overlap) */}
      {selectedServices.length === 0 && (
        <aside aria-label="Quick appointment action">
          <button
            type="button"
            onClick={handleProceedToBooking}
            className="fixed bottom-6 right-6 z-20 inline-flex items-center gap-2 px-4 py-3 bg-[#E4AD91] hover:bg-[#d99c7d] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91] focus-visible:ring-offset-2"
            aria-label="Quick appointment booking"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline text-xs font-semibold tracking-wide">
              Book Appointment
            </span>
          </button>
        </aside>
      )}
    </div>
  );
}
