import axios from 'axios'

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  if (!url.endsWith('/api') && !url.endsWith('/api/')) {
    url = url.replace(/\/$/, '') + '/api'
  }
  return url.replace(/\/$/, '')
}

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add authorization token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration/invalidity
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken')
      if (window.location.pathname.includes('/admin/dashboard')) {
        window.location.href = '/admin'
      }
    }
    return Promise.reject(error)
  }
)

export default API
