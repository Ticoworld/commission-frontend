import Card from '../../../components/ui/Card';
import { ClipboardDocumentCheckIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AuditDashboard = () => {
  // TODO: Replace with actual data
  const stats = [
    { name: 'Pending Reviews', value: '12', icon: ClipboardDocumentCheckIcon },
    { name: 'Reviewed Today', value: '5', icon: UsersIcon }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gov-gray-900">
          Audit Dashboard
        </h1>
        <p className="text-gov-gray-600 mt-1">
          Review and verify system changes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gov-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gov-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gov-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gov-gray-600">
                    {stat.name}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gov-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/dashboard/pending-edits"
            className="flex items-center justify-center p-4 bg-gov-blue-50 rounded-lg hover:bg-gov-blue-100 transition-colors"
          >
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-gov-blue-600 mr-2" />
            <span className="font-medium">Review Pending Edits</span>
          </Link>
          <Link 
            to="/dashboard/employee-audit"
            className="flex items-center justify-center p-4 bg-gov-gray-100 rounded-lg hover:bg-gov-gray-200 transition-colors"
          >
            <UsersIcon className="w-6 h-6 text-gov-gray-600 mr-2" />
            <span className="font-medium">Employee Audit Log</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AuditDashboard;
