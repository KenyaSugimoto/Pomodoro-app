<template>
  <v-card>
    <v-row>
      <v-col>
        <v-img :src="icon" height="40px" width="40px"></v-img>
      </v-col>
      <v-col>
        <template>{{ userName }} さん</template>
        <br />
        <template>ランク: 砂</template>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    icon() {
      return this.$store.getters['user/photoURL']
    },
    userName() {
      return this.$store.getters['user/userName']
    },
  },
}
</script>
