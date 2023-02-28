<template>
  <Loader v-if="appStore.loading"/>
  <section id="user-profile" v-else>
    <div class="w-full user__header relative bg-blue">
      <div class="p-3 d-grid gap-1 relative z-index-2">
        <div class="w-full flex justify-end">
          <DisconnectButton/>
          <!--        <DotsHorizontalIcon fill-color="var(&#45;&#45;grey-800)" :size="28" class="clickable-icon"/>-->
        </div>

        <div class="flex justify-between items-center">
          <Avatar
              image="https://styles.redditmedia.com/t5_2t0pyr/styles/profileIcon_9hgrabyaafja1.png?width=256&amp;height=256&amp;crop=256:256,smart&amp;v=enabled&amp;s=a1ecd758bb920873ca6dbedc1927408cc1311c68"
              :size="90"/>
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
import DisconnectButton from "@/components/actions/DisconnectButton.vue"
import Loader from "@/components/ui/Loader.vue"
import Tabs from '@/components/navigation/Tabs.vue';
import { ref } from "vue";
import PostCard from "@/components/data-display/PostCard.vue"
import { useRoute } from "vue-router";
import { User } from "@/api/user/user";
import { Post } from "@/api/post/post";
import { useAppStore } from "@/stores/app.store";

/*REFS*/
const follow = ref(false)

/*DATA*/
const tabs = [
  {
    label: "Publications"
  },
  {
    label: "À Propos"
  }
]

const route = useRoute()
const username = route.params.username
const posts = ref([])
const appStore = useAppStore()
appStore.setLoading(true)

User.getUserInfo(username.toString()).then(res => {
  const { icon_img, title, display_name_prefixed, public_description } = res.data.data.subreddit
  console.log({ icon_img, title, display_name_prefixed, public_description })
  Post.getPostUser(username.toString()).then((res) => {
    console.log(res.data.data.children)
    posts.value = res.data.data.children
    appStore.setLoading(false)
  }).catch(err => {
    console.log(err)
  })
}).catch(err => {
  console.log(err)
})

</script>


<style lang="scss" scoped>
$header_height: 250px;
.user__header {
  height: $header_height;
}

.linear__mask {
  height: calc(250px / 2.78);
  background: var(--linear);
}

#posts {
  white-space: normal;
}
</style>
