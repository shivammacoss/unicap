// API Configuration - Use environment variable for production
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
export const API_URL = `${API_BASE_URL}/api`

// Domain configuration for different services
export const DOMAINS = {
  TRADE: import.meta.env.VITE_TRADE_URL || '',
  API: API_BASE_URL
}
