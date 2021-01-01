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
import axios from '@/utils/axios'
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
          const idToken = result.credential.idToken
          // The signed-in user info.
          // const uid = result.user.uid

          const sendData = {
            idToken,
          }

          axios
            .post('/id_token', sendData)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
