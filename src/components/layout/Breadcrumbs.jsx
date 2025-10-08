import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

const breadcrumbNames = {
  '/dashboard': 'Dashboard',
  '/dashboard/employees': 'Employees',
  '/dashboard/news': 'News Management',
  '/dashboard/news-editor': 'News Editor',
  '/dashboard/drafts': 'My Drafts',
  '/dashboard/audit-queue': 'Audit Queue',
  '/dashboard/pending-edits': 'Pending Edits',
  '/dashboard/employee-audit': 'Employee Audit',
  '/dashboard/retirement-alerts': 'Retirement Alerts',
  '/dashboard/activity-log': 'Activity Log',
  '/dashboard/settings': 'Settings'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gov-gray-600 mb-6">
      <Link 
        to="/dashboard" 
        className="flex items-center hover:text-gov-blue-700 transition-colors"
      >
        <HomeIcon className="w-4 h-4" />
      </Link>
      
      {pathnames.map((_, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = breadcrumbNames[path] || pathnames[index];

        return (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRightIcon className="w-4 h-4 text-gov-gray-400" />
            {isLast ? (
              <span className="font-medium text-gov-gray-900">{name}</span>
            ) : (
              <Link 
                to={path}
                className="hover:text-gov-blue-700 transition-colors"
              >
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
