<template>
  <a
    class="link-blue"
    :href="linkUrl"
    >{{ linkText }}</a
  >
</template>

<script lang="ts" setup>
import { computed } from 'vue'

/* PROPS */
const props = defineProps({
  selfText: {
    type: String,
    required: true,
  },
})

const linkText = computed(() => {
  const regex = /\[(.*)\]\((.*)\)/
  const match = props.selfText.match(regex)
  return match && match.length === 3 ? match[1] : ''
})

const linkUrl = computed(() => {
  const regex = /\[(.*)\]\((.*)\)/
  const match = props.selfText.match(regex)
  return match && match.length === 3 ? match[2] : ''
})
</script>
