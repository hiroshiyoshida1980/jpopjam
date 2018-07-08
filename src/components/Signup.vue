<template>
  <div class="signup">

    <h2>新規登録</h2>
    <input type="text" placeholder="Email" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <input type="txt" id="nameInput" v-model="name" placeholder="ニックネーム">
    </input>
    <button class="raised accent" type="button"  @click="signUp">登録！</button>


    <p>
      <router-link to="/signin">登録済みの方はこちらでログイン </router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      username: '',
      password: '',
    }
  },


  methods: {
    signUp: function () {

      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {

          if (this.name == "") {
            alert("名前を入力してください");
          } else {
            alert("ようこそ" + this.name + "さん！");

            var user = firebase.auth().currentUser;
            var useruid = firebase.auth().currentUser.uid;

            firebase
              .database()
              .ref("loginuser/" + useruid)
              .set({
                name: this.name,
                apt: 100,
                getapt: 0,
                uid: useruid
              });

              user.updateProfile({
              displayName: this.name
            });

        firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
        this.$router.push('/')
        },
      )

          }

        })
        .catch(error => {
          alert(error.message)
        })


    
    
    },


       
  }
}
</script>

<style>

</style>