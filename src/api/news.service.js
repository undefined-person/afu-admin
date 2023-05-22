import { api } from './api'

export const createNews = async dto => {
  const { data } = await api.post('news', dto)
  return data
}

export const getAllNews = async () => {
  const { data } = await api.get('news')
  return data
}

export const getNewsById = async id => {
  const { data } = await api.get(`news/${id}`)
  return data
}

export const updateNews = async (id, dto) => {
  const { data } = await api.put(`news/${id}`, dto)
  return data
}

export const deleteNews = async id => {
  const { data } = await api.delete(`news/${id}`)
  return data
}

export const uploadCoverPhoto = async file => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post(`news/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}
