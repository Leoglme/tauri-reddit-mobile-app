<template>
  <button @click="authStore.disconnect" class="btn btn-small" data-variant="red">Déconnexion</button>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore()
</script>
