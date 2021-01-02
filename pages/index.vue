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
  data() {
    return {
      userName: null,
    }
  },
  methods: {
    goMainPage() {
      console.log(this.$store)
      this.$router.push('/main')
    },

    updateUserInfo(userName) {
      console.log('updateUserInfo')
      this.$store.commit('user/updateUserName', userName)
    },

    authGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth
        .signInWithPopup(provider)
        .then(async (result) => {
          const additionalUserInfo = result.additionalUserInfo
          const isNewUser = additionalUserInfo.isNewUser
          const photoURL = additionalUserInfo.profile.picture
          const familyName = additionalUserInfo.profile.family_name
          const givenName = additionalUserInfo.profile.given_name

          // 有効なidトークンを取得
          const idTokenPromise = auth.currentUser.getIdToken(true)
          const idToken = await idTokenPromise

          // サーバに送信するデータを生成
          const sendData = {
            idToken,
            photoURL,
            familyName,
            givenName,
            isNewUser,
          }

          // サーバに検証をリクエスト
          axios
            .post('/id_token', sendData)
            .then((res) => {
              // 検証後、ユーザ情報を受け取る
              const data = res.data
              const verified = data.verified
              if (verified) {
                const uid = data.uid
                const userName = data.userName
                const totalWorkTime = data.totalWorkTime

                // Vuexに更新
                this.$store.commit('user/updateUid', uid)
                this.$store.commit('user/updateUserName', userName)
                this.$store.commit('user/updateTotalWorkTime', totalWorkTime)

                // メインページへ遷移
                this.$router.push('/main')
              } else {
                console.log('検証できませんでした')
              }
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
