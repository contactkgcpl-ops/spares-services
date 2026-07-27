import axios from 'axios';
import { API_BASE_URL, resolveImageUrl } from '../../config/api';

export { resolveImageUrl as resolveMachineImage };

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Machine Machines Services ──────────────────────────────────────

export const fetchMachines = async () => {
  const response = await api.get('/machines.php');
  return response.data?.data || [];
};

export const fetchMachineBySlugOrId = async (identifier) => {
  const response = await api.get(`/machines.php?id=${identifier}`);
  return response.data?.data || null;
};

export const createMachine = async (machineData) => {
  const response = await api.post('/machines.php', machineData);
  return response.data;
};

export const updateMachine = async (id, machineData) => {
  const response = await api.put(`/machines.php?id=${id}`, machineData);
  return response.data;
};

export const deleteMachine = async (id) => {
  const response = await api.delete(`/machines.php?id=${id}`);
  return response.data;
};

// ─── Machine Categories Services ────────────────────────────────────

export const fetchMachineCategories = async () => {
  const response = await api.get('/machine_categories.php');
  return response.data?.data || [];
};

export const createMachineCategory = async (categoryData) => {
  const response = await api.post('/machine_categories.php', categoryData);
  return response.data;
};

export const updateMachineCategory = async (id, categoryData) => {
  const response = await api.put(`/machine_categories.php?id=${id}`, categoryData);
  return response.data;
};

export const deleteMachineCategory = async (id) => {
  const response = await api.delete(`/machine_categories.php?id=${id}`);
  return response.data;
};

// ─── Machine Subcategories Services ─────────────────────────────────

export const fetchMachineSubcategories = async (categoryId = null) => {
  const url = categoryId ? `/machine_subcategories.php?category_id=${categoryId}` : '/machine_subcategories.php';
  const response = await api.get(url);
  return response.data?.data || [];
};

export const createMachineSubcategory = async (subcategoryData) => {
  const response = await api.post('/machine_subcategories.php', subcategoryData);
  return response.data;
};

export const updateMachineSubcategory = async (id, subcategoryData) => {
  const response = await api.put(`/machine_subcategories.php?id=${id}`, subcategoryData);
  return response.data;
};

export const deleteMachineSubcategory = async (id) => {
  const response = await api.delete(`/machine_subcategories.php?id=${id}`);
  return response.data;
};

// ─── Machine Enquiries Services ─────────────────────────────────────

export const fetchMachineEnquiries = async () => {
  const response = await api.get('/machine_enquiries.php');
  return response.data?.data || [];
};

export const submitMachineEnquiry = async (enquiryData) => {
  const response = await api.post('/machine_enquiries.php', enquiryData);
  return response.data;
};

