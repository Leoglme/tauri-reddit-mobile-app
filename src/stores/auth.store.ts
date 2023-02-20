import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ token: ''}),
    getters: {

    },
    actions: {
        setToken(token: string){
            this.token = token;
        }
    },
})
