import React from "react";
import { BUSINESS_INFO } from "../config/business";
import { Instagram, Facebook } from "lucide-react";

export const Footer: React.FC = () => {
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "What We Do", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white text-[#77706D] py-10 border-t border-[#F0E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        {/* Brand Name & Short Note */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F0E6E1] bg-white p-0.5">
              <img
                src={BUSINESS_INFO.logoPath}
                alt="Royale Makeover Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#302D2C]">
              Royale <span className="font-normal text-[#E4AD91]">Makeover</span>
            </span>
          </div>
          <p className="text-xs text-[#77706D] max-w-md mx-auto">
            Bhagowal Road, Opposite Sialkot Model School, Nekapura, Sialkot, Punjab, Pakistan
          </p>
        </div>

        {/* Minimal Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#77706D]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-[#302D2C] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#FDF3F0] hover:bg-[#F8E5DE] text-[#302D2C] transition-colors"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={BUSINESS_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#FDF3F0] hover:bg-[#F8E5DE] text-[#302D2C] transition-colors"
            aria-label="Facebook Page"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright notice matching reference screenshot style */}
        <div className="pt-2 text-xs text-[#77706D]/80 border-t border-[#F0E6E1]/60">
          <p>&copy; {new Date().getFullYear()} Royale Makeover | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
