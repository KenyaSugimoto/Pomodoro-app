<template>
  <v-app-bar flat max-height="100px">
    <v-row>
      <v-col>
        <v-toolbar-title>ポモドーロテクニック タイマー</v-toolbar-title>
      </v-col>
      <v-col>
        <UserStatus></UserStatus>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import UserStatus from '@/components/UserStatus'
export default {
  components: {
    UserStatus,
  },
}
</script>
