import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CustomerForm from '../components/CustomerForm';

const CustomerCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string; email: string; phone?: string }) => {
    await api.post('/customers', data);
    navigate('/customers');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Add New Customer</h1>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CustomerCreatePage;
