import { defineStore } from 'pinia'
import router from '@/router'
import { removeAmpUrl } from '@/utils/urlUtils'

const accessTokenInLocalStorage = localStorage.getItem('access_token')
const usernameInLocalStorage = localStorage.getItem('username')
const prefsInLocalStorage = localStorage.getItem('prefs')
const srInLocalStorage = localStorage.getItem('sr')
const userImageInLocalStorage = localStorage.getItem('user_image')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access_token: accessTokenInLocalStorage,
    username: usernameInLocalStorage,
    prefs: prefsInLocalStorage ? JSON.parse(prefsInLocalStorage) : ({} as Record<string, boolean | string>[]),
    sr: srInLocalStorage,
    userImage: userImageInLocalStorage as string | undefined,
  }),
  getters: {},
  actions: {
    async disconnect() {
      this.access_token = null
      localStorage.removeItem('access_token')
      await router.push({ name: 'login' })
    },
    setPrefs(prefs: Record<string, boolean | string>[]) {
      this.prefs = prefs
      localStorage.setItem('prefs', JSON.stringify(prefs))
    },
    setAccessToken(access_token: string) {
      this.access_token = access_token
      localStorage.setItem('access_token', access_token)
    },
    setUsername(username: string) {
      this.username = username
      localStorage.setItem('username', username)
    },
    setSr(sr: string) {
      this.sr = sr
      localStorage.setItem('sr', sr)
    },
    setUserImage(userImage: string) {
      const image = removeAmpUrl(userImage)
      this.userImage = image
      if (image) {
        localStorage.setItem('user_image', image)
      } else {
        localStorage.removeItem('user_image')
      }
    },
  },
})
