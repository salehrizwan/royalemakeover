import React, { useState } from "react";
import {
  SERVICE_CATEGORIES,
  SALON_SERVICES_CATALOGUE,
  ServiceCategoryId,
  ServiceItem,
  SelectedServiceItem,
  HairLengthType,
} from "../data/services";
import {
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface ServicesProps {
  selectedServices: SelectedServiceItem[];
  onToggleSelectService: (service: ServiceItem, length?: HairLengthType) => void;
  onRemoveService: (selectionId: string) => void;
  onProceedToBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({
  selectedServices,
  onToggleSelectService,
  onRemoveService,
  onProceedToBooking,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<ServiceCategoryId>("bridal-services");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");

  const currentCategory = SERVICE_CATEGORIES.find((c) => c.id === activeCategoryId)!;

  // Filter items in active category
  const categoryServices = SALON_SERVICES_CATALOGUE.filter(
    (s) => s.categoryId === activeCategoryId
  );

  const displayedServices =
    activeSubcategory === "All"
      ? categoryServices
      : categoryServices.filter((s) => s.subcategory === activeSubcategory);

  const subcategories = ["All", ...currentCategory.subcategories];

  // Helper to check if a specific service variant is selected
  const isSelected = (serviceId: string, length?: HairLengthType) => {
    const selectionId = length ? `${serviceId}-${length.toLowerCase().replace(/\s+/g, "-")}` : serviceId;
    return selectedServices.some((s) => s.selectionId === selectionId);
  };

  const handleCategoryCardClick = (catId: ServiceCategoryId) => {
    setActiveCategoryId(catId);
    setActiveSubcategory("All");
    const el = document.getElementById("category-details-anchor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#FFFBF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#302D2C] tracking-tight">
            Our Professional Services
          </h2>
          <p className="text-base sm:text-lg text-[#77706D] leading-relaxed font-normal">
            Explore our beauty, bridal, hair, and styling services, thoughtfully designed around your needs.
          </p>
        </div>

        {/* 5 Clean Category Cards Inspired by Reference Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            const servicesInCat = SALON_SERVICES_CATALOGUE.filter((s) => s.categoryId === cat.id);
            const previewItems = servicesInCat.slice(0, 4);

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryCardClick(cat.id)}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isActive
                    ? "border-[#E4AD91] ring-2 ring-[#E4AD91]/30 shadow-md transform -translate-y-1"
                    : "border-[#F0E6E1] hover:border-[#E4AD91]/70 shadow-xs hover:shadow-md"
                }`}
              >
                <div>
                  {/* Category Title */}
                  <h3 className="font-serif text-lg font-bold text-[#302D2C] mb-2 group-hover:text-[#DFA58B] transition-colors">
                    {cat.label}
                  </h3>

                  <p className="text-xs text-[#77706D] mb-4 line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Sample Service Previews List */}
                  <ul className="space-y-1.5 text-xs text-[#77706D] mb-6 border-t border-[#F0E6E1]/60 pt-3">
                    {previewItems.map((item) => (
                      <li key={item.id} className="truncate flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E4AD91] shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </li>
                    ))}
                    {servicesInCat.length > 4 && (
                      <li className="text-[11px] text-[#E4AD91] font-medium pt-1">
                        + {servicesInCat.length - 4} more services
                      </li>
                    )}
                  </ul>
                </div>

                {/* View Services Link Action */}
                <div className="pt-2 border-t border-[#F0E6E1]/60">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isActive ? "text-[#DFA58B]" : "text-[#77706D] group-hover:text-[#302D2C]"
                    }`}
                  >
                    <span>View Services</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anchor for Smooth Scrolling when Category Card is Clicked */}
        <div id="category-details-anchor" className="pt-4 mb-8">
          {/* Active Category Header & Subcategory Navigation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6E1] shadow-xs mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F0E6E1]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E4AD91]">
                  Active Category
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D2C] mt-1">
                  {currentCategory.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#77706D] mt-1">
                  {currentCategory.description}
                </p>
              </div>

              {/* Category Quick Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {SERVICE_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(c.id);
                      setActiveSubcategory("All");
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                      activeCategoryId === c.id
                        ? "bg-[#E4AD91] text-white shadow-2xs"
                        : "bg-[#FDF3F0] text-[#77706D] hover:text-[#302D2C] hover:bg-[#F8E5DE]"
                    }`}
                  >
                    {c.label.split(",")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory Filter Tabs */}
            {currentCategory.subcategories.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 pt-6">
                <span className="text-xs font-semibold text-[#77706D] mr-2">Filter By:</span>
                {subcategories.map((sub) => {
                  const isActive = activeSubcategory === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setActiveSubcategory(sub)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#302D2C] text-white"
                          : "bg-[#FDF3F0] text-[#77706D] hover:text-[#302D2C] border border-[#F0E6E1]"
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* CATEGORY 1: BRIDAL SERVICES (Packages with Inclusions)  */}
          {/* ======================================================== */}
          {activeCategoryId === "bridal-services" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {displayedServices.map((pkg) => {
                  const selected = isSelected(pkg.id);
                  const isRoyale = pkg.id === "royale-package";

                  return (
                    <div
                      key={pkg.id}
                      className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 border bg-white ${
                        selected
                          ? "border-[#E4AD91] ring-2 ring-[#E4AD91]/40 shadow-md"
                          : isRoyale
                          ? "border-[#E4AD91]/60 shadow-md"
                          : "border-[#F0E6E1] shadow-xs hover:border-[#E4AD91]/60"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E4AD91]">
                            Bridal Package
                          </span>
                          {selected && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <Check className="w-3 h-3" />
                              Selected
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif text-2xl font-bold text-[#302D2C] mb-2">
                          {pkg.name}
                        </h4>

                        {pkg.description && (
                          <p className="text-xs sm:text-sm text-[#77706D] mb-5 leading-relaxed">
                            {pkg.description}
                          </p>
                        )}

                        {/* Strikethrough Original & Discounted Price */}
                        <div className="p-4 rounded-2xl bg-[#FDF3F0] border border-[#F0E6E1] mb-6 space-y-1">
                          <div className="flex items-baseline justify-between text-xs text-[#77706D]">
                            <span>Original Price</span>
                            <span className="line-through">{pkg.originalPriceDisplay}</span>
                          </div>
                          <div className="flex items-baseline justify-between pt-1">
                            <span className="text-xs uppercase tracking-wider text-[#E4AD91] font-semibold">
                              Package Price
                            </span>
                            <span className="font-serif text-2xl font-bold text-[#302D2C]">
                              {pkg.priceDisplay}
                            </span>
                          </div>
                        </div>

                        {/* Included Services */}
                        <div className="space-y-2.5 mb-6">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#302D2C] block">
                            Included In Package:
                          </span>
                          <ul className="space-y-2">
                            {pkg.packageInclusions?.map((inc) => (
                              <li
                                key={inc}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#302D2C]/85"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#E4AD91] shrink-0 mt-0.5" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Select / Remove Button */}
                      <div className="pt-4 border-t border-[#F0E6E1]">
                        <button
                          type="button"
                          onClick={() => onToggleSelectService(pkg)}
                          className={`w-full py-3 px-5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            selected
                              ? "bg-[#302D2C] text-white hover:bg-[#1f1d1c]"
                              : "bg-[#E4AD91] hover:bg-[#d99c7d] text-white shadow-2xs"
                          }`}
                        >
                          {selected ? (
                            <>
                              <Trash2 className="w-4 h-4" />
                              <span>Remove from Selection</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Select Package</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F0E6E1] text-center max-w-2xl mx-auto">
                <p className="text-xs text-[#77706D] leading-relaxed">
                  Notice: Selecting a bridal package represents the complete package price. Included rituals are covered in the package and not billed individually.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CATEGORY 4: MAKEUP SERVICES (Bridal Groups & Party Glam) */}
          {/* ======================================================== */}
          {activeCategoryId === "makeup-services" && (
            <div className="space-y-10">
              {/* Bridal Makeup Occasions */}
              {(activeSubcategory === "All" || activeSubcategory === "Bridal Makeup") && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#302D2C]">
                      Bridal Makeup Packages
                    </h4>
                    <p className="text-xs sm:text-sm text-[#77706D] mt-1">
                      Choose between Mehendi / Nikkah / Engagement and Barat / Walima looks.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Group 1: Mehendi / Nikkah / Engagement */}
                    <div className="p-6 rounded-3xl bg-white border border-[#F0E6E1] space-y-4 shadow-xs">
                      <div className="pb-3 border-b border-[#F0E6E1]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#E4AD91]">
                          Occasion Group
                        </span>
                        <h5 className="font-serif text-xl font-bold text-[#302D2C]">
                          Mehendi / Nikkah / Engagement
                        </h5>
                      </div>

                      <div className="space-y-3">
                        {SALON_SERVICES_CATALOGUE.filter(
                          (s) => s.group === "Mehendi / Nikkah / Engagement"
                        ).map((item) => {
                          const selected = isSelected(item.id);
                          return (
                            <div
                              key={item.id}
                              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                selected
                                  ? "bg-[#FDF3F0] border-[#E4AD91] shadow-2xs"
                                  : "bg-[#FFFBF9] border-[#F0E6E1] hover:border-[#E4AD91]/70"
                              }`}
                            >
                              <div>
                                <h6 className="font-serif text-lg font-semibold text-[#302D2C]">
                                  {item.name}
                                </h6>
                                <p className="text-xs text-[#77706D] mt-0.5">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                                <span className="font-serif text-xl font-bold text-[#302D2C]">
                                  {item.priceDisplay}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onToggleSelectService(item)}
                                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                    selected
                                      ? "bg-[#302D2C] text-white"
                                      : "bg-[#E4AD91] hover:bg-[#d99c7d] text-white"
                                  }`}
                                >
                                  {selected ? "Selected" : "Select Service"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Group 2: Barat / Walima */}
                    <div className="p-6 rounded-3xl bg-white border border-[#F0E6E1] space-y-4 shadow-xs">
                      <div className="pb-3 border-b border-[#F0E6E1]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#E4AD91]">
                          Occasion Group
                        </span>
                        <h5 className="font-serif text-xl font-bold text-[#302D2C]">
                          Barat / Walima
                        </h5>
                      </div>

                      <div className="space-y-3">
                        {SALON_SERVICES_CATALOGUE.filter(
                          (s) => s.group === "Barat / Walima"
                        ).map((item) => {
                          const selected = isSelected(item.id);
                          return (
                            <div
                              key={item.id}
                              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                selected
                                  ? "bg-[#FDF3F0] border-[#E4AD91] shadow-2xs"
                                  : "bg-[#FFFBF9] border-[#F0E6E1] hover:border-[#E4AD91]/70"
                              }`}
                            >
                              <div>
                                <h6 className="font-serif text-lg font-semibold text-[#302D2C]">
                                  {item.name}
                                </h6>
                                <p className="text-xs text-[#77706D] mt-0.5">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                                <span className="font-serif text-xl font-bold text-[#302D2C]">
                                  {item.priceDisplay}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onToggleSelectService(item)}
                                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                    selected
                                      ? "bg-[#302D2C] text-white"
                                      : "bg-[#E4AD91] hover:bg-[#d99c7d] text-white"
                                  }`}
                                >
                                  {selected ? "Selected" : "Select Service"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Party Makeup Subcategory */}
              {(activeSubcategory === "All" || activeSubcategory === "Party Makeup") && (
                <div className="space-y-6 pt-6 border-t border-[#F0E6E1]">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#302D2C]">
                      Party Makeup
                    </h4>
                    <p className="text-xs sm:text-sm text-[#77706D] mt-1">
                      Event glam, soft looks, kid makeup, and dubatta setting.
                    </p>
                  </div>

                  {/* 3 Prominent Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-[#F0E6E1] text-xs text-[#77706D] leading-relaxed">
                      <span className="font-semibold text-[#302D2C] block mb-1">
                        Inclusions Note:
                      </span>
                      &ldquo;Party makeup packages include lashes, nail paint on hands, and hairstyling only.&rdquo;
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#F0E6E1] text-xs text-[#77706D] leading-relaxed">
                      <span className="font-semibold text-[#302D2C] block mb-1">
                        Soft Makeup Policy:
                      </span>
                      &ldquo;Soft makeup does not include a heavy hairdo, smokey eyes, or glittery eyes.&rdquo;
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-[#F0E6E1] text-xs text-[#77706D] leading-relaxed">
                      <span className="font-semibold text-[#302D2C] block mb-1">
                        Kids Makeup Policy:
                      </span>
                      &ldquo;Kids makeup includes an open hairdo.&rdquo;
                    </div>
                  </div>

                  {/* Party Makeup Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SALON_SERVICES_CATALOGUE.filter(
                      (s) => s.subcategory === "Party Makeup"
                    ).map((item) => {
                      const selected = isSelected(item.id);
                      return (
                        <div
                          key={item.id}
                          className={`p-6 rounded-2xl border transition-all flex flex-col justify-between bg-white ${
                            selected
                              ? "border-[#E4AD91] ring-2 ring-[#E4AD91]/40 shadow-xs"
                              : "border-[#F0E6E1] hover:border-[#E4AD91]/60 shadow-2xs"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E4AD91]">
                                Party Glam
                              </span>
                              {selected && (
                                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  Selected
                                </span>
                              )}
                            </div>
                            <h5 className="font-serif text-xl font-bold text-[#302D2C] mb-1.5">
                              {item.name}
                            </h5>
                            {item.description && (
                              <p className="text-xs text-[#77706D] leading-relaxed mb-4">
                                {item.description}
                              </p>
                            )}

                            {item.packageInclusions && (
                              <div className="mb-4 pt-2 border-t border-[#F0E6E1]/60">
                                <span className="text-[11px] font-medium text-[#77706D] uppercase tracking-wider block mb-1">
                                  Includes:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.packageInclusions.map((inc) => (
                                    <span
                                      key={inc}
                                      className="text-[11px] bg-[#FDF3F0] text-[#302D2C] px-2 py-0.5 rounded-md"
                                    >
                                      {inc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-4 border-t border-[#F0E6E1]/60 flex items-center justify-between">
                            <span className="font-serif text-xl font-bold text-[#302D2C]">
                              {item.priceDisplay}
                            </span>
                            <button
                              type="button"
                              onClick={() => onToggleSelectService(item)}
                              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                selected
                                  ? "bg-[#302D2C] text-white"
                                  : "bg-[#E4AD91] hover:bg-[#d99c7d] text-white"
                              }`}
                            >
                              {selected ? "Selected" : "Select Service"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* CATEGORIES 2, 3, 5: Flat Rates & Length-Based Options    */}
          {/* ======================================================== */}
          {activeCategoryId !== "bridal-services" &&
            activeCategoryId !== "makeup-services" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedServices.map((service) => {
                    return (
                      <div
                        key={service.id}
                        className="p-6 rounded-2xl bg-white border border-[#F0E6E1] hover:border-[#E4AD91]/60 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E4AD91]">
                              {service.subcategory}
                            </span>
                          </div>

                          <h4 className="font-serif text-xl font-bold text-[#302D2C] mb-2">
                            {service.name}
                          </h4>

                          {service.description && (
                            <p className="text-xs text-[#77706D] leading-relaxed mb-4">
                              {service.description}
                            </p>
                          )}

                          {service.packageInclusions && (
                            <div className="mb-4">
                              <span className="text-[11px] font-medium text-[#77706D] uppercase tracking-wider block mb-1">
                                Included Care:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {service.packageInclusions.map((inc) => (
                                  <span
                                    key={inc}
                                    className="text-[11px] bg-[#FDF3F0] text-[#302D2C] px-2.5 py-0.5 rounded-full"
                                  >
                                    {inc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Pricing section */}
                        <div className="pt-4 border-t border-[#F0E6E1]/60">
                          {/* Case A: Hair Length Options */}
                          {service.hasLengthOptions && service.lengthPrices ? (
                            <div className="space-y-2">
                              <span className="text-[11px] font-medium text-[#77706D] uppercase tracking-wider block">
                                Select Hair Length:
                              </span>

                              <div className="space-y-1.5">
                                {service.lengthPrices.map((lp) => {
                                  const variantSelected = isSelected(service.id, lp.length);
                                  return (
                                    <div
                                      key={lp.length}
                                      className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                                        variantSelected
                                          ? "bg-[#FDF3F0] border-[#E4AD91] shadow-2xs"
                                          : "bg-[#FFFBF9] border-[#F0E6E1] hover:bg-[#FDF3F0]/60"
                                      }`}
                                    >
                                      <span className="font-medium text-[#302D2C]">
                                        {lp.length}
                                      </span>

                                      <div className="flex items-center gap-2">
                                        <span className="font-serif font-bold text-[#302D2C]">
                                          {lp.priceDisplay}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            onToggleSelectService(service, lp.length)
                                          }
                                          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                                            variantSelected
                                              ? "bg-[#302D2C] text-white"
                                              : "bg-[#E4AD91] hover:bg-[#d99c7d] text-white"
                                          }`}
                                        >
                                          {variantSelected ? "Selected" : "Select"}
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            /* Case B: Standard Flat Price */
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-[#77706D] block font-medium">
                                  Confirmed Price
                                </span>
                                <span className="font-serif text-2xl font-bold text-[#302D2C]">
                                  {service.priceDisplay}
                                </span>
                              </div>

                              {(() => {
                                const selected = isSelected(service.id);
                                return (
                                  <button
                                    type="button"
                                    onClick={() => onToggleSelectService(service)}
                                    className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                      selected
                                        ? "bg-[#302D2C] text-white"
                                        : "bg-[#E4AD91] hover:bg-[#d99c7d] text-white"
                                    }`}
                                  >
                                    {selected ? "Selected" : "Select Service"}
                                  </button>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>

        {/* Bottom Review & Book Action when items are selected */}
        {selectedServices.length > 0 && (
          <div className="p-6 rounded-3xl bg-white border border-[#E4AD91] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#302D2C]">
                {selectedServices.length} {selectedServices.length === 1 ? "treatment" : "treatments"} selected for your appointment.
              </p>
              <p className="text-xs text-[#77706D] mt-0.5">
                Ready to review and submit your request via WhatsApp?
              </p>
            </div>
            <button
              type="button"
              onClick={onProceedToBooking}
              className="px-7 py-3 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-xs sm:text-sm font-medium rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Review &amp; Book Appointment
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
