<template>
  <div class="flex flex-col items-center gap-8 px-4 pt-8">
    <Logo />
    <h1 class="text-xl text-grey-800 font-medium">Se Connecter</h1>
    <RedditButton class="mt-2" />
  </div>
</template>

<script lang="ts" setup>
import RedditButton from '@/components/actions/RedditButton.vue'
import Logo from '@/components/ui/Logo.vue'
</script>
