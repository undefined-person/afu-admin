import { api, refreshApi } from './api'

export const register = async dto => {
  const { data } = await api.post('auth/register', dto)
  setAccessToken(data.accessToken)
  return data.user
}

export const login = async dto => {
  const { data } = await api.post('auth/login', dto)
  setAccessToken(data.accessToken)
  return data.user
}

export const getCurrentUser = async () => {
  const { data } = await api.get('auth/me')

  setAccessToken(data.accessToken)
  return data.user
}

export const logout = async () => {
  await api.post('auth/logout')
  localStorage.removeItem('token')
}

export const refreshTokens = async () => {
  const { data } = await refreshApi.post('auth/refresh')
  setAccessToken(data.accessToken)
  return data.user
}

export const getAccessToken = () => {
  return localStorage.getItem('token')
}

export const setAccessToken = token => {
  localStorage.setItem('token', token)
}
