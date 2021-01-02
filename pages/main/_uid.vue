<template>
  <v-row>
    <v-col cols="12">
      <h1>{{ displayStatus }}</h1>
      <p>ようこそ {{ $store.getters['user/userName'] }}</p>
      <p>累積作業時間 : {{ $store.getters['user/totalWorkTime'] }}秒</p>
    </v-col>
    <v-col cols="12">
      <h1>{{ remainingTime }}</h1>
    </v-col>
    <v-col>
      <v-btn @click="timerButtonMethod"> {{ timerButtonLabel }} </v-btn>
      <v-btn @click="resetPomodoroWork">リセット</v-btn>
      <v-btn @click="goLoginPage">ログインページへ戻る</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { initWorkTime, initBreakTime, zeroPadding } from '@/utils/utils'
import axios from '@/utils/axios'
export default {
  data() {
    return {
      remainingSecond: initWorkTime,
      displayStatus: 'ポモドーロ',
      isWorkingTimer: false,
      timerType: 'work',
      timerButtonLabel: 'スタート',
      timer: null,
    }
  },

  computed: {
    remainingTime() {
      const min = zeroPadding(Math.floor(this.remainingSecond / 60), 2)
      const second = zeroPadding(this.remainingSecond % 60, 2)
      return `${min} : ${second}`
    },
  },

  created() {
    console.log('created')
    const uid = this.$route.params.uid

    // サーバからユーザ情報を取得
    this.fetchUserInfo(uid)
  },

  methods: {
    timerButtonMethod() {
      if (this.isWorkingTimer) {
        // タイマーを一時停止する処理
        this.changeStatus('pause')
        clearInterval(this.timer)
      } else {
        // タイマーを開始する処理
        if (this.timerType === 'work') this.changeStatus('work')
        else this.changeStatus('break')

        this.timer = setInterval(() => {
          if (this.remainingSecond > 0) this.remainingSecond -= 1
          else {
            this.switchTimerType()
          }
        }, 1000)
      }
    },
    changeStatus(targetStatus) {
      if (targetStatus === 'pause') {
        this.displayStatus =
          this.timerType === 'work' ? '作業 一時停止中' : '休憩 一時停止中'
        this.timerButtonLabel = '再開'
        this.isWorkingTimer = false
      } else if (targetStatus === 'work') {
        this.displayStatus = '作業中'
        this.timerButtonLabel = '一時停止'
        this.isWorkingTimer = true
      } else if (targetStatus === 'break') {
        this.displayStatus = '休憩中'
        this.timerButtonLabel = '一時停止'
        this.isWorkingTimer = true
      }
    },
    switchTimerType() {
      if (this.timerType === 'work') {
        this.timerType = 'break'
        this.changeStatus('break')
        this.remainingSecond = initBreakTime
      } else {
        this.timerType = 'work'
        this.changeStatus('work')
        this.remainingSecond = initWorkTime
      }
    },
    resetPomodoroWork() {
      clearInterval(this.timer)
      this.displayStatus = 'ポモドーロ'
      this.timerButtonLabel = 'スタート'
      this.isWorkingTimer = false
      this.remainingSecond = initWorkTime
    },
    fetchUserInfo(uid) {
      axios
        .post('/user_info', { uid })
        .then((res) => {
          console.log('user_info', res)
          const data = res.data
          // 登録されていないuidでアクセスされた場合、強制的にログインページに戻る
          if (data.error) {
            // ポップアップ的なやつ出す？

            this.$router.push('/')
          }
          const uid = data.uid
          const userName = data.userName
          const totalWorkTime = data.totalWorkTime

          this.updateUserInfo(uid, userName, totalWorkTime)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goLoginPage() {
      this.$router.push('/')
    },
    updateUserInfo(uid, userName, totalWorkTime) {
      // Vuexに更新
      this.$store.commit('user/updateUid', uid)
      this.$store.commit('user/updateUserName', userName)
      this.$store.commit('user/updateTotalWorkTime', totalWorkTime)
    },
  },
}
</script>
