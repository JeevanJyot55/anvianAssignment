import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 mb-8">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
          MyApp
        </h1>
        {token && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;