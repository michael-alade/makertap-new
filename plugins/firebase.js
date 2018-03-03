import firebase from 'firebase'
import Vue from 'vue'

var config = {
  apiKey: "AIzaSyA58ujgOrCLM-60_OLmtcVYXhiiOldNvro",
  authDomain: "makertap-5c69c.firebaseapp.com",
//   databaseURL: "https://nuxt-firebase-auth.firebaseio.com",
//   projectId: "nuxt-firebase-auth",
//   storageBucket: "nuxt-firebase-auth.appspot.com",
//   messagingSenderId: "316484287956"
}

firebase.initializeApp(config)

Vue.prototype.$firebase = firebase