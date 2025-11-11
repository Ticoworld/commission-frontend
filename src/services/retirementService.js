// src/services/retirementService.js
import api from './api';

/**
 * Get retirement alerts
 * @param {Object} params - Query parameters (priority, daysRemaining, page, limit, etc.)
 * @returns {Promise} - List of retirement alerts
 */
export const getRetirementAlerts = async (params = {}) => {
  const response = await api.get('/retirement-alerts', { params });
  return response.data?.data ?? response.data;
};

/**
 * Export retirement alerts report
 * @param {Object} data - Report parameters (format, filters, etc.)
 * @returns {Promise} - Export result or file
 */
export const exportRetirementReport = async (data = {}) => {
  const response = await api.post('/retirement-alerts/export', data, {
    responseType: 'blob' // For file downloads
  });
  return response.data;
};
