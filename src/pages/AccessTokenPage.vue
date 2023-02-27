<template>
  <div class="centered vh-100 bg-grey-100">
    <Loader/>
  </div>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/auth.store";
import {Auth} from "@/api/auth/auth";
import Loader from "@/components/ui/Loader.vue"
import { SITE_NAME } from "@/env";

document.title = `Authentication in progress... | ${SITE_NAME}`

const route = useRoute();
const  router = useRouter()
const authStore = useAuthStore()

const code = route.query.code?.toString()

if(code){
  Auth.getToken(code).then(res => {
    let accessToken = res.data.access_token

    if (accessToken) {
      authStore.setAccessToken(accessToken)
      router.push({name: "home"})
    }
  }).catch(err => {
    console.log("ERR", err)
  })
}

</script>

<style lang="scss" scoped>

</style>
