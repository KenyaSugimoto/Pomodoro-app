<template>
  <v-row>
    <v-col cols="12">
      <h1>{{ status }}</h1>
    </v-col>
    <v-col cols="12">
      <h1>{{ remainingTime }}</h1>
    </v-col>
    <v-col>
      <v-btn @click="timerButtonMethod"> {{ timerButtonLabel }} </v-btn>
      <v-btn @click="resetRemainingTime">リセット</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { initWorkTime, zeroPadding } from '@/utils/utils'
export default {
  data() {
    return {
      remainingSecond: initWorkTime,
      status: 'ポモドーロ',
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
        }, 1000)
      }
    },
    changeStatus(targetStatus) {
      if (targetStatus === 'pause') {
        this.status = '一時停止中'
        this.timerButtonLabel = '再開'
        this.isWorkingTimer = false
      } else if (targetStatus === 'work') {
        this.status = '作業中'
        this.timerButtonLabel = '一時停止'
        this.isWorkingTimer = true
      } else if (targetStatus === 'break') {
        this.status = '休憩中'
        this.timerButtonLabel = '一時停止'
        this.isWorkingTimer = false
      }
    },
    resetRemainingTime() {
      clearInterval(this.timer)
      this.status = 'ポモドーロ'
      this.timerButtonLabel = 'スタート'
      this.isWorkingTimer = false
      this.remainingSecond = initWorkTime
    },
  },
}
</script>
