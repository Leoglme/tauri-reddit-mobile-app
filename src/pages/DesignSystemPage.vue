<template>
  <div class="centered flex-col gap-6 px-4 py-20">
    <h1>Design system</h1>
    <hr class="w-full" />
    <h2>Buttons</h2>
    <button
      class="btn w-full"
      data-variant="primary"
    >
      Continuer
    </button>
    <button
      class="btn w-full"
      data-variant="blue"
    >
      Continuer
    </button>
    <button
      class="btn w-full"
      data-variant="white"
    >
      Continuer
    </button>
    <button
      class="btn-outlined w-full"
      data-variant="white"
    >
      Continuer
    </button>
    <button
      class="btn-outlined w-full"
      data-variant="primary"
    >
      Continuer
    </button>
    <button
      class="btn w-full"
      disabled
    >
      Continuer
    </button>
    <RedditButton />
    <FollowButton
      :follow="follow"
      @follow="follow = !follow"
    />
    <hr class="w-full" />
    <h2>Data Display</h2>
    <h3 class="text-grey-800">Avatar</h3>
    <Avatar title="username" />
    <Avatar :size="80" />
    <Avatar
      :size="80"
      image="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
    />
    <h3 class="text-grey-800">Post card</h3>

    <section
      id="posts"
      class="d-grid gap-2"
    >
      <!--      <PostCard v-for="(post, i) in posts" :key="`post-${i}`" :post="post"/>-->
    </section>

    <h3 class="text-grey-800">SearchResultList</h3>
    <SearchResultList />
    <h3 class="text-grey-800">Swiper</h3>
    <Swiper :images="imagesFakes" />

    <hr class="w-full" />
    <h2>Ui</h2>
    <h3 class="text-grey-800">Loader</h3>
    <div
      class="centered"
      style="position: relative; top: 72px"
    >
      <Loader />
    </div>

    <div style="margin-bottom: 125px" />

    <router-link to="loading"> go to loading page </router-link>
    <h3 class="text-grey-800">Icon</h3>
    <MenuIcon />
    <HomeIcon
      title="title"
      :size="60"
      fillColor="var(--blue)"
    />
    <hr class="w-full" />
    <h2>Navigation</h2>
    <h3 class="text-grey-800">Tabs</h3>
    <Tabs :tabs="tabs">
      <section>This is first tab</section>
      <section>This is second tab</section>
      <section>This is third tab</section>
    </Tabs>
    <BottomNavigation />
    <Navbar />
    <hr class="w-full" />
    <h2>Data input</h2>
    <SelectFilter />
    <h3 class="text-grey-800">Text Input</h3>
    <Form class="d-grid gap-2 w-full">
      <TextInput
        id="label"
        prefix="/r"
        label="Nom de la communauté"
        rules="required|max:20"
      />
      <TextInput
        id="label-round"
        round
        placeholder="John Doe"
        label="Nom de la communauté"
        rules="required|max:20"
      />
      <TextInput
        id="password"
        type="password"
        label="Mot de passe"
        rules="required|max:20"
      />
      <TextInput
        id="name"
        show-reset
        label="Name"
        rules="required"
      />
      <TextInput
        id="search"
        show-reset
        type="search"
      />
    </Form>

    <h3 class="text-grey-800">Switch {{ checked }}</h3>
    <Switch v-model:checked="checked" />

    <h3 class="text-grey-800">Select visibility</h3>
    <SelectVisibility />
  </div>
</template>

<script lang="ts" setup>
import RedditButton from '@/components/actions/RedditButton.vue'
import FollowButton from '@/components/actions/FollowButton.vue'
import Avatar from '@/components/data-display/Avatar.vue'
import SearchResultList from '@/components/data-display/SearchResultList.vue'
import SelectFilter from '@/components/data-input/SelectFilter.vue'
import TextInput from '@/components/data-input/TextInput.vue'
import Switch from '@/components/data-input/Switch.vue'
import SelectVisibility from '@/components/data-input/SelectVisibility.vue'
import Loader from '@/components/ui/Loader.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import Tabs from '@/components/navigation/Tabs.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import Navbar from '@/components/navigation/Navbar.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import Swiper from '@/components/data-display/Swiper.vue'
const checked = ref(true)
const follow = ref(false)

const imagesFakes = [
  {
    src: 'https://images.unsplash.com/photo-1677864234709-bde08838fb9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'slide 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1677939748562-9289efc24bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'slide 2',
  },
]

const tabs = [
  {
    label: 'Publications',
  },
  {
    label: 'À Propos',
  },
]
</script>
