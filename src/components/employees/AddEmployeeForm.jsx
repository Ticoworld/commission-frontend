import React, { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AddEmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:5000/api/employees', formData);
      toast.success('Employee added successfully');
      setFormData({ name: '', email: '', position: '' });
      onEmployeeAdded?.(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error('Failed to add employee');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-10">
      <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          required
          className="border p-2 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeForm;
