<template>
  <div class="d-grid gap-2 px-3 py-2 bg-grey-100">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Avatar :size="28"/>
        <h4 class="text-md font-medium text-grey-800">r/{{ props.post.community }}</h4>
        <span class="font-medium text-grey-700">{{ props.post.time }}</span>
      </div>
      <DotsHorizontalIcon class="clickable-icon" fill-color="var(--grey-800)"/>
    </div>
    <!-- Body -->
    <div class="d-grid gap-1 text-grey-800">
      <h3 class="text-lg font-semibold">{{props.post.title}}</h3>
      <p v-if="props.post.description" class="text-sm block-with-text">{{props.post.description}}</p>
      <img class="post-image" v-if="props.post.image" :src="props.post.image" :alt="props.post.title">
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from "../../components/data-display/Avatar.vue"
import DotsHorizontalIcon from 'vue-material-design-icons/DotsHorizontal.vue';
import type { PropType } from "vue";

type Post = {
  community: string,
  title: string,
  time: string,
  description?: string,
  image?: string
}

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true }
})
</script>


<style scoped>
.post-image {
  object-fit: contain;
  border-radius: 16px;
  border: 1px solid var(--grey-500);
}
</style>
