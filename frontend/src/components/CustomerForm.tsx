import React, { useState } from 'react';

interface CustomerData {
  name: string;
  email: string;
  phone?: string;
}

interface Props {
  initial?: CustomerData;
  onSubmit: (data: CustomerData) => void;
}

const CustomerForm: React.FC<Props> = ({ initial, onSubmit }) => {
  const [name, setName] = useState(initial?.name || '');
  const [email, setEmail] = useState(initial?.email || '');
  const [phone, setPhone] = useState(initial?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone: phone || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          className="w-full border rounded p-2"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone (optional)</label>
        <input
          className="w-full border rounded p-2"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
};

export default CustomerForm;
