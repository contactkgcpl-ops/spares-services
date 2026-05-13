import axios from 'axios';

export const API_BASE_URL = 'http://localhost/spares-service/public/api';
export const UPLOAD_BASE_URL = 'http://localhost/spares-service/public/uploads';

const normalizeBaseUrl = (url) =>
  (url || '')
    .toString()
    .trim()
    .replace(/\/api\/api(?=\/|$)/gi, '/api')
    .replace(/\/+$/, '');

const normalizePath = (path) =>
  (path || '')
    .toString()
    .replace(/^\/+/, '');

const RESOLVED_API_BASE_URL = normalizeBaseUrl(API_BASE_URL);

export const buildApiUrl = (path = '') =>
  `${RESOLVED_API_BASE_URL}/${normalizePath(path)}`;

export const createApiClient = (clientName) => {
  void clientName;
  return axios.create({
    baseURL: RESOLVED_API_BASE_URL,
    headers: {
      Accept: 'application/json',
    },
    timeout: 20000,
  });
};
