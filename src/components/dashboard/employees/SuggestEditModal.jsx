import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import { DEPARTMENTS, POSITIONS } from '../../../lib/constants';

const SuggestEditModal = ({
  employee,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting
}) => {
  const [changeError, setChangeError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      full_name: '',
      rank: '',
      department: '',
      phone_number: '',
      date_of_transfer: '',
      reason: ''
    }
  });

  useEffect(() => {
    if (employee) {
      // Helper: Convert ISO string to Input format (YYYY-MM-DD)
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        try {
          return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
          return '';
        }
      };

      // Compute retirement date
      const computeRetirementDate = (emp) => {
        const candidates = [];
        if (emp?.date_of_birth) {
          const d = new Date(emp.date_of_birth);
          d.setFullYear(d.getFullYear() + 60);
          candidates.push(d);
        }
        if (emp?.date_of_first_appointment) {
          const d = new Date(emp.date_of_first_appointment);
          d.setFullYear(d.getFullYear() + 35);
          candidates.push(d);
        }
        if (candidates.length === 0) return '';
        return candidates.reduce((a, b) => (a < b ? a : b)).toISOString().split('T')[0];
      };

      reset({
        full_name: employee.full_name || employee.name || '',
        rank: employee.rank || employee.position || '',
        department: employee.department || '',
        phone_number: employee.phone_number || '',
        date_of_transfer: formatDateForInput(employee.date_of_transfer || ''),
        reason: ''
      });
      setChangeError('');
    }
  }, [employee, reset, isOpen]);

  const values = watch();

  const changedFields = useMemo(() => {
    if (!employee) return {};
    const nextChanges = {};
    // Only include fields that actually exist in the database schema
    ['full_name', 'rank', 'department', 'phone_number', 'date_of_transfer'].forEach((key) => {
      const empKey = key === 'full_name' ? (employee.full_name !== undefined ? 'full_name' : 'name') 
                   : key === 'rank' ? (employee.rank !== undefined ? 'rank' : 'position')
                   : key;
      if (employee[empKey] !== values[key] && values[key] !== undefined && values[key] !== '') {
        nextChanges[key] = values[key];
      }
    });
    return nextChanges;
  }, [employee, values]);

  const submit = handleSubmit(({ reason }) => {
    if (!Object.keys(changedFields).length) {
      setChangeError('Make at least one change before submitting.');
      return;
    }
    setChangeError('');
    onSubmit?.({
      employeeId: employee.id,
      changes: changedFields,
      reason
    });
  });

  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={`Suggest edits for ${employee.full_name || employee.name || 'Employee'}`}
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full name"
            {...register('full_name', { required: 'Full name is required' })}
            error={errors.full_name?.message}
          />
          <Select
            label="Rank"
            {...register('rank', { required: 'Rank is required' })}
            error={errors.rank?.message}
          >
            <option value="">Select rank</option>
            {/* POSITIONS is used as rank options */}
            {POSITIONS.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </Select>
          <Select
            label="Department"
            {...register('department', { required: 'Department is required' })}
            error={errors.department?.message}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>
          <Input
            label="Phone Number"
            {...register('phone_number')}
          />
          <Input
            label="Date of Transfer"
            type="date"
            {...register('date_of_transfer')}
          />
        </div>

        <Textarea
          label="Reason for change"
          rows={4}
          required
          {...register('reason', { required: 'Please describe why this update is needed' })}
          error={errors.reason?.message}
        />

        {changeError && (
          <p className="text-sm text-red-600">{changeError}</p>
        )}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit for approval'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SuggestEditModal;
