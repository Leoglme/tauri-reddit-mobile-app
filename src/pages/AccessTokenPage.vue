<template>
  <main>
    LOADING...
  </main>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from "../stores/auth.store";
import {Auth} from "../api/auth/auth";

const route = useRoute();
const  router = useRouter()
const authStore = useAuthStore()

const code = route.query.code?.toString()

if(code){
  Auth.getToken(code).then(res => {
    let accessToken = res.data.access_token

    if (accessToken) {
      //console.log(accessToken)
      authStore.setAccessToken(accessToken)
      router.push({name: "index"})
    }
  }).catch(err => {
    console.log("ERR", err)
  })
}

</script>

<style lang="scss" scoped>

</style>