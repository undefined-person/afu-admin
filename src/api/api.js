import axios from 'axios'
import { getAccessToken, logout, refreshTokens } from './auth.service.js'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
})

export const refreshApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (config?.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  config => config,
  async error => {
    const { response, config } = error
    if (response) {
      if (response.status === 401 && config && !config.__isRetryRequest) {
        try {
          await refreshTokens()
        } catch (e) {
          logout()
          window.location.replace('/login')
          return Promise.reject(error)
        }
        config.__isRetryRequest = true
        return api(config)
      }
    }
    return Promise.reject(error)
  }
)
