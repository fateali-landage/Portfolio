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
  },
  
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    const response = await API.put('/auth/change-password', {
      currentPassword,
      newPassword,
      confirmPassword
    })
    return response.data
  }
}

export default authService
