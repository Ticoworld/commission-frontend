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
      name: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      retirementDate: '',
      reason: ''
    }
  });

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
        phone: employee.phone || '',
        retirementDate: employee.retirementDate || '',
        reason: ''
      });
      setChangeError('');
    }
  }, [employee, reset, isOpen]);

  const values = watch();

  const changedFields = useMemo(() => {
    if (!employee) return {};
    const nextChanges = {};
    ['name', 'email', 'position', 'department', 'phone', 'retirementDate'].forEach((key) => {
      if (employee[key] !== values[key] && values[key] !== undefined) {
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
      title={`Suggest edits for ${employee.name}`}
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <Select
            label="Position"
            {...register('position', { required: 'Position is required' })}
            error={errors.position?.message}
          >
            <option value="" disabled>Select position</option>
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
            <option value="" disabled>Select department</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>
          <Input
            label="Phone"
            {...register('phone')}
          />
          <Input
            label="Retirement date"
            type="date"
            {...register('retirementDate', { required: 'Retirement date is required' })}
            error={errors.retirementDate?.message}
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
