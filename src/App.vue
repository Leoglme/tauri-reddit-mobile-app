<template>
  <div>
    <RouterView name="Navbar" />

    <main :style="appStore.loading ? 'padding-bottom: 0;' : null">
      <RouterView />
    </main>

    <RouterView name="BottomNavigation" />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app.store'

/*STORE*/
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
main {
  padding-bottom: var(--bottom-nav-height);
}
</style>
