<template>
  <main>
    LOADING
  </main>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from "../stores/auth.store";
import axios from "axios"

const router = useRouter()
const route = useRoute();
const authStore = useAuthStore()

const code = route.query.code?.toString()

const option = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: '092USZcSP0ni2yftuo1q6w',
    password: 'aosKrwSibpOH-mC5kcDR6syjX9xWnw'
  }
}


const url = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + code + "&redirect_uri=http://localhost:1420/access-token"
axios.post(url, null, option).then(res => {
  const accessToken = res.data.access_token

  if(accessToken){
    console.log(accessToken)
    authStore.setAccessToken(accessToken)
    router.push({name: "index"})
  }
}).catch(err => {
  console.log("ERR", err)
})





</script>

<style lang="scss" scoped>

</style>