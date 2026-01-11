"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  // Listahan ng links para sa loop
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Our Projects", href: "#projects" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isOpen 
          ? "bg-black py-6 text-white" 
          : isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border-b text-black py-4"
            : "bg-transparent text-white py-6"
      }`}
    >
      <nav className="max-w-[85%] mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          className="font-extrabold text-3xl tracking-[0.2em] transition-all duration-500 uppercase z-[60]"
          style={{
            background: (isScrolled && !isOpen) ? "none" : "linear-gradient(to right, #ffffff, #9ca3af)", 
            WebkitBackgroundClip: (isScrolled && !isOpen) ? "none" : "text",
            color: (isScrolled && !isOpen) ? "black" : (isOpen ? "white" : "transparent"),
            filter: (isScrolled && !isOpen) ? "none" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
            WebkitTextStroke: (isScrolled && !isOpen) ? "none" : "0.5px rgba(255, 255, 255, 0.5)"
          }}
        >
          Alven
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex gap-12 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-500 font-bold transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* HAMBURGER BUTTON */}
        <button className="lg:hidden z-[60] p-2" onClick={toggleMenu}>
          {isOpen ? <X size={32} color="white" /> : <Menu size={32} color={isScrolled ? "black" : "white"} />}
        </button>

        {/* MOBILE OVERLAY MENU */}
        <div 
          className={`fixed inset-0 bg-black transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col items-center justify-center gap-8 lg:hidden z-[55] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={closeMenu}
              className={`text-[20px] text-3xl text-white font-bold hover:text-blue-500 transition-all duration-500 uppercase tracking-[0.3em] ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ 
                // Ito ang magic: staggered delay base sa index ng link
                transitionDelay: isOpen ? `${(index + 1) * 100}ms` : "0ms" 
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}