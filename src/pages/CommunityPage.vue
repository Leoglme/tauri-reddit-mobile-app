<template>
  <section id="user-profile">
    <div class="w-full user__header relative bg-blue">
      <div class="p-3 d-grid gap-1 relative z-index-2">
        <div class="flex justify-between items-center">
          <Avatar
            :image="Info.urlIcon"
            :size="80"
          />
          <FollowButton
            :follow="Info.userIsSubscribe"
            @follow="followCommunity"
          />
        </div>

        <h1 class="font-semibold text-xl">r/{{ route.params.community }}</h1>
        <div class="flex justify-between items-center">
          <span class="text-sm text-grey-800"
            >{{ numberWithSpaces(Info.nbrSubscribers) }} subscribers <span class="mx-1">•</span>
            {{ numberWithSpaces(Info.nbrSubscribersOnline) }} onlines</span
          >
        </div>
      </div>
      <div class="linear__mask w-full absolute bottom-0" />
    </div>
    <Tabs :tabs="tabs">
      <section
        id="posts"
        class="gap-2"
      >
        <PostCard
          v-for="(post, i) in posts"
          :key="`${Info.communityName}-post-${i}`"
          :post="post"
        />
      </section>
      <section>
        <p>{{ Info.description }}</p>
        <p>{{ Info.createdAt }}</p>
      </section>
    </Tabs>
  </section>
</template>

<script lang="ts" setup>
import Avatar from '@/components/data-display/Avatar.vue'
import FollowButton from '@/components/actions/FollowButton.vue'
import Tabs from '@/components/navigation/Tabs.vue'
import { ref } from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import { Community } from '@/api/community/community'
import { useRoute } from 'vue-router'
import { removeAmpUrl } from '@/utils/urlUtils'
import { timestampToDate } from '@/utils/dateUtils'
import { numberWithSpaces } from '@/utils/numberUtils'
import { BaseApi } from '@/api/BaseApi'

const tabs = [
  {
    label: 'Publications',
  },
  {
    label: 'À Propos',
  },
]

const Info = ref({
  communityName: '',
  nbrSubscribers: 0,
  nbrSubscribersOnline: 0,
  urlIcon: '',
  urlImgBackground: '',
  createdAt: null as string | null,
  description: '',
  userIsSubscribe: false,
})

const followCommunity = (isFollow: boolean) => {
  if (isFollow) {
    BaseApi.subscribe(Info.value.communityName)
  } else {
    Community.unsubscribe(Info.value.communityName)
  }
  Info.value.userIsSubscribe = isFollow
}

const posts = ref([])

const route = useRoute()
Community.getCommunityInfo(route.params.community.toString()).then((res) => {
  Info.value.communityName = res.data.data.display_name
  Info.value.nbrSubscribers = res.data.data.subscribers
  Info.value.nbrSubscribersOnline = res.data.data.accounts_active
  Info.value.urlIcon = removeAmpUrl(res.data.data.community_icon)
  Info.value.urlImgBackground = res.data.data.banner_img
  Info.value.createdAt = timestampToDate(res.data.data.created_utc)
  Info.value.description = res.data.data.public_description
  Info.value.userIsSubscribe = res.data.data.user_is_subscriber
})

Community.hotPostCommunity(route.params.community.toString()).then((res) => {
  posts.value = res.data.data.children
})
</script>

<style lang="scss" scoped>
$header_height: 200px;
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
