<template>
   <ul class="bg-grey-100 w-full">
        <SearchResultItem v-for="(item, index) in items" :key="`result-${index}`" :item="item"/>
   </ul>
</template>

<script lang="ts" setup>
import SearchResultItem from './SearchResultItem.vue'

const items = [
  {
    title: 'r/hoggit',
    type: 'Communauté',
    members: '92 524',
  },
  {
    title: 'r/hoggit',
    type: 'Communauté',
    members: '92 524',
  },
  {
    title: 'r/hoggit',
    type: 'Communauté',
    members: '92 524',
  }
]
</script>
