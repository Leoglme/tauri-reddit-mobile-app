<template>
  <Loader v-if="appStore.loading" />
  <section
    v-else
    id="home"
    class="bg-black d-grid"
    :class="isCardLayout ? 'gap-2' : null"
  >
    <ScrollPagination
      :current-posts="currentPosts"
      @refresh="refreshPosts"
    >
      <PostCard
        v-for="(post, i) in postStore.posts"
        :key="`post-${i}`"
        :post="post"
      />
    </ScrollPagination>
  </section>
</template>

<script lang="ts" setup>
import { Post } from '@/api/post/post'
import { ref, watch } from 'vue'
import ScrollPagination from '@/components/navigation/ScrollPagination.vue'
import PostCard from '@/components/data-display/PostCard.vue'
import { useAppStore } from '@/stores/app.store'
import Loader from '@/components/ui/Loader.vue'
import { usePostStore } from '@/stores/post.store'
import { SITE_NAME } from '@/env'
import { useAuthStore } from '@/stores/auth.store'

/*STORE*/
const appStore = useAppStore()
const postStore = usePostStore()
const authStore = useAuthStore()

/*REFS*/
const after = ref()
const currentPosts = ref(0)
const isCardLayout = ref(authStore.prefs?.layout === 'card')
/* API METHODS */
const getHomePosts = () => {
  Post.homePage(appStore.getCurrentFilter, after.value)
    .then((res) => {
      postStore.setPosts(postStore.posts.concat(res.data.data.children))
      after.value = res.data.data.after
      if (appStore.loading) {
        appStore.setLoading(false)
        document.title = SITE_NAME
      }
      currentPosts.value += 10
    })
    .catch((err) => {
      console.log(err)
    })
}

const refreshPosts = () => {
  getHomePosts()
  currentPosts.value = 0
}

const refreshDatas = async () => {
  appStore.setLoading(true)

  postStore.setPosts([])
  /*DOM*/
  document.title = `Chargement... | ${SITE_NAME}`
  await getHomePosts()
}

/*WATCHERS*/
watch(
  () => appStore.getCurrentFilter,
  () => {
    refreshDatas()
  }
)

refreshDatas()
</script>

<style scoped>
#home {
  padding-top: var(--navbar-height);
  padding-bottom: 20px;
}
</style>
