import React, { useState } from "react";
import { BUSINESS_INFO, isWhatsAppConfigured, buildWhatsAppUrl } from "../config/business";
import { SelectedServiceItem } from "../data/services";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Copy,
  ShieldAlert,
  Trash2,
  PlusCircle,
  MapPin,
  Check,
} from "lucide-react";

interface BookingFormProps {
  selectedServices: SelectedServiceItem[];
  onRemoveService: (selectionId: string) => void;
  onClearSelection: () => void;
  onNavigateToServices: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedServices,
  onRemoveService,
  onClearSelection,
  onNavigateToServices,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [testNumberInput, setTestNumberInput] = useState("");

  const todayDateString = new Date().toISOString().split("T")[0];

  const timeSlots = [
    "11:00 AM - 12:30 PM (Morning)",
    "01:00 PM - 02:30 PM (Early Afternoon)",
    "03:00 PM - 04:30 PM (Mid Afternoon)",
    "05:00 PM - 06:30 PM (Late Afternoon)",
    "07:00 PM - 08:30 PM (Evening)",
  ];

  // Construct structured WhatsApp message matching prompt requirements exactly
  const constructWhatsAppMessage = (): string => {
    let msg = "Hello Royale Makeover,\n\n";
    msg += "I would like to request an appointment for the following services:\n\n";

    const nonPackages = selectedServices.filter((s) => !s.isPackage);
    const packages = selectedServices.filter((s) => s.isPackage);

    if (nonPackages.length > 0) {
      nonPackages.forEach((item, index) => {
        msg += `${index + 1}. ${item.name}\n`;
        msg += `   Category: ${item.categoryName}\n`;
        if (item.selectedLength) {
          msg += `   Hair Length: ${item.selectedLength}\n`;
        }
        msg += `   Price: ${item.priceDisplay}\n\n`;
      });
    }

    if (packages.length > 0) {
      msg += "Selected Packages:\n";
      packages.forEach((pkg) => {
        msg += `- ${pkg.name} (${pkg.priceDisplay})\n`;
        if (pkg.packageInclusions && pkg.packageInclusions.length > 0) {
          msg += `  Includes: ${pkg.packageInclusions.join(", ")}\n`;
        }
      });
      msg += "\n";
    }

    if (customerName.trim()) {
      msg += `Customer Name: ${customerName.trim()}\n`;
    }
    if (phoneNumber.trim()) {
      msg += `Phone: ${phoneNumber.trim()}\n`;
    }
    if (preferredDate) {
      msg += `Preferred Date: ${preferredDate}\n`;
    }
    if (preferredTime) {
      msg += `Preferred Time: ${preferredTime}\n`;
    }
    if (notes.trim()) {
      msg += `Additional Message: ${notes.trim()}\n`;
    }

    msg += "\nPlease confirm availability and the final price. Thank you.";
    return msg;
  };

  const handleValidate = () => {
    const newErrors: { [key: string]: string } = {};

    if (selectedServices.length === 0) {
      newErrors.services = "Please select at least one service before booking.";
    }
    if (!customerName.trim()) {
      newErrors.customerName = "Please enter your name.";
    }
    if (!preferredDate) {
      newErrors.preferredDate = "Please choose a preferred appointment date.";
    }
    if (!preferredTime) {
      newErrors.preferredTime = "Please select a preferred time window.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidate()) {
      return;
    }

    const message = constructWhatsAppMessage();

    if (isWhatsAppConfigured()) {
      const url = buildWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setShowSetupModal(true);
    }
  };

  const handleCopyToClipboard = () => {
    const message = constructWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleTestSend = () => {
    const cleaned = testNumberInput.replace(/[^0-9]/g, "");
    if (!cleaned || cleaned.length < 9) {
      alert("Please enter a valid phone number with country code (e.g. 923001234567)");
      return;
    }
    const message = constructWhatsAppMessage();
    const url = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#FDF3F0] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Booking Layout Inspired by Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clean White Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E6E1] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#302D2C]">
                Book Appointment
              </h3>
              <p className="text-xs sm:text-sm text-[#77706D] mt-1">
                Fill in your details below to request your booking at Royale Makeover.
              </p>
            </div>

            {/* Selected Services Summary in Form */}
            <div className="p-4 rounded-2xl bg-[#FFFBF9] border border-[#F0E6E1] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#302D2C]">
                  Selected Services ({selectedServices.length})
                </span>
                {selectedServices.length > 0 ? (
                  <button
                    type="button"
                    onClick={onClearSelection}
                    className="text-[#77706D] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onNavigateToServices}
                    className="text-[#E4AD91] hover:text-[#302D2C] font-medium transition-colors cursor-pointer"
                  >
                    + Choose from Services
                  </button>
                )}
              </div>

              {errors.services && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.services}</span>
                </div>
              )}

