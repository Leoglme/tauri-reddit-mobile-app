<template>
  <main>
    INDEX
  </main>
</template>

<script lang="ts" setup>
 import {Auth} from "../api/auth/auth";


 Auth.getUserConnected().then(res => {
   localStorage.setItem("Username",res.data.name)
 }).catch(err => {
   console.log(err)
 })
</script>

<style lang="scss" scoped>

</style>