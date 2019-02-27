<template>
  <div class="signin">
    <div style="height:10px;"></div>
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <input v-model="username" class="input" type="email" placeholder="Email input">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div v-if="isLoading">
      <a class="button is-danger" @click="signIn" v-bind:disabled="isButtonDisabled1">
        <i class="fas fa-lock"></i> ログイン
        <a v-show="isButtonDisabled1">中:しばらくお待ちください・・</a>
      </a>
    </div>
    <div v-else>
      <a class="button is-danger is-loading">Loading</a>
    </div>

    <div style="height:20px;"></div>

    <router-link to="/signup">
      <B>はじめてですか？？</B>＞新規登録エントリーはこちら。
    </router-link>


  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signin",
  data: function() {
    return {
      username: "",
      password: "",
      isButtonDisabled1: false,
      isLoading: true
    };
  },
  methods: {
    signIn: function() {
      this.isLoading = false;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          user => {
            var useruid = firebase.auth().currentUser.uid;

            firebase
              .database()
              .ref("loginuser/" + useruid + "/status")
              .once("value", snapshot => {
                if (snapshot.val() == "") {
                  firebase
                    .database()
                    .ref("loginuser/" + useruid)
                    .update({
                      apt: 5,
                      played: 0,
                      status: "not_entry"
                    })

                  this.$router.push("/person")
                } else {
                  this.$router.push("/")
                }
              })
          },
          err => {
            alert("ログインに失敗しました")
            this.isLoading = true;
          }
        )
    }
  }
};
</script>

<style>
</style>