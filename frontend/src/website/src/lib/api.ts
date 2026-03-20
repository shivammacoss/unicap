/** Same convention as main app frontend/src/config/api.js */
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:5001'
export const API_URL = `${API_BASE_URL}/api`

export function getPublicUploadUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) return ''
  if (imageUrl.startsWith('http')) return imageUrl
  const p = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
  return `${API_BASE_URL}${p}`
}
