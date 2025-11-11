// src/services/employeeService.js
import api from './api';

/**
 * Create a new employee with multipart/form-data
 * @param {FormData} employeeData - FormData object containing employee information and files
 * @returns {Promise} - Axios response promise
 */
export const createEmployee = async (employeeData) => {
  // When sending FormData, we must NOT set Content-Type manually
  // The browser will automatically set it to multipart/form-data with the correct boundary
  const response = await api.post('/employees', employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Get all employees
 * @param {Object} params - Query parameters (page, pageSize, filters, etc.)
 * @returns {Promise} - List of employees
 */
export const getAllEmployees = async (params = {}) => {
  const response = await api.get('/employees', { params });
  // Normalize the response to always return an array
  return response.data?.data ?? response.data;
};

/**
 * Get employee by ID
 * @param {string} id - Employee ID
 * @returns {Promise} - Employee data
 */
export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

/**
 * Update employee
 * @param {string} id - Employee ID
 * @param {FormData} employeeData - FormData object with updated employee data
 * @returns {Promise} - Updated employee data
 */
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/employees/${id}`, employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Delete employee
 * @param {string} id - Employee ID
 * @returns {Promise} - Response data
 */
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};
