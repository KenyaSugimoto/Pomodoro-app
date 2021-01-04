<template>
  <v-row>
    <v-col cols="12">
      <h1>ポモドーロトレーニング</h1>
    </v-col>
    <v-col>
      <v-btn @click="authGoogle">
        <v-icon small>mdi-google</v-icon>
        ログイン
      </v-btn>
    </v-col>
    <v-col>
      <v-btn @click="goMainPage">
        <v-icon small>mdi-account</v-icon>
        ゲストログイン
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import { auth } from '@/utils/firebase'
import axios from '@/utils/axios'
import { guestUid } from '@/utils/utils'

export default {
  data() {
    return {
      userName: null,
    }
  },
  methods: {
    goMainPage() {
      this.$router.push({ name: 'main-uid', params: { uid: guestUid } })
    },

    updateUserInfo(uid, userName, totalWorkTime) {
      // Vuexに更新
      this.$store.commit('user/updateUid', uid)
      this.$store.commit('user/updateUserName', userName)
      this.$store.commit('user/updateTotalWorkTime', totalWorkTime)
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

          // サーバへ検証をリクエスト
          const verifyUserPromise = axios.post('/verify', sendData)
          const verifiedResponse = await verifyUserPromise

          // 検証が成功したかどうかを示すフラグ
          const verified = verifiedResponse.data.verified

          if (verified) {
            const uid = verifiedResponse.data.uid

            // メインページへ遷移
            this.$router.push({ name: 'main-uid', params: { uid } })
          } else {
            console.log('検証失敗')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
}
</script>
