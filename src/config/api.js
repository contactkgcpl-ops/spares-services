const LOCAL_API_BASE_URL = 'http://localhost/spares-service/public/api';
const LOCAL_UPLOAD_BASE_URL = 'http://localhost/spares-service/public/uploads';

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

export const API_BASE_URL = sanitizeBaseUrl(LOCAL_API_BASE_URL);
export const UPLOAD_BASE_URL = sanitizeBaseUrl(LOCAL_UPLOAD_BASE_URL);

export const buildApiUrl = (path = '') => `${API_BASE_URL}/${normalizePath(path)}`;

export const resolveImageUrl = (value = '') => {
  const source = (value || '').toString().trim();
  if (!source) return '';
  if (source.startsWith('data:') || /^https?:\/\//i.test(source)) {
    return source;
  }

  const clean = source.replace(/^\/+/, '');
  if (clean.startsWith('uploads/')) {
    return `${UPLOAD_BASE_URL}/${clean.slice('uploads/'.length)}`;
  }

  return `${UPLOAD_BASE_URL}/${clean}`;
};
