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
import { onMounted, ref, watch } from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import type { PostModel } from '@/api/post/post.model'
import { useAppStore } from '@/stores/app.store'
import Loader from '@/components/ui/Loader.vue'

/*STORE*/
const appStore = useAppStore()
appStore.setLoading(true)

/*REFS*/
const posts = ref<PostModel[]>([])
const after = ref()
const currentPosts = ref(0)

/* API METHODS */
const getHomePosts = () => {
  Post.homePage(appStore.getCurrentFilter, after.value)
    .then((res) => {
      posts.value = posts.value.concat(res.data.data.children)
      after.value = res.data.data.after
      if (appStore.loading) {
        appStore.setLoading(false)
      }
      currentPosts.value += 10
    })
    .catch((err) => {
      console.log(err)
    })
}

/*LIFECYCLE*/
onMounted(() => {
  window.addEventListener('scroll', () => {
    const pageHeight = window.scrollY + window.innerHeight
    const totalHeight = document.body.scrollHeight

    if (pageHeight >= totalHeight * 0.7 && currentPosts.value >= 7) {
      getHomePosts()
      currentPosts.value = 0
    }
  })
})

/*WATCHERS*/
watch(
  () => appStore.getCurrentFilter,
  () => {
    getHomePosts()
  }
)

getHomePosts()
</script>

<style scoped>
#home {
  padding-top: var(--navbar-height);
  padding-bottom: 20px;
}
</style>
