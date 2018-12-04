<template>
  <div class="signup">
    <h2>新規登録</h2>
    <div style="height:20px;"></div>
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

    <a class="button is-danger bd-rainbow" v-bind:disabled="isButtonDisabled1" @click="signUp">登録
      <a v-show="isButtonDisabled1">中:しばらくお待ちください・・</a>
    </a>

    <div style="height:20px;"></div>

    <router-link to="/signin">＞登録済みの方はこちらでログイン</router-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      isButtonDisabled1: false
    };
  },

  methods: {
    signUp: function() {
      this.isButtonDisabled1 = true;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.username, this.password)
            .then(user => {
              var useruid = firebase.auth().currentUser.uid;

              firebase
                .database()
                .ref("loginuser/" + useruid)
                .set({
                  apt: 100,
                  getapt: 0,
                  uid: useruid,
                  played: 0,
                  image:
                    "https://firebasestorage.googleapis.com/v0/b/jpopjam0813.appspot.com/o/user-circle-regular.svg?alt=media&token=3ccba9d4-2976-40cd-977d-687da4c2ef9c",
                  status: "not_entry"
                })

              this.$router.push("/person")
            })
        })
        .catch(error => {
          alert(error.message)

          this.isButtonDisabled1 = false;
        })
    }
  }
};
</script>

<style>
</style>