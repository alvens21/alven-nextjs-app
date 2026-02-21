"use client";

import { projects } from "@/data/projects";
import { useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const contactSchema = z.object({
  name: z.string().min(1, { message: "This field is required." }),
  email: z.string().email({ message: "This field is required." }),
  message: z.string().optional(),
});

export default function Home() {
  const fullText = "Alven Oblefias";
  
  // MGA HOOKS
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [blink, setBlink] = useState(true);
  
  // State para sa form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // FORM SUBMISSION LOGIC
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    const submissionData = {
      ...data,
      access_key: "4e1acccc-1445-4de5-a93b-3af0000030f9",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Success! Your message has been sent.");
        reset(); // Lilinisin ang form fields
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="scroll-smooth bg-black text-white">
      
      {/* HOME SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h6 className="text-500 text-lg font-bold mb-2 tracking-widest uppercase">
              Hey, I'm
            </h6>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 min-h-[1.2em]">
              <span className="text-white">{displayText}</span>
              <span className={`${blink ? "opacity-100" : "opacity-0"} text-gray-700 ml-1`}>|</span>
            </h1>
            <p className="text-lg md:text-xl text-400 max-w-lg leading-relaxed mb-8">
              From concept to creation — building websites that are not only functional, but beautifully crafted.
            </p>
            <div className="flex gap-[20px] flex-wrap">
              <a href="#projects" className="bg-gray-700 hover:bg-white hover:text-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg transition-all duration-[400ms] ease-in-out">
                View My Work
              </a>
              <a href="/#contact" className="bg-white hover:bg-gray-700 hover:text-white text-gray-700 px-8 py-3 rounded-full font-semibold transition-all shadow-lg transition-all duration-[400ms] ease-in-out">
                Contact Us
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
      <section id="about" className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="relative inline-block">
                <img 
                  src="/images/alven-side.png" 
                  alt="Profile" 
                  className="rounded-2xl w-full max-w-sm shadow-2xl border-2 border-500/30"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#242D34] p-4 rounded-lg hidden md:block">
                  <p className="font-bold text-2xl">5+ Years</p>
                  <p className="text-sm">Experience</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-400">Core Stack</h3>
                {[
                  { name: "HTML/CSS/JS", width: "95%" },
                  { name: "PHP", width: "85%" },
                  { name: "WordPress & Elementor", width: "98%" },
                  { name: "Divi & WP-Bakery", width: "90%" },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.width}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-[#fff] h-2.5 rounded-full" 
                        style={{ width: skill.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                About Me
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                I am a passionate developer focused on creating clean, responsive, and 
                user-friendly applications. I don't just build websites; I make sure 
                they perform at their peak.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-gray-800 rounded-xl hover:border-blue-500 border border-transparent transition">
                  <h4 className="font-bold text-400 mb-2">🚀 SEO & Speed</h4>
                  <p className="text-sm text-400">Google Core Web Vitals optimization and on-page SEO strategy.</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-xl hover:border-blue-500 border border-transparent transition">
                  <h4 className="font-bold text-400 mb-2">🛠 Troubleshooting</h4>
                  <p className="text-sm text-400">Expert at fixing plugin conflicts and theme-specific bugs.</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-xl hover:border-blue-500 border border-transparent transition">
                  <h4 className="font-bold text-400 mb-2">⚙️ Server Fixes</h4>
                  <p className="text-sm text-400">Resolving 500 errors, database issues, and hosting migrations.</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-xl hover:border-blue-500 border border-transparent transition">
                  <h4 className="font-bold text-400 mb-2">🎨 Page Builders</h4>
                  <p className="text-sm text-400">Custom dynamic layouts using Elementor, Divi, and WP-Bakery.</p>
                </div>
              </div>

              <a href="/images/cv.pdf" download="Alven_Oblefias_CV.pdf" className="bg-white hover:bg-gray-700 hover:text-white text-gray-700 px-8 py-3 rounded-full font-semibold transition-all shadow-lg transition-all duration-[400ms] ease-in-out">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">Featured Projects</h2>
        <div className="max-w-6xl w-full md:px-12 relative group">
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
                  <p className="text-400 mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                  <p className="mb-6 mt-auto">
                    <a href={project.url_link} target="_blank" rel="noopener noreferrer" className="text-white hover:underline break-all text-sm">
                      {project.url_link}
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="bg-white-600/10 text-400 text-xs px-4 py-1.5 rounded-full border border-white-600/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .project-swiper .swiper-button-next { right: -20px !important; color: #fff !important; }
          .project-swiper .swiper-button-prev { left: -20px !important; color: #fff !important; }
          @media (max-width: 768px) {
            .project-swiper .swiper-button-next, .project-swiper .swiper-button-prev { display: none; }
          }
          .swiper-pagination-bullet { background: #4b5563 !important; }
          .swiper-pagination-bullet-active { background: #3b82f6 !important; }
          .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal { display: none; }
          @media(max-width: 980px) {
              .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal { display: block; bottom: -45px; }
          }
          .swiper-wrapper { display: flex !important; }
          .swiper-slide { height: auto !important; }
        `}</style>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-gray-900 py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl text-white md:text-5xl font-bold mb-6">Get in touch with us</h2>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-phone text-[32px] text-600 w-[32px]"></i>
                <a href="tel:09279840471" className="hover:text-blue-500 transition-colors">+63927-984-0471</a>
              </li>
              <li className="text-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-envelope text-[32px] text-600 w-[32px]"></i>
                <a href="mailto:oblefiasalven@gmail.com" className="hover:text-blue-500 transition-colors">oblefiasalven@gmail.com</a>
              </li>
              <li className="text-400 font-medium flex items-center gap-[30px]">
                <i className="fa-solid fa-location-dot text-[32px] text-600 w-[32px]"></i>
                City of San Jose Del Monte, Bulacan, Philippines
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Your Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Juan Dela Cruz"
                    className={`bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all`}
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="juan@example.com"
                    className={`bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all`}
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-bold">Message (Optional)</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-white' : 'bg-gray-700 hover:bg-white hover:text-gray-700 transition-all duration-[400ms] ease-in-out'} text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center justify-center bg-black py-4">
        <p className="text-500">© 2026 Alven Oblefias. All rights reserved.</p>
      </footer>
    </main>
  );
}