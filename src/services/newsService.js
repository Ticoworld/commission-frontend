// src/services/newsService.js
import api from './api';

/**
 * Get all news articles with optional filters
 * @param {Object} params - Query parameters (status, page, limit, etc.)
 * @returns {Promise} - List of news articles
 */
export const getAllNews = async (params = {}) => {
  const response = await api.get('/news', { params });
  // Backend may return { data, meta } for paginated lists
  return response.data?.data ?? response.data;
};

/**
 * Get news article by ID
 * @param {string} id - News article ID
 * @returns {Promise} - News article data
 */
export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response.data;
};

/**
 * Create a new news article
 * @param {Object} newsData - News article data
 * @returns {Promise} - Created news article
 */
export const createNews = async (newsData) => {
  const response = await api.post('/news', newsData);
  return response.data;
};

/**
 * Update an existing news article
 * @param {string} id - News article ID
 * @param {Object} newsData - Updated news article data
 * @returns {Promise} - Updated news article
 */
export const updateNews = async (id, newsData) => {
  const response = await api.put(`/news/${id}`, newsData);
  return response.data;
};

/**
 * Save news article as draft (create or update)
 * @param {Object} newsData - News article data (with optional id)
 * @returns {Promise} - Saved draft
 */
export const saveNewsDraft = async (newsData) => {
  if (newsData?.id) {
    return updateNews(newsData.id, newsData);
  }
  return createNews(newsData);
};

/**
 * Submit news article for approval
 * @param {string} id - News article ID
 * @param {Object} data - Additional submission data
 * @returns {Promise} - Submission result
 */
export const submitNewsForApproval = async (id, data = {}) => {
  const response = await api.post(`/news/${id}/submit`, data);
  return response.data;
};

/**
 * Approve a news article
 * @param {string} id - News article ID
 * @param {Object} data - Approval notes
 * @returns {Promise} - Approval result
 */
export const approveNews = async (id, data = {}) => {
  const response = await api.post(`/news/${id}/approve`, data);
  return response.data;
};

/**
 * Reject a news article
 * @param {string} id - News article ID
 * @param {Object} data - Rejection notes
 * @returns {Promise} - Rejection result
 */
export const rejectNews = async (id, data = {}) => {
  const response = await api.post(`/news/${id}/reject`, data);
  return response.data;
};

/**
 * Delete a news article
 * @param {string} id - News article ID
 * @returns {Promise} - Deletion result
 */
export const deleteNews = async (id) => {
  const response = await api.delete(`/news/${id}`);
  return response.data;
};
