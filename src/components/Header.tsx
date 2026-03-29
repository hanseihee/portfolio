"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const toggleLanguage = () => {
    setLocale(locale === "ko" ? "en" : "ko");
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-primary/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      } rounded-2xl`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200 cursor-pointer"
        >
          Portfolio
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-foreground/80 hover:text-accent transition-colors duration-200 cursor-pointer font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-accent transition-all duration-200 cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">{locale}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-accent transition-all duration-200 cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">{locale}</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-foreground/80 hover:text-accent hover:bg-secondary/50 transition-all duration-200 cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 pb-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={handleNavClick}
                className="block px-4 py-3 rounded-xl text-foreground/80 hover:text-accent hover:bg-secondary/30 transition-all duration-200 cursor-pointer font-medium"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
