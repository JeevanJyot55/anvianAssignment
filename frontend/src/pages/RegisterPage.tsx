import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../services/authApi';

const RegisterPage: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const navigate                = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await authApi.post('/register', { email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded">
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;