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
import { initTime, zeroPadding } from '@/utils/utils'
export default {
  data() {
    return {
      remainingSecond: initTime,
      status: '休憩中',
      isWorking: false,
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
      // statusの切り替え
      this.switchStatus()

      // タイマー処理
      if (this.isWorking) {
        // タイマーを開始する処理
        this.timer = setInterval(() => {
          if (this.remainingSecond > 0) this.remainingSecond -= 1
        }, 1000)
      } else {
        // タイマーを一時停止する処理
        clearInterval(this.timer)
      }
    },
    switchStatus() {
      if (this.isWorking) {
        this.status = '休憩中'
        this.timerButtonLabel = 'スタート'
        this.isWorking = false
      } else {
        this.status = '作業中'
        this.timerButtonLabel = '一時停止'
        this.isWorking = true
      }
    },
    resetRemainingTime() {
      clearInterval(this.timer)
      this.status = '休憩中'
      this.timerButtonLabel = 'スタート'
      this.isWorking = false
      this.remainingSecond = initTime
    },
  },
}
</script>
