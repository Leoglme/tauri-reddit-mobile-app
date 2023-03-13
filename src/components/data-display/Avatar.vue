<template>
  <div
    class="round relative border-grey-200 flex border-grey-200 avatar"
    :class="{ shadow }"
    :style="`width: ${size}px; height: ${size}px; padding: ${padding};`"
  >
    <div class="inner-round" />
    <img
      class="round"
      :src="image"
      :alt="title"
      style="z-index: 2"
    />
  </div>
</template>

<script lang="ts" setup>
/*Props*/
import { computed, ref } from 'vue'

const props = defineProps({
  size: { type: Number, default: 65 },
  image: { type: String, default: '/avatar.png' },
  title: { type: String, default: null },
  shadow: { type: Boolean, default: false },
})

const isDefaultImage = ref(props.image === '/avatar.png')
const padding = computed(() => {
  if (isDefaultImage.value) {
    return '4px'
  }
  if (props.size >= 50) {
    return '2px'
  }
  return '1px'
})
</script>

<style scoped>
.inner-round {
  position: absolute;
  background: var(--primary-light);
  width: 100%;
  height: 100%;
  border-radius: 100%;
  left: 0;
  top: 0;
}

.avatar.shadow {
  box-shadow: rgba(0, 0, 0, 40%) 0 8px 28px 0;
}
</style>
