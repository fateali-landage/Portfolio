export const getAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('data:')) return path
  
  let backendUrl = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') 
    : 'http://localhost:5000'
    
  backendUrl = backendUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
    
  return `${backendUrl}${cleanPath}`
}
