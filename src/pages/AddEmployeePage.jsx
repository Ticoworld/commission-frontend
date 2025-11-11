// src/pages/AddEmployeePage.jsx
import EmployeeOnboardingForm from '../components/employees/EmployeeOnboardingForm';

const AddEmployeePage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Onboard New Employee</h1>
        <p className="text-gray-600 mt-1">
          Fill in the form below to add a new employee to the system
        </p>
      </div>
      <EmployeeOnboardingForm />
    </div>
  );
};

export default AddEmployeePage;
