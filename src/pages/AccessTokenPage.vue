<template>
  <div class="centered vh-100 bg-grey-100">
    <Loader />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { Auth } from '@/api/auth/auth'
import Loader from '@/components/ui/Loader.vue'
import { SITE_NAME } from '@/env'
import { useAppStore } from '@/stores/app.store'

document.title = `Authentication in progress... | ${SITE_NAME}`

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()
const code = route.query.code?.toString()
appStore.setLoading(true)

if (code) {
  Auth.getToken(code)
    .then((res) => {
      const accessToken = res.data.access_token

      if (accessToken) {
        authStore.setAccessToken(accessToken)
        Auth.getUserConnected(accessToken).then((res) => {
          authStore.setUsername(res.data.name)
          authStore.setSr(res.data.subreddit.name)
          authStore.setUserImage(res.data.subreddit.icon_img)
          router.push({ name: 'home' })
          appStore.setLoading(false)
        })
      }
    })
    .catch((err) => {
      console.log('ERR', err)
    })
}
</script>

<style lang="scss" scoped></style>
