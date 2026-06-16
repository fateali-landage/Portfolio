import API from './api'

const uploadService = {
  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const response = await API.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  uploadResume: async (file) => {
    const formData = new FormData()
    formData.append('resume', file)
    const response = await API.post('/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  uploadFavicon: async (file) => {
    const formData = new FormData()
    formData.append('favicon', file)
    const response = await API.post('/upload/favicon', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

export default uploadService
