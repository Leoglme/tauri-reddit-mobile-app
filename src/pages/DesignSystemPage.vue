<template>
  <div class="centered flex-col gap-3 px-2 py-8">
    <h1>Design system</h1>
    <hr class="w-full">
    <h2>Buttons</h2>
    <button class="btn w-full" data-variant="primary">Continuer</button>
    <button class="btn w-full" data-variant="blue">Continuer</button>
    <button class="btn w-full" disabled>Continuer</button>
    <RedditButton/>
    <hr class="w-full">
    <h2>Data Display</h2>
    <h3 class="text-grey-800">Avatar</h3>
    <Avatar title="username"/>
    <Avatar :size="80"/>
    <Avatar :size="80" image="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"/>
    <hr class="w-full">
    <h2>Ui</h2>
    <h3 class="text-grey-800">Loader</h3>
    <Loader/>
    <router-link to="loading">go to loading page</router-link>
    <h3 class="text-grey-800">Icon</h3>
    <MenuIcon/>
    <HomeIcon title="title" :size="60" fillColor="var(--blue)"/>
    <hr class="w-full">
    <h2>Navigation</h2>
    <h3 class="text-grey-800">Tabs</h3>
    <Tabs :tabs="[{title: 'home', to: '/'}, {title: 'design', to: '/design-system'}]"/>
    <BottomNavigation/>
    <Navbar/>
    <hr class="w-full">
    <h2>Data input</h2>
    <SelectFilter/>
    <TextInput />
  </div>
</template>

<script lang="ts" setup>
import RedditButton from "../components/actions/RedditButton.vue"
import Avatar from "../components/data-display/Avatar.vue"
import SelectFilter from "../components/data-input/SelectFilter.vue"
import TextInput from "../components/data-input/TextInput.vue"
import Loader from "../components/ui/Loader.vue"
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import HomeIcon from 'vue-material-design-icons/Home.vue';
import Tabs from "../components/navigation/Tabs.vue"
import BottomNavigation from "../components/navigation/BottomNavigation.vue"
import Navbar from "../components/navigation/Navbar.vue"
</script>
