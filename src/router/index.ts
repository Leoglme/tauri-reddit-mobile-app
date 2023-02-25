import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import DesignSystemPage from "@/pages/DesignSystemPage.vue"
import LoadingPage from "@/pages/LoadingPage.vue"
import UserPage from "@/pages/UserPage.vue"
import LoginPage from '@/pages/LoginPage.vue';
import AccessTokenPage from '@/pages/AccessTokenPage.vue';
import CreateCommunityPage from '@/pages/CreateCommunityPage.vue';
import CommunityPage from '@/pages/CommunityPage.vue';
import BottomNavigation from "@/components/navigation/BottomNavigation.vue";
import Navbar from "@/components/navigation/Navbar.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: HomePage,
                Navbar: Navbar,
                BottomNavigation: BottomNavigation
            }
        },
        {
            path: '/u/:username',
            name: 'user',
            components: {
                default: UserPage,
                BottomNavigation: BottomNavigation
            }
        },
        {
            path: '/r/:community',
            name: 'community',
            components: {
                default: CommunityPage,
                BottomNavigation: BottomNavigation
            }
        },
        {
            path: '/create-community',
            name: 'create-community',
            components: {
                default: CreateCommunityPage,
                BottomNavigation: BottomNavigation
            }
        },
        {
            path: '/design-system',
            name: 'design-system',
            component: DesignSystemPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/access-token',
            name: 'access-token',
            component: AccessTokenPage
        },
        {
            path: '/loading',
            name: 'loading',
            component: LoadingPage
        },
    ]
})

export default router;
