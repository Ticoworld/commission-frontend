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

const SuperDashboard = () => {
  // TODO: Replace with actual data from API
  const stats = [
    {
      name: 'Total Employees',
      value: '1,245',
      change: '+12',
      trend: 'up',
      icon: UsersIcon,
      href: '/dashboard/employees'
    },
    {
      name: 'Active News',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: NewspaperIcon,
      href: '/dashboard/news'
    },
    {
      name: 'Pending Audits',
      value: '8',
      change: '-2',
      trend: 'down',
      icon: ClipboardDocumentCheckIcon,
      href: '/dashboard/audit-queue'
    },
    {
      name: 'Retirement Alerts',
      value: '15',
      change: '+5',
      trend: 'up',
      icon: BellAlertIcon,
      href: '/dashboard/retirement-alerts'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Employee created', user: 'Admin User', time: '2 hours ago' },
    { id: 2, action: 'News article published', user: 'Media Admin', time: '4 hours ago' },
    { id: 3, action: 'Audit approved', user: 'Super Admin', time: '1 day ago' },
    { id: 4, action: 'LGA updated', user: 'Admin User', time: '2 days ago' }
  ];

  const upcomingRetirements = [
    { id: 1, name: 'John Doe', department: 'Administration', days: 15, priority: 'critical' },
    { id: 2, name: 'Jane Smith', department: 'Finance', days: 45, priority: 'warning' },
    { id: 3, name: 'Michael Johnson', department: 'HR', days: 75, priority: 'normal' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gov-gray-900">
          Super Admin Dashboard
        </h1>
        <p className="text-gov-gray-600 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
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
                  {stat.value}
                </div>
                <div className="text-sm text-gov-gray-600">
                  {stat.name}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

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
            {recentActivities.map((activity) => (
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
            ))}
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
            {upcomingRetirements.map((emp) => (
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
            ))}
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
