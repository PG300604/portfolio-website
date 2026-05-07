import { motion } from 'framer-motion';
import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';

export default function Blogs() {
  const { data: blogs, loading, error } = useGitHubData('blogs.json');
  const { data: visibility } = useGitHubData('visibility.json');

  if (visibility && !visibility.blogs) return null;

  return (
    <section id="blogs" className="py-24 bg-transparent relative z-10 min-h-[50vh]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="LATEST UPDATES" title="Blogs & Events" />

        {loading && <div className="text-[#8fa3c0] font-mono text-sm mt-12">Loading updates...</div>}
        {error && !error.message.includes('Not Found') && !error.message.includes('404') && <div className="text-[#e55353] font-mono text-sm mt-12">Error: {error.message}</div>}
        
        {!loading && (!blogs || blogs.length === 0) && !error?.message.includes('Not Found') && (
          <div className="text-[#8fa3c0] font-mono text-sm mt-12">No updates available yet.</div>
        )}

        {blogs && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).map((blog, index) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0d1525] border-2 border-[#1e2d4a] hover:border-[#1A56DB] transition-all group flex flex-col h-full"
              >
                {blog.image && (
                  <div className="h-48 overflow-hidden border-b-2 border-[#1e2d4a]">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="font-mono text-[11px] text-[#4fcea6] mb-3">{blog.date}</div>
                  <h3 className="text-xl font-sora font-bold text-[#f0f6ff] mb-3 group-hover:text-[#388bfd] transition-colors">{blog.title}</h3>
                  <p className="text-[#8fa3c0] text-sm mb-6 flex-grow">{blog.content}</p>
                  
                  {blog.link && (
                    <a 
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#1A56DB] hover:text-[#388bfd] font-mono text-sm uppercase tracking-wider group-hover:gap-2 transition-all gap-1"
                    >
                      Read More <span className="text-lg leading-none">→</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
