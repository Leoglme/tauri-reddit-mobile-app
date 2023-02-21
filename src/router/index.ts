import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/IndexView.vue';
import DesignSystemPage from "../pages/DesignSystemPage.vue"
import LoadingPage from "../pages/LoadingPage.vue"
import ProfilePage from "../pages/ProfilePage.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/design-system',
            name: 'design-system',
            component: DesignSystemPage
        },
        {
            path: '/loading',
            name: 'loading',
            component: LoadingPage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage
        }
    ]
})

export default router;
