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
          const additionalUserInfo = result.additionalUserInfo
          const isNewUser = additionalUserInfo.isNewUser
          const photoURL = additionalUserInfo.profile.picture
          const familyName = additionalUserInfo.profile.family_name
          const givenName = additionalUserInfo.profile.given_name

          // 最新のidトークンを取得
          auth.currentUser.getIdToken(true).then((idToken) => {
            const sendData = {
              idToken,
              photoURL,
              familyName,
              givenName,
              isNewUser,
            }
            // ユーザ認証をサーバにリクエスト
            axios
              .post('/id_token', sendData)
              .then((res) => {
                // 認証後、ユーザ情報を受け取る
                const data = res.data
                const uid = data.uid
                const userName = data.userName
                const totalWorkTime = data.totalWorkTime
                console.log(uid, userName, totalWorkTime)
                // メインページへ遷移
                // this.$router.push('/main')
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
