<template>
  <main>
    LOADING
  </main>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import {useAuthStore} from "../stores/auth.store";

const route = useRoute();
const authStore = useAuthStore()

const token = route.query.code?.toString()
/*if(token){
  authStore.setToken(token)
}*/

//fetch acces token
const url = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + token + "&redirect_uri=http://localhost:1420/access-token"
fetch(url)
    .then(function(response){
      console.log(response)
})
//then

const router = useRouter()
router.push({name: "index"})



</script>

<style lang="scss" scoped>

</style>