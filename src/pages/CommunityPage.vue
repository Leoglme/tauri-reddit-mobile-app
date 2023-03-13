<template>
  <Loader v-if="appStore.loading" />
  <section
    v-else
    id="community-profile"
  >
    <div
      class="w-full relative bg-blue"
      :style="
        community.mobile_banner_image
          ? `background-image: url('${community.mobile_banner_image}'); background-size: contain; background-repeat: no-repeat;`
          : null
      "
    >
      <div class="h-full d-grid relative z-index-2">
        <div class="flex justify-between items-center px-3 py-2">
          <Avatar
            shadow
            :image="community.community_icon"
            :size="90"
          />
        </div>

        <div class="bg-grey-200 flex flex-col justify-center p-3">
          <div>
            <h1 class="font-semibold text-lg">
              {{ community.display_name }}
            </h1>
            <div class="flex justify-between items-center">
              <span class="text-sm text-grey-800"
                >{{ numberWithSpaces(community.subscribers) }} abonné<span v-if="community.subscribers > 1">s</span>
                <span class="mx-1">•</span> {{ numberWithSpaces(community.accounts_active) }} en ligne</span
              >
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <span class="text-sm text-grey-800 font-medium">
              {{ timestampToDate(community.created_utc) }}
            </span>
            <FollowButton
              :color="authStore.prefs.show_stylesheets ? community.key_color : null"
              :follow="community.user_is_subscriber"
              @follow="followCommunity"
            />
          </div>
        </div>
      </div>
    </div>
    <Tabs
      :tabs="tabs"
      @change="handleTab"
    >
      <section
        id="posts"
        class="gap-2"
      >
        <div
          v-if="currentTab === 0"
          class="d-grid"
          :class="isCardLayout ? 'gap-2' : null"
        >
          <div class="flex items-center justify-center py-4 bg-grey-200">
            <router-link
              class="btn btn-small fit-content"
              role="button"
              data-variant="primary"
              :to="{ path: community.display_name + '/create-post' }"
              append
            >
              <PlusIcon />
              Créer une publication
            </router-link>
          </div>
          <ScrollPagination
            :current-posts="currentPosts"
            @refresh="refreshPosts"
          >
            <PostCard
              v-for="(post, i) in postStore.posts"
              :key="`${community.display_name}-post-${i}`"
              :post="post"
            />
          </ScrollPagination>
        </div>
      </section>
      <section
        id="about"
        class="gap-4"
      >
        <div
          v-if="community.public_description"
          id="descriptions"
          class="gap-3 px-4 py-5 bb-1 border-grey-400 bg-grey-100"
        >
          <p class="text-grey-800 font-medium">{{ community.public_description }}</p>
        </div>

        <div
          v-if="rules && rules.length"
          class="d-grid gap-4"
        >
          <h4 class="text-grey-800 font-medium pl-2">Règles</h4>

          <div
            id="rules"
            class="d-grid gap-4 px-4 py-5 by-1 border-grey-400 bg-grey-100"
          >
            <Spoiler
              v-for="rule in rules"
              :key="rule.short_name"
              :title="rule.short_name"
              :content="rule.description"
            />
          </div>
        </div>

        <div
          v-if="moderators && moderators.length"
          class="d-grid gap-4"
        >
          <h4 class="text-grey-800 font-medium pl-2">Modérateurs</h4>

          <div
            id="moderators"
            class="d-grid gap-3 by-1 border-grey-400 bg-grey-100"
          >
            <router-link
              v-for="moderator in moderators"
              :key="moderator.name"
              :to="`/u/${moderator.name}`"
              class="px-4 py-2 text-grey-800 font-medium moderator cursor-pointer flex items-center justify-between"
            >
              {{ moderator.name }}
              <ChevronRightIcon />
            </router-link>
          </div>
        </div>
      </section>
    </Tabs>
  </section>
</template>

