import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Card from '../../../components/ui/Card';
import AuditQueueTable from '../../../components/dashboard/audit/AuditQueueTable';
import AuditDetailModal from '../../../components/dashboard/audit/AuditDetailModal';
import { approveAudit, fetchAuditQueue, rejectAudit } from '../../../services/dataService';
import { toast } from 'react-toastify';
import useAuth from '../../../context/useAuth';

const AUDIT_QUEUE_QUERY_KEY = ['auditQueue'];

const AuditQueue = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: queueItems = [], isLoading } = useQuery({
    queryKey: AUDIT_QUEUE_QUERY_KEY,
    queryFn: fetchAuditQueue
  });

  const closeModal = () => setSelectedItem(null);

  const invalidateRelatedQueries = () => {
    queryClient.invalidateQueries({ queryKey: AUDIT_QUEUE_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: ['news'] });
    queryClient.invalidateQueries({ queryKey: ['employeeEdits'] });
    queryClient.invalidateQueries({ queryKey: ['activityLog'] });
    queryClient.invalidateQueries({ queryKey: ['retirementAlerts'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard', 'notifications'] });
  };

  const approveMutation = useMutation({
    mutationFn: (notes) => approveAudit({
      id: selectedItem.id,
      actor: user,
      notes
    }),
    onSuccess: () => {
      toast.success('Submission approved successfully');
      invalidateRelatedQueries();
      closeModal();
    },
    onError: (error) => {
      const message = error?.message || 'Unable to approve submission';
      toast.error(message);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: (notes) => rejectAudit({
      id: selectedItem.id,
      actor: user,
      notes
    }),
    onSuccess: () => {
      toast.info('Submission rejected');
      invalidateRelatedQueries();
      closeModal();
    },
    onError: (error) => {
      const message = error?.message || 'Unable to reject submission';
      toast.error(message);
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-gray-900">Approval Queue</h1>
        <p className="text-gov-gray-600 mt-1">
          Review and approve submissions from media and audit teams before they reach production systems.
        </p>
      </div>

      <Card className="p-0">
        <AuditQueueTable
          items={queueItems}
          isLoading={isLoading}
          onReview={setSelectedItem}
        />
      </Card>

      <AuditDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={closeModal}
        onApprove={(notes) => approveMutation.mutate(notes)}
        onReject={(notes) => rejectMutation.mutate(notes)}
        isApproving={approveMutation.isPending}
        isRejecting={rejectMutation.isPending}
      />
    </div>
  );
};

export default AuditQueue;
