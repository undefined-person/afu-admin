<template>
  <div class="news-view">
    <div class="container quillWrapper">
      <h2>{{ this.newsTitle }}</h2>
      <img :src="blogCoverPhoto" alt="" />
      <div class="news-content ql-editor" v-html="newsText"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPreview',
  computed: {
    newsTitle() {
      return this.$store.state.newsTitle
    },
    newsText() {
      return this.$store.state.newsText
    },
    blogCoverPhoto() {
      return this.$store.state.newsPhotoFileURL
    },
  },
}
</script>

<style lang="scss">
.news-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
