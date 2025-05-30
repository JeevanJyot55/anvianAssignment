import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerListPage from './pages/CustomerListPage';
import CustomerCreatePage from './pages/CustomerCreatePage';
import CustomerEditPage from './pages/CustomerEditPage';

const AppRoutes: React.FC = () => {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          token
            ? <Navigate to="/customers" replace />
            : <Navigate to="/login" replace />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customers" element={
          token
            ? <CustomerListPage />
            : <Navigate to="/login" replace />
        } />
        <Route path="/customers/new" element={
          token
            ? <CustomerCreatePage />
            : <Navigate to="/login" replace />
        } />
        <Route path="/customers/:id/edit" element={
          token
            ? <CustomerEditPage />
            : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
