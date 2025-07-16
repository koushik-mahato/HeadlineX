import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const LS_USER_KEY = 'headlinex-user';      // stores user credentials
const LS_SESSION_KEY = 'headlinex-auth';   // marks session as active

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔄 Load active session on app start
  useEffect(() => {
    const savedUser = localStorage.getItem(LS_USER_KEY);
    const sessionActive = localStorage.getItem(LS_SESSION_KEY);
    if (savedUser && sessionActive === 'true') {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const stored = JSON.parse(localStorage.getItem(LS_USER_KEY));
    if (stored && stored.email === email && stored.password === password) {
      setUser(stored);
      localStorage.setItem(LS_SESSION_KEY, 'true'); // mark session
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    const newUser = { email, password };
    localStorage.setItem(LS_USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(LS_SESSION_KEY, 'true');
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(LS_SESSION_KEY); // clear session but not credentials
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};

