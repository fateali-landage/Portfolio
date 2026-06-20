import API from './api'

const CACHE_KEY = 'portfolio_settings'
const CACHE_TIME_KEY = 'portfolio_settings_time'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes in milliseconds

const settingsService = {
  getSettings: async (forceRefresh = false) => {
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY)
        if (cached && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_TTL)) {
          return JSON.parse(cached)
        }
      } catch (err) {
        console.error('Error reading settings cache:', err)
      }
    }

    const response = await API.get('/settings')
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(response.data))
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())
    } catch (err) {
      console.error('Error writing settings cache:', err)
    }
    return response.data
  },

  updateSettings: async (settingsData) => {
    const response = await API.put('/settings', settingsData)
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(response.data))
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())
    } catch (err) {
      console.error('Error updating settings cache:', err)
    }
    return response.data
  }
}

export default settingsService
