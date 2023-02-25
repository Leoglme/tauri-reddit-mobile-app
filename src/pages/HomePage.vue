<template>
  <main>
    INDEX {{ authStore.access_token}}
  </main>
  <BottomNavigation/>
</template>

<script lang="ts" setup>
 import {Post} from "@/api/post/post";
 import {useAuthStore} from "@/stores/auth.store";
 import { Auth } from "@/api/auth/auth";
 import BottomNavigation from "@/components/navigation/BottomNavigation.vue";

 const authStore = useAuthStore()



///AUTH
 Auth.getUserConnected().then(res => {
   localStorage.setItem("Username",res.data.name)
   localStorage.setItem("sr", res.data.subreddit.name)
 }).catch(err => {
   console.log(err)
 })


 ///USER
 /*User.getUserInfo("LaGeogeoTeam").then(res => { //remplacer lageogeoteam par une variable
   console.log(res)
 }).catch(err => {
   console.log(err)
 })*/

 //User.updateUserInfo("2eme test", "titi") //remplacer les 2 valeurs par des variables


 ///COMMUNITY
/* Community.searchCommunity().then(res => {
   console.log(res.data.data)
 }).catch(err => {
   console.log(err)
 })*/

 /*Community.getCommunityInfo().then(res => {
   console.log(res)
 }).catch(err => {
   console.log(err)
 })*/

 /*Community.createCommunity({
   communityDescription: "string",
   communityName: "strincndjkgfkzcvjhdzlj",
   type: "private",
   over18: true,
   restrictCommenting: true,
   restrictPosting: true
 }).then(res => {
   console.log("Community created")
 }).catch(err => {
   console.log(err)
 })*/

 /*Community.userCommunityList().then(res => {
   console.log(res.data)
 }).catch(err => {
   console.log(err.message)
 })*/

 /*Community.hotPostCommunity().then(res => {
   console.log(res)
 }).catch(err => {
   console.log(err)
 })*/

 /*Community.subscribeCommunity("FortNiteBR").then(res =>{
  console.log("join")
}).catch(err => {
  console.log(err)
})*/

/*Community.unsubscribeCommunity("FortNiteBR").then(res =>{
  console.log("leave")
}).catch(err => {
  console.log(err)
})*/

///POST

 /*Post.homePage().then(res => {
   console.log(res)
 }).catch(err => {
   console.log(err)
 })*/

/*Post.getPostUser("sir_posts_alot").then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})*/

 /*Post.createPost({
   title: "test",
   text: "test",
   spoiler: false,
   nsfw: false,
 }).then(res => {
   console.log("Post created")
 }).catch(err => {
   console.log(err)
 })*/

Post.deletePost("t3_1182kue").then(res => {
  console.log("delete")
}).catch(err => {
  console.log(err)
})

</script>

<style lang="scss" scoped>

</style>
