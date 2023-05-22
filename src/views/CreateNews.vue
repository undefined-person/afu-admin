<template>
  <div class="create-news">
    <NewsCoverPreview v-show="this.$store.state.newsPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p>
          <span>Помилка:</span>
          {{ this.errorMsg }}
        </p>
      </div>
      <div class="news-info">
        <input type="text" placeholder="Введіть заголовок новини" v-model="newsTitle" />
        <div class="upload-file">
          <label for="news-photo">Завантажити обкладинку</label>
          <input type="file" ref="newsPhoto" id="news-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.newsPhotoFileURL }">Переглянути обкладинку</button>
          <span>Обраний файл: {{ this.$store.state.newsPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="newsText" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="news-actions">
        <button @click="uploadBlog">Опублікувати</button>
        <router-link class="router-button" :to="{ name: 'NewsPreview' }">Попередній перегляд</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCoverPreview from '../components/NewsCoverPreview.vue'
import Loading from '../components/Loading'
import { uploadCoverPhoto, createNews } from '../api/news.service'

import Quill from 'quill'
window.Quill = Quill
const ImageResize = require('quill-image-resize-module').default
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'CreateNews',
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    }
  },
  components: {
    NewsCoverPreview,
    Loading,
  },
  methods: {
    fileChange() {
      this.file = this.$refs.newsPhoto.files[0]
      const fileName = this.file.name
      this.$store.commit('fileNameChange', fileName)
      this.$store.commit('createFileURL', URL.createObjectURL(this.file))
    },

    openPreview() {
      this.$store.commit('openPhotoPreview')
    },

    async imageHandler(file, Editor, cursorLocation, resetUploader) {
      const { fileUrl } = await uploadCoverPhoto(file)
      Editor.insertEmbed(cursorLocation, 'image', fileUrl)
      resetUploader()
    },

    async uploadBlog() {
      if (this.newsTitle.length !== 0 && this.newsText.length !== 0) {
        if (this.file) {
          this.loading = true

          await uploadCoverPhoto(this.file)
            .then(async data => {
              const { fileUrl } = data

              const postData = {
                text: this.newsText,
                newsCoverPhoto: fileUrl,
                newsCoverPhotoName: this.blogCoverPhotoName,
                title: this.newsTitle,
              }

              await createNews(postData)
                .then(data => {
                  this.loading = false
                  this.$router.push({ name: 'ViewNews', params: { newsId: data._id } })
                })
                .catch(error => {
                  console.log(error)
                  this.loading = false
                })
            })
            .catch(error => {
              console.log(error)
              this.loading = false
            })
          return
        }
      }
      this.error = true
      this.errorMsg = 'Please ensure Blog Title & Blog Post has been filled!'
      setTimeout(() => {
        this.error = false
      }, 5000)
      return
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId
    },
    blogCoverPhotoName() {
      return this.$store.state.newsPhotoName
    },
    newsTitle: {
      get() {
        return this.$store.state.newsTitle
      },
      set(payload) {
        this.$store.commit('updateNewsTitle', payload)
      },
    },
    newsText: {
      get() {
        return this.$store.state.newsText
      },
      set(payload) {
        this.$store.commit('newNews', payload)
      },
    },
  },
}
</script>

<style lang="scss">
.create-news {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .news-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .news-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
