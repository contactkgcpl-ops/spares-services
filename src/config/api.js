const localOrigin =
  typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : '';

const DEFAULT_API_BASE_URL = '/spares/api';
const DEFAULT_UPLOAD_BASE_URL = '/uploads';

const sanitizeBaseUrl = (url) =>
  (url || '')
    .toString()
    .trim()
    .replace(/\/api\/api(?=\/|$)/gi, '/api')
    .replace(/\/+$/, '');

const normalizePath = (path = '') =>
  (path || '')
    .toString()
    .trim()
    .replace(/^\/+/, '')
    .replace(/^api\/+/i, '');

export const API_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
);
export const UPLOAD_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_UPLOAD_BASE_URL || DEFAULT_UPLOAD_BASE_URL
);

export const buildApiUrl = (path = '') => `${API_BASE_URL}/${normalizePath(path)}`;

export const resolveImageUrl = (value = '') => {
  const source = (value || '').toString().trim();
  if (!source) return '';

  // Already a full URL — return as-is
  if (source.startsWith('data:') || /^https?:\/\//i.test(source)) {
    return source;
  }

  // Handle absolute path from root
  const clean = source.replace(/^\/+/, '');
  
  // Remove 'uploads/' prefix if present so we don't duplicate it
  const filename = clean.replace(/^uploads\//, '');
  
  return `${UPLOAD_BASE_URL}/${filename}`;
};