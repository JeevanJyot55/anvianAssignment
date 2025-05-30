import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import customerApi from '../services/customerApi';
import CustomerForm from '../components/CustomerForm';

const CustomerCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: { name: string; email: string; phone?: string }) => {
    await customerApi.post('/customers', data);
    navigate('/customers');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add New Customer</h1>
        <CustomerForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default CustomerCreatePage;