<script lang="ts" setup>
import Loader from '@/components/ui/Loader.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import Avatar from '@/components/data-display/Avatar.vue'
import Spoiler from '@/components/data-display/Spoiler.vue'
import FollowButton from '@/components/actions/FollowButton.vue'
import Tabs from '@/components/navigation/Tabs.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import { ref, watch } from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import { Community } from '@/api/community/community'
import { useRoute } from 'vue-router'
import { removeAmpUrl } from '@/utils/urlUtils'
import { numberWithSpaces } from '@/utils/numberUtils'
import { BaseApi } from '@/api/BaseApi'
import { useAppStore } from '@/stores/app.store'
import type { CommunityModel, CommunityModeratorModel, CommunityRuleModel } from '@/api/community/community.model'
import { SITE_NAME } from '@/env'
import { timestampToDate } from '@/utils/dateUtils'
import ScrollPagination from '@/components/navigation/ScrollPagination.vue'
import { usePostStore } from '@/stores/post.store'
import { useAuthStore } from '@/stores/auth.store'
/*Hooks*/
const route = useRoute()

/*DATA*/
const communityName = ref(route.params.community)
const tabs = [
  {
    label: 'Publications',
  },
  {
    label: 'À Propos',
  },
]

/*STORE*/
const appStore = useAppStore()
const postStore = usePostStore()
const authStore = useAuthStore()

/*REFS*/
const rules = ref<CommunityRuleModel[]>([])
const moderators = ref<CommunityModeratorModel[]>([])
const community = ref({} as CommunityModel)
const currentTab = ref(0)
const after = ref()
const isCardLayout = ref(authStore.prefs?.layout === 'card')
const currentPosts = ref(0)

/*METHODS*/
const handleTab = (indexTab: number) => {
  currentTab.value = indexTab
}

/*API METHODS*/
const followCommunity = (isFollow: boolean) => {
  if (isFollow) {
    BaseApi.subscribe(community.value.display_name)
  } else {
    Community.unsubscribe(community.value.display_name)
  }
  community.value.user_is_subscriber = isFollow
}

const getCommunityPosts = async () => {
  await Community.getPosts(communityName.value.toString(), appStore.getCurrentFilter, after.value)
    .then((res) => {
      postStore.setPosts(postStore.posts.concat(res.data.data.children))
      after.value = res.data.data.after
      if (appStore.loading) {
        appStore.setLoading(false)
      }
      currentPosts.value += 10
    })
    .catch((err) => {
      console.log(err)
    })
}

const refreshPosts = () => {
  getCommunityPosts()
  currentPosts.value = 0
}

const refreshDatas = async () => {
  appStore.setLoading(true)
  postStore.setPosts([])
  /*DOM*/
  document.title = `Chargement... | ${SITE_NAME}`

  await Community.getCommunityInfo(communityName.value.toString())
    .then(async (res) => {
      const {
        display_name,
        subscribers,
        accounts_active,
        community_icon,
        mobile_banner_image,
        created_utc,
        public_description,
        user_is_subscriber,
        key_color,
      } = res.data.data
      community.value = {
        display_name,
        subscribers,
        accounts_active,
        created_utc,
        public_description,
        user_is_subscriber,
        key_color,
      }

      community.value.community_icon = removeAmpUrl(community_icon)
      community.value.mobile_banner_image = removeAmpUrl(mobile_banner_image)

      document.title = `${display_name} -  ${SITE_NAME}`

      await getCommunityPosts()
    })
    .catch((err) => {
      console.log(err)
    })

  await Community.getModerators(communityName.value.toString())
    .then((res) => {
      console.log(res.data.data?.children)
      moderators.value = res.data.data?.children
    })
    .catch((err) => {
      console.log(err)
    })
  await Community.getRules(communityName.value.toString())
    .then((res) => {
      rules.value = res.data.rules
    })
    .catch((err) => {
      console.log(err)
    })
  appStore.setLoading(false)
}

refreshDatas()

/*WATCHERS*/
watch(
  () => appStore.getCurrentFilter,
  async () => {
    appStore.setLoading(true)
    postStore.setPosts([])
    await getCommunityPosts()
    appStore.setLoading(false)
  }
)
</script>

<style lang="scss" scoped>
#posts {
  white-space: normal;
}

#about {
  position: relative;
  top: -8px;
}

.moderator:hover {
  background: var(--grey-200);
}

.moderator:active {
  background: var(--grey-400);
}

#community-profile {
  padding-top: var(--navbar-height);
}
</style>
