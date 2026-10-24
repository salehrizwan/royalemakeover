import React, { useState } from "react";
import { SelectedServiceItem } from "../data/services";
import {
  ShoppingBag,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
  Calendar,
  ArrowRight,
  Info,
} from "lucide-react";

interface BookingSummaryProps {
  selectedServices: SelectedServiceItem[];
  onRemoveService: (selectionId: string) => void;
  onClearSelection: () => void;
  onProceedToBooking: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedServices,
  onRemoveService,
  onClearSelection,
  onProceedToBooking,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if all selected services have exact numeric prices
  const allHaveFixedPrices =
    selectedServices.length > 0 &&
    selectedServices.every((s) => typeof s.numericPrice === "number");

  const subtotal = allHaveFixedPrices
    ? selectedServices.reduce((sum, s) => sum + (s.numericPrice || 0), 0)
    : null;

  const formatCurrency = (val: number) => {
    return `Rs ${val.toLocaleString("en-US")}`;
  };

  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Bar */}
      <aside
        aria-label="Current service selections summary"
        className="fixed bottom-0 left-0 right-0 z-30 pointer-events-auto"
      >
        <div className="max-w-4xl mx-auto px-4 pb-3 sm:pb-4">
          <div className="bg-[#242221] text-white rounded-2xl shadow-xl border border-white/10 p-3 sm:p-4 backdrop-blur-md transition-all">
            <div className="flex items-center justify-between gap-3">
              {/* Left: Toggle & Info */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 text-left focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91] rounded-lg p-1 cursor-pointer"
                aria-expanded={isOpen}
                aria-label="Toggle booking summary details"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E4AD91] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="absolute -top-1 -right-1 bg-white text-[#242221] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {selectedServices.length}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold tracking-wide">
                      {selectedServices.length}{" "}
                      {selectedServices.length === 1 ? "Service" : "Services"} Selected
                    </span>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#E4AD91]" />
                    ) : (
                      <ChevronUp className="w-3.5 h-3.5 text-[#E4AD91]" />
                    )}
                  </div>
                  <p className="text-[11px] text-white/70">
                    {subtotal !== null
                      ? `Estimated: ${formatCurrency(subtotal)}`
                      : "Final price to be confirmed by the salon"}
                  </p>
                </div>
              </button>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="hidden sm:inline-flex items-center px-3 py-2 text-xs font-medium text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  {isOpen ? "Hide List" : "View Details"}
                </button>

                <button
                  type="button"
                  onClick={onProceedToBooking}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-xs sm:text-sm font-medium shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Expanded Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#302D2C]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Selected Services Review"
        >
          <div
            className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#F0E6E1] max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#F0E6E1] flex items-center justify-between bg-white">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E4AD91]">
                  Review Selection
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#302D2C]">
                  Selected Services ({selectedServices.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClearSelection}
                  className="text-xs text-[#77706D] hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                >
                  Clear Selection
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-[#77706D] hover:bg-[#FDF3F0] hover:text-[#302D2C] transition-colors cursor-pointer"
                  aria-label="Close summary details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-[#FFFBF9]">
              {selectedServices.map((item) => (
                <div
                  key={item.selectionId}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#F0E6E1] flex items-start justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E4AD91]">
                        {item.categoryName}
                      </span>
                      {item.isPackage && (
                        <span className="text-[10px] bg-[#FDF3F0] text-[#302D2C] px-2 py-0.2 rounded-full font-medium">
                          Package
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#302D2C]">
                      {item.name}
                    </h4>

                    {item.selectedLength && (
                      <p className="text-xs text-[#77706D]">
                        Hair Length: <span className="font-medium text-[#302D2C]">{item.selectedLength}</span>
                      </p>
                    )}

                    {item.packageInclusions && item.packageInclusions.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[11px] text-[#77706D] uppercase tracking-wider block">
                          Included in package:
                        </span>
                        <p className="text-xs text-[#302D2C]/80">
                          {item.packageInclusions.join(" · ")}
                        </p>
                      </div>
                    )}

                    <div className="pt-1">
                      <span className="font-serif font-bold text-sm text-[#302D2C]">
                        Price: {item.priceDisplay}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveService(item.selectionId)}
                    className="p-2 text-[#77706D] hover:text-red-600 rounded-full hover:bg-[#FDF3F0] transition-colors cursor-pointer shrink-0"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 bg-white border-t border-[#F0E6E1] space-y-4">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#77706D]">
                  Total Quote Status:
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#302D2C]">
                  {subtotal !== null
                    ? formatCurrency(subtotal)
                    : "Final price to be confirmed by the salon"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#77706D]">
                <Info className="w-3.5 h-3.5 text-[#E4AD91] shrink-0" />
                <span>
                  Consultation and hair texture may impact final chemical treatment prices.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#F0E6E1] text-xs font-medium text-[#77706D] hover:text-[#302D2C] hover:bg-[#FFFBF9] transition-colors cursor-pointer"
                >
                  Continue Selecting
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onProceedToBooking();
                  }}
                  className="flex-1 py-3 px-6 rounded-full bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-sm font-medium shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
