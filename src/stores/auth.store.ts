import { defineStore } from 'pinia'
import router from "@/router";

const accessTokenInLocalStorage = localStorage.getItem("access_token");
const usernameInLocalStorage = localStorage.getItem("username");
const srInLocalStorage = localStorage.getItem("sr");
const userImageInLocalStorage = localStorage.getItem("user_image");


export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: accessTokenInLocalStorage,
        username: usernameInLocalStorage,
        sr: srInLocalStorage,
        userImage: userImageInLocalStorage
    }),
    getters: {

    },
    actions: {
        async disconnect() {
            this.access_token = null
            localStorage.removeItem('access_token')
            await router.push({name: 'login'})
        },
        setAccessToken(access_token: string){
            this.access_token = access_token;
            localStorage.setItem("access_token", access_token)
        },
        setUsername(username: string){
            this.username = username;
            localStorage.setItem("username", username)
        },
        setSr(sr: string){
            this.sr = sr;
            localStorage.setItem("sr", sr)
        },
        setUserImage(userImage: string){
            this.userImage = userImage
            localStorage.setItem("user_image", userImage)
        }
    },
})
