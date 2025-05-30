import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../services/authApi';

const LoginPage: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const navigate                = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await authApi.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/customers');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Log In</h1>
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          New user?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
