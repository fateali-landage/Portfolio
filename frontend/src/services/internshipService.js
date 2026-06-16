import API from './api'

const internshipService = {
  getAll: async () => {
    const response = await API.get('/internships')
    return response.data
  },

  create: async (internshipData) => {
    const response = await API.post('/internships', internshipData)
    return response.data
  },

  update: async (id, internshipData) => {
    const response = await API.put(`/internships/${id}`, internshipData)
    return response.data
  },

  delete: async (id) => {
    const response = await API.delete(`/internships/${id}`)
    return response.data
  }
}

export default internshipService
