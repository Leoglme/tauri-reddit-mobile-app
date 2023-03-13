import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserSettingsPage from '@/pages/UserSettingsPage.vue'
import DesignSystemPage from '@/pages/DesignSystemPage.vue'
import LoadingPage from '@/pages/LoadingPage.vue'
import UserPage from '@/pages/UserPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AccessTokenPage from '@/pages/AccessTokenPage.vue'
import CreateCommunityPage from '@/pages/CreateCommunityPage.vue'
import CreatePostPage from '@/pages/CreatePostPage.vue'
import CommunityPage from '@/pages/CommunityPage.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import Navbar from '@/components/navigation/Navbar.vue'
import Search from '@/pages/SearchPage.vue'
import { useAuthStore } from '@/stores/auth.store'
import { Auth } from '@/api/auth/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/settings',
      name: 'settings',
      components: {
        default: UserSettingsPage,
        BottomNavigation: BottomNavigation,
      },
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage,
        Navbar: Navbar,
        BottomNavigation: BottomNavigation,
      },
    },
    {
      path: '/u/:username',
      name: 'user',
      components: {
        default: UserPage,
        BottomNavigation: BottomNavigation,
      },
    },
    {
      path: '/r/:community',
      name: 'community',
      components: {
        default: CommunityPage,
        BottomNavigation: BottomNavigation,
        Navbar: Navbar,
      },
    },
    {
      path: '/:type/:name/create-post',
      name: 'create-post',
      components: {
        default: CreatePostPage,
        BottomNavigation: BottomNavigation,
      },
    },
    {
      path: '/create-community',
      name: 'create-community',
      components: {
        default: CreateCommunityPage,
        BottomNavigation: BottomNavigation,
      },
    },
    {
      path: '/design-system',
      name: 'design-system',
      component: DesignSystemPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/access-token',
      name: 'access-token',
      component: AccessTokenPage,
    },
    {
      path: '/loading',
      name: 'loading',
      component: LoadingPage,
    },
    {
      path: '/search',
      name: 'search',
      components: {
        default: Search,
        BottomNavigation: BottomNavigation,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const pageWithoutConnection = ['/login', '/design-system', '/access-token']
  const auth = useAuthStore()

  if (!pageWithoutConnection.includes(to.path)) {
    if (auth.access_token) {
      Auth.getUserConnected(auth.access_token).catch(async (err) => {
        if (err.response?.status === 401) {
          await router.push('/login')
        }
      })
    } else {
      await router.push('/login')
    }
  }
})

export default router
