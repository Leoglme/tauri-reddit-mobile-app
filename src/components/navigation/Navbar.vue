<template>
  <div class="px-1 fixed top-0 bb-2 border-grey-500 bg-grey-100 flex justify-between w-full items-center" style="height: 54px;">
    <SelectFilter/>

    <div class="flex items-center gap-2">
      <MagnifyIcon fill-color="var(--grey-700)" :size="28"/>
      <Avatar :size="32"/>
    </div>
  </div>
</template>


<script lang="ts" setup>
import SelectFilter from "../../components/data-input/SelectFilter.vue"
import Avatar from "../../components/data-display/Avatar.vue"
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';

</script>
