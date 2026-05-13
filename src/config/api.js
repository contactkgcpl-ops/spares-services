const LIVE_API_BASE_URL = 'https://spares.salvinindia.com/public/api';
const LIVE_UPLOAD_BASE_URL = 'https://spares.salvinindia.com/public/uploads';

const sanitizeBaseUrl = (url) => (url || '').toString().trim().replace(/\/+$/, '');

export const API_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL || LIVE_API_BASE_URL
);

export const UPLOAD_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_UPLOAD_BASE_URL || LIVE_UPLOAD_BASE_URL
);
