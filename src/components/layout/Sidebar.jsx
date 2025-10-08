import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import {
  HomeIcon,
  UsersIcon,
  NewspaperIcon,
  ClipboardDocumentCheckIcon,
  BellAlertIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Role-based navigation
  const getNavigation = () => {
    const baseNav = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['SUPER', 'ADMIN', 'MEDIA', 'AUDIT'] }
    ];

    const roleSpecificNav = {
      SUPER: [
        { name: 'Employees', href: '/dashboard/employees', icon: UsersIcon },
        { name: 'News Moderation', href: '/dashboard/news', icon: NewspaperIcon },
        { name: 'Audit Queue', href: '/dashboard/audit-queue', icon: ClipboardDocumentCheckIcon },
        { name: 'Retirement Alerts', href: '/dashboard/retirement-alerts', icon: BellAlertIcon },
        { name: 'Activity Log', href: '/dashboard/activity-log', icon: DocumentTextIcon },
        { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon }
      ],
      ADMIN: [
        { name: 'Employees', href: '/dashboard/employees', icon: UsersIcon },
        { name: 'News Moderation', href: '/dashboard/news', icon: NewspaperIcon },
        { name: 'Audit Queue', href: '/dashboard/audit-queue', icon: ClipboardDocumentCheckIcon },
        { name: 'Retirement Alerts', href: '/dashboard/retirement-alerts', icon: BellAlertIcon }
      ],
      MEDIA: [
        { name: 'News Editor', href: '/dashboard/news-editor', icon: NewspaperIcon },
        { name: 'My Drafts', href: '/dashboard/drafts', icon: DocumentTextIcon }
      ],
      AUDIT: [
        { name: 'Pending Edits', href: '/dashboard/pending-edits', icon: ClipboardDocumentCheckIcon },
        { name: 'Employee Audit', href: '/dashboard/employee-audit', icon: UsersIcon },
        { name: 'Retirement Alerts', href: '/dashboard/retirement-alerts', icon: BellAlertIcon }
      ]
    };

    const userNav = roleSpecificNav[user?.role] || [];
    return [...baseNav, ...userNav];
  };

  const navigation = getNavigation();

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-gov-gray-200 transform transition-transform duration-300 lg:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gov-gray-200">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img 
              src="/cropped-Kwara-Vector-logo-1.webp" 
              alt="ESLGSC" 
              className="h-8 w-8"
            />
            <div>
              <div className="font-bold text-gov-blue-800">ESLGSC</div>
              <div className="text-xs text-gov-gray-600">Dashboard</div>
            </div>
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-gov-gray-500 hover:text-gov-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-gov-blue-50 text-gov-blue-700'
                    : 'text-gov-gray-700 hover:bg-gov-gray-50 hover:text-gov-blue-700'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Site Link */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gov-gray-200">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gov-gray-700 hover:bg-gov-gray-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden bg-white p-2 rounded-lg shadow-md text-gov-gray-700 hover:text-gov-blue-700"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
};

export default Sidebar;
