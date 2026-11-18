"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "How it works", href: "#how-it-works", id: "nav-link-how" },
  { label: "Mirror", href: "#mirror", id: "nav-link-mirror" },
  { label: "FAQ", href: "#faq", id: "nav-link-faq" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goWaitlist = () => {
    setOpen(false);
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#F6F8FA]/80 border-b border-[#0B1220]/[0.07] shadow-[0_1px_20px_rgba(11,18,32,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="wrap max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[68px]">
        <a href="#hero" data-testid="nav-logo" aria-label="Cooldown home">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-8" data-testid="nav-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.id}
              className="text-sm font-medium text-[#475569] hover:text-[#0B1220] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            data-testid="nav-cta-button"
            onClick={goWaitlist}
            className="btn-press bg-[#0B1220] hover:bg-[#1E293B] text-white text-sm font-medium px-5 h-11 md:h-10 rounded-full inline-flex items-center"
          >
            Join the waitlist
          </button>
          <button
            data-testid="nav-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-mobile-menu"
            onClick={() => setOpen(!open)}
            className="md:hidden w-11 h-11 inline-flex items-center justify-center text-[#0B1220]"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden backdrop-blur-xl bg-[#F6F8FA]/95 border-b border-[#0B1220]/[0.07] px-6 pb-6 pt-2 flex flex-col gap-1" data-testid="nav-mobile-menu" id="nav-mobile-menu">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-[#0B1220]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
