import Table from '../../ui/Table';
import Badge from '../../ui/Badge';
import EmptyState from '../../ui/EmptyState';
import Skeleton from '../../ui/Skeleton';

const priorityVariant = {
  critical: 'red',
  warning: 'yellow',
  normal: 'green',
  low: 'gray'
};

const priorityLabel = {
  critical: 'Critical (≤30 days)',
  warning: 'Upcoming (31-90 days)',
  normal: 'Planned (91-180 days)',
  low: 'Long term'
};

const RetirementAlertsTable = ({ alerts = [], onSort, sortKey, sortDirection, isLoading }) => {
  const headerButton = (key, label) => (
    <button
      type="button"
      onClick={() => onSort?.(key)}
      className="flex items-center gap-1 text-left"
    >
      <span>{label}</span>
      {sortKey === key && (
        <span className="text-xs text-gov-blue-600">
          {sortDirection === 'asc' ? '▲' : '▼'}
        </span>
      )}
    </button>
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton rows={4} />
      </div>
    );
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>{headerButton('employeeName', 'Employee')}</Table.HeaderCell>
          <Table.HeaderCell>{headerButton('department', 'Department')}</Table.HeaderCell>
          <Table.HeaderCell>{headerButton('retirementDate', 'Retirement date')}</Table.HeaderCell>
          <Table.HeaderCell className="text-right">
            {headerButton('daysRemaining', 'Days remaining')}
          </Table.HeaderCell>
          <Table.HeaderCell>Priority</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {alerts.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={5} className="py-6">
              <EmptyState title="No retirement alerts" description="No retirement alerts match your filters." />
            </Table.Cell>
          </Table.Row>
        ) : (
          alerts.map((alert) => (
            <Table.Row key={alert.id}>
              <Table.Cell>
                <div className="space-y-1">
                  <p className="font-medium text-gov-gray-900">{alert.employeeName}</p>
                  <p className="text-xs text-gov-gray-500">ID: {alert.employeeId}</p>
                </div>
              </Table.Cell>
              <Table.Cell>{alert.department}</Table.Cell>
              <Table.Cell>{alert.formattedRetirementDate}</Table.Cell>
              <Table.Cell className="text-right">{alert.daysRemaining}</Table.Cell>
              <Table.Cell>
                <Badge variant={priorityVariant[alert.priority] || 'gray'}>
                  {priorityLabel[alert.priority] || alert.priority}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
};

export default RetirementAlertsTable;
