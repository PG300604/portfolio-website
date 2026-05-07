import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';

export default function Media() {
  const { data: media, loading, error } = useGitHubData('media.json');
  const { data: visibility } = useGitHubData('visibility.json');
  
  const [activeTab, setActiveTab] = useState('all');

  if (visibility && !visibility.media) return null;

  // Handle both legacy array format and new object format { profiles, items }
  const profiles = media && !Array.isArray(media) && media.profiles ? media.profiles : [];
  const items = media && !Array.isArray(media) && media.items ? media.items : (Array.isArray(media) ? media : []);

  const categories = [
    { id: 'all', label: 'All' },
    ...profiles
  ];

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.categoryId === activeTab);

  const activeProfile = profiles.find(p => p.id === activeTab);

  return (
    <section id="media" className="py-24 bg-transparent relative z-10 min-h-[50vh]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="GALLERY" title="Pictures & Media" />

        {loading && <div className="text-[#8fa3c0] font-mono text-sm mt-12">Loading media...</div>}
        {error && !error.message.includes('Not Found') && !error.message.includes('404') && <div className="text-[#e55353] font-mono text-sm mt-12">Error: {error.message}</div>}
        
        {!loading && items.length === 0 && !error?.message.includes('Not Found') && (
          <div className="text-[#8fa3c0] font-mono text-sm mt-12">No media available yet.</div>
        )}

        {items.length > 0 && (
          <div className="mt-12">
            {/* Tabs */}
            {profiles.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-8">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-6 py-2 font-mono text-sm border-2 transition-colors ${
                      activeTab === cat.id 
                        ? 'border-[#388bfd] bg-[#388bfd]/10 text-[#f0f6ff]' 
                        : 'border-[#1e2d4a] text-[#8fa3c0] hover:border-[#8fa3c0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Active Profile Link */}
            {activeProfile && activeProfile.instagram && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 font-mono text-sm"
              >
                <a 
                  href={activeProfile.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#4fcea6] hover:text-[#388bfd] transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Follow {activeProfile.label} on Instagram ↗
                </a>
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
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
            
            {filteredItems.length === 0 && (
              <div className="text-[#8fa3c0] font-mono text-sm text-center py-12">No media found in this category.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
