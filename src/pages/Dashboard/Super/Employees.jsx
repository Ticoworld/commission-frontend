import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { formatDate } from '../../../lib/utils';
import { useRetirement } from '../../../hooks/useRetirement';
import { useQuery } from '@tanstack/react-query';
import {
  getAllEmployees
} from '../../../services/employeeService';

const Employees = () => {
  const [searchTerm] = useState('');
  const [searchBy] = useState('surname'); // 'surname' or 'date'

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getAllEmployees
  });

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employees;
    
    const term = searchTerm.toLowerCase().trim();
    
    return employees.filter((emp) => {
      if (searchBy === 'surname') {
        // Search by surname (last name) - extract surname from full_name
        const fullName = (emp.full_name || emp.name || '').toLowerCase();
        const surname = fullName.split(' ').pop() || ''; // Get last word as surname
        return surname.includes(term) || fullName.includes(term);
      } else if (searchBy === 'date') {
        // Search by date of first appointment
        if (!emp.date_of_first_appointment) return false;
        const dateStr = formatDate(emp.date_of_first_appointment).toLowerCase();
        return dateStr.includes(term);
      }
      return false;
    });
  }, [employees, searchTerm, searchBy]);


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
    useRetirement(retirementDate);
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
              ) : filteredEmployees.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} className="py-6 text-center">
                    <EmptyState 
                      title={searchTerm ? "No matching employees" : "No employees"} 
                      description={searchTerm ? `No employees found matching "${searchTerm}". Try a different search term.` : "No employee records found."} 
                    />
                  </Table.Cell>
                </Table.Row>
              ) : (
                filteredEmployees.map((employee) => (
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
          ) : filteredEmployees.length === 0 ? (
            <EmptyState 
              title={searchTerm ? "No matching employees" : "No employees"} 
              description={searchTerm ? `No employees found matching "${searchTerm}". Try a different search term.` : "No employee records found."} 
            />
          ) : (
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
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
