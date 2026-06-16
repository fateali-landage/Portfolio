import API from './api'

const authService = {
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password })
    return response.data
  },
  
  logout: async () => {
    const response = await API.post('/auth/logout')
    return response.data
  },
  
  getProfile: async () => {
    const response = await API.get('/auth/profile')
    return response.data
  }
}

export default authService
