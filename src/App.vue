<template>
  <RouterView name="Navbar" />

  <main :class="{'vh-100 centered': authStore.loading}">
    <RouterView/>
  </main>

  <RouterView name="BottomNavigation" />
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app.store";

/*STORE*/
const authStore = useAppStore()
</script>

<style lang="scss" scoped>
main {
  padding-bottom: var(--bottom-nav-height);
}
</style>
