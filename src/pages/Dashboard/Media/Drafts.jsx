import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Loader from '../../../components/ui/Loader';
import useAuth from '../../../context/useAuth';
import {
  fetchNews,
  submitNewsForApproval
} from '../../../services/dataService';
import { NEWS_STATUS } from '../../../lib/constants';
import { toast } from 'react-toastify';
import { formatDate } from '../../../lib/utils';

const Drafts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const queryEnabled = Boolean(user?.id);

  const { data: drafts = [], isLoading: loadingDrafts } = useQuery({
    queryKey: ['news', 'drafts', user?.id],
    queryFn: () => fetchNews({ status: NEWS_STATUS.DRAFT, authorId: user.id }),
    enabled: queryEnabled
  });

  const { data: pending = [], isLoading: loadingPending } = useQuery({
    queryKey: ['news', 'pending', user?.id],
    queryFn: () => fetchNews({ status: NEWS_STATUS.PENDING, authorId: user.id }),
    enabled: queryEnabled
  });

  const submitMutation = useMutation({
    mutationFn: (id) => submitNewsForApproval(id, { actor: user }),
    onSuccess: () => {
      toast.success('Draft submitted for approval');
      queryClient.invalidateQueries({ queryKey: ['news', 'drafts', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['news', 'pending', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['auditQueue'] });
    },
    onError: (error) => {
      toast.error(error?.message || 'Unable to submit draft');
    }
  });

  const tablesLoading = useMemo(() => loadingDrafts || loadingPending, [loadingDrafts, loadingPending]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gov-gray-900">My Articles</h1>
        <p className="text-gov-gray-600 mt-1">
          Draft, track, and resubmit newsroom content directly from your workspace.
        </p>
      </div>

      {tablesLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader size="md" label="Fetching your drafts" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-0">
            <div className="px-6 py-4 border-b border-gov-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gov-gray-900">Drafts</h2>
                <p className="text-sm text-gov-gray-600">Articles saved locally and not yet shared for approval.</p>
              </div>
              <Badge variant="gray">{drafts.length} drafts</Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Updated</Table.HeaderCell>
                    <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {drafts.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={3} className="py-6 text-center text-sm text-gov-gray-600">
                        No drafts yet. Start a new article to see it here.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    drafts.map((draft) => (
                      <Table.Row key={draft.id}>
                        <Table.Cell>
                          <div className="space-y-1">
                            <Link
                              to={`/dashboard/news-editor/${draft.id}`}
                              className="font-medium text-gov-blue-600 hover:text-gov-blue-700"
                            >
                              {draft.title || 'Untitled article'}
                            </Link>
                            {draft.rejectionNotes && (
                              <p className="text-xs text-red-600">Feedback: {draft.rejectionNotes}</p>
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell>{draft.updatedAt ? formatDate(draft.updatedAt) : '—'}</Table.Cell>
                        <Table.Cell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => submitMutation.mutate(draft.id)}
                            disabled={submitMutation.isPending}
                          >
                            Submit
                          </Button>
                          <Button
                            as={Link}
                            to={`/dashboard/news-editor/${draft.id}`}
                            size="sm"
                          >
                            Edit
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
          </Card>

          <Card className="p-0">
            <div className="px-6 py-4 border-b border-gov-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gov-gray-900">Awaiting approval</h2>
                <p className="text-sm text-gov-gray-600">Submissions pending review by the super admin.</p>
              </div>
              <Badge variant="yellow">{pending.length} submitted</Badge>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Submitted</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {pending.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={3} className="py-6 text-center text-sm text-gov-gray-600">
                        You have no items awaiting approval.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    pending.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell>
                          <div className="space-y-1">
                            <p className="font-medium text-gov-gray-900">{item.title}</p>
                            <p className="text-xs text-gov-gray-500">{item.category}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{item.submittedAt ? formatDate(item.submittedAt) : '—'}</Table.Cell>
                        <Table.Cell>
                          <Badge variant="yellow">Pending</Badge>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Drafts;
