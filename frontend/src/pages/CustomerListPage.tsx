import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import customerApi from '../services/customerApi';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // watch for navigation changes

 
  const fetchCustomers = async () => {
  console.log('→ fetchCustomers: calling customerApi.get("/customers")');
  try {
    const response = await customerApi.get<Customer[]>('/customers');
    console.log('← fetchCustomers response:', response.status, response.data);
    setCustomers(response.data);
  } catch (err: any) {
    console.error('✖ fetchCustomers error:', err.response?.status, err.response?.data, err);
    setError(err.response?.data?.error || 'Failed to fetch customers');
  }
};

  // Re-run fetch whenever the URL changes (including after creating/editing)
  useEffect(() => {
    fetchCustomers();
  }, [location]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Customers</h1>
        <button
          onClick={() => navigate('/customers/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + New Customer
        </button>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map(customer => (
          <div key={customer.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{customer.name}</h2>
            <p className="text-gray-700">{customer.email}</p>
            {customer.phone && <p className="text-gray-500">{customer.phone}</p>}
            <button
              onClick={() => navigate(`/customers/${customer.id}/edit`)}
              className="mt-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerListPage;