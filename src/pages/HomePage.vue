<template>
  <Loader v-if="appStore.loading" />
  <section
    v-else
    id="home"
    class="bg-black d-grid gap-2"
  >
    <PostCard
      v-for="(post, i) in posts"
      :key="`post-${i}`"
      :post="post"
    />
  </section>
</template>

<script lang="ts" setup>
import { Post } from '@/api/post/post'
import { ref } from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import type { PostModel } from '@/api/post/post.model'
import { useAppStore } from '@/stores/app.store'
import Loader from '@/components/ui/Loader.vue'

/*STORE*/
const appStore = useAppStore()
appStore.setLoading(true)

/*Refs*/
const posts = ref<PostModel[]>([])

const getHomePosts = () => {
  Post.homePage()
    .then((res) => {
      posts.value = posts.value.concat(res.data.data.children)
      appStore.setLoading(false)
      console.log(posts.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

getHomePosts()
</script>

<style scoped>
#home {
  padding-top: var(--navbar-height);
  padding-bottom: 20px;
}
</style>
