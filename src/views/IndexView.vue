<template>
  <main>
    INDEX TOKEN: {{authStore.access_token}}
  </main>
</template>

<script lang="ts" setup>
  import {useAuthStore} from "../stores/auth.store";

  const authStore = useAuthStore()

</script>

<style lang="scss" scoped>

</style>