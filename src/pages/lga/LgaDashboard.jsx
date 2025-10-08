import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import UploadForm from '../../components/uploads/UploadForm';
import DocumentList from '../../components/uploads/DocumentList';
import AddEmployeeForm from '../../components/employees/AddEmployeeForm';
import useAuth from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

const LgaDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get('/employees/my-lga'); // Scoped endpoint
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load LGA employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      </div>

      {/* Header with User Info and Logout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm">
            Logged in as: <strong>{user?.name}</strong> &nbsp;
            <span className="text-gray-600">({user?.email})</span>
          </p>
        </div>
        <button
          onClick={logout}
          className="text-red-600 hover:underline text-sm"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">LGA Dashboard</h2>

      {/* Upload Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
        <UploadForm />
      </div>

      {/* Document List */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Your Uploaded Documents</h3>
        <DocumentList />
      </div>

      {/* Add Employee */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Add Employee</h3>
        <AddEmployeeForm onEmployeeAdded={fetchEmployees} />
      </div>

      {/* Employee Table */}
      <div>
        <h3 className="text-lg font-semibold mb-2">LGA Employees</h3>
        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found for your LGA.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LgaDashboard;
