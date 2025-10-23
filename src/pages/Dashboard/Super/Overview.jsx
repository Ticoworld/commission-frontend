import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  NewspaperIcon, 
  ClipboardDocumentCheckIcon,
  BellAlertIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import Skeleton from '../../../components/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';
import {
  fetchEmployees,
  fetchNews,
  fetchAuditQueue,
  fetchRetirementAlerts,
  fetchActivityLog
} from '../../../services/dataService';

const SuperDashboard = () => {
  // Fetch live data from backend
  const { data: employeesResp = { data: [], meta: { total: 0 } }, isLoading: loadingEmployees } = useQuery({
    queryKey: ['employees', 'meta'],
    queryFn: () => fetchEmployees({ page: 1, pageSize: 1 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000 // refresh every 5 minutes
  });

  const { data: news = [], isLoading: loadingNews } = useQuery({
    queryKey: ['news', 'published'],
    queryFn: () => fetchNews({ status: 'published' }),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  });

  const { data: auditQueue = [], isLoading: loadingAudit } = useQuery({
    queryKey: ['auditQueue', 'pending'],
    queryFn: () => fetchAuditQueue({ status: 'pending' }),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000 // refresh every 30s for near-real-time approvals
  });

  const { data: retirementAlerts = [], isLoading: loadingRetirements } = useQuery({
    queryKey: ['retirementAlerts', 'list'],
    queryFn: () => fetchRetirementAlerts({}),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  });

  const { data: activity = [], isLoading: loadingActivity } = useQuery({
    queryKey: ['activityLog', 'recent'],
    queryFn: () => fetchActivityLog({}),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000 // refresh every minute
  });

  const stats = [
    {
      name: 'Total Employees',
      value: loadingEmployees ? null : String(employeesResp.meta?.total ?? employeesResp.length ?? 0),
      loading: loadingEmployees,
      change: undefined,
      trend: 'up',
      icon: UsersIcon,
      href: '/dashboard/employees'
    },
    {
      name: 'Active News',
      value: loadingNews ? null : String((news && news.length) || 0),
      loading: loadingNews,
      change: undefined,
      trend: 'up',
      icon: NewspaperIcon,
      href: '/dashboard/news'
    },
    {
      name: 'Pending Audits',
      value: loadingAudit ? null : String((auditQueue && auditQueue.length) || 0),
      loading: loadingAudit,
      change: undefined,
      trend: 'down',
      icon: ClipboardDocumentCheckIcon,
      href: '/dashboard/audit-queue'
    },
    {
      name: 'Retirement Alerts',
      value: loadingRetirements ? null : String((retirementAlerts && retirementAlerts.length) || 0),
      loading: loadingRetirements,
      change: undefined,
      trend: 'up',
      icon: BellAlertIcon,
      href: '/dashboard/retirement-alerts'
    }
  ];

  const recentActivities = loadingActivity ? [] : (activity || []).slice(0, 4).map((a, idx) => ({
    id: a.id || idx,
    action: a.action,
    user: a.actorName || 'System',
    time: new Date(a.timestamp).toLocaleString()
  }));

  const upcomingRetirements = loadingRetirements ? [] : (retirementAlerts || []).slice(0, 3).map((r, idx) => ({
    id: r.employeeId || idx,
    name: r.employeeName,
    department: r.department,
    days: r.daysRemaining ?? r.daysUntil ?? '—',
    priority: r.priority || 'normal'
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <header>
        <h1 className="heading-md">Super Admin Dashboard</h1>
        <p className="text-gov-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Dashboard statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} to={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gov-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gov-blue-600" />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-gov-green-600' : 'text-red-600'
                  }`}>
                    <ArrowTrendingUpIcon className={`w-4 h-4 mr-1 ${stat.trend === 'down' && 'rotate-180'}`} />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gov-gray-900 mb-1">
                  {stat.loading ? (
                    <div className="h-8 w-24 bg-gov-gray-100 rounded animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-gov-gray-600">
                  {stat.name}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gov-gray-900 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2 text-gov-blue-600" />
              Recent Activities
            </h2>
            <Link to="/dashboard/activity-log" className="text-sm text-gov-blue-600 hover:text-gov-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {loadingActivity ? (
              <Skeleton rows={4} />
            ) : recentActivities.length === 0 ? (
              <EmptyState
                title="No recent activity"
                description="There are no recent activities to show. Check the activity log for a full history."
                action={<Link to="/dashboard/activity-log" className="text-sm text-gov-blue-600">View activity log</Link>}
              />
            ) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gov-gray-100 last:border-0">
                  <div className="flex-shrink-0 w-2 h-2 bg-gov-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-gov-gray-900 font-medium">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gov-gray-500 mt-1">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Upcoming Retirements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gov-gray-900 flex items-center">
              <BellAlertIcon className="w-5 h-5 mr-2 text-gov-blue-600" />
              Upcoming Retirements
            </h2>
            <Link to="/dashboard/retirement-alerts" className="text-sm text-gov-blue-600 hover:text-gov-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {loadingRetirements ? (
              <Skeleton rows={3} />
            ) : upcomingRetirements.length === 0 ? (
              <EmptyState
                title="No upcoming retirements"
                description="No retirement alerts are scheduled at the moment."
              />
            ) : (
              upcomingRetirements.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gov-gray-900">
                      {emp.name}
                    </p>
                    <p className="text-xs text-gov-gray-600 mt-0.5">
                      {emp.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      emp.priority === 'critical' ? 'red' : 
                      emp.priority === 'warning' ? 'yellow' : 'gray'
                    }>
                      {emp.days} days
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gov-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/dashboard/employees" 
            className="flex flex-col items-center justify-center p-4 bg-gov-blue-50 rounded-lg hover:bg-gov-blue-100 transition-colors"
          >
            <UsersIcon className="w-8 h-8 text-gov-blue-600 mb-2" />
            <span className="text-sm font-medium text-gov-gray-900">Manage Employees</span>
          </Link>
          <Link 
            to="/dashboard/news" 
            className="flex flex-col items-center justify-center p-4 bg-gov-green-50 rounded-lg hover:bg-gov-green-100 transition-colors"
          >
            <NewspaperIcon className="w-8 h-8 text-gov-green-600 mb-2" />
            <span className="text-sm font-medium text-gov-gray-900">News Management</span>
          </Link>
          <Link 
            to="/dashboard/audit-queue" 
            className="flex flex-col items-center justify-center p-4 bg-gov-cyan-100 rounded-lg hover:bg-gov-cyan-300 transition-colors"
          >
            <ClipboardDocumentCheckIcon className="w-8 h-8 text-gov-cyan-600 mb-2" />
            <span className="text-sm font-medium text-gov-gray-900">Review Audits</span>
          </Link>
          <Link 
            to="/dashboard/settings" 
            className="flex flex-col items-center justify-center p-4 bg-gov-gray-100 rounded-lg hover:bg-gov-gray-200 transition-colors"
          >
            <ChartBarIcon className="w-8 h-8 text-gov-gray-600 mb-2" />
            <span className="text-sm font-medium text-gov-gray-900">Settings</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SuperDashboard;
