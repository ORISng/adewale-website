import { useState } from "react";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Impact", href: "#impact" },
    { label: "Programme", href: "#programme" },
    { label: "Dates", href: "#dates" },
    { label: "Founder", href: "#founder" },
    { label: "Register", href: "#register" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-12 h-18 bg-[#0A0F1E] border-b-2 border-[#E8A020]">
        <a href="#" className="font-bebas text-xl md:text-2xl text-white tracking-widest">
          ASC <span className="text-[#E8A020]">2026</span>
        </a>

        <ul className="hidden md:flex gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs md:text-sm font-medium tracking-widest uppercase text-[#F0EAD8] hover:text-[#E8A020] transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#partner"
              className="text-xs md:text-sm font-bold tracking-widest uppercase bg-[#E8A020] text-[#0A0F1E] px-5 py-2 hover:bg-[#F5C55A] transition-colors duration-200"
            >
              Partner With Us
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 w-6 h-6"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-full h-0.5 bg-white transition-transform duration-300"></span>
          <span className="w-full h-0.5 bg-white transition-transform duration-300"></span>
          <span className="w-full h-0.5 bg-white transition-transform duration-300"></span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <MobileMenu
          links={navLinks}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
