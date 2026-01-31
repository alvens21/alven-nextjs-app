"use client";

import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const fullText = "Alven Oblefias";
  
  // MGA HOOKS (Dapat nasa loob ng function body)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [blink, setBlink] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typing logic
  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === fullText) {
          setTypingSpeed(2000); // Pause sa dulo
          setIsDeleting(true);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(75);

        if (displayText === "") {
          setIsDeleting(false);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed]);

  return (
    <main className="scroll-smooth">
      
      {/* HOME SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h6 className="text-500 text-lg font-bold mb-2 tracking-widest uppercase">
              Hey, I'm
            </h6>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 min-h-[1.2em]">
              <span className="text-white">
                {displayText}
              </span>
              <span className={`${blink ? "opacity-100" : "opacity-0"} text-gray-700 ml-1`}>
                |
              </span>
            </h1>
            <p className="text-lg md:text-xl text-400 max-w-lg leading-relaxed mb-8">
              From concept to creation — building websites that are not only functional, 
              but beautifully crafted.
            </p>
            <div className="flex gap-[20px] flex-wrap">
              <a 
                href="#projects" 
                className="bg-gray-600 hover:bg-gray-700 text-blue px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-gray-600/20"
              >
                View My Work
              </a>
              <a href="/images/cv.pdf" download="Alven Oblefias CV.pdf" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20">Download CV</a>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] group">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src="/images/alven.png" // Siguraduhing may profile.png sa public folder
                  alt="Alven Oblefias"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
        <p className="max-w-2xl text-center text-lg">
          I am a passionate developer focused on creating clean, responsive, and user-friendly applications. 
          With an eye for detail and a love for modern technologies.
        </p>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              // Dynamic background gamit ang inline style para sa hover color
              style={{ 
                backgroundColor: hoveredIndex === idx ? project.hoverColor : "rgba(255, 255, 255, 0.05)" 
              }}
              className="p-8 border border-white/10 rounded-3xl transition-all duration-300 group"
            >
              {project.image && (
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl bg-black/20">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3 transition-colors text-white">
                {project.title}
              </h3>
              <p className="text-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              <p className="text-400 mb-6 leading-relaxed">
                <a href={project.url_link} target="_blank" rel="noopener noreferrer" className="text-500 hover:underline break-all">{project.url_link}</a>
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-blue-600/10 text-blue-400 text-xs md:text-sm px-4 py-1.5 rounded-full border border-blue-600/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black/70 to-transparent z-50 pointer-events-none" />
        
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl text-900 md:text-5xl font-bold mb-6">Get in touch with us</h2>
            <ul className="contact-details flex flex-col gap-[20px]">
              <li className="phone text-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-phone text-[32px] text-700 w-[32px]"></i>
                <a href="tel:09279840471" className="text-500">+63927-984-0471</a>
              </li>
              <li className="email text-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-envelope text-[32px] text-700 w-[32px]"></i>
                <a href="mailto:oblefiasalven@gmail.com" className="text-500">oblefiasalven@gmail.com</a>
              </li>
              <li className="address text-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-location-dot text-[32px] text-700 w-[32px]"></i>
                City of San Jose Del Monte, Bulacan, Philippines
              </li>
            </ul>
            
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm w-full shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-400 font-bold ml-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Juan Dela Cruz"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-400 font-bold ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="juan@example.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-400 font-bold ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-[#000] py-[10px] px-0">
        <div>
          <p>© 2026 Alven Oblefias. All rights reserved.</p>
        </div>
      </section>
    </main>
  );
}