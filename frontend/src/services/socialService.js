import API from './api'

const socialService = {
  getAll: async () => {
    const response = await API.get('/social-links')
    return response.data
  },

  create: async (socialData) => {
    const response = await API.post('/social-links', socialData)
    return response.data
  },

  update: async (id, socialData) => {
    const response = await API.put(`/social-links/${id}`, socialData)
    return response.data
  },

  delete: async (id) => {
    const response = await API.delete(`/social-links/${id}`)
    return response.data
  }
}

export default socialService
