"use client";

import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  const fullText = "Alven Oblefias";
  
  // MGA HOOKS
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
          setTypingSpeed(2000);
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
    <main className="scroll-smooth bg-black text-white">
      
      {/* HOME SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h6 className="text-blue-500 text-lg font-bold mb-2 tracking-widest uppercase">
              Hey, I'm
            </h6>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 min-h-[1.2em]">
              <span className="text-white">{displayText}</span>
              <span className={`${blink ? "opacity-100" : "opacity-0"} text-gray-700 ml-1`}>|</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed mb-8">
              From concept to creation — building websites that are not only functional, but beautifully crafted.
            </p>
            <div className="flex gap-[20px] flex-wrap">
              <a href="#projects" className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg">
                View My Work
              </a>
              <a href="/images/cv.pdf" download="Alven_Oblefias_CV.pdf" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg">
                Download CV
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] group">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image src="/images/alven.png" alt="Alven Oblefias" fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
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
        
        {/* Container na may sapat na padding para sa arrows */}
        <div className="max-w-6xl w-full px-4 md:px-12 relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            className="project-swiper !static pb-14"
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div 
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ 
                    backgroundColor: hoveredIndex === idx ? project.hoverColor : "rgba(255, 255, 255, 0.05)" 
                  }}
                  className="p-8 border border-white/10 rounded-3xl transition-all duration-300 group h-full flex flex-col"
                >
                  {project.image && (
                    <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl bg-black/20">
                      <img src={project.image} alt={project.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                  <p className="mb-6 mt-auto">
                    <a href={project.url_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all text-sm">
                      {project.url_link}
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="bg-blue-600/10 text-blue-400 text-xs px-4 py-1.5 rounded-full border border-blue-600/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .project-swiper .swiper-button-next {
            right: -20px !important;
            color: #3b82f6 !important;
          }
          .project-swiper .swiper-button-prev {
            left: -20px !important;
            color: #3b82f6 !important;
          }
          @media (max-width: 768px) {
            .project-swiper .swiper-button-next, .project-swiper .swiper-button-prev {
              display: none;
            }
          }
          .swiper-pagination-bullet { background: #4b5563 !important; }
          .swiper-pagination-bullet-active { background: #3b82f6 !important; }

          .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
              display: none;
          }

          @media(max-width: 980px) {
              .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
                  display: block;
              }

              .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
                  bottom: -45px;
              }
          }

          .swiper-wrapper {
            display: flex !important;
          }

          .swiper-slide {
            height: auto !important; /* Pinipilit ang slide na mag-stretch */
          }
        `}</style>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-gray-900 py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl text-white md:text-5xl font-bold mb-6">Get in touch with us</h2>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-gray-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-phone text-[32px] text-gray-600 w-[32px]"></i>
                <a href="tel:09279840471" className="hover:text-blue-500 transition-colors">+63927-984-0471</a>
              </li>
              <li className="text-gray-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-envelope text-[32px] text-gray-600 w-[32px]"></i>
                <a href="mailto:oblefiasalven@gmail.com" className="hover:text-blue-500 transition-colors">oblefiasalven@gmail.com</a>
              </li>
              <li className="text-gray-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-location-dot text-[32px] text-gray-600 w-[32px]"></i>
                City of San Jose Del Monte, Bulacan, Philippines
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Your Name</label>
                  <input type="text" placeholder="Juan Dela Cruz" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email Address</label>
                  <input type="email" placeholder="juan@example.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Message</label>
                <textarea rows={4} placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center bg-black py-10">
        <p className="text-gray-500">© 2026 Alven Oblefias. All rights reserved.</p>
      </footer>
    </main>
  );
}