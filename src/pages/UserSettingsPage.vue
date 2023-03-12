<template>
  <div v-if="appStore.loading">
    <Loader />
  </div>
  <section
    v-else
    id="settings"
  >
    <div class="d-grid gap-8 py-4 px-4">
      <div class="flex justify-between items-center gap-4">
        <div class="d-grid gap-2">
          <h3 class="text-white text-lg">Lecture automatique des vidéos</h3>
          <p class="text-sm text-grey-800">Lecture automatique des vidéos dans la fenêtre de visualisation.</p>
        </div>
        <Switch
          v-model:checked="authStore.prefs.video_autoplay"
          @update:checked="handleVideoAutoplay"
        />
      </div>
      <div class="flex justify-between items-center gap-4">
        <div class="d-grid gap-2">
          <h3 class="text-white text-lg">Publications sous forme de Carte</h3>
          <p class="text-sm text-grey-800">Choisissez le mode d'affichage du contenu dans vos flux</p>
        </div>
        <Switch
          v-model:checked="layoutChecked"
          @update:checked="handleLayout"
        />
      </div>

      <div class="flex justify-between items-center gap-4">
        <div class="d-grid gap-2">
          <h3 class="text-white text-lg">Autoriser les gens à vous suivre</h3>
          <p class="text-sm text-grey-800">
            Les personnes qui vous suivent seront informées des publications que vous publiez sur votre profil et les
            verront dans leur flux d'accueil.
          </p>
        </div>
        <Switch
          v-model:checked="authStore.prefs.enable_followers"
          @update:checked="handleEnableFollowers"
        />
      </div>

      <div class="flex justify-between items-center gap-4">
        <div class="d-grid gap-2">
          <h3 class="text-white text-lg">Email Nouveaux abonné(e)s</h3>
          <p class="text-sm text-grey-800">Un email vous sera envoyé quand une personne commence à vous suivre.</p>
        </div>
        <Switch
          v-model:checked="authStore.prefs.email_user_new_follower"
          @update:checked="handleEmailUserNewFollower"
        />
      </div>

      <div class="flex justify-between items-center gap-4">
        <div class="d-grid gap-2">
          <h3 class="text-white text-lg">Thèmes de la communauté</h3>
          <p class="text-sm text-grey-800">Afficher les thèmes personnalisés pour toutes les communautés.</p>
        </div>
        <Switch
          v-model:checked="authStore.prefs.show_stylesheets"
          @update:checked="handleShowStylesheets"
        />
      </div>

      <div class="flex justify-between items-center gap-4">
        <div class="d-grid gap-2">
          <h3 class="text-white text-lg">Activer les recommandations de flux d'accueil</h3>
          <p class="text-sm text-grey-800">
            Permettez-nous d'introduire les publications recommandées dans votre flux d'accueil.
          </p>
        </div>
        <Switch
          v-model:checked="authStore.prefs.feed_recommendations_enabled"
          @update:checked="handleFeedRecommendationsEnabled"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Switch from '@/components/data-input/Switch.vue'
import { useAuthStore } from '@/stores/auth.store'
import { User } from '@/api/user/user'
import Loader from '@/components/ui/Loader.vue'
import { useAppStore } from '@/stores/app.store'
import { ref } from 'vue'
/*STORE*/
const authStore = useAuthStore()
const appStore = useAppStore()

/*Refs*/
const layoutChecked = ref(authStore.prefs.layout === 'card')

/*METHODS*/
const handleVideoAutoplay = async (isChecked: boolean) => {
  await User.setPreferences({ video_autoplay: isChecked })
  authStore.setPrefs({ ...authStore.prefs, video_autoplay: isChecked })
}

const handleEnableFollowers = async (isChecked: boolean) => {
  await User.setPreferences({ enable_followers: isChecked })
  authStore.setPrefs({ ...authStore.prefs, enable_followers: isChecked })
}
const handleShowStylesheets = async (isChecked: boolean) => {
  await User.setPreferences({ show_stylesheets: isChecked })
  authStore.setPrefs({ ...authStore.prefs, show_stylesheets: isChecked })
}

const handleEmailUserNewFollower = async (isChecked: boolean) => {
  await User.setPreferences({ email_user_new_follower: isChecked })
  authStore.setPrefs({ ...authStore.prefs, email_user_new_follower: isChecked })
}

const handleFeedRecommendationsEnabled = async (isChecked: boolean) => {
  await User.setPreferences({ feed_recommendations_enabled: isChecked })
  authStore.setPrefs({ ...authStore.prefs, feed_recommendations_enabled: isChecked })
}

const handleLayout = async (isChecked: boolean) => {
  const layout = isChecked ? 'card' : 'classic'
  await User.setPreferences({ layout })
  authStore.setPrefs({ ...authStore.prefs, layout })
}
/*API METHODS*/
if (!Object.keys(authStore.prefs)?.length) {
  appStore.setLoading(true)
  User.getPreferences().then((res) => {
    authStore.setPrefs(res.data)
    appStore.setLoading(false)
  })
}
</script>
