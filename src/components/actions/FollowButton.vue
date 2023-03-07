<template>
  <button
    class="btn-outlined gap-1 btn-small"
    style="border-radius: 80px"
    :style="color ? `border-color: ${color}; color: ${color}; background: transparent;` : null"
    :data-variant="color ? null : 'white'"
    @click="emit('follow', !follow)"
  >
    <CheckIcon
      v-if="props.follow"
      :fill-color="color || 'var(--white)'"
      :size="16"
    />
    {{ props.follow ? 'Abonné' : 'Suivre' }}
  </button>
</template>

<script lang="ts" setup>
import CheckIcon from 'vue-material-design-icons/Check.vue'
/*¨Props*/
const props = defineProps({
  follow: { type: Boolean, default: false },
  color: { type: String, default: null },
})

/*EMIT*/
const emit = defineEmits(['follow'])
</script>
