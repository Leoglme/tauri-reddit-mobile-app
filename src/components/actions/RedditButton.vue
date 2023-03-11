<template>
  <button
    v-if="isInMobile"
    role="button"
    class="btn w-full gap-2"
    data-variant="primary"
    @click="openCapacitorSite"
  >
    <RedditLogo />
    Continuer avec reddit
  </button>
  <a
    v-else
    :href="oauthRedditLoginUrl"
    role="button"
    class="btn w-full gap-2"
    data-variant="primary"
  >
    <RedditLogo />
    Continuer avec reddit
  </a>
</template>

<script lang="ts" setup>
import { Auth } from '@/api/auth/auth'
import RedditLogo from '@/components/ui/RedditLogo.vue'
const oauthRedditLoginUrl = Auth.oauthRedditLoginUrl
import { Browser } from '@capacitor/browser'
import { BaseApi } from '@/api/BaseApi'

const openCapacitorSite = async () => {
  await Browser.open({ url: oauthRedditLoginUrl, windowName: '_self' })
}

const isInMobile = BaseApi.isInMobile
</script>
