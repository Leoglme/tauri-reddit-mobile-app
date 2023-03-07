<template>
  <div v-if="showLoading">Chargement</div>
  <div
    v-else ref="scrollComponent"
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
import {onMounted, onUnmounted, ref, watch} from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import type { PostModel } from '@/api/post/post.model'
import {useAppStore} from "@/stores/app.store";
/*STORE*/
const after = ref("")
const posts = ref<PostModel[]>([])
const showLoading = ref(true)

const appStore = useAppStore()

const getHomePosts = () => {
  Post.homePage(appStore.getCurrentFilter)
    .then((res) => {
      console.log(res.data)
      after.value = res.data.data.children[res.data.data.children.length - 1].data.name //res.data.data.children.length - 1
      console.log(after.value)
      posts.value = res.data.data.children
      showLoading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}

watch(() => appStore.getCurrentFilter, () => {
  getHomePosts();
});

const loadMorePosts = () => {
  console.log(after.value)
  Post.homePage(appStore.getCurrentFilter, after.value).then(res => {
    console.log(res);
    after.value = res.data.data.children[0].data.name
    console.log(after.value)
    let newPosts = res.data.data.children

    posts.value.push(...newPosts);
  });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, {passive: true})

})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const scrollComponent = ref<HTMLElement | null>(null);

const handleScroll = async () => {
  let element = scrollComponent.value
  if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
    await loadMorePosts()
    document.documentElement.scrollTop -= 1000
  }
}

getHomePosts()
</script>

<style lang="scss" scoped>

</style>
