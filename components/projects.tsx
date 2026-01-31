import Image from 'next/image';
import { projects } from '../data/projects'; // I-import ang data mo

export default function ProjectList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <div key={index} className="border p-4 rounded-xl">
          {/* Dito natin ilalagay ang image */}
          <div className="relative w-full h-48 mb-4">
            <Image
              src={project.image}
              alt={project.title}
              fill // Mapupuno nito ang parent div
              className="object-cover rounded-lg"
            />
          </div>
          <h2 className="text-xl font-bold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
          <div className="flex gap-2 mt-2">
            {project.tech.map((t) => (
              <span key={t} className="bg-blue-100 px-2 py-1 text-xs rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}