<template>
  <div class="spoiler-container bb-1 border-grey-400 pb-3">
    <div
      class="spoiler-header bg-grey-100 relative z-index-2 flex items-center justify-between cursor-pointer user-select-none"
      @click="isSpoiled = !isSpoiled"
    >
      <span class="font-medium text-white spoiler-title flex-1">{{ props.title }}</span>
      <ChevronUpIcon
        v-if="props.content"
        :class="isSpoiled ? 'rotate-up-instant' : 'rotate-reset-instant'"
        :size="18"
      />
    </div>
    <div
      v-if="isSpoiled && props.content"
      class="spoiler-content"
    >
      <span class="font-medium text-sm text-grey-800">{{ props.content }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'
import { ref } from 'vue'

/*Props*/
const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, default: null },
})

/*Refs*/
const isSpoiled = ref(false)
</script>

<style lang="scss" scoped>
.spoiler-title {
  max-width: 90%;
}
.spoiler-content,
.spoiler-header {
  white-space: pre-wrap;
}
</style>
