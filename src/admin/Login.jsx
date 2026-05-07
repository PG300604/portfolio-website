import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1525] text-[#f0f6ff] border-2 border-[#1e2d4a] p-[10px] font-mono text-sm focus:border-3 focus:border-[#1A56DB] focus:outline-none hover:border-[#388bfd] transition-colors rounded-none"
              placeholder="Enter admin secret..."
            />
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
