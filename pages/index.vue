<template>
  <v-row>
    <v-col cols="12">
      <h1>Login page</h1>
    </v-col>
    <v-col>
      <v-btn @click="goMainPage">ゲストログイン</v-btn>
      <v-btn @click="authGoogle">Google ログイン</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import { auth } from '@/utils/firebase'
export default {
  methods: {
    goMainPage() {
      this.$router.push('/main')
    },
    authGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          // The signed-in user info.
          const uid = result.user.uid
          console.log('token: ', token)
          console.log('uid: ', uid)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
