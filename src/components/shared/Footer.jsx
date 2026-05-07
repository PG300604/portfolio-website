import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#060a14] border-t-2 border-[#1A56DB] py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Priyanshu Logo" className="h-16 md:h-20 object-contain" />
        </div>
        
        <div className="font-mono text-[#8fa3c0] text-[11px] uppercase tracking-widest text-center">
          &copy; {new Date().getFullYear()} Priyanshu Ghosh. Built with React & Vite.
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/PG300604" target="_blank" rel="noopener noreferrer" className="text-[#8fa3c0] hover:text-[#4fcea6] transition-colors font-mono text-[11px] uppercase tracking-widest">
            GitHub
          </a>
          <a href="https://linkedin.com/in/priyanshu-ghosh-" target="_blank" rel="noopener noreferrer" className="text-[#8fa3c0] hover:text-[#4fcea6] transition-colors font-mono text-[11px] uppercase tracking-widest">
            LinkedIn
          </a>
          <Link to="/admin" className="text-[#8fa3c0] hover:text-[#4fcea6] transition-colors font-mono text-[11px] uppercase tracking-widest">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
