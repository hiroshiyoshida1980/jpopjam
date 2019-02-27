// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue-croppa/dist/vue-croppa.css'

import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

import Croppa from 'vue-croppa'

 Vue.use(Croppa) 
 
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
 
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyDnf1eiO5vB9uwQGYoPCUfapi_6KVY13qk",
  authDomain: "jpopjam0813.firebaseapp.com",
  databaseURL: "https://jpopjam0813.firebaseio.com",
  projectId: "jpopjam0813",
  storageBucket: "jpopjam0813.appspot.com",
  messagingSenderId: "846963922708"
};
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

