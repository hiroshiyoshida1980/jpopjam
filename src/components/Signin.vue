<template>
  <div class="signin">

<div class="indexrespimg">
<div class="bg-video-wrap">
  <video src="../assets/jpopjamm.mp4" loop muted autoplay>
  </video>
  <div class="overlay">
  </div>

</div>
    <div class="maintext">
      <p>Be Pop , Not a Snob</p>
    </div>

    <div class="reserveandform">
      <div class="reserve">
        <div class="reservetext">
          <h3>J-POP JAM 〜Valentine's Night〜</h3>
          <p>2/13 (水)　オープン 18:00 / スタート 18:30 <br>
            @渋谷UNDER DEER LOUNGE</p>
        </div>

        <div class="reservebutton0">
          <router-link to="/event">
            <p>イベント詳細</p>
          </router-link>
        </div>
      </div>

      <div class="form">

        <form class="login-form">
          <h3>My Page</h3>
   <div class="field">
      <div class="control">
        <input v-model="username" class="input" type="email" placeholder="Email input">
          <i class="fas fa-envelope"></i>
      </div>
    </div>

    <div class="field">
      <p class="control">
        <input class="input" type="password" placeholder="Password" v-model="password">
          <i class="fas fa-lock"></i>
      </p>
    </div>
    <div v-if="isLoading">
      <div class="reservebutton0" @click="signIn" v-bind:disabled="isButtonDisabled1">
        <p><i class="fas fa-lock"></i>ログイン
        <a v-show="isButtonDisabled1">中:しばらくお待ちください・・</a></p>
      </div>
    </div>
    <div v-else>
      <a class="button is-danger is-loading">Loading</a>
    </div>

    <div style="height:20px;"></div>

    <router-link to="/signup">
      <B>はじめてですか？？</B></br>新規登録エントリーはこちら。
    </router-link>
        </form>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "Signin",
  data: function() {
    return {
      username: "",
      password: "",
      isButtonDisabled1: false,
      isLoading: true
    }
  },
  methods: {
    signIn: function() {
      this.isLoading = false

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          user => {
            var useruid = firebase.auth().currentUser.uid

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
            this.isLoading = true
          }
        )
    }
  }
}
</script>

<style>
.bg-video-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: url(../img/Main1.jpg) no-repeat center center/cover;
  background-attachment: fixed;
}
.indexrespimg{
 background: url(../img/Main1.jpg)center center/cover;
 padding-bottom: 100px;
}
video {
  min-width: 100%;
  min-height: 100vh;
  z-index: 1;
}
.overlay {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(45deg, rgba(0,0,0,.3) 50%, rgba(0,0,0,.7) 50%);
  background-size: 4px 4px;
  z-index: 2;
}



</style>