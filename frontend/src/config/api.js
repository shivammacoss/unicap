// API: VITE_API_URL wins; in dev without it, use same-origin /api (Vite proxy) to avoid CORS and macOS AirPlay on :5000
const stripTrailingSlash = (url) => String(url).replace(/\/$/, '')

const explicit = import.meta.env.VITE_API_URL
export const API_BASE_URL = explicit
  ? stripTrailingSlash(explicit)
  : import.meta.env.DEV
    ? ''
    : 'http://127.0.0.1:5001'

export const API_URL = API_BASE_URL ? `${API_BASE_URL}/api` : '/api'

/** Socket.IO: full backend URL, or current origin when using Vite proxy in dev */
export const SOCKET_IO_URL =
  API_BASE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:5001')
