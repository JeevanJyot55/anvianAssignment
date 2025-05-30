import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerListPage from './pages/CustomerListPage';

function AppRoutes() {
  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route
    path="/"
    element={
      token
        ? <Navigate to="/customers" replace />
        : <Navigate to="/login" replace />
    }
  />
        <Route path="*" element={<Navigate to={token ? "/customers" : "/login"} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customers" element={
          token ? <CustomerListPage /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<Navigate to={token ? "/customers" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;