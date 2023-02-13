import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/IndexView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
    ]
})

export default router;