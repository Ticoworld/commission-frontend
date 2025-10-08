import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/ui/Loader';

// Public Pages (lazy loaded)
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/about/About'));
const Services = lazy(() => import('../pages/Services'));
const Contact = lazy(() => import('../pages/Contact'));
const Complaint = lazy(() => import('../pages/complaints/Complaint'));
const GalleryPage = lazy(() => import('../pages/gallery/GalleryPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));
const LocalGovernmentPage = lazy(() => import('../pages/LocalGovernmentPage/LocalGovernmentPage'));
const DcPage = lazy(() => import('../pages/DevelopmentCenterPage/DcPage'));
const Faq = lazy(() => import('../pages/faq/Faq'));

// Auth & error screens (lazy loaded)
const Login = lazy(() => import('../pages/auth/Login'));
const Unauthorized = lazy(() => import('../pages/errors/Unauthorized'));

// Dashboard Pages (lazy loaded)
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Employees = lazy(() => import('../pages/Dashboard/Super/Employees'));
const AuditQueue = lazy(() => import('../pages/Dashboard/Super/AuditQueue'));
const NewsModeration = lazy(() => import('../pages/Dashboard/Super/NewsModeration'));
const RetirementAlerts = lazy(() => import('../pages/Dashboard/Super/RetirementAlerts'));
const ActivityLog = lazy(() => import('../pages/Dashboard/Super/ActivityLog'));
const NewsEditor = lazy(() => import('../pages/Dashboard/Media/NewsEditor'));
const Drafts = lazy(() => import('../pages/Dashboard/Media/Drafts'));
const PendingEdits = lazy(() => import('../pages/Dashboard/Audit/PendingEdits'));
const EmployeeAudit = lazy(() => import('../pages/Dashboard/Audit/EmployeeAudit'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader size="lg" />
  </div>
);

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/development-centers" element={<DcPage />} />
        <Route path="/local-governments" element={<LocalGovernmentPage />} />
        <Route path="/news-and-updates" element={<NewsPage />} />
    <Route path="/gallery" element={<GalleryPage />} />
    <Route path="/complaints" element={<Complaint />} />
        <Route path="/faq" element={<Faq />} />
      </Route>

      {/* Auth Routes (no layout) */}
      <Route
        path="/login"
        element={(
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        )}
      />
      <Route
        path="/unauthorized"
        element={(
          <Suspense fallback={<LoadingFallback />}>
            <Unauthorized />
          </Suspense>
        )}
      />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['SUPER', 'ADMIN', 'MEDIA', 'AUDIT']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route 
          index 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          } 
        />
        <Route 
          path="employees" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Employees />
            </Suspense>
          } 
        />
        <Route 
          path="news" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NewsModeration />
            </Suspense>
          } 
        />
        <Route 
          path="audit-queue" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AuditQueue />
            </Suspense>
          } 
        />
        <Route 
          path="retirement-alerts" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <RetirementAlerts />
            </Suspense>
          } 
        />
        <Route 
          path="activity-log" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ActivityLog />
            </Suspense>
          } 
        />
        <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
        <Route 
          path="news-editor" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NewsEditor />
            </Suspense>
          } 
        />
        <Route 
          path="drafts" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Drafts />
            </Suspense>
          } 
        />
        <Route 
          path="pending-edits" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PendingEdits />
            </Suspense>
          } 
        />
        <Route 
          path="employee-audit" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <EmployeeAudit />
            </Suspense>
          } 
        />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
