import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import AuditQueueTable from '../../../components/dashboard/audit/AuditQueueTable';
import AuditDetailModal from '../../../components/dashboard/audit/AuditDetailModal';
import { approveAudit, fetchAuditQueue, fetchNews, rejectAudit } from '../../../services/dataService';
import { NEWS_STATUS } from '../../../lib/constants';
import { toast } from 'react-toastify';
import useAuth from '../../../context/useAuth';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { formatDate } from '../../../lib/utils';

const NewsModeration = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: queueItems = [], isLoading } = useQuery({
    queryKey: ['auditQueue'],
    queryFn: fetchAuditQueue
  });

  const pendingNews = useMemo(
    () => queueItems.filter((item) => item.entityType === 'news'),
    [queueItems]
  );

  const { data: publishedNews = [], isLoading: loadingPublished } = useQuery({
    queryKey: ['news', 'published'],
    queryFn: () => fetchNews({ status: NEWS_STATUS.PUBLISHED })
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['auditQueue'] });
    queryClient.invalidateQueries({ queryKey: ['news'] });
    queryClient.invalidateQueries({ queryKey: ['news', 'published'] });
    queryClient.invalidateQueries({ queryKey: ['activityLog'] });
  };

  const approveMutation = useMutation({
    mutationFn: (notes) => approveAudit({
      id: selectedItem.id,
      actor: user,
      notes
    }),
    onSuccess: () => {
      toast.success('Article approved and published');
      invalidate();
      setSelectedItem(null);
    },
    onError: (error) => toast.error(error?.message || 'Unable to approve article')
  });

  const rejectMutation = useMutation({
    mutationFn: (notes) => rejectAudit({
      id: selectedItem.id,
      actor: user,
      notes
    }),
    onSuccess: () => {
      toast.info('Article sent back to author');
      invalidate();
      setSelectedItem(null);
    },
    onError: (error) => toast.error(error?.message || 'Unable to reject article')
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-gray-900">News Moderation</h1>
        <p className="text-gov-gray-600 mt-1">
          Approve newsroom submissions and keep published content compliant and up-to-date.
        </p>
      </div>

      <Card className="p-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gov-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gov-gray-900">Pending approval</h2>
            <p className="text-sm text-gov-gray-600">
              Review each story to ensure accuracy before publication.
            </p>
          </div>
          <Badge variant="yellow">{pendingNews.length} awaiting review</Badge>
        </div>
        <div className="p-6">
          <AuditQueueTable
            items={pendingNews}
            isLoading={isLoading}
            onReview={setSelectedItem}
          />
        </div>
      </Card>

      <Card className="p-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gov-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gov-gray-900">Published articles</h2>
            <p className="text-sm text-gov-gray-600">Recently approved stories currently live on the site.</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['news', 'published'] })}
          >
            Refresh list
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Published</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {loadingPublished ? (
                <Table.Row>
                  <Table.Cell colSpan={4}>
                    <Skeleton rows={4} />
                  </Table.Cell>
                </Table.Row>
              ) : publishedNews.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="py-6">
                    <EmptyState title="No published articles" description="No articles have been published yet." />
                  </Table.Cell>
                </Table.Row>
              ) : (
                publishedNews.map((article) => (
                  <Table.Row key={article.id}>
                    <Table.Cell>
                      <div className="space-y-1">
                        <p className="font-medium text-gov-gray-900">{article.title}</p>
                        <p className="text-xs text-gov-gray-500">{article.summary}</p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{article.category}</Table.Cell>
                    <Table.Cell>{formatDate(article.publishedAt)}</Table.Cell>
                    <Table.Cell>{article.authorName || 'Media Team'}</Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>

      <AuditDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onApprove={(notes) => approveMutation.mutate(notes)}
        onReject={(notes) => rejectMutation.mutate(notes)}
        isApproving={approveMutation.isPending}
        isRejecting={rejectMutation.isPending}
      />
    </div>
  );
};

export default NewsModeration;
