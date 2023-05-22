<template>
  <div class="news-view" v-if="currentNews">
    <div class="container quillWrapper">
      <h2>{{ this.currentNews.title }}</h2>
      <h4>Опубліковано: {{ new Date(this.currentNews.date).toLocaleString('uk-UA', { dateStyle: 'long' }) }}</h4>
      <img :src="this.currentNews.newsCoverPhoto" alt="" />
      <div class="news-content ql-editor" v-html="this.currentNews.text"></div>
    </div>
  </div>
</template>

<script>
import { getNewsById } from '../api/news.service'

export default {
  name: 'ViewNews',
  data() {
    return {
      currentNews: null,
    }
  },
  async mounted() {
    await getNewsById(this.$route.params.newsId).then(data => {
      this.currentNews = data
    })
  },
}
</script>

<style lang="scss">
.news-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
