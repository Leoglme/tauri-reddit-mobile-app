<template>
  <Loader v-if="appStore.loading" />
  <div v-else>
    <Tabs
      v-if="authorize"
      :tabs="tabs"
    >
      <section class="p-3">
        <Form
          v-slot="{ meta }"
          @submit="createPost"
        >
          <TextInput
            id="title"
            label="Titre"
            rules="required|max:300"
            show-reset
          />
          <TextInput
            id="text"
            :rows="5"
            label="Texte (facultatif)"
          />
          <button
            :disabled="!meta.valid"
            class="btn w-full"
            :data-variant="meta.valid ? 'primary' : null"
            type="submit"
          >
            Continuer
          </button>
        </Form>
      </section>
      <section>
        <ImagesUploader />
      </section>
      <section></section>
      <section>
        <PollForm />
      </section>
    </Tabs>
    <div
      v-else
      class="p-6"
    >
      <h1 class="text-md mb-6">Désolé, vous n'avez pas la permission de voir cette page.</h1>
      <div class="w-full flex items-center justify-center">
        <router-link
          to="/"
          role="button"
          class="btn"
          data-variant="white"
        >
          Retourner à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tabs from '@/components/navigation/Tabs.vue'
import { Form } from 'vee-validate'
import TextInput from '@/components/data-input/TextInput.vue'
import ImagesUploader from '@/components/data-input/ImagesUploader.vue'
import PollForm from '@/components/data-input/PollForm.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Loader from '@/components/ui/Loader.vue'
import { useAppStore } from '@/stores/app.store'
import { User } from '@/api/user/user'
import { Post } from '@/api/post/post'
import type { UserModel } from '@/api/user/user.model'
/*Todo sondage disable ?*/
/*DATA*/
const tabs = [
  {
    label: 'Publier',
  },
  {
    label: 'Image et Vidéo',
  },
  {
    label: 'Lien',
  },
  {
    label: 'Sondage',
  },
]

/*STORE*/
const appStore = useAppStore()

/*HOOKS*/
const route = useRoute()
const router = useRouter()
/*REFS*/
const type = ref(route.params.type)
const authorize = ref(true)
const srName = ref()

/*Computed*/
const submitType = computed(() => {
  if (type.value === 'u') return 'profile'
  return 'subreddit'
})
/*METHODS*/
const getInfos = async () => {
  appStore.setLoading(true)
  if (type.value === 'u') {
    await User.getUserInfo(route.params.name?.toString())
      .then((res: { data: { data: UserModel } }) => {
        srName.value = res.data.data.subreddit?.display_name
        authorize.value = res.data.data.subreddit?.user_is_moderator || false
      })
      .catch(() => {
        authorize.value = false
      })
    appStore.setLoading(false)
  } else if (type.value === 'r') {
    srName.value = route.params.name?.toString()
    appStore.setLoading(false)
  } else {
    authorize.value = false
    appStore.setLoading(false)
  }
}
getInfos()
const createPost = async (command: { title: string; text?: string }) => {
  try {
    await Post.createPost({ sr: srName.value, submit_type: submitType.value, ...command })
    setTimeout(async () => {
      await router.push(`/${type.value}/${route.params.name}`)
    }, 3000)
  } catch (err) {
    console.log(err)
  }
}
</script>
