import { defineStore } from 'pinia'

const accessTokenInLocalStorage = localStorage.getItem("access_token");
const usernameInLocalStorage = localStorage.getItem("username");
const srInLocalStorage = localStorage.getItem("sr");


export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: accessTokenInLocalStorage,
        username: usernameInLocalStorage,
        sr: srInLocalStorage
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
