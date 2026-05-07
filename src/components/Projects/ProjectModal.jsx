import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#060a14]/90 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Content */}
      <motion.div 
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0f1e] border-2 border-[#388bfd] border-t-4 border-t-[#4fcea6] overflow-y-auto z-10 flex flex-col"
      >
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl md:text-5xl font-sora font-extrabold text-[#f0f6ff]">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-[#8fa3c0] hover:text-[#e55353] font-mono text-xl p-2 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map(tech => (
              <span key={tech} className="text-[#79b8ff] border border-[#1A56DB] bg-transparent font-mono text-[11px] px-3 py-1.5 lowercase cursor-default">
                {tech}
              </span>
            ))}
          </div>

          {project.imageUrl && !imageError && (
            <div className="w-full aspect-video border-2 border-[#1e2d4a] mb-10 overflow-hidden bg-[#060a14]">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}

          <div className="text-[#8fa3c0] font-sora leading-relaxed mb-12">
            <p className="text-lg mb-6 text-[#f0f6ff]">{project.description}</p>
            {project.longDescription && (
              <div className="whitespace-pre-wrap text-[#8fa3c0] border-t border-[#1e2d4a] pt-6">
                {project.longDescription}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-8 border-t border-[#1e2d4a]">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1A56DB] text-[#f0f6ff] border-[3px] border-[#1A56DB] px-8 py-3 font-mono font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#388bfd] hover:border-[#388bfd] active:bg-[#0f3d9e] transition-colors text-center"
              >
                Live Demo ↗
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent text-[#f0f6ff] border-2 border-[#1A56DB] px-8 py-3 font-mono font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#1A56DB] transition-colors text-center"
              >
                View Code ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
