import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import SuggestEditModal from '../../../components/dashboard/employees/SuggestEditModal';
import useAuth from '../../../context/useAuth';
import { fetchEmployees, suggestEmployeeEdit } from '../../../services/dataService';
import { DEPARTMENTS } from '../../../lib/constants';
import { toast } from 'react-toastify';
import { formatDate } from '../../../lib/utils';

const EmployeeAudit = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees
  });

  const filteredEmployees = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesDepartment = department ? employee.department === department : true;
      const matchesSearch = lowerSearch
        ? [employee.name, employee.email, employee.position]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(lowerSearch))
        : true;
      return matchesDepartment && matchesSearch;
    });
  }, [employees, search, department]);

  const mutation = useMutation({
    mutationFn: ({ employeeId, changes, reason }) =>
      suggestEmployeeEdit({ employeeId, changes, reason }, user),
    onSuccess: () => {
      toast.success('Edit suggestion submitted for approval');
      setSelectedEmployee(null);
      queryClient.invalidateQueries({ queryKey: ['auditQueue'] });
      queryClient.invalidateQueries({ queryKey: ['employeeEdits', user?.id] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Unable to submit suggestion');
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-gray-900">Employee records</h1>
        <p className="text-gov-gray-600 mt-1">
          Review staff data and submit precise corrections for super admin approval.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_0.6fr]">
          <Input
            label="Search"
            placeholder="Search by name, email, or position"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select
            label="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">All departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          <div className="flex items-end">
            <Button variant="ghost" onClick={() => { setSearch(''); setDepartment(''); }}>
              Reset filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Department</Table.HeaderCell>
                <Table.HeaderCell>Retirement</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={5} className="py-6 text-center text-sm text-gov-gray-600">
                    Loading employee records…
                  </Table.Cell>
                </Table.Row>
              ) : filteredEmployees.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={5} className="py-6 text-center text-sm text-gov-gray-600">
                    No employees match your filters.
                  </Table.Cell>
                </Table.Row>
              ) : (
                filteredEmployees.map((employee) => (
                  <Table.Row key={employee.id}>
                    <Table.Cell>
                      <div className="space-y-1">
                        <p className="font-medium text-gov-gray-900">{employee.name}</p>
                        <p className="text-xs text-gov-gray-500">{employee.email}</p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{employee.position}</Table.Cell>
                    <Table.Cell>{employee.department}</Table.Cell>
                    <Table.Cell>
                      <div className="space-y-1">
                        <p className="text-sm text-gov-gray-700">{formatDate(employee.retirementDate)}</p>
                        <Badge variant="gray">{employee.status}</Badge>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <Button size="sm" onClick={() => setSelectedEmployee(employee)}>
                        Suggest edit
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>

      <SuggestEditModal
        employee={selectedEmployee}
        isOpen={Boolean(selectedEmployee)}
        onClose={() => setSelectedEmployee(null)}
        isSubmitting={mutation.isPending}
        onSubmit={({ changes, reason }) =>
          mutation.mutate({ employeeId: selectedEmployee.id, changes, reason })
        }
      />
    </div>
  );
};

export default EmployeeAudit;
