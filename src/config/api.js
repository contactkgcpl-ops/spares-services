const DEFAULT_API_BASE_URL = '/spares/api';
const DEFAULT_UPLOAD_BASE_URL = '/spares/upload';

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

const filenameFromUploadPath = (value) => {
  const source = (value || '').toString().trim();
  if (!source) return '';

  try {
    const parsed = new URL(
      source,
      typeof window !== 'undefined' ? window.location.origin : undefined
    );
    const endpointFile = parsed.searchParams.get('file');
    if (/\/uploads\.php$/i.test(parsed.pathname) && endpointFile) {
      return endpointFile;
    }

    const match = parsed.pathname.match(/(?:^|\/)uploads?\/([^?#]+)/i);
    if (match?.[1]) {
      return match[1].split('/').filter(Boolean).pop() || '';
    }
  } catch {
    // Relative paths are handled below.
  }

  const clean = source.split(/[?#]/)[0].replace(/\\/g, '/').replace(/^\/+/, '');
  const uploadMatch = clean.match(/(?:^|\/)uploads?\/(.+)$/i);
  if (uploadMatch?.[1]) {
    return uploadMatch[1].split('/').filter(Boolean).pop() || '';
  }

  if (!clean.includes('/') && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(clean)) {
    return clean;
  }

  return '';
};

const buildUploadUrl = (filename) =>
  `${UPLOAD_BASE_URL}/${filename.replace(/^\/+/, '')}`;

export const resolveImageUrl = (value = '') => {
  const source = (value || '').toString().trim();
  if (!source) return '';

  if (source.startsWith('data:')) {
    return source;
  }

  const uploadFilename = filenameFromUploadPath(source);
  if (uploadFilename) {
    return buildUploadUrl(uploadFilename);
  }

  if (/^https?:\/\//i.test(source)) {
    return source;
  }

  if (source.startsWith('/')) {
    return source;
  }

  return `${UPLOAD_BASE_URL}/${source.replace(/^\/+/, '')}`;
};
