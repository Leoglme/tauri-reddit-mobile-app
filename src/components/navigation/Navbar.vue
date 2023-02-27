<template>
  <div class="px-2 z-index-10 inherit top-0 bb-2 border-grey-500 bg-grey-100 flex justify-between w-full items-center" style="height: var(--navbar-height)">
    <SelectFilter/>

    <div class="flex items-center gap-4">
      <MagnifyIcon class="cursor-pointer" fill-color="var(--grey-700)" :size="28"/>
      <Avatar :size="32"/>
    </div>
  </div>
</template>


<script lang="ts" setup>
import SelectFilter from "../../components/data-input/SelectFilter.vue"
import Avatar from "../../components/data-display/Avatar.vue"
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

</script>
