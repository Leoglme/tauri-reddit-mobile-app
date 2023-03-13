<template>
  <Loader v-if="appStore.loading" />
  <section
    v-else
    id="user-profile"
  >
    <div
      class="w-full relative bg-blue"
      :style="
        user.banner_img
          ? `background-image: url('${user.banner_img}'); background-size: contain; background-repeat: no-repeat;`
          : null
      "
    >
      <div class="h-full d-grid relative z-index-2">
        <div class="flex justify-between items-center px-3 py-2">
          <Avatar
            shadow
            :image="user.icon_img"
            :size="90"
          />
        </div>

        <div class="bg-grey-200 flex flex-col justify-center p-3">
          <div>
            <h1 class="font-semibold text-lg">
              {{ displayName }}
            </h1>
            <div class="flex justify-between items-center">
              <span class="text-sm text-grey-800"
                >{{ user.display_name_prefixed }} <span class="mx-1">•</span>
                {{ timestampToDate(user.createdAt) }}</span
              >
            </div>
          </div>
          <div
            class="flex items-center mt-2"
            :class="user.user_is_moderator ? 'justify-between' : 'justify-end'"
          >
            <span
              v-if="user.user_is_moderator"
              class="text-sm text-grey-800 font-medium"
            >
              {{ user.subscribers }} abonné<span v-if="user.subscribers > 1">s</span>
            </span>
            <DisconnectButton v-if="user.user_is_moderator" />
            <FollowButton
              v-if="!user.user_is_moderator && user.accept_followers"
              :follow="user.user_is_subscriber"
              @follow="followUser"
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
          <div
            v-if="user.user_is_moderator"
            class="flex items-center justify-center py-4 bg-grey-200"
          >
            <router-link
              class="btn btn-small fit-content"
              role="button"
              data-variant="primary"
              :to="{ path: user.name + '/create-post' }"
              append
            >
              <PlusIcon />
              Créer une publication
            </router-link>
          </div>

          <ScrollPagination
            :stop="stopScrollPaginate"
            :current-posts="currentPosts"
            @refresh="refreshPosts"
          >
            <PostCard
              v-for="(post, i) in postStore.posts"
              :key="`${username}-post-${i}`"
              :post="post"
            />
          </ScrollPagination>
        </div>
      </section>
      <section
        v-if="user.user_is_moderator"
        id="subs"
      >
        <span
          v-if="!subs || !subs.length"
          class="text-center font-medium"
          >Aucun abonnements :(</span
        >
        <div
          v-if="currentTab === 1"
          class="d-grid gap-3 by-1 border-grey-400 bg-grey-100"
        >
          <router-link
            v-for="sub in subs"
            :key="sub.data.display_name_prefixed"
            :append="true"
            :to="`/${sub.data.display_name_prefixed}`"
            class="px-4 py-2 text-grey-800 font-medium sub cursor-pointer flex items-center justify-between"
          >
            <span class="flex items-center gap-3">
              <Avatar
                :image="removeAmpUrl(sub.data.icon_img || sub.data.community_icon)"
                :title="sub.data.display_name_prefixed"
                :size="30"
              />
              {{ sub.data.display_name_prefixed }}
            </span>
            <ChevronRightIcon />
          </router-link>
        </div>
      </section>
      <section
        id="about"
        class="gap-4"
      >
        <div
          id="karmas"
          class="inline-grid gap-3 px-4 py-5 bb-1 border-grey-400 bg-grey-100 col-2 columns"
        >
          <div class="flex flex-col">
            <span class="font-medium">{{ user.link_karma }}</span>
            <span class="text-grey-800 text-sm">Karma pour publications</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium">{{ user.comment_karma }}</span>
            <span class="text-grey-800 text-sm">Karma pour commentaires</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium">{{ user.awarder_karma }}</span>
            <span class="text-grey-800 text-sm">Karma donné</span>
          </div>
          <div class="flex flex-col">
            <span class="font-medium">{{ user.awardee_karma }}</span>
            <span class="text-grey-800 text-xs">Karma reçu</span>
          </div>
        </div>
        <div
          v-if="user.public_description"
          id="description"
          class="d-grid gap-4 px-4 py-4 by-1 border-grey-400 bg-grey-100 text-grey-800 font-medium text-sm"
        >
          {{ user.public_description }}
        </div>
        <div
          v-if="trophies && trophies.length"
          class="d-grid gap-2"
        >
          <h4 class="text-grey-800 font-medium text-sm pl-2">TROPHÉES</h4>
          <div
            id="trophies"
            class="d-grid gap-4 px-4 py-4 by-1 border-grey-400 bg-grey-100"
          >
            <div
              v-for="trophy in trophies"
              :key="trophy.data.id"
              class="flex items-center gap-3"
            >
              <img
                :src="trophy.data.icon_40"
                :alt="trophy.data.name"
              />
              <span class="font-medium text-grey-800">{{ trophy.data.name }}</span>
            </div>
          </div>
        </div>
      </section>
    </Tabs>
  </section>
</template>

<script lang="ts" setup>
import Avatar from '@/components/data-display/Avatar.vue'
import FollowButton from '@/components/actions/FollowButton.vue'
import DisconnectButton from '@/components/actions/DisconnectButton.vue'
import Loader from '@/components/ui/Loader.vue'
import Tabs from '@/components/navigation/Tabs.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import { ref, watch } from 'vue'
import PostCard from '@/components/data-display/PostCard.vue'
import { useRoute } from 'vue-router'
import { User as UserApi } from '@/api/user/user'
import { Post } from '@/api/post/post'
import { useAppStore } from '@/stores/app.store'
import { removeAmpUrl } from '@/utils/urlUtils'
import type { UserModel } from '@/api/user/user.model'
import { SITE_NAME } from '@/env'
import { timestampToDate } from '@/utils/dateUtils'
import { BaseApi } from '@/api/BaseApi'
import { Trophy } from '@/api/user/user.model'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { Community } from '@/api/community/community'
import ScrollPagination from '@/components/navigation/ScrollPagination.vue'
import type { PostModel } from '@/api/post/post.model'
import { usePostStore } from '@/stores/post.store'
import { useAuthStore } from '@/stores/auth.store'

/*Hooks*/
const route = useRoute()

/*DATA*/
const username = ref(route.params.username)

/*STORE*/
const appStore = useAppStore()
const authStore = useAuthStore()
const postStore = usePostStore()

/*REFS*/
const user = ref({} as UserModel)
const trophies = ref([] as Trophy[])
const displayName = ref()
const currentTab = ref(0)
const currentPosts = ref(0)
const after = ref<string>()
const afters = ref<string[]>([])
const stopScrollPaginate = ref(false)
const isCardLayout = ref(authStore.prefs?.layout === 'card')
const firstPostId = ref()
const tabs = ref([
  {
    label: 'Publications',
  },
  {
    label: 'À Propos',
  },
])
const subs = ref<{ data: { display_name_prefixed: string; icon_img?: string; community_icon?: string } }[]>([])
/*WATCHERS*/
watch(
  () => route,
  (newRoute) => {
    username.value = newRoute.params.username
    refreshDatas()
  },
  { deep: true }
)

/*METHODS*/
const handleTab = (indexTab: number) => {
  currentTab.value = indexTab
}

/*API METHODS*/
const followUser = (isFollow: boolean) => {
  if (isFollow) {
    BaseApi.subscribe(user.value.display_name)
  } else {
    BaseApi.unsubscribe(user.value.display_name)
  }
  user.value.user_is_subscriber = isFollow
}

const getPosts = async () => {
  if (!stopScrollPaginate.value) {
    await Post.getPostUser(username.value.toString(), after.value)
      .then((res) => {
        const requestsPosts: PostModel[] = res.data.data.children
        if (!firstPostId.value) {
          firstPostId.value = requestsPosts[0].data?.name
        }

        after.value = res.data.data.after
        if (!after.value || afters.value.includes(after.value)) {
          for (const post of requestsPosts) {
            if (post.data.name === firstPostId.value) {
              break
            }
            postStore.posts.push(post)
          }
          stopScrollPaginate.value = true
        } else {
          postStore.setPosts(postStore.posts.concat(requestsPosts))
          afters.value.push(after.value)
        }

        currentPosts.value += 10
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const refreshPosts = () => {
  getPosts()
  currentPosts.value = 0
}

const refreshDatas = async () => {
  appStore.setLoading(true)
  postStore.setPosts([])
  /*DOM*/
  document.title = `Chargement... | ${SITE_NAME}`

  await UserApi.getUserInfo(username.value.toString())
    .then(async (res) => {
      const { name, comment_karma, awardee_karma, awarder_karma, link_karma, accept_followers } = res.data.data
      const {
        icon_img,
        title,
        display_name_prefixed,
        public_description,
        banner_img,
        user_is_subscriber,
        display_name,
        user_is_moderator,
        subscribers,
      } = res.data.data.subreddit

      user.value = {
        title,
        display_name_prefixed,
        display_name,
        public_description,
        subscribers,
        createdAt: res.data.data.created_utc,
        user_is_subscriber,
        user_is_moderator,
        accept_followers,
        name,
        comment_karma,
        awardee_karma,
        awarder_karma,
        link_karma,
      }
      user.value.icon_img = removeAmpUrl(icon_img)
      user.value.banner_img = removeAmpUrl(banner_img)

      displayName.value = title || name

      document.title = `${title} (${display_name_prefixed}) -  ${SITE_NAME}`

      await getPosts()
    })
    .catch((err) => {
      console.log(err)
    })
  await UserApi.getUserTrophies(username.value.toString())
    .then((res) => {
      trophies.value = res.data.data.trophies
    })
    .catch((err) => {
      console.log(err)
    })

  if (user.value.user_is_moderator) {
    tabs.value.splice(1, 0, {
      label: 'Abonnements',
    })
    await Community.userCommunityList()
      .then((res) => {
        subs.value = res.data.data?.children
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    tabs.value = tabs.value.filter((tab) => tab.label !== 'Abonnements')
  }
  appStore.setLoading(false)
}

refreshDatas()
</script>

<style lang="scss" scoped>
@import '@/assets/scss/core/_mixins.scss';

#posts {
  white-space: normal;
}

#about {
  position: relative;
  top: -6px;
}

#karmas {
  @include down(330px) {
    --columns: 1;
  }
}

.sub:hover {
  background: var(--grey-200);
}

.sub:active {
  background: var(--grey-400);
}
</style>
