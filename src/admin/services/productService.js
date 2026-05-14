import axios from 'axios';
import { API_BASE_URL, resolveImageUrl } from '../../config/api';

export const CATEGORY_OPTIONS = [
  'Pneumatic Actuators',
  'Air Preparation Units',
  'Pneumatic Fittings',
  'Pneumatic Valves',
  'Manual Valves',
  'Vacuum Products',
  'Pneumatic Tubes',
  'Pneumatic Accessories',
];
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

const normalizeProduct = (product) => ({
  ...product,
  id: product._id || product.id,
  image: resolveImageUrl(product.image),
  productName: product.title || product.productName || '',
  technicalDetails: Array.isArray(product.specifications)
    ? product.specifications.join('\n')
    : product.specifications || product.technicalDetails || '',
  features: Array.isArray(product.features) ? product.features.join(', ') : product.features || '',
  specifications: Array.isArray(product.specifications)
    ? product.specifications.join('\n')
    : product.specifications || '',
});

const toArrayFromInput = (value) =>
  (value || '')
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

export const getProducts = async () => {
  const cacheBust = Date.now();
  const response = await api.get(`/products?t=${cacheBust}`);

  if (response.data && response.data.success === false) {
    throw new Error(response.data.message || 'Unable to load products');
  }

  const products = response.data?.data || [];
  return products.map(normalizeProduct);
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return normalizeProduct(response.data?.data);
};

export const addProduct = async (product) => {
  const payload = {
    title: product.title?.trim() || product.productName?.trim() || '',
    category: product.category?.trim() || '',
    image: (product.image || '').trim(),
    description: product.description?.trim() || '',
    features: toArrayFromInput(product.features),
    specifications: toArrayFromInput(product.specifications || product.technicalDetails),
    slug: product.slug?.trim() || (product.title || product.productName || '').toLowerCase().trim().replace(/\s+/g, '-'),
  };

  const response = await api.post('/products', payload);
  return normalizeProduct(response.data?.data);
};

export const updateProduct = async (id, updates) => {
  const payload = {
    title: updates.title?.trim() || updates.productName?.trim() || '',
    category: updates.category?.trim() || '',
    image: updates.image?.trim() || '',
    description: updates.description?.trim() || '',
    features: toArrayFromInput(updates.features),
    specifications: toArrayFromInput(updates.specifications || updates.technicalDetails),
  };

  if (updates.slug?.trim()) {
    payload.slug = updates.slug.trim();
  }

  const response = await api.put(`/products/${id}`, payload);
  return normalizeProduct(response.data?.data);
};

export const uploadImage = async (file, productTitle) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', productTitle);

  const response = await api.post('/upload.php', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.data?.path || response.data?.path;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
