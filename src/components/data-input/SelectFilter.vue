<template>
  <div>
    <button @click="handleClick"
            class="text-grey-800 flex items-center justify-center gap-1 bg-grey-400 font-semibold px-1 py-1 radius">
      Accueil <ChevronDownIcon :class="open ? 'rotate-up' : 'rotate-reset'" :size="22"/>
    </button>
  </div>
</template>


<script lang="ts" setup>
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
import { ref } from "vue";

/*Refs*/
const open = ref(false)

/*Methods*/
const handleClick = () => {
  open.value = !open.value
}
</script>
