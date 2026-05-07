import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#0a0f1e]/90 backdrop-blur-md border-b-2 border-[#1A56DB]' : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center">
          <img src="/logo.png" alt="Priyanshu Logo" className="h-16 md:h-20 object-contain" />
        </a>
        
        <div className="hidden md:flex gap-8">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#stack">Stack</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#experience">Experience</NavLink>
        </div>

        <a 
          href="#contact" 
          className="bg-transparent text-[#f0f6ff] border-2 border-[#1A56DB] px-5 py-2 font-mono font-bold text-[11px] uppercase tracking-[0.1em] hover:bg-[#1A56DB] transition-colors rounded-none"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="font-mono text-[13px] text-[#8fa3c0] hover:text-[#4fcea6] transition-colors uppercase tracking-widest"
    >
      {children}
    </a>
  );
}
