import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin secret');
    }
  };

  return (
    <div className="min-h-screen bg-[#060a14] flex items-center justify-center p-4">
      <div className="bg-[#0d1525] border-2 border-[#1A56DB] p-8 w-full max-w-md border-t-[4px]">
        <div className="mb-8">
          <div className="font-mono text-[11px] text-[#4fcea6] uppercase tracking-widest mb-2">
            // SECURE_ZONE
          </div>
          <h1 className="text-3xl font-sora font-bold text-[#f0f6ff]">Admin Access</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block font-mono text-[11px] text-[#8fa3c0] uppercase tracking-widest mb-2">
              Secret Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1525] text-[#f0f6ff] border-2 border-[#1e2d4a] p-[10px] pr-10 font-mono text-sm focus:border-3 focus:border-[#1A56DB] focus:outline-none hover:border-[#388bfd] transition-colors rounded-none"
                placeholder="Enter admin secret..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8fa3c0] hover:text-[#388bfd] focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {error && <p className="text-[#e55353] text-sm mt-2 font-mono">{error}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#1A56DB] text-[#f0f6ff] border-[3px] border-[#1A56DB] px-7 py-3 font-mono font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#388bfd] hover:border-[#388bfd] active:bg-[#0f3d9e] transition-colors rounded-none"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
