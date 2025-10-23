import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../lib/utils';
import { useRetirement } from '../../../hooks/useRetirement';
import { DEPARTMENTS, POSITIONS } from '../../../lib/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee
} from '../../../services/dataService';
import { toast } from 'react-toastify';
import useAuth from '../../../context/useAuth';

const Employees = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  useEffect(() => {
    if (editingEmployee) {
      reset(editingEmployee);
    } else {
      reset({});
    }
  }, [editingEmployee, reset]);

  const invalidateEmployees = () => {
    queryClient.invalidateQueries({ queryKey: ['employees'] });
    queryClient.invalidateQueries({ queryKey: ['retirementAlerts'] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => createEmployee(payload, user),
    onSuccess: () => {
      toast.success('Employee added');
      invalidateEmployees();
      handleCloseModal();
    },
    onError: () => toast.error('Unable to create employee')
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateEmployee(editingEmployee?.id, payload, user),
    onSuccess: () => {
      toast.success('Employee updated');
      invalidateEmployees();
      handleCloseModal();
    },
    onError: () => toast.error('Unable to update employee')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEmployee(id, user),
    onSuccess: () => {
      toast.success('Employee removed');
      invalidateEmployees();
    },
    onError: () => toast.error('Unable to delete employee')
  });

  const onSubmit = (data) => {
    if (editingEmployee) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    reset({});
  };

  // Row component for desktop table
  const EmployeeRow = ({ employee }) => {
    const retirement = useRetirement(employee.retirementDate);
    return (
      <Table.Row key={employee.id}>
        <Table.Cell className="font-medium">{employee.name}</Table.Cell>
        <Table.Cell>{employee.email}</Table.Cell>
        <Table.Cell>{employee.position}</Table.Cell>
        <Table.Cell>{employee.department}</Table.Cell>
        <Table.Cell>
          <div>
            <div className="text-sm">{formatDate(employee.retirementDate)}</div>
            {retirement.daysRemaining !== null && retirement.daysRemaining > 0 && (
              <div className="text-xs text-gov-gray-500 mt-0.5">
                {retirement.daysRemaining} days remaining
              </div>
            )}
          </div>
        </Table.Cell>
        <Table.Cell>
          <Badge variant={
            retirement.priority === 'critical' ? 'red' :
            retirement.priority === 'warning' ? 'yellow' :
            retirement.priority === 'retired' ? 'gray' : 'green'
          }>
            {retirement.priority || 'active'}
          </Badge>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handleEdit(employee)}
              className="text-gov-blue-600 hover:text-gov-blue-700 p-1"
              title={`Edit ${employee.name}`}
              aria-label={`Edit ${employee.name}`}
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(employee.id)}
              className="text-red-600 hover:text-red-700 p-1"
              title={`Delete ${employee.name}`}
              aria-label={`Delete ${employee.name}`}
              disabled={deleteMutation.isPending}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </Table.Cell>
      </Table.Row>
    );
  };

  // Mobile card component so hooks can be used at top-level
  const MobileEmployeeCard = ({ employee }) => {
    const retirement = useRetirement(employee.retirementDate);
    return (
      <div className="p-4 border rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-gov-gray-600">{employee.position} • {employee.department}</div>
          </div>
          <div className="text-right">
            <div className="text-sm">{formatDate(employee.retirementDate)}</div>
            <Badge variant={retirement.priority === 'critical' ? 'red' : retirement.priority === 'warning' ? 'yellow' : 'green'}>
              {retirement.priority || 'active'}
            </Badge>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end space-x-2">
          <button onClick={() => handleEdit(employee)} aria-label={`Edit ${employee.name}`} className="text-gov-blue-600 hover:text-gov-blue-700 p-1">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(employee.id)} aria-label={`Delete ${employee.name}`} className="text-red-600 hover:text-red-700 p-1">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gov-gray-900">Employees</h1>
          <p className="text-gov-gray-600 mt-1">
            Manage employee records and information
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card>
        {/* Table for desktop */}
        <div className="hidden sm:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Department</Table.HeaderCell>
                <Table.HeaderCell>Retirement Date</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell className="text-center">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={7} className="py-6 text-center">
                    <Skeleton rows={4} />
                  </Table.Cell>
                </Table.Row>
              ) : employees.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={7} className="py-6 text-center">
                    <EmptyState title="No employees" description="No employee records found." />
                  </Table.Cell>
                </Table.Row>
              ) : (
                employees.map((employee) => (
                  <EmployeeRow key={employee.id} employee={employee} />
                ))
              )}
            </Table.Body>
          </Table>
        </div>

        {/* Card list for small screens */}
        <div className="block sm:hidden">
          {isLoading ? (
            <Skeleton rows={4} />
          ) : employees.length === 0 ? (
            <EmptyState title="No employees" description="No employee records found." />
          ) : (
            <div className="space-y-4">
              {employees.map((employee) => (
                <MobileEmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              required
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Position"
              required
              {...register('position', { required: 'Position is required' })}
              error={errors.position?.message}
              placeholder="Select position"
            >
              {POSITIONS.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </Select>
            <Select
              label="Department"
              required
              {...register('department', { required: 'Department is required' })}
              error={errors.department?.message}
              placeholder="Select department"
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Employment Date"
              type="date"
              required
              {...register('employmentDate', { required: 'Employment date is required' })}
              error={errors.employmentDate?.message}
            />
            <Input
              label="Retirement Date"
              type="date"
              required
              {...register('retirementDate', { required: 'Retirement date is required' })}
              error={errors.retirementDate?.message}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending
                ? 'Saving…'
                : editingEmployee ? 'Update' : 'Create'} Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Employees;
