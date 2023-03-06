<template>
  <div class="bg-black px-3 py-2 flex gap-3 items-center justify-center">
    <TextInput show-reset type="search" id="search" v-model:value="searchInput" />
    <router-link class="btnAnnuler" to="/">
      Annuler
    </router-link>
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
.btnAnnuler{
  width: 10vh;
  font-size: 12px;
  color: var(--grey-700);
}

</style>
