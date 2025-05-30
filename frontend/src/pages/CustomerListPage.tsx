import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch customers');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Customers</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((customer) => (
          <div key={customer.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{customer.name}</h2>
            <p className="text-gray-700">{customer.email}</p>
            {customer.phone && (
              <p className="text-gray-500">{customer.phone}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerListPage;