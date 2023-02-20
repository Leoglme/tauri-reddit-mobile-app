<template>
  <main>
    INDEX
  </main>
</template>

<script lang="ts" setup>
 import {Auth} from "../api/auth/auth";
 import {User} from "../api/user/user";
 import {Community} from "../api/community/community";



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


</script>

<style lang="scss" scoped>

</style>