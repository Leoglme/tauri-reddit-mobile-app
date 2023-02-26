<template>
  <div class="round bg-primary border-grey-200 flex b-1 border-grey-200"
       :style="`width: ${size}px; height: ${size}px; ${isDefaultImage ? 'padding: 4px' : null}`">
    <img class="round" :src="image" :alt="title">
  </div>
</template>

<script lang="ts" setup>
/*Props*/
import { ref } from "vue";

const props = defineProps({
  size: {type: Number, default: 65},
  image: {type: String, default: "/avatar.png"},
  title: {type: String}
})

const isDefaultImage = ref(props.image === "/avatar.png")
</script>
