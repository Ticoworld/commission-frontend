import { NEWS_STATUS, AUDIT_STATUS } from '../lib/constants';
import api from './api';

// Wrapper functions that call the real backend API endpoints.
// These keep the same function names the frontend expects so no page-level changes are required.

const extractData = (res) => res?.data ?? null;

export const fetchEmployees = async (params = {}) => {
  const res = await api.get('/employees', { params });
  // backend returns { data, meta } for paginated lists
  return res.data?.data ?? res.data;
};

export const createEmployee = async (payload) => {
  const res = await api.post('/employees', payload);
  return extractData(res);
};

export const updateEmployee = async (id, payload) => {
  const res = await api.put(`/employees/${id}`, payload);
  return extractData(res);
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  // backend may return 204 No Content — treat as success
  if (res.status === 204) return { success: true };
  return extractData(res) ?? { success: true };
};

export const suggestEmployeeEdit = async ({ employeeId, changes, reason }) => {
  const res = await api.post('/employee-edits', { employeeId, changes, reason });
  return extractData(res);
};

export const fetchEmployeeEdits = async (params = {}) => {
  const res = await api.get('/employee-edits', { params });
  return res.data ?? [];
};

export const approveEmployeeEdit = async (suggestionId, { notes } = {}) => {
  const res = await api.post(`/audit-queue/${suggestionId}/approve`, { notes });
  return extractData(res);
};

export const rejectEmployeeEdit = async (suggestionId, { notes } = {}) => {
  const res = await api.post(`/audit-queue/${suggestionId}/reject`, { notes });
  return extractData(res);
};

// News
export const fetchNews = async (params = {}) => {
  const res = await api.get('/news', { params });
  return res.data ?? [];
};

export const fetchNewsById = async (id) => {
  const res = await api.get(`/news/${id}`);
  return extractData(res);
};

export const saveNewsDraft = async (payload) => {
  if (payload?.id) {
	const res = await api.put(`/news/${payload.id}`, payload);
	return extractData(res);
  }
  const res = await api.post('/news', payload);
  return extractData(res);
};

export const submitNewsForApproval = async (id) => {
  const res = await api.post(`/news/${id}/submit`);
  return extractData(res);
};

export const approveNews = async (id, { notes } = {}) => {
  const res = await api.post(`/news/${id}/approve`, { notes });
  return extractData(res);
};

export const rejectNews = async (id, { notes } = {}) => {
  const res = await api.post(`/news/${id}/reject`, { notes });
  return extractData(res);
};

// Audit queue
export const fetchAuditQueue = async (params = {}) => {
  const res = await api.get('/audit-queue', { params });
  return res.data ?? [];
};

export const approveAudit = async ({ id, notes } = {}) => {
  const res = await api.post(`/audit-queue/${id}/approve`, { notes });
  return extractData(res);
};

export const rejectAudit = async ({ id, notes } = {}) => {
  const res = await api.post(`/audit-queue/${id}/reject`, { notes });
  return extractData(res);
};

// Retirement
export const fetchRetirementAlerts = async (params = {}) => {
  const res = await api.get('/retirement-alerts', { params });
  return res.data ?? [];
};

export const exportRetirementAlertsReport = async (payload = {}) => {
  const res = await api.post('/retirement-alerts/export', payload);
  return extractData(res);
};

// Activity
export const fetchActivityLog = async (params = {}) => {
  const res = await api.get('/activity-log', { params });
  return res.data ?? [];
};

export const searchActivityLog = async ({ query } = {}) => {
  const res = await api.get('/activity-log', { params: { q: query } });
  return res.data ?? [];
};

// Dashboard
export const fetchDashboardNotifications = async () => {
  const res = await api.get('/dashboard/notifications');
  return res.data ?? { criticalAlerts: 0, pendingAudits: 0 };
};

// Expose any additional helper functions expected by the UI
export default {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  suggestEmployeeEdit,
  fetchEmployeeEdits,
  approveEmployeeEdit,
  rejectEmployeeEdit,
  fetchNews,
  fetchNewsById,
  saveNewsDraft,
  submitNewsForApproval,
  approveNews,
  rejectNews,
  fetchAuditQueue,
  approveAudit,
  rejectAudit,
  fetchRetirementAlerts,
  exportRetirementAlertsReport,
  fetchActivityLog,
  searchActivityLog,
  fetchDashboardNotifications
};
