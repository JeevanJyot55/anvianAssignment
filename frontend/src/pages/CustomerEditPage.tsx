import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
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
    api.get(`/customers/${id}`)
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
    await api.put(`/customers/${id}`, data);
    navigate('/customers');
  };

  if (loading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Customer</h1>
      <CustomerForm initial={initialData!} onSubmit={handleSubmit} />
    </div>
  );
};

export default CustomerEditPage;
