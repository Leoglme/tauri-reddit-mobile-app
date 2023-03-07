<template>
  <div v-if="showLoading">Chargement</div>
  <div
    v-else
    class="bg-black d-grid gap-2"
  >
    <PostCard
      v-for="(post, i) in posts"
      :key="`post-${i}`"
      :post="post"
    />
  </div>
</template>

<script lang="ts" setup>
import { Post } from '@/api/post/post'
import {ref, watch} from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import type { PostModel } from '@/api/post/post.model'
import {useAppStore} from "@/stores/app.store";
/*STORE*/

const posts = ref<PostModel[]>([])
const showLoading = ref(true)

const appStore = useAppStore()

const getHomePosts = () => {
  Post.homePage(appStore.getCurrentFilter)
    .then((res) => {
      posts.value = res.data.data.children
      showLoading.value = false
      console.log(posts.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

watch(() => appStore.getCurrentFilter, () => {
  getHomePosts();
});

getHomePosts()
</script>

<style lang="scss" scoped></style>
