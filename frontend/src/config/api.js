// API base: in Vite dev, default to same-origin `/api` (proxied to backend — avoids wrong host / HTML responses).
// Set VITE_API_DIRECT=1 to call VITE_API_URL (or http://127.0.0.1:8000) directly instead.
const isViteDev = import.meta.env.DEV
const direct =
  import.meta.env.VITE_API_DIRECT === '1' ||
  import.meta.env.VITE_API_DIRECT === 'true'
const envBase = (import.meta.env.VITE_API_URL || '').trim()

export const API_BASE_URL = isViteDev && !direct
  ? ''
  : (envBase || 'http://127.0.0.1:8000')

export const API_URL = API_BASE_URL
  ? `${API_BASE_URL.replace(/\/$/, '')}/api`
  : '/api'

// Domain configuration for different services
export const DOMAINS = {
  TRADE: import.meta.env.VITE_TRADE_URL || '',
  API: API_BASE_URL
}
