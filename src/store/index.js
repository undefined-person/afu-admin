import Vue from 'vue'
import Vuex from 'vuex'

import { deleteNews, getAllNews } from '../api/news.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    news: [],
    newsText: '',
    newsTitle: '',
    newsPhotoName: '',
    newsPhotoFileURL: null,
    newsPhotoPreview: null,
    editPost: null,
    user: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    newNews(state, payload) {
      state.newsText = payload
    },
    updateNewsTitle(state, payload) {
      state.newsTitle = payload
    },
    fileNameChange(state, payload) {
      state.newsPhotoName = payload
    },
    createFileURL(state, payload) {
      state.newsPhotoFileURL = payload
    },
    openPhotoPreview(state) {
      state.newsPhotoPreview = !state.newsPhotoPreview
    },
    toggleEditNews(state, payload) {
      state.editPost = payload
    },
    setCurrentNews(state, payload) {
      state.newsTitle = payload.title
      state.newsText = payload.text
      state.newsPhotoFileURL = payload.newsCoverPhoto
      state.newsPhotoName = payload.newsCoverPhotoName
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, user) {
      state.profileId = user._id
      state.profileFirstName = user.firstName
      state.profileLastName = user.lastName
      state.profileUsername = user.username
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') + state.profileLastName.match(/(\b\S)?/g).join('')
    },
    filterNews(state, payload) {
      state.news = state.news.filter(post => post._id !== payload)
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      commit('updateUser', user)
      commit('setProfileInfo', user)
      commit('setProfileInitials')
    },
    async getNews() {
      const news = await getAllNews()
      this.state.news = news
    },
    async deleteNews({ commit }, payload) {
      await deleteNews(payload)
      commit('filterNews', payload)
    },
  },
  modules: {},
})
