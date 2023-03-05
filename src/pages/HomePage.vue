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
import { ref } from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import type { PostModel } from '@/api/post/post.model'
/*STORE*/

const posts = ref<PostModel[]>([])
const showLoading = ref(true)

const getHomePosts = () => {
  Post.homePage()
    .then((res) => {
      posts.value = posts.value.concat(res.data.data.children)
      showLoading.value = false
      console.log(posts.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

getHomePosts()
</script>

<style lang="scss" scoped></style>
