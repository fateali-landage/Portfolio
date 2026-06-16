import API from './api'

const timelineService = {
  getAll: async () => {
    const response = await API.get('/timeline')
    return response.data
  },

  create: async (timelineData) => {
    const response = await API.post('/timeline', timelineData)
    return response.data
  },

  update: async (id, timelineData) => {
    const response = await API.put(`/timeline/${id}`, timelineData)
    return response.data
  },

  delete: async (id) => {
    const response = await API.delete(`/timeline/${id}`)
    return response.data
  }
}

export default timelineService
