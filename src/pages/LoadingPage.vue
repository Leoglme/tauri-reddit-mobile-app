<template>
  <div class="centered vh-100 bg-grey-100">
    <Loader />
  </div>
</template>

<script lang="ts" setup>
import Loader from '@/components/ui/Loader.vue'
import { SITE_NAME } from '@/env'

document.title = `Loading... | ${SITE_NAME}`
</script>
