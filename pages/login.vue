<template>
  <v-row>
    <v-col cols="12">
      <h1>Login page</h1>
    </v-col>
    <v-col>
      <v-text-field v-model="id" label="id"></v-text-field>
      <v-text-field
        v-model="password"
        label="password"
        :type="showPass ? 'text' : 'password'"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass = !showPass"
      ></v-text-field>
      <v-btn @click="goMainPage">ログイン</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      password: '',
      showPass: false,
    }
  },
  methods: {
    goMainPage() {
      this.$router.push('/main')
    },
  },
}
</script>
