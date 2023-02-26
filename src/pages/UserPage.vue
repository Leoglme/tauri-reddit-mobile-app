<template>
  <section id="user-profile">
    <div class="w-full user__header relative bg-blue">
      <div class="p-3 d-grid gap-1 relative z-index-2">
        <div class="w-full flex justify-end">
          <button class="btn btn-small" data-variant="red">Déconnexion</button>
          <!--        <DotsHorizontalIcon fill-color="var(&#45;&#45;grey-800)" :size="28" class="clickable-icon"/>-->
        </div>

        <div class="flex justify-between items-center">
          <Avatar image="https://styles.redditmedia.com/t5_2t0pyr/styles/profileIcon_9hgrabyaafja1.png?width=256&amp;height=256&amp;crop=256:256,smart&amp;v=enabled&amp;s=a1ecd758bb920873ca6dbedc1927408cc1311c68" :size="90"/>
          <FollowButton :follow="follow" @follow="follow = !follow"/>
        </div>

        <h1 class="font-semibold text-xl">{{ username }}</h1>
        <div class="flex justify-between items-center">
          <span class="text-sm text-grey-800">u/{{ username }} • 5 juin 2021</span>
        </div>

      </div>
      <div class="linear__mask w-full absolute bottom-0"/>
    </div>
    <Tabs :tabs="tabs">
      <section class="gap-2" id="posts">
        <PostCard v-for="(post, i) in posts" :key="`${username}-post-${i}`" :post="post"/>
      </section>
      <section>A PROPS</section>
    </Tabs>
  </section>
</template>

<script lang="ts" setup>
import Avatar from "@/components/data-display/Avatar.vue"
import FollowButton from "@/components/actions/FollowButton.vue"
import Tabs from '@/components/navigation/Tabs.vue';
import { ref } from "vue";
import PostCard from "@/components/data-display/PostCard.vue"

/*REFS*/
const follow = ref(false)

/*DATA*/
const username = 'PrA2107';
const tabs = [
  {
    label: "Publications"
  },
  {
    label: "À Propos"
  }
]

const posts = [
  {
    community: "Adblock",
    title: "How to block redirect or pop  unders on Firefox ?",
    time: "22h",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec diam id dolor placerat ullamcorper vitae pretium libero. Ut euismod dolor in risus luctus, sit amet rhoncus eros imperdiet. Vivamus tempor vel lacus sit amet lacus"
  },
  {
    community: "Adblock",
    title: "How to block redirect or pop  unders on Firefox ?",
    time: "22h",
    image: "/post-picture.jpg"
  }
]
</script>


<style lang="scss" scoped>
$header_height: 250px;
.user__header {
  height: $header_height;
}
.linear__mask {
  height: calc($header_height / 2.78);
  background: var(--linear);
}

#posts {
  white-space: normal;
}
</style>
