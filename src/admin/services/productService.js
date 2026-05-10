import axios from 'axios';

export const CATEGORY_OPTIONS = ['Pump Systems', 'Valves', 'Motors', 'Filters', 'Bearings', 'Controls'];
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
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
  const response = await api.get('/api/products');
  const products = response.data?.data || [];
  return products.map(normalizeProduct);
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
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

  const response = await api.post('/api/products', payload);
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

  const response = await api.put(`/api/products/${id}`, payload);
  return normalizeProduct(response.data?.data);
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};
