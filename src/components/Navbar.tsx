import React, { useState, useEffect } from "react";
import { BUSINESS_INFO } from "../config/business";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "What We Do", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#F0E6E1] py-3"
          : "bg-white py-4 border-b border-[#F0E6E1]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91] rounded-lg p-0.5"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#F0E6E1] shadow-2xs bg-white shrink-0 transition-transform group-hover:scale-105">
              <img
                src={BUSINESS_INFO.logoPath}
                alt="Royale Makeover Logo"
                className="w-full h-full object-contain p-0.5"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/aistudio/image_52fc615f.png";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#302D2C] group-hover:text-[#DFA58B] transition-colors leading-tight">
                Royale <span className="font-normal text-[#E4AD91]">Makeover</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-[#77706D] hover:text-[#302D2C] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91] rounded-sm"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 py-2.5 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-sm font-medium rounded-full shadow-2xs hover:shadow-xs transition-all active:scale-98 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91]"
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onBookClick}
              className="px-3.5 py-1.5 bg-[#E4AD91] text-white text-xs font-medium rounded-full"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#302D2C] hover:bg-[#FDF3F0] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E4AD91]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#F0E6E1] shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#302D2C] hover:bg-[#FDF3F0] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#F0E6E1]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 bg-[#E4AD91] hover:bg-[#d99c7d] text-white text-sm font-medium rounded-full shadow-2xs transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
