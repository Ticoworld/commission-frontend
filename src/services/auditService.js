// src/services/auditService.js
import api from './api';

/**
 * Get all audit queue items
 * @param {Object} params - Query parameters (status, type, page, limit, etc.)
 * @returns {Promise} - List of audit items
 */
export const getAuditQueue = async (params = {}) => {
  const response = await api.get('/audit-queue', { params });
  return response.data?.data ?? response.data;
};

/**
 * Get employee edit suggestions
 * @param {Object} params - Query parameters (submittedById, status, etc.)
 * @returns {Promise} - List of employee edit suggestions
 */
export const getEmployeeEdits = async (params = {}) => {
  const response = await api.get('/employee-edits', { params });
  return response.data?.data ?? response.data;
};

/**
 * Suggest an employee edit
 * @param {Object} data - { employeeId, changes, reason }
 * @returns {Promise} - Created suggestion
 */
export const suggestEmployeeEdit = async (data) => {
  const response = await api.post('/employee-edits', data);
  return response.data;
};

/**
 * Approve an audit item
 * @param {string} id - Audit item ID
 * @param {Object} data - Approval notes
 * @returns {Promise} - Approval result
 */
export const approveAudit = async (id, data = {}) => {
  const response = await api.post(`/audit-queue/${id}/approve`, data);
  return response.data;
};

/**
 * Reject an audit item
 * @param {string} id - Audit item ID
 * @param {Object} data - Rejection notes
 * @returns {Promise} - Rejection result
 */
export const rejectAudit = async (id, data = {}) => {
  const response = await api.post(`/audit-queue/${id}/reject`, data);
  return response.data;
};

/**
 * Approve an employee edit suggestion
 * @param {string} suggestionId - Suggestion ID
 * @param {Object} data - Approval notes
 * @returns {Promise} - Approval result
 */
export const approveEmployeeEdit = async (suggestionId, data = {}) => {
  const response = await api.post(`/audit-queue/${suggestionId}/approve`, data);
  return response.data;
};

/**
 * Reject an employee edit suggestion
 * @param {string} suggestionId - Suggestion ID
 * @param {Object} data - Rejection notes
 * @returns {Promise} - Rejection result
 */
export const rejectEmployeeEdit = async (suggestionId, data = {}) => {
  const response = await api.post(`/audit-queue/${suggestionId}/reject`, data);
  return response.data;
};
