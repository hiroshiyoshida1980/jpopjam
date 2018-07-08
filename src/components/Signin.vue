<template>
  <div class="signin">

    <h2>ログイン</h2>
    <input type="text" placeholder="Email" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button class="raised accent" type="button" @click="signIn">ログイン</button>
    <p>
      <router-link to="/signup">登録がまだの方はこちら </router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          alert('おかえりなさい！')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>

<style>

</style>