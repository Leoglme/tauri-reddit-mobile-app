<template>
  <div>
    <RouterView name="Navbar" />

    <main :class="{ 'vh-100 centered': appStore.loading }">
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
