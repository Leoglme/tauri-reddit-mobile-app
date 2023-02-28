<template>
  <div class="d-grid gap-2 px-3 py-2 bg-grey-100">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Avatar :image="props.post.data.avatarUrl" :size="28"/>
        <h4 class="text-md font-medium text-grey-800">{{ props.post.data.subreddit_name_prefixed }}</h4>
        <span class="font-medium text-grey-700">{{ props.post.data.time }}</span>
      </div>
      <DotsHorizontalIcon class="clickable-icon" fill-color="var(--grey-800)"/>
    </div>
    <!-- Body -->
    <div class="d-grid gap-1 text-grey-800">
      <h3 class="text-lg font-semibold">{{props.post.data.title}}</h3>
      <p v-if="props.post.data.selftext" class="text-sm block-with-text">{{props.post.data.selftext}}</p>
      <img class="post-image" v-if="props.post.image" :src="props.post.image" :alt="props.post.title">
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from "../../components/data-display/Avatar.vue"
import DotsHorizontalIcon from 'vue-material-design-icons/DotsHorizontal.vue';
import type { PropType } from "vue";
import type {PostModel} from "@/api/post/post.model";

type Post = {
  data: {
    subreddit_name_prefixed: string,
    title: string,
    time: string,
    selftext?: string,
    image?: string
  }
}

const props = defineProps({
  post: { type: Object as PropType<PostModel>, required: true }
})
</script>


<style scoped>
.post-image {
  object-fit: contain;
  border-radius: 16px;
  border: 1px solid var(--grey-500);
}
</style>
