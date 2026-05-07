import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ProjectCard({ project, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const borderClass = project.featured 
    ? 'border-3 border-[#388bfd] border-t-4 border-t-[#4fcea6]'
    : 'border-2 border-[#1A56DB] border-t-4 border-t-[#1A56DB] hover:border-[#388bfd] hover:border-t-[#4fcea6] transition-colors';

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-[#0d1525] p-6 sm:p-8 flex flex-col h-full cursor-pointer ${borderClass}`}
    >
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="flex flex-col h-full"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-sora font-bold text-[#f0f6ff]">{project.title}</h3>
          {project.featured && (
            <span className="bg-[#0d2a22] text-[#4fcea6] border border-[#4fcea6] text-[10px] uppercase font-mono px-2 py-0.5 mt-1">
              Featured
            </span>
          )}
        </div>

        <p className="text-[#8fa3c0] text-sm leading-relaxed mb-6 flex-grow font-sora">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map(tech => (
            <span key={tech} className="text-[#79b8ff] border border-[#1A56DB] bg-transparent font-mono text-[11px] px-2.5 py-1 lowercase hover:bg-[#1A56DB] hover:text-[#f0f6ff] transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1A56DB] text-[#f0f6ff] border-3 border-[#1A56DB] px-6 py-2.5 font-mono font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[#388bfd] hover:border-[#388bfd] active:bg-[#0f3d9e] transition-colors text-center flex-1"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent text-[#f0f6ff] border-2 border-[#1A56DB] px-6 py-2.5 font-mono font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[#1A56DB] transition-colors text-center flex-1"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
