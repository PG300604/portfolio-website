import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { data: projects, loading, error } = useGitHubData('projects.json');
  const { data: visibility } = useGitHubData('visibility.json');
  const [selectedProject, setSelectedProject] = useState(null);

  if (visibility && !visibility.projects) return null;

  return (
    <section id="projects" className="py-24 bg-transparent relative z-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="SELECTED_WORKS" title="Projects" />

        {loading && (
          <div className="text-[#8fa3c0] font-mono text-sm py-12 border-2 border-dashed border-[#1e2d4a] text-center">
            Fetching project data...
          </div>
        )}

        {error && (
          <div className="bg-[#2a0f0f] border-2 border-[#e55353] p-6 text-[#e55353] font-mono text-sm">
            Error loading projects: {error.message}
          </div>
        )}

        {projects && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(p => p.visible).map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
