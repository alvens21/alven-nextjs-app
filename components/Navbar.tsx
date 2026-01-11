"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // I-install ang lucide-react (npm install lucide-react)

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State para sa mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Isara ang menu kapag nag-click ng link
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b text-black py-4"
          : "bg-transparent text-white py-6"
      }`}
    >
      <nav className="max-w-[85%] mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          className="font-extrabold text-3xl tracking-[0.2em] transition-all duration-500 uppercase z-50"
          style={{
            background: isScrolled ? "none" : "linear-gradient(to right, #ffffff, #9ca3af)", 
            WebkitBackgroundClip: isScrolled ? "none" : "text",
            color: isScrolled ? "black" : (isOpen ? "white" : "transparent"),
            filter: isScrolled ? "none" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
            WebkitTextStroke: isScrolled ? "none" : "0.5px rgba(255, 255, 255, 0.5)"
          }}
        >
          Alven
        </div>

        {/* DESKTOP LINKS (Hidden on Tablet/Mobile) */}
        <div className="hidden lg:flex gap-12 items-center">
          <Link href="/" className="hover:text-gray-500 font-bold transition-colors">Home</Link>
          <Link href="#about" className="hover:text-gray-500 transition-colors">About Us</Link>
          <Link href="#projects" className="hover:text-gray-500 transition-colors">Our Projects</Link>
          <Link href="#contact" className="hover:text-gray-500 transition-colors">Contact Us</Link>
        </div>

        {/* HAMBURGER BUTTON (Visible on Tablet/Mobile) */}
        <button 
          className="lg:hidden z-50 p-2" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} color={isScrolled ? "black" : "white"} />}
        </button>

        {/* MOBILE OVERLAY MENU */}
        <div 
          className={`fixed inset-0 bg-black/95 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link href="/" onClick={toggleMenu} className="text-2xl text-white font-bold hover:text-blue-500">Home</Link>
          <Link href="#about" onClick={toggleMenu} className="text-2xl text-white font-bold hover:text-blue-500">About Us</Link>
          <Link href="#projects" onClick={toggleMenu} className="text-2xl text-white font-bold hover:text-blue-500">Our Projects</Link>
          <Link href="#contact" onClick={toggleMenu} className="text-2xl text-white font-bold hover:text-blue-500">Contact Us</Link>
        </div>
      </nav>
    </header>
  );
}