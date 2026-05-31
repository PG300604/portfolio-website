import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#stack', label: 'Stack' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#media', label: 'Media' },
    { href: '#blogs', label: 'Blogs' }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled || mobileMenuOpen ? 'bg-[#0a0f1e]/95 backdrop-blur-md border-b-2 border-[#1A56DB]' : 'bg-transparent'}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Priyanshu Logo" className="h-12 md:h-16 object-contain" />
          </a>
          
          <div className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="hidden md:inline-block bg-transparent text-[#f0f6ff] border-2 border-[#1A56DB] px-5 py-2 font-mono font-bold text-[11px] uppercase tracking-[0.1em] hover:bg-[#1A56DB] transition-colors rounded-none"
            >
              Contact
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#f0f6ff] focus:outline-none p-2 border-2 border-[#1e2d4a] hover:border-[#1A56DB] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden fixed top-20 left-0 right-0 z-40 bg-[#0a0f1e]/98 backdrop-blur-lg border-b-2 border-[#1A56DB] py-6 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-6 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-[15px] text-[#8fa3c0] hover:text-[#4fcea6] transition-colors uppercase tracking-widest py-1"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#1A56DB] text-[#f0f6ff] border-2 border-[#1A56DB] py-3 font-mono font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[#388bfd] transition-colors rounded-none mt-2"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
