import API from './api'

const certificateService = {
  getAll: async () => {
    const response = await API.get('/certificates')
    return response.data
  },

  create: async (certData) => {
    const response = await API.post('/certificates', certData)
    return response.data
  },

  update: async (id, certData) => {
    const response = await API.put(`/certificates/${id}`, certData)
    return response.data
  },

  delete: async (id) => {
    const response = await API.delete(`/certificates/${id}`)
    return response.data
  }
}

export default certificateService
