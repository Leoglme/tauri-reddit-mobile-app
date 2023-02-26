<template>
  <button @click="emit('follow')" class="btn-outlined gap-1" data-variant="white">
    <CheckIcon fill-color="var(--white)" :size="20" v-if="props.follow"/> {{props.follow ? 'Abonné' : 'Suivre'}}
  </button>
</template>

<script lang="ts" setup>
import CheckIcon from 'vue-material-design-icons/Check.vue';
/*¨Props*/
const props = defineProps({
   follow: {type: Boolean, default: false}
})

/*EMIT*/
const emit = defineEmits(['follow'])
</script>
