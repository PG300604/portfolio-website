import { motion } from 'framer-motion';
import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';

export default function Media() {
  const { data: media, loading, error } = useGitHubData('media.json');
  const { data: visibility } = useGitHubData('visibility.json');

  if (visibility && !visibility.media) return null;

  return (
    <section id="media" className="py-24 bg-transparent relative z-10 min-h-[50vh]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="GALLERY" title="Pictures & Media" />

        {loading && <div className="text-[#8fa3c0] font-mono text-sm mt-12">Loading media...</div>}
        {error && !error.message.includes('Not Found') && !error.message.includes('404') && <div className="text-[#e55353] font-mono text-sm mt-12">Error: {error.message}</div>}
        
        {!loading && (!media || media.length === 0) && !error?.message.includes('Not Found') && (
          <div className="text-[#8fa3c0] font-mono text-sm mt-12">No media available yet.</div>
        )}

        {media && media.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {media.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0d1525] border-2 border-[#1e2d4a] p-2 hover:border-[#1A56DB] transition-colors group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-[#060a14] relative">
                  <img 
                    src={item.url} 
                    alt={item.caption || "Media item"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found' }}
                  />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#060a14]/90 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-mono text-[11px] text-[#f0f6ff] text-center">{item.caption}</p>
                    </div>
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
