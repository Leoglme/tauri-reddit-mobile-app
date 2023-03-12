<template>
  <div
    class="z-index-10 bt-2 border-grey-500 gap-4 bg-grey-200 flex w-full justify-between items-center fixed bottom-0"
    style="height: var(--bottom-nav-height)"
  >
    <router-link
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.to"
      class="w-full h-full"
    >
      <div class="bottom__tab--item h-full flex-1 flex justify-center items-center cursor-pointer">
        <component
          :is="tab.icon"
          :fillColor="route.path === tab.to ? 'var(--white)' : 'var(--grey-700)'"
          :size="24"
        />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import HomeIcon from 'vue-material-design-icons/Home.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import PersonIcon from 'vue-material-design-icons/Account.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const route = useRoute()
const authStore = useAuthStore()
const tabs = [
  {
    name: 'home',
    icon: HomeIcon,
    to: '/',
  },
  {
    name: 'search',
    icon: MagnifyIcon,
    to: '/search',
  },
  {
    name: 'create',
    icon: PlusIcon,
    to: '/create-community',
  },
  {
    name: 'user',
    icon: PersonIcon,
    to: '/u/' + authStore.username,
  },
  {
    name: 'settings',
    icon: CogIcon,
    to: '/settings',
  },
]
</script>

<style lang="scss">
.bottom__tab--item:hover svg {
  fill: var(--grey-800);
}
</style>
