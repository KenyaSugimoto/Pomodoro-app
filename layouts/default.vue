<template>
  <v-app dark>
    <Header></Header>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      fixed: false,
    }
  },
}
</script>
