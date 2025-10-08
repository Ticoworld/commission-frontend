import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const EmployeeForm = ({ onSuccess, existing = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
  });

  useEffect(() => {
    if (existing) {
      setFormData({
        name: existing.name || '',
        email: existing.email || '',
        position: existing.position || '',
      });
    }
  }, [existing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existing) {
        await api.put(`/employees/${existing.id}`, formData);
        toast.success('Employee updated');
      } else {
        await api.post('/employees', formData);
        toast.success('Employee created');
      }
      onSuccess(); // Refresh list
      setFormData({ name: '', email: '', position: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {existing ? 'Update' : 'Create'} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
