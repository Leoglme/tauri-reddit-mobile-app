<template>
  <button
    class="btn btn-small"
    data-variant="red"
    @click="authStore.disconnect"
  >
    Déconnexion
  </button>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
</script>
