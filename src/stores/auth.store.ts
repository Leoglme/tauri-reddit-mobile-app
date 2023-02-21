import { defineStore } from 'pinia'

const accessTokenInLocalStorage = localStorage.getItem("access_token");


export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: accessTokenInLocalStorage
    }),
    getters: {

    },
    actions: {
        setAccessToken(access_token: string){
            this.access_token = access_token;
            localStorage.setItem("access_token", access_token)
        }
    },
})
