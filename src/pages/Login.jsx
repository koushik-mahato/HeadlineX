import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-800 p-8 rounded space-y-4">
        <h2 className="text-2xl font-semibold text-sky-400 text-center">🔐 Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-slate-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-sky-500 hover:bg-sky-600 rounded text-white font-medium"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-slate-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-sky-400 underline hover:text-sky-300">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
