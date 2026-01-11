"use client";

import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const fullText = "Alven Oblefias";
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
            <div>
              <a 
                href="#projects" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20"
              >
                View My Work
              </a>
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
      <section id="about" className="min-h-screen flex flex-col items-center justify-center bg-[#fff] px-6">
        <h2 className="text-4xl text-gray-900 md:text-5xl font-bold mb-8">About Me</h2>
        <p className="max-w-2xl text-center text-gray-700 text-lg">
          I am a passionate developer focused on creating clean, responsive, and user-friendly applications. 
          With an eye for detail and a love for modern technologies.
        </p>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
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
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-[#fff] px-6">
        <h2 className="text-4xl text-gray-900 md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-gray-700 mb-8">Have a project in mind? Let's build something great together.</p>
        <a 
          href="mailto:your@email.com" 
          className="text-2xl md:text-3xl font-bold text-gray-400 hover:underline"
        >
          alvenoblefias@example.com
        </a>
      </section>
      <section className="flex flex-col items-center justify-center bg-[#0a0a0a] py-[10px] px-0">
        <div>
          <p>© 2026 Alven Oblefias. All rights reserved.</p>
        </div>
      </section>
    </main>
  );
}