              {selectedServices.length === 0 ? (
                <p className="text-xs text-[#77706D] italic py-2">
                  No services selected yet. Please pick your treatments from Our Services above.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedServices.map((item) => (
                    <div
                      key={item.selectionId}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#F0E6E1] text-xs"
                    >
                      <div className="truncate mr-2">
                        <span className="font-medium text-[#302D2C] block truncate">
                          {item.name}
                        </span>
                        {item.selectedLength && (
                          <span className="text-[11px] text-[#E4AD91]">
                            {item.selectedLength}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-serif font-bold text-xs text-[#302D2C]">
                          {item.priceDisplay}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveService(item.selectionId)}
                          className="text-[#77706D] hover:text-red-600 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors({ ...errors, customerName: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[#302D2C] bg-[#FFFBF9] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91] transition-all ${
                    errors.customerName ? "border-red-400 bg-red-50/20" : "border-[#F0E6E1] hover:border-[#E4AD91]"
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.customerName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#F0E6E1] hover:border-[#E4AD91] text-sm text-[#302D2C] bg-[#FFFBF9] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91]"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <input
                  type="date"
                  min={todayDateString}
                  value={preferredDate}
                  onChange={(e) => {
                    setPreferredDate(e.target.value);
                    if (errors.preferredDate) setErrors({ ...errors, preferredDate: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[#302D2C] bg-[#FFFBF9] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91] cursor-pointer ${
                    errors.preferredDate ? "border-red-400 bg-red-50/20" : "border-[#F0E6E1] hover:border-[#E4AD91]"
                  }`}
                />
                {errors.preferredDate && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              {/* Preferred Time Window */}
              <div>
                <select
                  value={preferredTime}
                  onChange={(e) => {
                    setPreferredTime(e.target.value);
                    if (errors.preferredTime) setErrors({ ...errors, preferredTime: "" });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-[#302D2C] bg-[#FFFBF9] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91] cursor-pointer ${
                    errors.preferredTime ? "border-red-400 bg-red-50/20" : "border-[#F0E6E1] hover:border-[#E4AD91]"
                  }`}
                >
                  <option value="">Select Preferred Time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.preferredTime}
                  </p>
                )}
              </div>

              {/* Extra Details / Notes */}
              <div>
                <textarea
                  rows={3}
                  placeholder="Extra Details (Optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#F0E6E1] hover:border-[#E4AD91] text-sm text-[#302D2C] bg-[#FFFBF9] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91]"
                />
              </div>

              {/* Submit Button (Peach pill button matching reference screenshot) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-sm font-medium rounded-full shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91]"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Charcoal Card Matching Reference Screenshot */}
          <div className="lg:col-span-5 bg-[#242221] text-white rounded-3xl p-6 sm:p-10 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#E4AD91]">
                  Our Packages
                </h4>
                <p className="text-xs text-white/70 mt-1">
                  Popular Royale Makeover bridal &amp; party packages.
                </p>
              </div>

              {/* Highlighted Package List Matching Reference Table Style */}
              <div className="space-y-3 border-y border-white/10 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/90">Silver Package</span>
                  <span className="font-serif font-bold text-white">Rs 10,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/90">Gold Package</span>
                  <span className="font-serif font-bold text-white">Rs 15,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/90">Royale Package</span>
                  <span className="font-serif font-bold text-white">Rs 17,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/90">Soft Glam Party</span>
                  <span className="font-serif font-bold text-white">Rs 5,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white/90">Signature Haircut</span>
                  <span className="font-serif font-bold text-white">Rs 3,500</span>
                </div>
              </div>

              {/* Verified Features */}
              <div className="space-y-2 text-xs text-white/80">
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E4AD91]" />
                  <span>Personalized consultation with each service</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E4AD91]" />
                  <span>Certified products &amp; hygienic salon care</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E4AD91]" />
                  <span>Nekapura, Sialkot, Punjab, Pakistan</span>
                </p>
              </div>
            </div>

            {/* Note & Action */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <p className="text-[11px] text-white/60 leading-relaxed italic">
                Booking requests sent via WhatsApp are confirmed directly by salon staff based on chair availability.
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 px-4 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer text-center block"
              >
                Book via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Setup Helper Modal */}
      {showSetupModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#302D2C]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Configuration Notice"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#F0E6E1] space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[#FDF3F0] text-[#DFA58B] shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#302D2C]">
                  WhatsApp Booking Setup
                </h4>
                <p className="text-xs text-[#77706D]">Royale Makeover Salon</p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-[#77706D] space-y-3 leading-relaxed">
              <p>
                WhatsApp booking is not configured yet. Please contact the salon directly.
              </p>
              <div className="p-3 bg-[#FFFBF9] rounded-xl border border-[#F0E6E1] font-mono text-xs text-[#302D2C]">
                <strong>Configuration Location:</strong><br />
                File: <span className="text-[#E4AD91]">src/config/business.ts</span><br />
                Setting: <span className="text-[#E4AD91]">whatsappNumber: &quot;92300XXXXXXX&quot;</span>
              </div>
              <p>
                You can copy the generated appointment request text to send manually, or test sending with a temporary number below.
              </p>
            </div>

            {/* Test Send Simulation */}
            <div className="pt-2 border-t border-[#F0E6E1] space-y-2">
              <label className="block text-xs font-semibold text-[#302D2C]">
                Test Send Right Now (Enter Test Number):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. 923001234567"
                  value={testNumberInput}
                  onChange={(e) => setTestNumberInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#F0E6E1] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E4AD91]"
                />
                <button
                  type="button"
                  onClick={handleTestSend}
                  className="px-4 py-2 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Test Send
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={handleCopyToClipboard}
                className="inline-flex items-center gap-1.5 text-xs text-[#E4AD91] font-medium hover:underline cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isCopied ? "Message Copied!" : "Copy Formatted Request"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSetupModal(false)}
                className="px-4 py-2 rounded-full bg-[#FFFBF9] text-[#302D2C] hover:bg-[#FDF3F0] text-xs font-medium transition-colors cursor-pointer border border-[#F0E6E1]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
