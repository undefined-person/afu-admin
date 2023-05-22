<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Вже маєте аккаунт?
        <router-link class="router-link" :to="{ name: 'Login' }">Ввійти</router-link>
      </p>
      <h2>Створіть свій аккаунт</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Ім'я" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Прізвище" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Логін користувача" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Пароль" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="signUp">Реєстрація</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import password from '../assets/Icons/lock-alt-solid.svg'
import user from '../assets/Icons/user-alt-light.svg'

import { register } from '../api/auth.service.js'
export default {
  name: 'Register',
  components: {
    password,
    user,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      error: null,
      errorMsg: '',
    }
  },
  methods: {
    async signUp() {
      if (this.email !== '' && this.password !== '' && this.firstName !== '' && this.lastName !== '' && this.username !== '') {
        this.error = false
        this.errorMsg = ''
        await register({ firstName: this.firstName, lastName: this.lastName, username: this.username, password: this.password })
        this.$router.push({ name: 'Home' }) 
        return
      }
      this.error = true
      this.errorMsg = 'Please fill out all the fields!'
      return
    },
  },
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
