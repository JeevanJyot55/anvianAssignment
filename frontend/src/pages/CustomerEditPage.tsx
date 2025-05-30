import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import customerApi from '../services/customerApi';
import CustomerForm from '../components/CustomerForm';

interface CustomerData {
  name: string;
  email: string;
  phone?: string;
}

const CustomerEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    customerApi
      .get<CustomerData>(`/customers/${id}`)
      .then(res => {
        setInitialData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load customer');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (data: CustomerData) => {
    await customerApi.put(`/customers/${id}`, data);
    navigate('/customers');
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="max-w-sm mx-auto p-8 text-center">Loading…</div>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <div className="max-w-sm mx-auto p-8 text-red-500 text-center">{error}</div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Edit Customer</h1>
        <CustomerForm initial={initialData!} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default CustomerEditPage;