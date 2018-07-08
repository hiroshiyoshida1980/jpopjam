// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'


Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyBNXYclFZtfW_hEH-YXvCCFQiloUq-GHDM",
    authDomain: "fire-vue-fa684.firebaseapp.com",
    databaseURL: "https://fire-vue-fa684.firebaseio.com",
    projectId: "fire-vue-fa684",
    storageBucket: "fire-vue-fa684.appspot.com",
    messagingSenderId: "710639443348"
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

