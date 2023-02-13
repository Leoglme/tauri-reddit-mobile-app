<template>
  <WindowBar />

  <Header />

  <RouterView />

  <Footer />
</template>

<script lang="ts" setup>
  import Nav from './components/BaliseSemantique/Nav.vue';
  import Header from './components/BaliseSemantique/Header.vue';
  import Footer from './components/BaliseSemantique/Footer.vue';
  import WindowBar from "./components/WindowBar.vue";
</script>

<style lang="scss" scoped>

</style>