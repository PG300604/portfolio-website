import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';
import { motion } from 'framer-motion';

export default function Certifications() {
  const { data: certs, loading } = useGitHubData('certifications.json');
  const { data: visibility } = useGitHubData('visibility.json');

  if (visibility && !visibility.certifications) return null;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="certifications" className="py-24 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel label="CREDENTIALS" title="Certifications" />

        {loading ? (
          <div className="text-[#8fa3c0] font-mono text-sm">Loading certifications...</div>
        ) : certs ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certs.map(cert => (
              <motion.div 
                key={cert.id} 
                variants={item}
                className={`bg-[#0a0f1e] p-6 flex flex-col ${cert.featured ? 'border-2 border-[#388bfd] border-t-[4px] border-t-[#e5a823]' : 'border-2 border-[#1A56DB] border-t-[4px] border-t-[#1A56DB]'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-sora font-bold text-[#f0f6ff] pr-4">{cert.name}</h3>
                  {cert.featured && (
                    <span className="shrink-0 bg-[#2a1f0a] text-[#e5a823] border border-[#e5a823] text-[10px] uppercase font-mono px-2 py-0.5 mt-1">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="text-[#8fa3c0] font-mono text-sm mb-6 flex-grow">
                  <span className="text-[#1A56DB]">org:</span> {cert.org} <br/>
                  <span className="text-[#1A56DB]">issuer:</span> {cert.issuedBy} <br/>
                  <span className="text-[#1A56DB]">date:</span> {cert.date}
                </div>

                {cert.credentialId && (
                  <div className="font-mono text-[11px] text-[#4a6080] pt-4 border-t border-[#1e2d4a]">
                    ID: {cert.credentialId}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
