import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthed = localStorage.getItem('pg_admin') === 'true';
    setAuthed(isAuthed);
    setLoading(false);
  }, []);

  const login = (password) => {
    const SECRET = import.meta.env.VITE_ADMIN_SECRET;
    if (password === SECRET) {
      localStorage.setItem('pg_admin', 'true');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('pg_admin');
    setAuthed(false);
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
