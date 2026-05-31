import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGitHubData } from '../../hooks/useGitHubData';

export default function HeroText() {
  const { data: about } = useGitHubData('about.json');
  
  const defaultRoles = [
    "Full Stack Java Developer",
    "Spring Boot · REST APIs · Docker",
    "Open to SDE Internships"
  ];

  const roles = about?.heroRoles 
    ? about.heroRoles.split(',').map(r => r.trim()).filter(Boolean) 
    : defaultRoles;

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    if (roles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  const words = ["Priyanshu", "Ghosh"];

  return (
    <div className="z-10 relative mt-28 md:mt-0 max-w-4xl px-6">
      <div className="font-mono text-[13px] text-[#4fcea6] uppercase tracking-[0.2em] mb-6 border-l-2 border-[#4fcea6] pl-4 py-1">
        Hello, I am
      </div>
      
      <motion.h1 
        className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-sora font-extrabold text-[#f0f6ff] leading-[1.1] mb-6 flex flex-wrap gap-x-4 gap-y-2"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="whitespace-nowrap inline-block">
            {Array.from(word).map((letter, lIdx) => (
              <motion.span variants={child} key={lIdx} className="inline-block">
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>

      <div className="h-16 mb-10 flex items-center">
        <span className="text-lg sm:text-xl md:text-2xl font-mono text-[#8fa3c0] border-r-2 border-[#1A56DB] pr-1 animate-pulse leading-snug">
          {roles[currentRole]}
        </span>
      </div>

      <div className="bg-[#060a14] border border-[#1e2d4a] border-l-[3px] border-l-[#1A56DB] p-5 md:p-6 mb-12 font-mono text-[13px] text-[#8fa3c0] max-w-2xl leading-relaxed shadow-none">
        <span className="text-[#c792ea]">class</span> <span className="text-[#82aaff]">Developer</span> {'{'} <br />
        &nbsp;&nbsp;<span className="text-[#c3e88d]">@Autowired</span> <br />
        &nbsp;&nbsp;<span className="text-[#c792ea]">private</span> <span className="text-[#82aaff]">BackendStack</span> springBoot;<br />
        &nbsp;&nbsp;<span className="text-[#c792ea]">private</span> <span className="text-[#82aaff]">FrontendStack</span> react;<br />
        {'}'}
      </div>

      <div className="flex flex-wrap gap-4">
        <a 
          href="#projects" 
          className="bg-[#1A56DB] text-[#f0f6ff] border-[3px] border-[#1A56DB] px-8 py-3.5 font-mono font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#388bfd] hover:border-[#388bfd] active:bg-[#0f3d9e] transition-colors rounded-none"
        >
          View Projects
        </a>
        {/* We will read resume URL later and inject it. For now, just scroll to about */}
        <a 
          href="#about"
          className="bg-transparent text-[#f0f6ff] border-2 border-[#1A56DB] px-8 py-3.5 font-mono font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#1A56DB] transition-colors rounded-none"
        >
          About Me
        </a>
      </div>
    </div>
  );
}
