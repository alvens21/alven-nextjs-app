"use client";

import { projects } from "@/data/projects";
import { useState, useEffect } from "react";

export default function Home() {
  const fullText = "Alven Oblefias";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  // Dagdag na state para sa cursor blink
  const [blink, setBlink] = useState(true);

  // Effect para sa cursor blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Logic para sa pag-type
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === fullText) {
          // Pause ng 2 seconds bago mag-delete
          setTypingSpeed(2000); 
          setIsDeleting(true);
        }
      } else {
        // Logic para sa pag-delete
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(75);

        if (displayText === "") {
          setIsDeleting(false);
          setTypingSpeed(500); // Pause bago mag-type ulit
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed]);

  return (
    <main className="scroll-smooth">
      
      {/* HOME SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="flex flex-col justify-center">
            <h6 className="text-base md:text-lg text-white font-bold text-gray-600 mb-2">
              Hey, I'm
            </h6>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 min-h-[1.2em]">
              <span className="text-white">
                {/* Dito binago natin para gamitin ang displayText */}
                {displayText}
              </span>
              <span className={`${blink ? "opacity-100" : "opacity-0"} ml-1`}>
                |
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-lg text-white leading-relaxed">
              From concept to creation — building websites that are not only functional, 
              but beautifully crafted.
            </p>
          </div>

          <div className="hidden lg:flex justify-center">
             {/* Placeholder for future image */}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50 text-black px-6">
        <h2 className="text-4xl font-bold">About Us</h2>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="p-8 border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white text-black group"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-blue-50 text-blue-600 text-xs md:text-sm px-4 py-1.5 rounded-full font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-50 text-black px-6">
        <h2 className="text-4xl font-bold">Contact Us</h2>
      </section>

    </main>
  );
}