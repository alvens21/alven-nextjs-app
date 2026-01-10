import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="scroll-smooth">
      
      {/* HOME */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold">Hi, I'm Alven 👋</h1>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <h2 className="text-4xl font-bold">About Us</h2>
      </section>

      {/* PROJECTS SECTION (Dynamic) */}
      <section id="projects" className="min-h-screen py-20 px-5 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-12">Our Projects</h2>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all bg-white text-black"
            >
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full font-medium"
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
      <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <h2 className="text-4xl font-bold">Contact Us</h2>
      </section>

    </main>
  );
}