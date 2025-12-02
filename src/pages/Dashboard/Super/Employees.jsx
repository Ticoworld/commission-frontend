import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { formatDate } from '../../../lib/utils';
import { useRetirement } from '../../../hooks/useRetirement';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEmployee,
  getAllEmployees
} from '../../../services/employeeService';
import { toast } from 'react-toastify';
import useAuth from '../../../context/useAuth';

const Employees = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [refresh, setRefresh] = useState(false);

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getAllEmployees
  });

  const invalidateEmployees = () => {
    queryClient.invalidateQueries({ queryKey: ['employees'] });
    queryClient.invalidateQueries({ queryKey: ['retirementAlerts'] });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      toast.success('Employee removed');
      invalidateEmployees();
      setRefresh((r) => !r);
    },
    onError: () => toast.error('Unable to delete employee')
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteMutation.mutate(id);
    }
  };

  // Row component for desktop table
  const EmployeeRow = ({ employee }) => {
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
      if (candidates.length === 0) return null;
      return candidates.reduce((a, b) => (a < b ? a : b)).toISOString();
    };

    const retirementDate = computeRetirementDate(employee);
    const retirement = useRetirement(retirementDate);
    const status = retirementDate ? (new Date(retirementDate) < new Date() ? 'Retired' : 'Active') : 'N/A';

    return (
      <Table.Row key={employee.id}>
        <Table.Cell className="font-medium">{employee.full_name || employee.name}</Table.Cell>
        <Table.Cell>{employee.rank || employee.position}</Table.Cell>
        <Table.Cell>{employee.department || 'N/A'}</Table.Cell>
        <Table.Cell>
          <div>
            <div className="text-sm">{retirementDate ? formatDate(retirementDate) : 'N/A'}</div>
            {retirement?.daysRemaining !== null && retirement?.daysRemaining > 0 && (
              <div className="text-xs text-gov-gray-500 mt-0.5">{retirement.daysRemaining} days remaining</div>
            )}
          </div>
        </Table.Cell>
        <Table.Cell>
          <Badge variant={status === 'Retired' ? 'gray' : 'green'}>{status}</Badge>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center space-x-2">
            <Link to={`/dashboard/employees/${employee.id}/edit`} title={`Edit ${employee.full_name || employee.name}`} aria-label={`Edit ${employee.full_name || employee.name}`} className="text-gov-blue-600 hover:text-gov-blue-700 p-1">
              <PencilIcon className="w-4 h-4" />
            </Link>
            <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-700 p-1" title={`Delete ${employee.full_name || employee.name}`} aria-label={`Delete ${employee.full_name || employee.name}`} disabled={deleteMutation.isPending}>
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </Table.Cell>
      </Table.Row>
    );
  };

  // Mobile card component so hooks can be used at top-level
  const MobileEmployeeCard = ({ employee }) => {
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
      if (candidates.length === 0) return null;
      return candidates.reduce((a, b) => (a < b ? a : b)).toISOString();
    };

    const retirementDate = computeRetirementDate(employee);
    const retirement = useRetirement(retirementDate);
    const status = retirementDate ? (new Date(retirementDate) < new Date() ? 'Retired' : 'Active') : 'N/A';

    return (
      <div className="p-4 border rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{employee.full_name || employee.name}</div>
            <div className="text-sm text-gov-gray-600">{employee.rank || employee.position} • {employee.department}</div>
          </div>
          <div className="text-right">
            <div className="text-sm">{retirementDate ? formatDate(retirementDate) : 'N/A'}</div>
            <Badge variant={status === 'Retired' ? 'gray' : 'green'}>{status}</Badge>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end space-x-2">
          <Link to={`/dashboard/employees/${employee.id}/edit`} aria-label={`Edit ${employee.full_name || employee.name}`} className="text-gov-blue-600 hover:text-gov-blue-700 p-1">
            <PencilIcon className="w-4 h-4" />
          </Link>
          <button onClick={() => handleDelete(employee.id)} aria-label={`Delete ${employee.full_name || employee.name}`} className="text-red-600 hover:text-red-700 p-1">
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
        <Link to="/dashboard/employees/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>

      <Card>
        {/* Table for desktop */}
        <div className="hidden sm:block">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Rank/Position</Table.HeaderCell>
                  <Table.HeaderCell>Department</Table.HeaderCell>
                  <Table.HeaderCell>Retirement Date</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell className="text-center">Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Head>
            <Table.Body>
              {isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="py-6 text-center">
                    <Skeleton rows={4} />
                  </Table.Cell>
                </Table.Row>
              ) : employees.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="py-6 text-center">
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

      {/* Editing handled on dedicated page: /dashboard/employees/:id/edit */}
    </div>
  );
};

export default Employees;
