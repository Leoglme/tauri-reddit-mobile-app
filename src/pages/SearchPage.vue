<template>
  <div class="bg-black px-3 py-2 flex items-center justify-center">
    <TextInput show-reset type="search" id="search" v-model:value="searchInput" />
  </div>
  <SearchResultList :searchInput="searchInput"/>
</template>

<script lang="ts" setup>
import TextInput from "@/components/data-input/TextInput.vue"
import SearchResultList from "@/components/data-display/SearchResultList.vue"
import {ref} from "vue";

let searchInput = ref("")

</script>


<style scoped>

</style>
