import API from './api'

const skillService = {
  getAll: async () => {
    const response = await API.get('/skills')
    return response.data
  },

  create: async (skillData) => {
    const response = await API.post('/skills', skillData)
    return response.data
  },

  update: async (id, skillData) => {
    const response = await API.put(`/skills/${id}`, skillData)
    return response.data
  },

  delete: async (id) => {
    const response = await API.delete(`/skills/${id}`)
    return response.data
  }
}

export default skillService
