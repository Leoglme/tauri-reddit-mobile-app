import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/IndexView.vue';
import Login from '../views/LoginView.vue';
import AccessToken from '../views/AcessToken.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/access-token',
            name: 'Access Token',
            component: AccessToken
        },
    ]
})

export default router;