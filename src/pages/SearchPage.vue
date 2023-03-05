<template>
  <div class="bg-black px-3 py-2 flex items-center justify-center">
    <TextInput
      id="search"
      v-model:value="searchInput"
      show-reset
      type="search"
    />
  </div>
  <SearchResultList :searchInput="searchInput" />
</template>

<script lang="ts" setup>
import TextInput from '@/components/data-input/TextInput.vue'
import SearchResultList from '@/components/data-display/SearchResultList.vue'
import { ref } from 'vue'

const searchInput = ref('')
</script>
