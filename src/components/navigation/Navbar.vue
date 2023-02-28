<template>
  <div class="px-2 z-index-10 fixed top-0 bb-2 border-grey-500 bg-grey-100 flex justify-between w-full items-center"
       style="height: var(--navbar-height)">
    <SelectFilter/>

    <div class="flex items-center gap-4">
      <router-link to="/search">
        <MagnifyIcon class="cursor-pointer" fill-color="var(--grey-700)" :size="28"/>
      </router-link>
      <Avatar :image="authStore.userImage" :size="32"/>
    </div>
  </div>
</template>


<script lang="ts" setup>
import SelectFilter from "../../components/data-input/SelectFilter.vue"
import Avatar from "../../components/data-display/Avatar.vue"
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore()
</script>
