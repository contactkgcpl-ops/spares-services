const localOrigin =
  typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : '';

const LOCAL_API_BASE_URL = '/spares/api';
// const LOCAL_UPLOAD_BASE_URL = 'https://spares.salvinindia.com/spares/uploads';
const PRODUCTION_API_BASE_URL = 'https://spares.salvinindia.com/spares/api';
// const PRODUCTION_UPLOAD_BASE_URL = 'https://spares.salvinindia.com/spares/uploads';
const LOCAL_UPLOAD_BASE_URL = '/uploads';
const PRODUCTION_UPLOAD_BASE_URL = 'https://spares.salvinindia.com/uploads';

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
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? LOCAL_API_BASE_URL : PRODUCTION_API_BASE_URL)
);
export const UPLOAD_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_UPLOAD_BASE_URL ||
  (import.meta.env.DEV ? LOCAL_UPLOAD_BASE_URL : PRODUCTION_UPLOAD_BASE_URL)
);

export const buildApiUrl = (path = '') => `${API_BASE_URL}/${normalizePath(path)}`;

// export const resolveImageUrl = (value = '') => {
//   const source = (value || '').toString().trim();
//   if (!source) return '';
//   if (source.startsWith('data:') || /^https?:\/\//i.test(source)) {
//     return source;
//   }

//   const clean = source.replace(/^\/+/, '');
//   if (clean.startsWith('uploads/')) {
//     return `${UPLOAD_BASE_URL}/${clean.slice('uploads/'.length)}`;
//   }

//   return `${UPLOAD_BASE_URL}/${clean}`;
// };
export const resolveImageUrl = (value = '') => {
  const source = (value || '').toString().trim();
  if (!source) return '';

  // Already a full URL — return as-is
  if (source.startsWith('data:') || /^https?:\/\//i.test(source)) {
    return source;
  }

  // Already an absolute path like /uploads/filename.jpg — just prepend domain
  if (source.startsWith('/')) {
    return `https://spares.salvinindia.com${source}`;
  }

  // Relative path like uploads/filename.jpg
  const clean = source.replace(/^uploads\//, '');
  return `https://spares.salvinindia.com/spares/uploads/${clean}`;
};