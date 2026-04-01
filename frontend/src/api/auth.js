import { API_URL as BASE_API_URL } from '../config/api'

const API_URL = `${BASE_API_URL}/auth`

async function parseJsonBody(response) {
  const text = await response.text()
  if (response.status === 502 || response.status === 503) {
    throw new Error(
      'Cannot reach the API (502/503). Start the backend: cd backend && npm run dev (default port 8000), then restart the frontend.'
    )
  }
  if (!text?.trim()) {
    throw new Error(
      'Server returned an empty response. For local dev: run the backend on port 8000 and use npm run dev for the frontend (Vite proxies /api).'
    )
  }
  try {
    return JSON.parse(text)
  } catch {
    const hint =
      text.trimStart().startsWith('<') || text.includes('<!DOCTYPE')
        ? ' Received HTML instead of JSON — usually the backend is not running or the proxy target is wrong.'
        : ''
    throw new Error(
      `Server did not return JSON.${hint} Start backend (port 8000), set VITE_BACKEND_PROXY_TARGET if needed, restart Vite.`
    )
  }
}

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  const data = await parseJsonBody(response)
  if (!response.ok) {
    throw new Error(data.message || 'Signup failed')
  }
  return data
}

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  const data = await parseJsonBody(response)
  if (!response.ok) {
    throw new Error(data.message || 'Login failed')
  }
  return data
}

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  const data = await parseJsonBody(response)
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user')
  }
  return data
}
