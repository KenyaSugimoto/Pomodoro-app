<template>
  <v-row>
    <v-col cols="12">
      <h1>Login page</h1>
    </v-col>
    <v-col>
      <v-text-field label="id"></v-text-field>
      <v-text-field label="password"></v-text-field>
      <v-btn @click="goMainPage">ログイン</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    goMainPage() {
      this.$router.push('/main')
    },
  },
}
</script>
