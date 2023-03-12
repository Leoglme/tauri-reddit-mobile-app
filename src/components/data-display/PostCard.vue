<template>
  <div
    class="d-grid gap-2 px-3 py-2 bg-grey-100 post-card"
    :class="!isCardLayout ? 'bb-1 border-grey-500' : null"
  >
    <!-- Header -->

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <Avatar
          :image="props.post.data.avatarUrl"
          :size="28"
        />
        <div
          class="d-grid"
          style="gap: 1px"
        >
          <div class="flex items-center gap-2">
            <router-link
              :to="'/' + props.post.data.subreddit_name_prefixed"
              class="text-sm font-medium text-grey-800"
            >
              {{ props.post.data.subreddit_name_prefixed }}
            </router-link>
            <span
              v-if="!hasAuthor"
              class="font-medium text-grey-700 flex items-center gap-2"
              ><span>•</span>{{ formatElapsedTime(props.post.data.created_utc) }}</span
            >
          </div>
          <div
            v-if="hasAuthor"
            class="flex items-center gap-2"
          >
            <router-link
              :to="'/u/' + props.post.data.author"
              class="text-sm font-medium text-grey-800"
            >
              u/{{ props.post.data.author }}
            </router-link>
            <span class="font-medium text-grey-700 flex items-center gap-2"
              ><span>•</span>{{ formatElapsedTime(props.post.data.created_utc) }}</span
            >
          </div>
        </div>
      </div>

      <MinusCircleOutlineIcon
        v-if="props.post.data.can_mod_post"
        class="clickable-icon-red"
        :size="22"
        fill-color="var(--red)"
        @click="openDeleteSwipe"
      />
    </div>
    <!-- Body -->
    <div class="d-grid gap-1 text-grey-800">
      <h3 class="text-lg font-semibold">{{ props.post.data.title }}</h3>
      <Swiper
        v-if="images"
        :images="images"
      />
      <PostVideo
        v-else-if="isVideo && video"
        :video="video"
      />
      <a
        v-else-if="props.post.data.url_overridden_by_dest"
        class="link-blue"
        :href="props.post.data.url_overridden_by_dest"
      >
        {{ extractDomain(props.post.data.url_overridden_by_dest) }}
      </a>
      <selfTextLink
        v-if="isLink"
        :self-text="selftext"
      />
      <p
        v-else-if="selftext && !images"
        class="text-sm block-with-text"
      >
        {{ selftext }}
      </p>
      <Poll
        v-if="poll"
        :poll="poll"
      />
      <MediaEmbed
        v-if="iframeUrl"
        :iframe-content="iframeUrl"
      />
      <img
        v-else-if="image && !isVideo"
        class="post-image mt-1 user-select-none"
        :src="image"
        :alt="props.post.data.title"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/data-display/Avatar.vue'
import MediaEmbed from '@/components/data-display/MediaEmbed.vue'
import Swiper from '@/components/data-display/Swiper.vue'
import Poll from '@/components/data-display/Poll.vue'
import PostVideo from '@/components/data-display/PostVideo.vue'
import MinusCircleOutlineIcon from 'vue-material-design-icons/MinusCircleOutline.vue'
import type { PropType } from 'vue'
import type { PostModel, VideoModel } from '@/api/post/post.model'
import { computed, onMounted, ref } from 'vue'
import { getBestImages, getImageInPreview } from '@/utils/imageUtils'
import { extractDomain, removeLinkInSelfText, selfTextIsLinkFormat } from '@/utils/urlUtils'
import SelfTextLink from '@/components/data-display/SelfTextLink.vue'
import { formatElapsedTime } from '@/utils/dateUtils'
import { useAppStore } from '@/stores/app.store'
import { usePostStore } from '@/stores/post.store'
import { useAuthStore } from '@/stores/auth.store'

/*STORE*/
const appStore = useAppStore()
const postStore = usePostStore()
const authStore = useAuthStore()
/*PROPS*/
const props = defineProps({
  post: { type: Object as PropType<PostModel>, required: true },
})

/*REFS*/
const image = ref<undefined | string>()
const video = ref(props.post?.data.media?.reddit_video as VideoModel)
const poll = ref(props.post?.data.poll_data)
const isLink = ref(selfTextIsLinkFormat(props.post.data.selftext) && !poll.value)
const isVideo = ref(props.post.data.is_video)
const isCardLayout = ref(authStore.prefs?.layout === 'card')
const iframeUrl = ref(props.post?.data.secure_media_embed?.content)
const hasAuthor = ref(
  props.post.data.author && 'u/' + props.post.data.author !== props.post.data.subreddit_name_prefixed
)

/*COMPUTED*/
const selftext = computed(() => {
  const text = props.post?.data.selftext
  if (text && poll.value) {
    return removeLinkInSelfText(text)
  }
  return text
})

const images = computed(() => {
  const imagesInJson = props.post?.data.media_metadata
  if (!imagesInJson) return null
  const bestImages = getBestImages(imagesInJson)
  if (bestImages.length === 1) {
    image.value = bestImages[0].src
    return null
  }
  return bestImages
})

/*METHODS*/
const openDeleteSwipe = () => {
  appStore.setOpenDeleteSwipe(!appStore.openDeleteSwipe)
  postStore.setDeletePostId(props.post?.data.name)
}
const getImage = () => {
  if (props.post?.data.preview) {
    image.value = getImageInPreview(props.post.data.preview)
  }
}
getImage()

/*LIFECYCLE*/
onMounted(() => {
  window.addEventListener('resize', getImage)
})
</script>

<style scoped>
.post-image {
  object-fit: contain;
  border-radius: 16px;
  width: 100%;
  border: 1px solid var(--grey-600);
  background: var(--grey-800);
}
</style>
