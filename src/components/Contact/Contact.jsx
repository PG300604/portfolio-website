import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useGitHubData } from '../../hooks/useGitHubData';
import SectionLabel from '../shared/SectionLabel';

export default function Contact() {
  const { data: visibility } = useGitHubData('visibility.json');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (visibility && !visibility.contact) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.error(err);
      setStatus('error');
    });
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel label="LET'S_TALK" title="Contact" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[#8fa3c0] text-lg leading-relaxed mb-8">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col gap-4">
              <a href="mailto:priyanshughosh97@gmail.com" className="font-mono text-[#f0f6ff] hover:text-[#1A56DB] transition-colors border-b border-[#1e2d4a] pb-4 block">
                priyanshughosh97@gmail.com
              </a>
              <a href="https://linkedin.com/in/priyanshu-ghosh-" target="_blank" rel="noopener noreferrer" className="font-mono text-[#f0f6ff] hover:text-[#1A56DB] transition-colors border-b border-[#1e2d4a] pb-4 block">
                LinkedIn ↗
              </a>
              <a href="https://github.com/PG300604" target="_blank" rel="noopener noreferrer" className="font-mono text-[#f0f6ff] hover:text-[#1A56DB] transition-colors pb-4 block">
                GitHub ↗
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block font-mono text-[11px] text-[#8fa3c0] uppercase tracking-widest mb-2">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required
                  className="w-full bg-[#0a0f1e] text-[#f0f6ff] border-2 border-[#1e2d4a] p-3 font-mono text-sm focus:border-2 focus:border-[#1A56DB] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-[#8fa3c0] uppercase tracking-widest mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required
                  className="w-full bg-[#0a0f1e] text-[#f0f6ff] border-2 border-[#1e2d4a] p-3 font-mono text-sm focus:border-2 focus:border-[#1A56DB] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] text-[#8fa3c0] uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  required
                  rows={4}
                  className="w-full bg-[#0a0f1e] text-[#f0f6ff] border-2 border-[#1e2d4a] p-3 font-mono text-sm focus:border-2 focus:border-[#1A56DB] focus:outline-none transition-colors"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-[#1A56DB] text-[#f0f6ff] border-[3px] border-[#1A56DB] px-8 py-4 font-mono font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#388bfd] hover:border-[#388bfd] active:bg-[#0f3d9e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0d2a22] border-2 border-[#4fcea6] p-4 text-[#4fcea6] font-mono text-sm">
                  Message sent successfully!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#2a0f0f] border-2 border-[#e55353] p-4 text-[#e55353] font-mono text-sm">
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
