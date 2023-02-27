<template>
  <div class="z-index-10 bt-2 border-grey-500 gap-4 bg-grey-200 flex w-full justify-center items-center sticky bottom-0"
       style="height: var(--bottom-nav-height)">
    <div v-for="(tab, index) in tabs"
         :key="tab.name"
         :class="[
          {'justify-end': index === 0},
          {'justify-start': index === tabs.length - 1}
          ]"
         class="bottom__tab--item h-full flex-1 flex justify-center items-center cursor-pointer">
      <router-link :to="tab.to">
        <component
            :fillColor="route.path === tab.to ? 'var(--white)': 'var(--grey-700)'"
            :size="28"
            :is="tab.icon"/>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeIcon from 'vue-material-design-icons/Home.vue';
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import PersonIcon from 'vue-material-design-icons/Account.vue';
import { useRoute } from "vue-router";

const route = useRoute()

const tabs = [
  {
    name: "home",
    icon: HomeIcon,
    to: "/"
  },
  {
    name: "create",
    icon: PlusIcon,
    to: "/create-community"
  },
  {
    name: "user",
    icon: PersonIcon,
    to: "/u/toto"
  },
]
</script>

<style lang="scss">
.bottom__tab--item:hover svg {
  fill: var(--grey-800);
}
</style>
