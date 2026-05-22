import axios from 'axios';
import { API_BASE_URL, resolveImageUrl } from '../../config/api';
import { getMockProducts, addMockProduct, updateMockProduct, deleteMockProduct, getMockProductById } from './mockData';

// ─── New 4 Main Categories ───────────────────────────────────────
export const CATEGORY_OPTIONS = [
  'Pneumatic',
  'Mechanical',
  'Electronic',
  'Electric',
];

// ─── Old-to-New Category Mapping ─────────────────────────────────
export const OLD_TO_NEW_CATEGORY_MAP = {
  'Pneumatic Sensors': 'Pneumatic',
  'Pneumatic Actuators': 'Pneumatic',
  'Pneumatic Motors': 'Pneumatic',
  'Pneumatic Grippers': 'Pneumatic',
  'Pneumatic Cylinders': 'Pneumatic',
  'Pneumatic Switches': 'Pneumatic',
  'Pneumatic Fittings': 'Pneumatic',
  'Air Preparation Units': 'Pneumatic',
  'Pneumatic Valves': 'Pneumatic',
  'Pneumatic Accessories': 'Pneumatic',
  'Vacuum Products': 'Pneumatic',
  'Solenoid Valves': 'Pneumatic',
  'Pneumatic Tubes': 'Pneumatic',
  'Flow Control Valves': 'Pneumatic',
  'Hydraulic Flow Control': 'Pneumatic',
  'Automation Control Systems': 'Electronic',
  'Automation Interface Systems': 'Electronic',
  'PLC Modules': 'Electronic',
  'Controllers': 'Electronic',
  'PCB Boards': 'Electronic',
  'Relays': 'Electronic',
  'Electronic Sensors': 'Electronic',
  'Power Supplies': 'Electric',
  'Electrical Switches': 'Electric',
  'Push Buttons': 'Electric',
  'MCB': 'Electric',
  'Industrial Electrical Devices': 'Electric',
  'Manual Valves': 'Mechanical',
  'Bearings': 'Mechanical',
  'Couplings': 'Mechanical',
  'Mechanical Hardware': 'Mechanical',
  'Industrial Mechanical Components': 'Mechanical',
};

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
  try {
    const cacheBust = Date.now();
    const response = await api.get(`/products?t=${cacheBust}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    if (response.data && response.data.success === false) {
      throw new Error(response.data.message || 'Unable to load products');
    }

    const products = Array.isArray(response.data?.data) ? response.data.data : [];

    if (!Array.isArray(products)) {
      throw new Error('Invalid API response format');
    }

    return products.map(normalizeProduct).filter(p => p && p.id);
  } catch (error) {
    console.warn('Backend unavailable, using local storage:', error.message);
    const mockProducts = getMockProducts();
    return Array.isArray(mockProducts) ? mockProducts.map(normalizeProduct) : [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return normalizeProduct(response.data?.data);
  } catch (error) {
    console.warn('Backend unavailable for getProductById, checking local storage:', error.message);
    const mockProduct = getMockProductById(id);
    if (mockProduct) {
      return normalizeProduct(mockProduct);
    }
    throw error;
  }
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

  try {
    const response = await api.post('/products', payload);
    return normalizeProduct(response.data?.data);
  } catch (error) {
    console.error('API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    
    // Fallback: create mock product locally
    console.warn('Backend unavailable, saving to local storage');
    const mockProduct = addMockProduct(payload);
    return normalizeProduct(mockProduct);
  }
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

  try {
    const response = await api.put(`/products/${id}`, payload);
    return normalizeProduct(response.data?.data);
  } catch (error) {
    console.warn('Backend unavailable for updateProduct, using local storage:', error.message);
    const mockProduct = updateMockProduct(id, payload);
    return normalizeProduct(mockProduct);
  }
};

export const uploadImage = async (file, productTitle) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', productTitle);

  try {
    const response = await api.post('/upload.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data?.data?.path || response.data?.path;
  } catch (error) {
    console.error('Image upload error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    // Fallback: return local preview or placeholder
    console.warn('Using local image preview as fallback');
    return URL.createObjectURL(file);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable for deleteProduct, using local storage:', error.message);
    return deleteMockProduct(id);
  }
};

// ─── Migrate existing DB categories to new system ────────────────
export const migrateCategories = async () => {
  const response = await api.post('/products?action=migrate_categories');
  return response.data;
};
