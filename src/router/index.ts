import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/IndexView.vue';
import DesignSystemPage from "../pages/DesignSystemPage.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/design-pattern',
            name: 'design-pattern',
            component: DesignSystemPage
        },
    ]
})

export default router;
