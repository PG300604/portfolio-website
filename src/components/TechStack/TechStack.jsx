import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';
import { motion } from 'framer-motion';

export default function TechStack() {
  const { data: skills, loading } = useGitHubData('skills.json');
  const { data: visibility } = useGitHubData('visibility.json');

  if (visibility && !visibility.stack) return null;

  // Make category grouping case-insensitive
  const normalizedSkills = skills ? skills.map(s => ({
    ...s,
    category: s.category.toUpperCase()
  })) : [];
  
  const categories = [...new Set(normalizedSkills.map(s => s.category))];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="stack" className="py-24 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="TECH_STACK" title="Skills" />

        {loading ? (
          <div className="text-[#8fa3c0] font-mono text-sm">Loading skills...</div>
        ) : skills ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(category => (
              <div key={category} className="bg-[#0d1525] border-2 border-[#1e2d4a] p-6 border-t-[3px] border-t-[#1A56DB]">
                <h3 className="font-mono text-[13px] text-[#f0f6ff] uppercase tracking-widest mb-6 border-b border-[#1e2d4a] pb-2">
                  {category}
                </h3>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {normalizedSkills.filter(s => s.category === category).map(skill => (
                    <motion.span 
                      key={skill.id}
                      variants={item}
                      className="bg-transparent text-[#79b8ff] border border-[#1A56DB] font-mono text-[11px] px-3 py-1.5 lowercase hover:bg-[#1A56DB] hover:text-[#f0f6ff] transition-colors cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
