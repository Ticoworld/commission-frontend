import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../services/employeeService';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';
import EmployeeOnboardingForm from '../components/employees/EmployeeOnboardingForm';

const EditEmployeePage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getEmployeeById(id);
        // API might return { data: {...} } or the object directly
        const emp = data?.data || data;
        setEmployee(emp);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load employee');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="min-h-[200px] flex items-center justify-center"><Loader /></div>;
  if (error) return <Alert variant="error">{error}</Alert>;
  if (!employee) return <Alert variant="warning">Employee not found</Alert>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Employee</h1>
        <p className="text-gov-gray-600">Update employee details</p>
      </div>

      <EmployeeOnboardingForm initialValues={employee} />
    </div>
  );
};

export default EditEmployeePage;
