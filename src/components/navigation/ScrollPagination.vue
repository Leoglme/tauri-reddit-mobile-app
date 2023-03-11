<template>
  <slot />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

/*PROPS*/
const props = defineProps({
  currentPosts: { type: Number, required: true },
  stop: { type: Boolean, default: false },
})

/*EMIT*/
const emit = defineEmits<{
  (e: 'refresh'): void
}>()

/*LIFECYCLE*/
onMounted(() => {
  window.addEventListener('scroll', () => {
    const pageHeight = window.scrollY + window.innerHeight
    const totalHeight = document.body.scrollHeight

    if (pageHeight >= totalHeight * 0.7 && props.currentPosts >= 7 && !props.stop) {
      emit('refresh')
    }
  })
})
</script>
