<template>
  <v-row>
    <v-col cols="12">
      <h1>{{ displayStatus }}</h1>
    </v-col>
    <v-col>
      <v-img
        :src="$store.getters['user/photoURL']"
        class="photo"
        height="50px"
        width="50px"
      ></v-img>
      <p>ようこそ {{ $store.getters['user/userName'] }} さん</p>
      <p>継続作業時間 {{ workTime }}</p>
      <p>累積作業時間 {{ totalWorkTime }}</p>
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
      countTime: 0,
      updatedTotalWorkTime: false,
    }
  },

  computed: {
    remainingTime() {
      const min = zeroPadding(Math.floor(this.remainingSecond / 60), 2)
      const sec = zeroPadding(this.remainingSecond % 60, 2)
      return `${min} : ${sec}`
    },
    workTime() {
      const min = zeroPadding(Math.floor(this.countTime / 60), 2)
      const sec = zeroPadding(this.countTime % 60, 2)
      return `${min} : ${sec}`
    },
    totalWorkTime() {
      const totalWorkSeconds =
        this.$store.getters['user/totalWorkTime'] + this.countTime
      const hour = Math.floor(totalWorkSeconds / 3600)
      const min = zeroPadding(Math.floor(totalWorkSeconds / 60), 2)
      return `${hour}時間 ${min}分`
    },
  },

  created() {
    // URLからuidを取得
    const uid = this.$route.params.uid

    // サーバからユーザ情報を取得
    this.fetchUserInfo(uid)
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')

    if (this.timerType === 'work') {
      const answer = window.confirm('作業の途中ですが終了しますか？')
      if (answer) {
        // 作業時間を更新する処理
        this.requestForTotalWorkTimeUpdate()
        clearInterval(this.timer)
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  destroyed() {
    console.log('destoryed')
    clearInterval(this.timer)
  },

  methods: {
    confirmSave(event) {
      event.returnValue = ''
    },
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
          if (this.remainingSecond > 0) {
            this.remainingSecond -= 1
            // もし作業中ならカウント
            if (this.timerType === 'work') {
              this.countTime += 1
              this.updatedTotalWorkTime = false
            } else if (
              this.timerType === 'break' &&
              !this.updatedTotalWorkTime
            ) {
              this.requestForTotalWorkTimeUpdate()
              this.updatedTotalWorkTime = true
            }
          } else {
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
    goLoginPage() {
      this.$router.push('/')
    },
    fetchUserInfo(uid) {
      axios
        .post('/user_info', { uid })
        .then((res) => {
          console.log('user_info', res)
          const data = res.data
          // 登録されていないuidでアクセスされた場合、強制的にログインページに戻る
          if (data.error) {
            this.$router.push('/')
          }
          const uid = data.uid
          const userName = data.userName
          const totalWorkTime = data.totalWorkTime
          const photoURL = data.photoURL

          this.updateUserInfo(uid, userName, totalWorkTime, photoURL)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateUserInfo(uid, userName, totalWorkTime, photoURL) {
      // Vuexに更新
      this.$store.commit('user/updateUid', uid)
      this.$store.commit('user/updateUserName', userName)
      this.$store.commit('user/updateTotalWorkTime', totalWorkTime)
      this.$store.commit('user/updatePhotoURL', photoURL)
    },
    async requestForTotalWorkTimeUpdate() {
      const uid = this.$store.getters['user/uid']
      const totalWorkTime =
        this.$store.getters['user/totalWorkTime'] + this.countTime

      const sendData = {
        uid,
        totalWorkTime,
      }

      const promise = axios.post('/worked', sendData)
      const success = await promise

      if (!success) {
        console.log('作業時間を更新できませんでした。')
      }
    },
  },
}
</script>
