<template>
  <div v-if="showLoading">
      Chargement
  </div>
  <div class="bg-black d-grid gap-2" v-else>
    <PostCard v-for="(post, i) in posts" :key="`post-${i}`" :post="post"  />
  </div>

</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth.store";
import {Post} from "@/api/post/post";
import {ref} from "vue";
import PostCard from "@/components/data-display/PostCard.vue"
/*STORE*/
const authStore = useAuthStore()
const posts = ref<any[]>([])
const showLoading = ref(true)

/*API*/
/* Community.searchCommunity().then(res => {
   console.log(res.data.data)
 }).catch(err => {
   console.log(err)
 })*/

/*Community.userCommunityList().then(res => {
  console.log(res.data)
}).catch(err => {
  console.log(err.message)
})*/

const getHomePosts = () => {
  Post.homePage().then(res => {
    posts.value = posts.value.concat(res.data.data.children)
    showLoading.value = false
    console.log(posts.value)

  }).catch(err => {
    console.log(err)
  })
}

getHomePosts()

</script>

<style lang="scss" scoped>

</style>
