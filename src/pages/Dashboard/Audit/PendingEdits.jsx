import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import useAuth from '../../../context/useAuth';
import { fetchEmployeeEdits } from '../../../services/dataService';
import { AUDIT_STATUS } from '../../../lib/constants';
import { formatDate } from '../../../lib/utils';

const statusBadgeVariant = {
  [AUDIT_STATUS.PENDING]: 'yellow',
  [AUDIT_STATUS.APPROVED]: 'green',
  [AUDIT_STATUS.REJECTED]: 'red'
};

const PendingEdits = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['employeeEdits', user?.id],
    queryFn: () => fetchEmployeeEdits({ submittedById: user?.id })
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-gray-900">My submissions</h1>
        <p className="text-gov-gray-600 mt-1">
          Track the status of employee corrections you&apos;ve submitted for approval.
        </p>
      </div>

      <Card className="p-0">
        <div className="px-6 py-4 border-b border-gov-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gov-gray-900">Correction requests</h2>
            <p className="text-sm text-gov-gray-600">
              Pending requests will appear in the super admin approval queue.
            </p>
          </div>
          <Badge variant="yellow">
            {submissions.filter((submission) => submission.status === AUDIT_STATUS.PENDING).length} pending
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Employee</Table.HeaderCell>
                <Table.HeaderCell>Submitted</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="py-6 text-center text-sm text-gov-gray-600">
                    Loading submissions…
                  </Table.Cell>
                </Table.Row>
              ) : submissions.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="py-6 text-center text-sm text-gov-gray-600">
                    You haven&apos;t submitted any corrections yet.
                  </Table.Cell>
                </Table.Row>
              ) : (
                submissions.map((submission) => (
                  <Table.Row key={submission.id}>
                    <Table.Cell>
                      <div className="space-y-1">
                        <p className="font-medium text-gov-gray-900">{submission.employeeName}</p>
                        <p className="text-xs text-gov-gray-500">Reason: {submission.reason}</p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{formatDate(submission.submittedAt)}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={statusBadgeVariant[submission.status] || 'gray'}>
                        {submission.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelected(submission)}>
                        View details
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>

      <Modal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        size="lg"
        title="Submission details"
      >
        {selected && (
          <div className="space-y-5">
            <div className="space-y-1 text-sm text-gov-gray-600">
              <p>
                <span className="font-medium text-gov-gray-900">Employee:</span> {selected.employeeName}
              </p>
              <p>
                <span className="font-medium text-gov-gray-900">Submitted:</span> {formatDate(selected.submittedAt)}
              </p>
              <p>
                <span className="font-medium text-gov-gray-900">Status:</span>{' '}
                <Badge variant={statusBadgeVariant[selected.status] || 'gray'}>{selected.status}</Badge>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gov-gray-900 uppercase tracking-wide">Requested changes</h3>
              <div className="space-y-2 text-sm text-gov-gray-700">
                {Object.entries(selected.changes).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-medium text-gov-gray-900">{key}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gov-gray-700">
              <h3 className="text-sm font-semibold text-gov-gray-900 uppercase tracking-wide">Reason</h3>
              <p>{selected.reason}</p>
            </div>

            {selected.notes && (
              <div className="space-y-2 text-sm text-gov-gray-700">
                <h3 className="text-sm font-semibold text-gov-gray-900 uppercase tracking-wide">Reviewer notes</h3>
                <p>{selected.notes}</p>
              </div>
            )}

            <div className="text-right">
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingEdits;
