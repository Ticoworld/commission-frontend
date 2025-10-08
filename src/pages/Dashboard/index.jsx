import useAuth from '../../context/useAuth';
import SuperDashboard from './Super/Overview';
import MediaDashboard from './Media/Overview';
import AuditDashboard from './Audit/Overview';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to role-specific dashboard
  switch (user?.role) {
    case 'SUPER':
    case 'ADMIN':
      return <SuperDashboard />;
    case 'MEDIA':
      return <MediaDashboard />;
    case 'AUDIT':
      return <AuditDashboard />;
    default:
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gov-gray-900 mb-2">
            Welcome to ESLGSC Dashboard
          </h2>
          <p className="text-gov-gray-600">
            Your role dashboard will load here
          </p>
        </div>
      );
  }
};

export default Dashboard;
