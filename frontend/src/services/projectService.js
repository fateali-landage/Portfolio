import API from './api'

const projectService = {
  getAll: async () => {
    const response = await API.get('/projects')
    return response.data
  },

  create: async (projectData) => {
    const response = await API.post('/projects', projectData)
    return response.data
  },

  update: async (id, projectData) => {
    const response = await API.put(`/projects/${id}`, projectData)
    return response.data
  },

  delete: async (id) => {
    const response = await API.delete(`/projects/${id}`)
    return response.data
  }
}

export default projectService
