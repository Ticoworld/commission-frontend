import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Card from '../../../components/ui/Card';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import RetirementAlertsTable from '../../../components/dashboard/alerts/RetirementAlertsTable';
import Loader from '../../../components/ui/Loader';
import { DEPARTMENTS } from '../../../lib/constants';
import {
  exportRetirementAlertsReport,
  fetchRetirementAlerts
} from '../../../services/dataService';
import { toast } from 'react-toastify';

const priorityOptions = [
  { label: 'All priorities', value: '' },
  { label: 'Critical (≤30 days)', value: 'critical' },
  { label: 'Upcoming (31-90 days)', value: 'warning' },
  { label: 'Planned (91-180 days)', value: 'normal' }
];

const RetirementAlerts = () => {
  const [priority, setPriority] = useState('');
  const [department, setDepartment] = useState('');
  const [sortKey, setSortKey] = useState('daysRemaining');
  const [sortDirection, setSortDirection] = useState('asc');

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['retirementAlerts', { priority, department }],
    queryFn: () => fetchRetirementAlerts({ priority, department })
  });

  const exportMutation = useMutation({
    mutationFn: () => exportRetirementAlertsReport({
      format: 'pdf',
      filters: { priority, department }
    }),
    onSuccess: () => {
      toast.success('Export started. You will receive the report by email.');
    },
    onError: () => {
      toast.error('Unable to export report.');
    }
  });

  const totals = useMemo(() => ({
    total: alerts.length,
    critical: alerts.filter((alert) => alert.priority === 'critical').length,
    warning: alerts.filter((alert) => alert.priority === 'warning').length
  }), [alerts]);

  const sortedAlerts = useMemo(() => {
    const cloned = [...alerts];
    cloned.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return cloned;
  }, [alerts, sortKey, sortDirection]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection('asc');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gov-gray-900">Retirement alerts</h1>
          <p className="text-gov-gray-600 mt-1">
            Monitor upcoming retirements, prioritise handovers, and export monthly alerts for supervisors.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-right">
          <div>
            <p className="text-xs uppercase text-gov-gray-500">Total</p>
            <p className="text-xl font-semibold text-gov-gray-900">{totals.total}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-red-500">Critical</p>
            <p className="text-xl font-semibold text-red-600">{totals.critical}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-amber-500">Warning</p>
            <p className="text-xl font-semibold text-amber-600">{totals.warning}</p>
          </div>
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex flex-wrap items-end gap-4">
          <Select
            label="Priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full sm:w-60"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            label="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="w-full sm:w-60"
          >
            <option value="">All departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          <Button
            variant="ghost"
            onClick={() => {
              setPriority('');
              setDepartment('');
            }}
          >
            Reset filters
          </Button>
          <div className="flex-1" />
          <Button
            onClick={() => exportMutation.mutate()}
            disabled={exportMutation.isPending}
          >
            {exportMutation.isPending ? 'Exporting…' : 'Export monthly report'}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader size="md" label="Loading alerts" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <RetirementAlertsTable
              alerts={sortedAlerts}
              onSort={handleSort}
              sortKey={sortKey}
              sortDirection={sortDirection}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default RetirementAlerts;
