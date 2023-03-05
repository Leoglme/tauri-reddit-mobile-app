<template>
  <button
    class="btn-outlined gap-1 btn-small"
    style="border-radius: 80px"
    data-variant="white"
    @click="emit('follow', !follow)"
  >
    <CheckIcon
      v-if="props.follow"
      fill-color="var(--white)"
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
})

/*EMIT*/
const emit = defineEmits(['follow'])
</script>
