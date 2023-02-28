<template>
  <Loader v-if="appStore.loading"/>
  <section id="user-profile" v-else>
    <div class="w-full user__header relative bg-blue"
         :style="user.banner_img ? `background-image: url('${user.banner_img}'); background-size: contain; background-repeat: no-repeat;` : null">
      <div class="h-full d-grid relative z-index-2">
<!--        <div class="w-full flex justify-end">-->
<!--&lt;!&ndash;          <DisconnectButton/>&ndash;&gt;-->
<!--          &lt;!&ndash;        <DotsHorizontalIcon fill-color="var(&#45;&#45;grey-800)" :size="28" class="clickable-icon"/>&ndash;&gt;-->
<!--        </div>-->

        <div class="flex justify-between items-center px-3 py-2">
          <Avatar
              :image="user.icon_img"
              :size="90"/>
        </div>

        <div class="bg-grey-200 flex flex-col justify-center p-3">
          <div>
            <h1 class="font-semibold text-lg">{{ username }}</h1>
            <div class="flex justify-between items-center">
              <span class="text-sm text-grey-800">u/{{ username }} • {{ user.createdAt }}</span>
            </div>
          </div>
          <div class="flex justify-end">
            <FollowButton :follow="user.user_is_subscriber" @follow="follow = !follow"/>
          </div>

        </div>

      </div>
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
import { removeAmpUrl } from "@/utils/format";
import type { UserModel } from "@/api/user/user.model";

/*REFS*/
const isUserConnectedProfile = ref(false)

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
const user = ref({} as UserModel)
appStore.setLoading(true)

User.getUserInfo(username.toString()).then(res => {
  const { icon_img, title, display_name_prefixed, public_description, banner_img, user_is_subscriber } = res.data.data.subreddit
  user.value = { title, display_name_prefixed, public_description, createdAt: res.data.data.created_utc, user_is_subscriber }
  user.value.icon_img = removeAmpUrl(icon_img)
  user.value.banner_img = removeAmpUrl(banner_img)
  console.log(res.data.data)

  Post.getPostUser(username.toString()).then((res) => {
    posts.value = res.data.data.children
    appStore.setLoading(false)
    // console.log(res.data.data)
    // is_gallery
    // title
    // is_video
    // subreddit_name_prefixed
    // created_utc
    // thumbnail
    //
    //
    // is_gallery
    // gallery_data db7qhlrs4wka1
    // is_video
    // media_metadata s.u
    // preview
  }).catch(err => {
    console.log(err)
  })
}).catch(err => {
  console.log(err)
})

</script>


<style lang="scss" scoped>
$header_height: 200px;

.linear__mask {
  height: 100px;
  background: var(--linear);
}

#posts {
  white-space: normal;
}
</style>
