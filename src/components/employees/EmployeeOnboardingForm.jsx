// src/components/employees/EmployeeOnboardingForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employeeService';
import { getLGAs } from '../../services/lgaService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Alert from '../ui/Alert';

// LGAs will be fetched dynamically instead of hardcoded

const EmployeeOnboardingForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state for all fields
  const [formData, setFormData] = useState({
    full_name: '',
    sex: '',
    rank: '',
    grade_level: '',
    date_of_birth: '',
    date_of_first_appointment: '',
    lga_of_origin: '',
    department: '',
    present_station: '',
    phone_number: '',
    qualifications: '',
    date_of_confirmation: '',
    date_of_transfer: '',
    remark: '',
    fingerprint_template: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [lgasLoading, setLgasLoading] = useState(false);
  const [lgasError, setLgasError] = useState(null);

  useEffect(() => {
    const loadLgas = async () => {
      try {
        setLgasLoading(true);
        const data = await getLGAs();
        // support array or { data: [] }
        const list = Array.isArray(data) ? data : (data?.data || []);
        // Normalize to objects having name property
        setLgas(list.map((item) => (typeof item === 'string' ? { name: item } : item)));
      } catch (err) {
        console.error(err);
        setLgasError('Failed to load LGAs');
      } finally {
        setLgasLoading(false);
      }
    };
    loadLgas();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (only images)
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setProfilePicture(file);
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append all text fields
      formDataToSend.append('full_name', formData.full_name);
      formDataToSend.append('sex', formData.sex);
      formDataToSend.append('rank', formData.rank);
      formDataToSend.append('grade_level', formData.grade_level);
      formDataToSend.append('date_of_birth', formData.date_of_birth);
      formDataToSend.append('date_of_first_appointment', formData.date_of_first_appointment);
      formDataToSend.append('lga_of_origin', formData.lga_of_origin);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('present_station', formData.present_station);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('qualifications', formData.qualifications);

      // Append optional fields only if they have values
      if (formData.date_of_confirmation) {
        formDataToSend.append('date_of_confirmation', formData.date_of_confirmation);
      }
      if (formData.date_of_transfer) {
        formDataToSend.append('date_of_transfer', formData.date_of_transfer);
      }
      if (formData.remark) {
        formDataToSend.append('remark', formData.remark);
      }
      if (formData.fingerprint_template) {
        formDataToSend.append('fingerprint_template', formData.fingerprint_template);
      }

      // Append file if selected
      if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture);
      }

      // Call API
      await createEmployee(formDataToSend);
      
      setSuccess(true);
      setError(null);

      // Navigate to employees list after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/employees');
      }, 2000);
    } catch (err) {
      console.error('Error creating employee:', err);
      setError(err.response?.data?.message || 'Failed to create employee. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Alert Messages */}
        {error && (
          <Alert variant="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success">
            Employee created successfully! Redirecting...
          </Alert>
        )}

        {/* Personal Information Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              placeholder="Enter full name"
            />
            <Select
              label="Sex"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              required
            >
              <option value="">Select sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            <Input
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              required
            />
            <Select
              label="LGA of Origin"
              name="lga_of_origin"
              value={formData.lga_of_origin}
              onChange={handleInputChange}
              required
              disabled={lgasLoading || Boolean(lgasError)}
              error={lgasError}
              helperText={lgasLoading ? 'Loading LGAs…' : undefined}
            >
              <option value="">{lgasLoading ? 'Loading…' : 'Select LGA'}</option>
              {lgas.map((lga) => (
                <option key={lga.id || lga.name} value={lga.name}>
                  {lga.name}
                </option>
              ))}
            </Select>
            <Input
              label="Phone Number"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Employment Information Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Rank"
              name="rank"
              value={formData.rank}
              onChange={handleInputChange}
              required
              placeholder="Enter rank"
            />
            <Input
              label="Grade Level"
              name="grade_level"
              value={formData.grade_level}
              onChange={handleInputChange}
              required
              placeholder="Enter grade level"
            />
            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              placeholder="Enter department"
            />
            <Input
              label="Present Station"
              name="present_station"
              value={formData.present_station}
              onChange={handleInputChange}
              required
              placeholder="Enter present station"
            />
            <Input
              label="Date of First Appointment"
              name="date_of_first_appointment"
              type="date"
              value={formData.date_of_first_appointment}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Date of Confirmation"
              name="date_of_confirmation"
              type="date"
              value={formData.date_of_confirmation}
              onChange={handleInputChange}
            />
            <Input
              label="Date of Transfer"
              name="date_of_transfer"
              type="date"
              value={formData.date_of_transfer}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Qualifications and Documents Section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications & Documents</h3>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              required
              placeholder="Enter qualifications (e.g., B.Sc. Computer Science, M.A. Public Admin)"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer"
              />
              {profilePicture && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {profilePicture.name}
                </p>
              )}
            </div>
            <Input
              label="Fingerprint Template (Scanner Data)"
              name="fingerprint_template"
              value={formData.fingerprint_template}
              onChange={handleInputChange}
              placeholder="Fingerprint data will be captured via scanner"
              helperText="This field is for fingerprint scanner integration"
            />
          </div>
        </div>

        {/* Additional Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <Textarea
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
            placeholder="Enter any additional remarks or notes"
            rows={4}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/employees')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating Employee...' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeOnboardingForm;
