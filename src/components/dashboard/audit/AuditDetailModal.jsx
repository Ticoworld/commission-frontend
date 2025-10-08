import { useEffect, useMemo, useState } from 'react';
import Modal from '../../ui/Modal';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import Textarea from '../../ui/Textarea';
import Card from '../../ui/Card';
import { formatDate } from '../../../lib/utils';
import { AUDIT_STATUS } from '../../../lib/constants';

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-gov-gray-900 uppercase tracking-wide">
    {children}
  </h3>
);

const DiffRow = ({ label, currentValue, proposedValue }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gov-gray-100 last:border-0">
    <div>
      <p className="text-xs font-medium uppercase text-gov-gray-500">Field</p>
      <p className="text-sm text-gov-gray-900">{label}</p>
    </div>
    <div>
      <p className="text-xs font-medium uppercase text-gov-gray-500">Current</p>
      <p className="text-sm text-gov-gray-700 break-words">{currentValue ?? '—'}</p>
    </div>
    <div>
      <p className="text-xs font-medium uppercase text-gov-gray-500">Proposed</p>
      <p className="text-sm text-gov-blue-700 break-words">{proposedValue ?? '—'}</p>
    </div>
  </div>
);

const AuditDetailModal = ({
  item,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isApproving,
  isRejecting
}) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNotes('');
    }
  }, [isOpen]);

  const changeSet = useMemo(() => {
    if (!item || item.entityType !== 'employeeEdit') return [];
    const { current = {}, proposed = {} } = item.payload || {};
    return Object.keys(proposed)
      .filter((key) => proposed[key] !== current[key])
      .map((key) => ({
        key,
        current: current[key],
        proposed: proposed[key]
      }));
  }, [item]);

  const handleApprove = () => {
    onApprove?.(notes || undefined);
  };

  const handleReject = () => {
    onReject?.(notes || undefined);
  };

  if (!item) return null;

  const submittedInfo = (
    <div className="space-y-2 text-sm text-gov-gray-600">
      <p>
        <span className="font-medium text-gov-gray-900">Submitted by:</span>{' '}
        {item.submittedByName || 'Unknown'}
      </p>
      <p>
        <span className="font-medium text-gov-gray-900">Submitted:</span>{' '}
        {formatDate(item.submittedAt)}
      </p>
      {item.payload?.reason && (
        <p>
          <span className="font-medium text-gov-gray-900">Change rationale:</span>{' '}
          {item.payload.reason}
        </p>
      )}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Review Submission">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gov-gray-500 uppercase tracking-wide">Item</p>
            <h2 className="text-lg font-semibold text-gov-gray-900">
              {item.entityName || item.entityType}
            </h2>
          </div>
          <Badge variant="yellow">{AUDIT_STATUS.PENDING}</Badge>
        </div>

        <Card className="p-5 space-y-3">
          <SectionTitle>Submission details</SectionTitle>
          {submittedInfo}
        </Card>

        {item.entityType === 'employeeEdit' && (
          <Card className="p-5 space-y-4">
            <SectionTitle>Requested updates</SectionTitle>
            {changeSet.length ? (
              <div className="divide-y divide-gov-gray-100">
                {changeSet.map((change) => (
                  <DiffRow
                    key={change.key}
                    label={change.key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                    currentValue={change.current}
                    proposedValue={change.proposed}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gov-gray-600">No differences detected.</p>
            )}
          </Card>
        )}

        {item.entityType === 'news' && (
          <Card className="p-5 space-y-4">
            <SectionTitle>Article preview</SectionTitle>
            <div className="space-y-2">
              <p className="text-xs uppercase text-gov-gray-500">Headline</p>
              <p className="text-lg font-semibold text-gov-gray-900">{item.payload?.article?.title}</p>
            </div>
            {item.payload?.article?.summary && (
              <div className="space-y-2">
                <p className="text-xs uppercase text-gov-gray-500">Summary</p>
                <p className="text-sm text-gov-gray-700">{item.payload.article.summary}</p>
              </div>
            )}
            {item.payload?.article?.content && (
              <div className="space-y-2">
                <p className="text-xs uppercase text-gov-gray-500">Content</p>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.payload.article.content }}
                />
              </div>
            )}
          </Card>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gov-gray-900" htmlFor="decision-notes">
            Reviewer notes (optional)
          </label>
          <Textarea
            id="decision-notes"
            placeholder="Add context for your decision"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={isApproving || isRejecting}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleReject}
            disabled={isApproving || isRejecting}
          >
            {isRejecting ? 'Rejecting…' : 'Reject'}
          </Button>
          <Button onClick={handleApprove} disabled={isApproving || isRejecting}>
            {isApproving ? 'Approving…' : 'Approve'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AuditDetailModal;
