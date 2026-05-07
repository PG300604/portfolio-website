import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';

export default function Timeline() {
  const { data: timelineData, loading, error } = useGitHubData('timeline.json');
  const { data: visibility } = useGitHubData('visibility.json');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (visibility && !visibility.timeline) return null;

  return (
    <section id="experience" className="py-24 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel label="JOURNEY" title="Experience & Education" />

        {loading && <div className="text-[#8fa3c0] font-mono text-sm mt-12">Loading timeline...</div>}
        {error && !error.message.includes('Not Found') && !error.message.includes('404') && <div className="text-[#e55353] font-mono text-sm mt-12">Error: {error.message}</div>}

        {timelineData && timelineData.length > 0 && (
          <div ref={containerRef} className="relative mt-16 ml-4 md:ml-8">
            {/* Background line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#1e2d4a]" />
            
            {/* Animated fill line */}
            <motion.div 
              className="absolute left-0 top-0 w-[2px] bg-[#1A56DB] origin-top"
              style={{ height: lineHeight }}
            />

            <div className="flex flex-col gap-12">
              {timelineData.map((item) => (
                <div key={item.id} className="relative pl-10 md:pl-16">
                  {/* Node Dot */}
                  <div className={`absolute left-[-4px] top-1.5 w-[10px] h-[10px] ${item.active ? 'bg-[#4fcea6]' : 'bg-[#1A56DB]'}`} />
                  
                  {/* Connector Dashed Line */}
                  <div className="absolute left-[6px] top-3 w-4 md:w-10 border-t border-dashed border-[#1e2d4a]" />

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-[#0d1525] border-2 border-[#1e2d4a] p-6 hover:border-[#1A56DB] transition-colors"
                  >
                    <div className="font-mono text-[13px] text-[#8fa3c0] mb-2">{item.year}</div>
                    <h3 className="text-xl font-sora font-bold text-[#f0f6ff] mb-1">{item.title}</h3>
                    <div className="text-[#1A56DB] font-mono text-sm mb-4">{item.org}</div>
                    <p className="text-[#8fa3c0] text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
